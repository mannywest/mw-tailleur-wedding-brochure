/*
 * MW TAILLEUR – CENTRAL CONFIGURATION
 * ------------------------------------------------------------
 * Every price, inclusion, term and enquiry setting lives here.
 * Edit this file and refresh the page; no other file needs touching.
 *
 * amount : number in GBP, or null if the price is NOT approved.
 *          A null amount shows "Price confirmed at consultation".
 * from   : true shows the word "From" before the price.
 * perPerson : true shows "per person" after the price.
 * status : "approved" or "unconfirmed" (internal flag only).
 */
window.MW_CONFIG = {

  /* ---------- ENQUIRY CONTACT ----------
   * whatsapp : digits only, with country code, e.g. "447700900123"
   * email    : e.g. "hello@example.com"
   * Blank either one and its button disappears.
   * The shortlist always lets clients copy a ready-written enquiry.
   */
  contact: {
    whatsapp: "447401885154",
    email: "emmanuel@madewestern.com"
  },

  /* ---------- PROCESS ---------- */
  consultation: {
    remote: "Complimentary",
    inPerson: "£50 per session"          // CONFIRM: original brochure said a two-hour appointment
  },
  leadTime: "Typically 4–6 weeks (provisional)",   // CONFIRM against current production schedule

  /* ---------- PACKAGES ---------- */
  packages: [

    /* Plain Wool */
    { id: "plain-2", family: "plain", tag: "Two-Piece", name: "Two-Piece Groom Package",
      amount: 995, status: "approved",
      includes: ["Bespoke blazer", "Matching trousers", "Personalised shirt", "Bow tie", "Complimentary alterations"] },
    { id: "plain-3", family: "plain", tag: "Three-Piece", name: "Three-Piece Groom Package",
      amount: 1150, status: "approved",
      includes: ["Bespoke blazer", "Matching trousers", "Matching waistcoat", "Personalised shirt", "Bow tie", "Complimentary alterations"] },

    /* Premium & Jacquard */
    { id: "premium-2", family: "premium", tag: "Two-Piece", name: "Two-Piece Premium Package",
      amount: 1195, status: "approved",           // REVIEW: £25 above listed components (£750 + £300 + £120 = £1,170)
      includes: ["Bespoke blazer in selected Premium/Jacquard fabric", "Matching trousers", "Personalised shirt", "Bow tie", "Complimentary alterations"] },
    { id: "premium-3", family: "premium", tag: "Three-Piece", name: "Three-Piece Premium Package",
      amount: 1350, status: "approved",
      includes: ["Bespoke blazer in selected Premium/Jacquard fabric", "Matching trousers", "Matching waistcoat", "Personalised shirt", "Bow tie", "Complimentary alterations"] },

    /* Italian Luxury */
    { id: "italian-2", family: "italian", tag: "Two-Piece", name: "Two-Piece Italian Luxury Package",
      amount: 1595, from: true, status: "approved",
      includes: ["Bespoke blazer in selected luxury fabric", "Matching trousers", "Personalised shirt", "Bow tie", "Complimentary alterations"] },
    { id: "italian-3", family: "italian", tag: "Three-Piece", name: "Three-Piece Italian Luxury Package",
      amount: 1795, from: true, status: "approved",
      includes: ["Bespoke blazer in selected luxury fabric", "Matching trousers", "Matching waistcoat", "Personalised shirt", "Bow tie", "Complimentary alterations"] },

    /* Ceremony to Reception – PRICES NOT APPROVED.
     * amount stays null so nothing is published to clients.
     * To publish, set amount (and from: true if required) and status: "approved".
     * proposed / alternative are internal notes only and are never displayed. */
    { id: "c2r-plain", family: "c2r", tag: "Plain Fabric", name: "Ceremony to Reception – Plain Fabric",
      amount: null, status: "unconfirmed",
      proposed: { amount: 1495, from: true }, alternative: { amount: 1595 },
      includes: ["Two bespoke blazers", "One pair of trousers", "One personalised shirt", "One bow tie", "Choice of an additional pair of trousers or a waistcoat", "Complimentary alterations"] },
    { id: "c2r-premium", family: "c2r", tag: "Premium Fabric", name: "Ceremony to Reception – Premium Fabric",
      amount: null, status: "unconfirmed",
      proposed: { amount: 1695, from: true }, alternative: { amount: 1795 },
      includes: ["Two bespoke blazers", "One pair of trousers", "One personalised shirt", "One bow tie", "Choice of an additional pair of trousers or a waistcoat", "Complimentary alterations"] },

    /* Groomsmen (solid fabric) */
    { id: "groomsmen-2", family: "groomsmen", tag: "Two-Piece", name: "Groomsmen Two-Piece Package",
      amount: 450, perPerson: true, status: "approved",
      includes: ["Blazer", "Matching trousers", "Personalised shirt", "Bow tie", "Complimentary alterations"] },
    { id: "groomsmen-3", family: "groomsmen", tag: "Three-Piece", name: "Groomsmen Three-Piece Package",
      amount: 500, perPerson: true, status: "approved",
      includes: ["Blazer", "Matching trousers", "Waistcoat", "Personalised shirt", "Bow tie", "Complimentary alterations"] },

    /* Father & Son */
    { id: "fathers-2", family: "fathers", tag: "Two-Piece", name: "Father & Son Two-Piece Package",
      amount: 1595, status: "approved",
      includes: ["Two bespoke blazers", "Two pairs of trousers", "Two personalised shirts", "Two bow ties", "Complimentary alterations"] },
    { id: "fathers-3", family: "fathers", tag: "Three-Piece", name: "Father & Son Three-Piece Package",
      amount: 1795, status: "approved",
      includes: ["Two bespoke blazers", "Two pairs of trousers", "Two waistcoats", "Two personalised shirts", "Two bow ties", "Complimentary alterations"] }
  ],

  /* ---------- INDIVIDUAL GARMENTS (proposed retail – CONFIRM before publishing) ---------- */
  garments: {
    rows: [
      { id: "jacket", label: "Jacket / Blazer" },
      { id: "trousers", label: "Trousers" },
      { id: "waistcoat", label: "Waistcoat" },
      { id: "shirt", label: "Shirt" }
    ],
    tiers: [
      { id: "plain", name: "Plain Wool",
        items: { jacket: { amount: 650 }, trousers: { amount: 250 }, waistcoat: { amount: 220 }, shirt: { amount: 120 } } },
      { id: "premium", name: "Premium & Jacquard",
        items: { jacket: { amount: 750 }, trousers: { amount: 300 }, waistcoat: { amount: 260 }, shirt: { amount: 120 } } },
      { id: "italian", name: "Italian Luxury",
        items: { jacket: { amount: 950, from: true }, trousers: { amount: 400, from: true }, waistcoat: { amount: 320, from: true }, shirt: { amount: 150 } } }
    ]
  },

  /* ---------- FABRIC HOUSES (examples, subject to current supplier availability) ---------- */
  mills: ["Loro Piana", "Scabal", "Vitale Barberis Canonico", "Drago", "Zegna", "Holland & Sherry",
          "Huddersfield", "Caccioppoli", "Marzoni", "Dino", "Barrington"],

  /* ---------- TERMS (from previous brochure – CONFIRM before publishing) ---------- */
  terms: [
    "Complimentary alterations cover circumference adjustments.",
    "Length alterations are not included in the complimentary alterations.",
    "Additional charges may apply for measurements exceeding 48 inches.",
    "Additional charges may apply for clients over 6 feet 3 inches.",
    "Orders commence once payment has been received.",
    "Priority orders may attract additional charges."
  ],

  /* ---------- PHOTOGRAPHY ----------
   * Leave src as "" and that slot is simply left out of the page.
   * To use a photo: put the file in assets/images/ and set src, e.g.
   *   src: "assets/images/hero-groom-black-tuxedo.jpg"
   * and write a meaningful alt description.
   * Optional: srcset: "assets/images/hero-800.jpg 800w, assets/images/hero-1600.jpg 1600w"
   */
  images: {
    "hero":          { src: "", alt: "Groom in a black tuxedo with bow tie" },
    "philosophy-1":  { src: "", alt: "Close-up of a hand-finished lapel" },
    "philosophy-2":  { src: "", alt: "Tailor taking measurements for a wedding suit" },
    "plain":         { src: "", alt: "Groom in a navy plain wool wedding suit" },
    "premium":       { src: "", alt: "Groom in a textured jacquard three-piece suit" },
    "italian":       { src: "", alt: "Groom in a premium Italian fabric three-piece suit" },
    "swatch-charcoal": { src: "", alt: "Charcoal luxury wool fabric" },
    "swatch-navy":   { src: "", alt: "Navy luxury wool fabric" },
    "swatch-brown":  { src: "", alt: "Brown luxury wool fabric" },
    "ceremony-1":    { src: "", alt: "Groom in a classic ceremony suit" },
    "ceremony-2":    { src: "", alt: "The same groom in a distinctive reception jacket" },
    "groomsmen":     { src: "", alt: "Groom and groomsmen in coordinated suits" },
    "fathers":       { src: "", alt: "Father and son in coordinated wedding attire" },
    "garments":      { src: "", alt: "Jacket, trousers, waistcoat and shirt laid out together" },
    "fabric-plain":  { src: "", alt: "Close-up of plain wool fabric" },
    "fabric-premium":{ src: "", alt: "Close-up of jacquard fabric" },
    "fabric-italian":{ src: "", alt: "Close-up of Italian luxury fabric" },
    "craft-1":       { src: "", alt: "Hand finishing on a suit jacket" },
    "craft-2":       { src: "", alt: "Buttons and buttonholes on a wedding jacket" }
  }
};
