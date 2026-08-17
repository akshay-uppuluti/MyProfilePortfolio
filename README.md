# Advanced Portfolio (Standalone HTML/CSS/JS)

A completely standalone, dependency-free advanced portfolio built with plain **HTML, CSS, and JavaScript**
(no framework, no build step, no backend). Lives outside the `MyCareerPortfolio` Razor Pages solution as
requested, in its own folder.

## Highlights

- Vibrant multi-color gradient design system (purple / pink / cyan / amber) with light & dark themes.
- Animated canvas particle-network background that reacts to mouse movement.
- Custom cursor (dot + trailing ring) on desktop.
- Scroll-triggered reveal animations, animated stat counters, typewriter role text.
- Sticky glass-morphism navbar with scroll-spy active states + mobile burger menu.
- Filterable project grid with a detail modal (spring animations).
- Testimonial carousel, timeline experience section, skills grid, certifications & accomplishments.
- Contact form with floating labels, honeypot spam protection, and **zero-dependency mailto: fallback**
  (opens the visitor's own email client, pre-addressed to you — always works, no API keys or activation
  required). Optionally, set `CONTACT_ENDPOINT` in `js/main.js` to any JSON API (e.g. Web3Forms) for a fully
  automatic submit-without-leaving-the-page experience.
- All content is data-driven from `js/data.js` — update your info there without touching markup or logic.

## Folder structure

```
AdvancedPortfolio/
??? index.html
??? css/
?   ??? style.css
??? js/
?   ??? data.js         ? your profile content lives here
?   ??? particles.js     ? background particle animation
?   ??? main.js          ? interactions, rendering, contact form
??? files/
?   ??? Resume.pdf
??? images/
```

## Running locally

No build tools needed. Just serve the folder with any static server, e.g.:

```
cd AdvancedPortfolio
python -m http.server 8080
```

Then open `http://localhost:8080`.

(Opening `index.html` directly via double-click also works for everything except the contact form's
`fetch()` path if you later wire up `CONTACT_ENDPOINT` — the default `mailto:` fallback works either way.)

## Customizing content

Edit `js/data.js` — it exports a single `PROFILE` object with your name, roles, skills, experience,
projects, repositories, certifications, accomplishments, and testimonials. Update the values there and
the page will re-render automatically on reload.

## Enabling automatic (no-mail-client) contact form submissions

By default the form uses `mailto:` (100% reliable, zero setup). If you'd prefer messages to be sent
automatically without opening the visitor's email client:

1. Sign up for a free provider (e.g. [Web3Forms](https://web3forms.com)) and get an access key/endpoint.
2. In `js/main.js`, set:
   ```js
   const CONTACT_ENDPOINT = 'https://api.web3forms.com/submit'; // or your provider's endpoint
   ```
3. Make sure your provider expects `name`, `email`, `subject`, `message` JSON fields (adjust the body in
   `sendViaApi()` if your provider uses different field names, e.g. add `access_key`).
