# MW Tailleur Wedding Brochure

A single-page interactive wedding brochure. Plain HTML, CSS and JavaScript, no build step.

## Run it locally

Open `index.html` in a browser. Or, from this folder:

    python3 -m http.server 8000

then visit http://localhost:8000.

## Update prices, inclusions, terms

Everything lives in `js/pricing.js`. Edit it, save, refresh. Nothing else needs to change.

- **Prices:** change `amount`. `from: true` shows "From". `perPerson: true` shows "per person".
- **Inclusions:** edit the `includes` list on each package.
- **Garments, fabric houses, terms, lead time, consultation fees:** same file.
- **An unapproved price:** leave `amount: null`. The page then reads "Price confirmed at consultation".

## Enquiries

Clients tap "Add to shortlist" on any packages. A bar appears at the bottom of the screen; the shortlist panel then offers:

- **Send on WhatsApp:** opens WhatsApp to your number with the selected packages already written in.
- **Send by email:** opens the email app addressed to you with the same message.
- **Copy message:** copies the text.

Your WhatsApp number and email are set in `contact` in `js/pricing.js`. WhatsApp is digits only with the country code and no plus sign (currently 447401885154). Clear either field and its button disappears. Both are visible to anyone who views the page.

## Add photography

The brochure currently has no photographs, and an empty image slot is left out of the page entirely, so the layout simply closes up around the text. To add a photo, put the file in `assets/images/`, then set its `src` and `alt` in the `images` section of `js/pricing.js`. File names and shapes are listed in `assets/images/README.txt`. Add them one at a time; each photo appears in its place automatically.

## Host it online

Upload the whole folder to any static host:

- **Netlify:** drag the folder onto app.netlify.com/drop. You get a URL immediately and can attach your own domain.
- **Cloudflare Pages** or **GitHub Pages:** create a project from this folder and publish.
- **Any web hosting:** upload the folder contents so `index.html` is in the site root.

## Outstanding decisions before going live

1. **Ceremony to Reception prices.** Not approved, so none are shown. Choose between From £1,495 / £1,695 and the later suggestion of £1,595 / £1,795, then set `amount` and `from` and `status: "approved"` in `pricing.js`.
2. **Premium two-piece (£1,195).** £25 above its listed components (£750 + £300 + £120 = £1,170). Neither figure has been changed. Decide whether to adjust.
3. **Individual garment prices.** These are proposed retail prices and need confirming.
4. **Terms.** The six conditions are carried over from the previous brochure and need reviewing.
5. **In-person consultation.** Shown as £50 per session. The old brochure said two hours; confirm whether that still applies.
6. **Lead time.** Shown as "4–6 weeks (provisional)". Confirm against the current schedule.
7. **Enquiry contact details.** Set to 447401885154 and emmanuel@madewestern.com; confirm these are the details clients should use.
8. **Photography.** All nineteen image slots; see `assets/images/README.txt`.
9. **Fabric houses.** The eleven names are shown as examples subject to availability. Confirm you are happy to name each one.
