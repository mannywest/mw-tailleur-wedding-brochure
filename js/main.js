(function () {
  'use strict';
  var C = window.MW_CONFIG;
  if (!C) return;
  var root = document.documentElement;
  root.classList.add('js');

  /* ---------- helpers ---------- */
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function gbp(n) { return '£' + Number(n).toLocaleString('en-GB'); }
  function priceText(p) {
    if (p.amount == null) return 'price confirmed at consultation';
    return (p.from ? 'From ' : '') + gbp(p.amount) + (p.perPerson ? ' per person' : '');
  }

  /* ---------- photography ----------
   * A slot with no photo is removed, so nothing blank or decorative shows.
   * A slot appears only once its photo has loaded. */
  function shown(n) { return n.isConnected && !n.hidden; }

  function tidy() {
    $$('.duo,.swatches').forEach(function (g) {
      g.hidden = !$$('.img', g).some(shown);
    });
    $$('.split,.looks,.craft').forEach(function (c) {
      var n = Array.prototype.slice.call(c.children).filter(shown).length;
      c.classList.toggle('solo', n < 2);
    });
  }

  function fillSlots() {
    $$('[data-slot]').forEach(function (fig) {
      var key = fig.getAttribute('data-slot');
      var cfg = (C.images || {})[key] || {};
      if (!cfg.src) { fig.remove(); return; }
      fig.hidden = true;
      var img = new Image();
      img.alt = cfg.alt || '';
      img.decoding = 'async';
      img.loading = key === 'hero' ? 'eager' : 'lazy';
      if (cfg.srcset) { img.srcset = cfg.srcset; img.sizes = '(min-width:900px) 50vw, 100vw'; }
      img.onload = function () {
        fig.insertBefore(img, fig.firstChild);
        fig.removeAttribute('aria-hidden');
        fig.hidden = false;
        tidy();
      };
      img.onerror = function () { fig.remove(); tidy(); };
      img.src = cfg.src;
    });
    tidy();
  }

  /* ---------- packages ---------- */
  var byId = {};
  C.packages.forEach(function (p) { byId[p.id] = p; });

  function priceNode(p) {
    var wrap = el('p', 'price');
    if (p.amount == null) {
      wrap.appendChild(el('span', 'amt amt--tbc', 'Price confirmed at consultation'));
      return wrap;
    }
    if (p.from) wrap.appendChild(el('span', 'from', 'From'));
    wrap.appendChild(el('span', 'amt', gbp(p.amount)));
    if (p.perPerson) wrap.appendChild(el('span', 'per', 'per person'));
    return wrap;
  }

  function renderPackages() {
    $$('.pkgs').forEach(function (grid) {
      var fam = grid.getAttribute('data-family');
      C.packages.filter(function (p) { return p.family === fam; }).forEach(function (p) {
        var card = el('article', 'pkg reveal');
        card.id = 'pkg-' + p.id;
        card.appendChild(el('p', 'tag', p.tag));
        card.appendChild(el('h3', null, p.name));
        card.appendChild(priceNode(p));
        var ul = el('ul', 'incl');
        p.includes.forEach(function (i) { ul.appendChild(el('li', null, i)); });
        card.appendChild(ul);
        var b = el('button', 'btn btn--add', 'Add to shortlist');
        b.type = 'button';
        b.setAttribute('data-add', p.id);
        card.appendChild(b);
        grid.appendChild(card);
      });
    });
  }

  function renderGarments() {
    var t = $('#garment-table');
    if (!t) return;
    var g = C.garments;
    var cap = el('caption', 'sr', 'Individual garment prices by fabric tier');
    t.appendChild(cap);
    var thead = el('thead'), tr = el('tr');
    var th0 = el('th', null, 'Garment'); th0.scope = 'col'; tr.appendChild(th0);
    g.tiers.forEach(function (tier) { var th = el('th', null, tier.name); th.scope = 'col'; tr.appendChild(th); });
    thead.appendChild(tr); t.appendChild(thead);
    var tb = el('tbody');
    g.rows.forEach(function (row) {
      var r = el('tr');
      var h = el('th', null, row.label); h.scope = 'row'; r.appendChild(h);
      g.tiers.forEach(function (tier) {
        var it = tier.items[row.id], td = el('td');
        if (it.from) td.appendChild(el('small', null, 'From'));
        td.appendChild(document.createTextNode(gbp(it.amount)));
        r.appendChild(td);
      });
      tb.appendChild(r);
    });
    t.appendChild(tb);
  }

  function renderStatic() {
    var m = $('#mills');
    if (m) C.mills.forEach(function (n) { m.appendChild(el('li', null, n)); });
    var tl = $('#terms-list');
    if (tl) C.terms.forEach(function (n) { tl.appendChild(el('li', null, n)); });
    var a = $('#fact-remote'), b = $('#fact-inperson'), c = $('#fact-lead');
    if (a) a.textContent = C.consultation.remote;
    if (b) b.textContent = C.consultation.inPerson;
    if (c) c.textContent = C.leadTime;
  }

  /* ---------- shortlist ---------- */
  var list = [];
  var dlg = $('#shortlist'), bar = $('#sl-bar');

  function message() {
    if (!list.length) return '';
    if (list.length === 1) {
      return 'Hello MW Tailleur, I am interested in the ' + byId[list[0]].name + '. Please could you provide further information?';
    }
    var lines = list.map(function (id) { return '- ' + byId[id].name + ' (' + priceText(byId[id]) + ')'; });
    return 'Hello MW Tailleur, I am interested in the following packages:\n' + lines.join('\n') + '\nPlease could you provide further information?';
  }

  function syncButtons() {
    $$('[data-add]').forEach(function (b) {
      var on = list.indexOf(b.getAttribute('data-add')) > -1;
      b.textContent = on ? 'In shortlist · Remove' : 'Add to shortlist';
      b.classList.toggle('is-on', on);
    });
    $$('[data-count]').forEach(function (n) { n.textContent = list.length; });
    var showBar = list.length > 0 && dlg.hidden;
    bar.hidden = !showBar;
    document.body.classList.toggle('has-bar', showBar);
  }

  function renderDialog() {
    var ul = $('#sl-list');
    ul.innerHTML = '';
    list.forEach(function (id) {
      var li = el('li');
      var span = el('span');
      span.appendChild(el('b', null, byId[id].name));
      span.appendChild(el('em', null, priceText(byId[id])));
      li.appendChild(span);
      var rm = el('button', 'sl-rm', 'Remove');
      rm.type = 'button';
      rm.setAttribute('aria-label', 'Remove ' + byId[id].name);
      rm.addEventListener('click', function () { toggle(id); });
      li.appendChild(rm);
      ul.appendChild(li);
    });
    $('#sl-empty').hidden = list.length > 0;
    $('#sl-body').hidden = list.length === 0;
    var msg = message();
    $('#sl-msg').value = msg;
    $('#sl-status').textContent = '';
    var wa = $('#sl-wa'), ml = $('#sl-mail');
    var num = (C.contact.whatsapp || '').replace(/\D/g, '');
    var bw = $('#bar-wa');
    if (num && msg) {
      var link = 'https://wa.me/' + num + '?text=' + encodeURIComponent(msg);
      wa.href = link; wa.hidden = false; bw.href = link; bw.hidden = false;
    } else { wa.hidden = true; bw.hidden = true; }
    if (C.contact.email && msg) {
      ml.href = 'mailto:' + C.contact.email + '?subject=' + encodeURIComponent('Wedding suit enquiry') + '&body=' + encodeURIComponent(msg);
      ml.hidden = false;
    } else { ml.hidden = true; }
  }

  function toggle(id) {
    var i = list.indexOf(id);
    if (i > -1) list.splice(i, 1); else list.push(id);
    syncButtons();
    renderDialog();
  }

  function openShortlist() {
    renderDialog();
    dlg.hidden = false;
    document.body.classList.add('lock');
    syncButtons();
    var panel = $('.sl-panel', dlg);
    if (panel) panel.focus();
  }

  function closeShortlist() {
    dlg.hidden = true;
    document.body.classList.remove('lock');
    syncButtons();
  }

  function copyMessage() {
    var msg = $('#sl-msg').value, status = $('#sl-status');
    function ok() { status.textContent = 'Copied. Paste it into WhatsApp, email or a text message to MW Tailleur.'; }
    function fallback() {
      var ta = $('#sl-msg');
      ta.removeAttribute('readonly'); ta.focus(); ta.select();
      try { document.execCommand('copy'); ok(); } catch (e) { status.textContent = 'Select the message above and copy it.'; }
      ta.setAttribute('readonly', '');
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(msg).then(ok, fallback);
    } else { fallback(); }
  }

  document.addEventListener('click', function (e) {
    var add = e.target.closest('[data-add]');
    if (add) { toggle(add.getAttribute('data-add')); return; }
    if (e.target.closest('[data-open-shortlist]')) { openShortlist(); return; }
    if (e.target.closest('[data-close-shortlist]')) { closeShortlist(); return; }
  });
  $('#sl-copy').addEventListener('click', copyMessage);
  $('#sl-clear').addEventListener('click', function () { list = []; syncButtons(); renderDialog(); });

  /* ---------- nav ---------- */
  var nav = $('.nav'), burger = $('.burger');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('lock', open);
  }
  burger.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  $$('.links a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setMenu(false); if (!dlg.hidden) closeShortlist(); } });

  var totop = $('.totop');
  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    nav.classList.toggle('solid', y > 40);
    totop.hidden = y < 900;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  totop.addEventListener('click', function () { window.scrollTo({ top: 0 }); });

  /* ---------- fabric tabs ---------- */
  function initTabs() {
    var tabs = $$('[role=tab]'), panels = $$('[role=tabpanel]');
    function select(i, focus) {
      tabs.forEach(function (t, j) {
        t.setAttribute('aria-selected', j === i ? 'true' : 'false');
        t.tabIndex = j === i ? 0 : -1;
        panels[j].hidden = j !== i;
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); select((i + 1) % tabs.length, true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); select((i + tabs.length - 1) % tabs.length, true); }
      });
    });
    select(0);
  }

  /* ---------- reveal ---------- */
  function initReveal() {
    var items = $$('.reveal');
    if (!('IntersectionObserver' in window)) { items.forEach(function (n) { n.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (n) { io.observe(n); });
  }

  /* ---------- go ---------- */
  renderPackages();
  renderGarments();
  renderStatic();
  fillSlots();
  initTabs();
  syncButtons();
  onScroll();
  initReveal();
})();
