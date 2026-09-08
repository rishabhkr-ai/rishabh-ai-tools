# AI Tools Hub

**Discover the Best AI Tools for Students, Developers & Creators**

AI Tools Hub is a dark, modern, glassmorphism-styled directory of AI tools
built specifically for **B.Tech students, engineering students, programmers,
developers, AI/ML learners and researchers**. It lets people search, filter,
save and jump straight to the official site of the best AI tools available —
organized into a category system built for how students and developers
actually work (study, coding, AI/ML, design, video, audio, writing,
automation, career, and business/marketing).

This is not a static, "finished" list. New AI tools launch every week, so the
project is built around one simple, structured data file that's designed to
keep growing — see [Adding new tools](#adding-new-ai-tools) below.

The site also has real accounts: visitors sign up with their name, Gmail,
date of birth and phone number, verified with a one-time SMS code (OTP) —
powered by Firebase Authentication, so a fresh random code is generated and
sent for every signup/login attempt, and an account is only created once the
correct code is entered. Only the site owner's own account can add new tools
— everyone else gets read-only access to the directory. See
[Firebase setup](#firebase-setup-accounts-otp-login-admin-tools)
below.

---

## Features

- **79 real, verified AI tools** across 10 categories and 60+ subcategories —
  every entry links to the tool's actual official website. No invented tools,
  no invented URLs.
- **Real OTP-based accounts** — visitors sign up with name, Gmail, date of
  birth and phone number; a random one-time code is texted to their phone
  every time, and the account is only created after the correct code is
  entered (Firebase Authentication + Firestore).
- **Admin-only tool management** — only the site owner's account (matched by
  Firebase UID) can add new tools through an in-app "Add a tool" form; every
  other visitor only has read access to the tools list.
- **Powerful search** — matches on tool name, category, subcategory, tags,
  and description, and supports natural multi-word queries like
  *"AI for C++ coding"* or *"free AI for PPT"*.
- **Filters** — by pricing (Free / Freemium / Paid), category, and a "Best
  for" grouping (Students, Developers, Designers, Researchers, Content
  Creators), plus sorting by popularity, newest, or name.
- **Favorites** — save any tool with one tap; stored entirely in the
  browser's `localStorage`, so it works instantly with no sign-in required.
- **Dedicated B.Tech Students page** — tools organized by actual student
  needs (study, coding, maths, research, notes, presentations, assignments,
  placement prep, resume/career), plus an "Essential AI Toolkit" section.
- **Dark / light mode** toggle, persisted across visits.
- **Fully responsive** — mobile, tablet and desktop layouts, with a
  glassmorphism hero, animated gradient mesh background, and a bento-style
  category grid.
- **12 pages**: Home, All Tools, Categories index, single Category page, Tool
  Details, Free Tools, B.Tech Students, Favorites, About, Sign up, Log in,
  Admin "Add tool" (+ a 404 page).

---

## Tech stack

- **React 19** + **React Router 7** (client-side routing)
- **Vite** (build tool / dev server)
- **Tailwind CSS 3** (styled with CSS variables so the whole site re-themes
  by swapping one `.dark` class — see `src/index.css`)
- **Firebase Authentication** (phone number OTP) + **Firestore** (user
  profiles and admin-added tools) — the only backend this project uses, and
  it's on Firebase's free Spark-tier data limits (phone OTP itself requires
  the pay-as-you-go Blaze plan — see the cost note below)
- **lucide-react** for icons
- The curated, verified tool list lives in a plain JS file (`src/data/tools.js`)
  and is merged at runtime with any tools the admin adds through Firestore
  (`src/hooks/useAllTools.js`) — so the seed data never needs touching just to
  grow the directory

Favorites work with zero backend (`localStorage`). Accounts and admin-added
tools require the Firebase project you set up below.

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node.js)

### Installation

```bash
npm install
```

### Connect Firebase (required for signup/login and admin tool management)

The site runs and displays the full tool directory without this step —
accounts, OTP login and the admin "Add tool" form just won't work until it's
done.

```bash
cp .env.example .env
```

Then fill in `.env` with your Firebase project's web app config (see
[Firebase setup](#firebase-setup-accounts-otp-login-admin-tools)
below for exactly where to get these values).

### Run in development

```bash
npm run dev
```

This starts a local dev server (Vite will print the URL, typically
`http://localhost:5173`) with hot module reloading.

### Build for production

```bash
npm run build
```

This outputs a production-ready static build to `dist/`. You can preview that
build locally with:

```bash
npm run preview
```

Because this is a static single-page app, `dist/` can be deployed to any
static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, S3 + CloudFront,
etc.) — just make sure the host is configured to serve `index.html` for
unknown routes (SPA fallback), since the app uses client-side routing. Set
the same environment variables from your `.env` in the host's dashboard too.

### Lint

```bash
npm run lint
```

Runs [oxlint](https://oxc.rs/docs/guide/usage/linter.html) over `src/`.

---

## Firebase setup (accounts, OTP login, admin tools)

This is the one-time setup that turns on real accounts, SMS OTP, and the
admin-only "Add tool" form. Everything else in the site works without it.

### 1. Create a Firebase project

1. Go to https://console.firebase.google.com → **Add project** → give it a
   name (e.g. `ai-tools-hub`).
2. **Build → Authentication → Get started → Sign-in method** → enable
   **Phone**.
3. **Build → Firestore Database → Create database** → start in **production
   mode**.
4. **Project settings (⚙️) → General → Your apps → Add app → Web (`</>`)** →
   copy the `firebaseConfig` values into your `.env` file (see
   `.env.example`).

### 2. Cost note — please read before enabling Phone sign-in

Firebase now requires the **Blaze (pay-as-you-go)** billing plan to send
phone OTPs in production — Google asks for a billing card on file to prevent
SMS abuse, even though actual usage typically stays inside the free monthly
quota for low-traffic sites. You will not be charged unless you exceed that
quota. If you don't want to add a card yet, everything else in the site
(browsing, search, favorites) still works — only signup/login/admin will be
blocked until Phone sign-in is enabled.

### 3. Make yourself the admin (only you can add tools)

1. Run the site, go to `/signup`, and create your own account (real phone
   number, real OTP).
2. In Firebase Console → **Authentication → Users**, copy your account's UID.
3. Paste that UID into `.env` as `VITE_ADMIN_UID`.
4. Open `firestore.rules` and replace `REPLACE_WITH_YOUR_ADMIN_UID` with the
   same UID.
5. Deploy the rules: Firebase Console → **Firestore Database → Rules** → paste
   the contents of `firestore.rules` → **Publish** (or, with the Firebase
   CLI installed: `firebase deploy --only firestore:rules`).
6. Restart the dev server so it picks up the new `VITE_ADMIN_UID`. You'll now
   see an **"Add a tool"** option in your account menu, and `/admin/add-tool`
   will accept new tools from your account only.

### How the OTP flow actually works

- **Sign up** (`/signup`): visitor enters name, Gmail, date of birth and
  phone number → Firebase sends a fresh, random SMS code → the account
  (Firestore `users/{uid}` document) is only created after that exact code
  is confirmed.
- **Log in** (`/login`): returning visitors verify their phone number the
  same way, with a new random code every time — there's no password to
  remember or leak.
- **Data storage**: account data (name, Gmail, date of birth, phone) is
  stored in **your own Firebase project's Firestore database** — not on any
  third-party server, and not accessible to Anthropic or Claude. You are the
  sole owner/operator of that data, and are responsible for it under your own
  privacy policy and applicable law (see the note below).

### ⚠️ Before you launch this publicly

Collecting phone numbers, Gmail addresses and dates of birth from the public
is personal data collection. Before opening this up beyond your own testing,
you're responsible for adding your own privacy policy and terms of service,
and complying with the data protection laws that apply to you (e.g. India's
DPDP Act, GDPR for EU visitors, or others depending on your users). This
project gives you the technical mechanism — it does not include legal
documents, and this is not legal advice.

---

## Project folder structure

```
ai-tools-hub/
├── index.html                 # HTML shell (fonts, meta tags, root div)
├── package.json
├── tailwind.config.js         # Tailwind theme (fonts, gradients, keyframes)
├── postcss.config.js
├── vite.config.js              # Also splits the firebase SDK into its own chunk
├── firestore.rules             # Deploy this: users own their profile; only admin UID writes tools
├── .env.example                # Copy to .env and fill in your Firebase config
├── README.md
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
└── src/
    ├── main.jsx                # App entry point, wraps App in BrowserRouter
    ├── App.jsx                 # Wraps everything in AuthProvider; layout + all routes
    ├── firebase.js              # Firebase app/auth/Firestore init from .env
    ├── index.css                # Theme CSS variables, base styles, utilities
    │
    ├── components/               # Reusable UI building blocks
    │   ├── Navbar.jsx              # Includes real sign-in/account menu + admin link
    │   ├── Footer.jsx
    │   ├── SearchBar.jsx
    │   ├── ToolCard.jsx
    │   ├── CategoryCard.jsx
    │   ├── FilterSidebar.jsx
    │   ├── SectionHeader.jsx
    │   └── Badge.jsx             # PricingBadge, Pill, Tag
    │
    ├── pages/                     # One file per route
    │   ├── Home.jsx
    │   ├── AllTools.jsx
    │   ├── CategoriesIndex.jsx
    │   ├── CategoryPage.jsx
    │   ├── ToolDetails.jsx
    │   ├── FreeTools.jsx
    │   ├── BTechStudents.jsx
    │   ├── Favorites.jsx
    │   ├── About.jsx
    │   ├── Signup.jsx              # Name + Gmail + DOB + phone → SMS OTP → account
    │   ├── Login.jsx                 # Phone → SMS OTP → sign in
    │   ├── AdminAddTool.jsx            # Protected: only your admin UID can submit
    │   └── NotFound.jsx
    │
    ├── data/                       # The verified "seed" database — plain JS
    │   ├── tools.js                 # All 79 verified AI tools (unchanged by admin adds)
    │   ├── categories.js             # Category + subcategory taxonomy
    │   └── TOOL_TEMPLATE.md            # Manual template, for editing the seed file directly
    │
    ├── context/
    │   └── AuthContext.jsx            # Current user, profile, isAdmin — available app-wide
    │
    ├── hooks/
    │   ├── useFavorites.js           # localStorage-backed favorites
    │   ├── useTheme.js                 # dark/light mode, persisted
    │   └── useAllTools.js               # Merges the static list with admin-added Firestore tools live
    │
    └── lib/
        ├── accent.js                   # Category accent color + initials helper
        ├── filterTools.js                # Shared search/filter/sort logic
        └── otpAuth.js                     # sendOtp / verifyOtp / createUserProfile / logout
```

---

## Adding new AI tools

There are now **two ways** to add a tool — use whichever fits:

### Option A — through the site (recommended day-to-day)

Once you've [made yourself the admin](#3-make-yourself-the-admin-only-you-can-add-tools),
log in and open **Account menu → Add a tool** (or go straight to
`/admin/add-tool`). Fill in the form and submit — the tool is saved to your
Firestore `tools` collection and appears across the whole site immediately,
no redeploy needed. Only your admin account can see or use this form; every
other visitor gets a "read only" message if they try to reach that URL.

### Option B — editing the seed file directly

The original curated list is a single array in `src/data/tools.js`. To add a
tool there instead:

1. **Confirm it's real.** Find the tool's own official website yourself.
   Never invent a tool name, description, or URL.
2. **Copy the template** from `src/data/TOOL_TEMPLATE.md` into the `TOOLS`

   array in `src/data/tools.js`:

   ```js
   {
     id: 'kebab-case-unique-id',
     name: 'Tool Name',
     description: 'One or two plain sentences on what it does and who it helps.',
     category: 'study',                 // must match an id in categories.js
     subcategory: 'Notes Generator',    // must match a subcategory label for that category
     tags: ['keyword1', 'keyword2', 'use case phrase'],
     pricing: 'Free',                   // 'Free' | 'Freemium' | 'Paid'
     officialWebsite: 'https://example.com',
     logo: null,                        // or a direct image URL once you have one
     studentRecommended: true,
     featured: false,
     popularity: 50,                     // rough 0–100 estimate
     dateAdded: '2026-09-05',              // today's date — surfaces under "Newest"
     verified: true,
   },
   ```

3. **Pick the right category + subcategory** from `src/data/categories.js`.
   If nothing fits, add a new subcategory string there, or a whole new
   category object (see the same file for the shape).

No other file needs to change — every page (Home, All Tools, Category, Free
Tools, B.Tech Students, Favorites) reads from this same array and
filters/sorts automatically. Full details, including how to queue up
unverified community submissions separately, are in
`src/data/TOOL_TEMPLATE.md`.

---

## Notes on the data

- Every tool in `src/data/tools.js` links to a real, verified official
  website — nothing was invented.
- Tool availability, pricing, and features can and do change over time (this
  is stated as a disclaimer in the site's footer). If you spot a stale link
  or price, update that tool's entry directly.
- "Best for" filtering (Students / Developers / Designers / Researchers /
  Content Creators) is a derived heuristic based on each tool's category and
  `studentRecommended` flag (see `src/lib/filterTools.js`) rather than a
  literal field on every tool — this keeps the data honest instead of
  guessing an audience for tools that could serve several.

---

## License / disclaimer

This directory helps users discover AI tools. Tool availability, pricing and
features may change over time. AI Tools Hub is not affiliated with, and does
not officially endorse, any of the tools listed — always check a tool's own
site for its current terms before signing up.
