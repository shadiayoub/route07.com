# Route07 — React Recreation

A responsive React recreation of the [route07.com](https://route07.com) landing page, built with Vite. The design uses a black canvas, warm cream typography, and a purple accent, with custom animations throughout.

The contact form is fully functional and delivers email through [Resend](https://resend.com) via a small Express API — the API key never reaches the browser.

## Features

- Animated hero with rotating **CRYPTO / WEB3 / INFRA** keywords
- Sticky navigation with a full-screen mobile menu
- Platform feature list and SmartInsight / API Access cards
- Auto-scrolling service marquees with hover pause
- Animated network status console
- Interactive customer story slider
- Contact form with loading, success, and error states
- Scroll-reveal animations and reduced-motion support
- Responsive layouts down to 320px wide
- Accessible focus states, labels, and status announcements

## Tech stack

- **React 18** + **Vite 5**
- **Express 4** for the contact API and production server
- **Resend** for transactional email
- Plain CSS with custom properties

## Requirements

- Node.js **20+**
- npm
- A [Resend](https://resend.com) account and a verified sending domain for real email delivery

## Getting started

```bash
npm install
cp .env.example .env
```

Fill in `.env`, then start both the frontend and API:

```bash
npm run dev
```

Vite runs on [http://localhost:5173](http://localhost:5173) and proxies `/api` requests to the Express server on port `8787`.

The contact form is available in the **"Ready to launch?"** section at the bottom of the page.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | Resend API key (a sending-only key is sufficient) |
| `CONTACT_TO_EMAIL` | Yes | Inbox that receives contact form submissions |
| `RESEND_FROM_EMAIL` | Yes | Sender address on a verified Resend domain |
| `RESEND_FROM_NAME` | No | Display name for the sender (default `Route07`) |
| `PORT` | No | API / production server port (default `8787`) |
| `TRUST_PROXY` | No | Number of reverse proxies in front of the app; set to `1` behind nginx/Caddy so rate limiting sees real visitor IPs |

Current configuration sends from `Route07 <website@route07.com>` to `support@route07.com`; replies go directly to the visitor who submitted the form.

> `.env` is git-ignored. Only `.env.example` should be committed. Never expose the API key through a `VITE_`-prefixed variable.

## Contact API

`POST /api/contact`

```json
{
  "email": "visitor@example.com",
  "website": ""
}
```

The endpoint validates the email address, escapes HTML, uses a hidden honeypot field, and limits requests to 5 per IP per 10 minutes. A health check is available at `GET /api/health`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite and the contact API together |
| `npm run dev:web` | Start only Vite |
| `npm run dev:api` | Start only the Express API |
| `npm run build` | Build the production frontend into `dist/` |
| `npm start` | Run the Express server (serves `dist/` and the API) |
| `npm run preview` | Build and then start the production server |

## Deploying to Vercel

The project deploys as a static Vite site plus two serverless functions:

- `api/contact.js` → `POST /api/contact`
- `api/health.js` → `GET /api/health`

Both reuse the shared logic in `server/contact.js`, so the Resend key stays on the server.

**Required step — add environment variables in Vercel.** `.env` is git-ignored and is *not* deployed. In **Project → Settings → Environment Variables**, add these for Production (and Preview):

| Name | Value |
| --- | --- |
| `RESEND_API_KEY` | `re_...` (your Resend sending key) |
| `CONTACT_TO_EMAIL` | `support@route07.com` |
| `RESEND_FROM_EMAIL` | `website@route07.com` |
| `RESEND_FROM_NAME` | `Route07` |

Then **redeploy** (env changes only apply to new deployments).

`vercel.json` sets the Vite framework, `dist` output, and a 15s function timeout. No rewrites are needed: Vercel routes `/api/*` to the functions and everything else to the SPA.

> Without those env vars the form returns `503` with "Email is not configured yet." A missing `/api/contact` route (404) means the `api/` functions were not deployed — check the build logs and redeploy.

## Self-hosted production (Express)

```bash
npm run preview
```

This builds the site and starts Express on `PORT` (default `8787`), serving both the static build and the API from the same origin. For a two-step deployment:

```bash
npm run build
npm start
```

Set the same environment variables on the host. Use HTTPS in production and verify the sending domain in Resend before going live.

## Project structure

```
.
├── api/
│   ├── contact.js            Vercel function → POST /api/contact
│   └── health.js             Vercel function → GET /api/health
├── server/
│   ├── contact.js            Shared validation, rate limiting, Resend send
│   └── index.js              Express server for local/self-hosted use
├── src/
│   ├── App.jsx               Page composition + scroll-reveal observer
│   ├── index.css             All styles, responsive rules, animations
│   ├── main.jsx              React entry point
│   └── components/
│       ├── Icons.jsx         Inline SVG icon set
│       ├── Navbar.jsx        Sticky nav + mobile menu
│       ├── Hero.jsx          Rotating headline, CTAs, stats
│       ├── Ticker.jsx        Scrolling capability strip
│       ├── Features.jsx      Platform list + product cards
│       ├── Services.jsx      Three-row service marquees
│       ├── Infrastructure.jsx Copy + animated network console
│       ├── Testimonials.jsx  Customer story slider
│       ├── CTA.jsx           Contact form → /api/contact
│       └── Footer.jsx        Links, socials, legal row
├── public/
│   ├── logo.png              Route07 logo
│   └── parallax.jpg          Hero background texture
├── .env.example              Environment variable template
├── .vercelignore             Keeps .env and build output out of CLI uploads
├── index.html                HTML shell + fonts
├── vercel.json               Vercel build/output/function config
├── vite.config.js            Vite config with /api proxy
└── package.json
```

## Notes

- Font: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts.
- Palette: `#000000` background, `#DDDACD` / `#F0EDE4` headings, `#8777E0` accent.
- Marketing copy, logo, and imagery originate from [route07.com](https://route07.com). This is an unofficial recreation for demonstration purposes.
