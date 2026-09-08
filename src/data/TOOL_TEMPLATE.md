# Adding a new AI tool to AI Tools Hub

This directory is built to grow. New AI tools launch every week — here's the
process for adding one safely and consistently.

## 1. Confirm it's real

- Find the tool's **official website** yourself (not a third-party listicle).
- Never invent a tool name, description, or URL. If you're not sure a tool
  is real or the link is official, leave it out until you can confirm it.

## 2. Copy this template into `tools.js`

```js
{
  id: 'kebab-case-unique-id',           // must not already exist in TOOLS
  name: 'Tool Name',
  description: 'One or two plain sentences on what it does and who it helps.',
  category: 'study',                    // must match an id in categories.js
  subcategory: 'Notes Generator',       // must match a subcategory label for that category
  tags: ['keyword1', 'keyword2', 'use case phrase'],
  pricing: 'Free',                      // 'Free' | 'Freemium' | 'Paid'
  officialWebsite: 'https://example.com',
  logo: null,                           // or a direct image URL once you have one
  studentRecommended: true,             // true if genuinely useful for B.Tech/engineering students
  featured: false,                      // true only for a small, curated set per category
  popularity: 50,                       // rough 0–100 estimate, refine over time
  dateAdded: '2026-09-05',              // today's date, so it surfaces under "Newest"
  verified: true,                       // false only for community-submitted, unverified entries
},
```

## 3. Pick the right category + subcategory

Open `categories.js` and match `category` to one of the top-level `id`s
(`study`, `coding`, `ai-ml`, `image-design`, `video`, `audio-voice`,
`writing`, `automation`, `career`, `business-marketing`). `subcategory` must
be one of the strings inside that category's `subcategories` array. If none
fit, add a new subcategory string there first.

## 4. Adding a whole new category

Append a new object to the `CATEGORIES` array in `categories.js` with a
unique `id`, `name`, `emoji`, `accent` (one of `violet`, `cyan`, `mint`,
`amber`, `rose`), a one-line `description`, and a `subcategories` array.

## 5. That's it

No other file needs to change — every page (Home, All Tools, Category,
Free Tools, B.Tech Students, Favorites) reads from this same array and
filters/sorts automatically.

### Unverified / community submissions

If you're queuing up tools submitted by users that you haven't personally
verified yet, set `verified: false` and keep them in a separate array
(e.g. `pendingTools.js`) rather than merging into `TOOLS` directly, so the
site only ever displays confirmed, real tools.
