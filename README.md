# portfolio

An interactive, walkable CV for Joanna Staszków, PhD: scroll (or swipe) and a
little pixel-art farmer walks through her career, season by season.

Live at: https://podrozniasia.github.io/portfolio/

## How it works

- **React + Vite.** No game engine and no image files: every sprite is drawn in
  code (`src/art/`) on a tiny canvas and scaled up.
- **Scroll drives the world.** The page is a tall empty strip; the scroll
  position is mapped to the character's position (`src/App.jsx`).
- **All content is in one file.** The CV text and the position of every
  building, sign and collectible live in `src/data/story.js`.

## Editing the content

Open `src/data/story.js`:

- `EXPERIENCE`, `EDUCATION`, `PUBLICATIONS`, `SKILLS`, `LANGUAGES` hold the CV.
- `STATIONS` says where each card appears along the walk.
- `OBJECTS`, `SIGNS` and `ITEMS` place scenery, signposts and collectibles.

## Running locally

```bash
npm install
npm run dev
```

## Deployment

Every push to `main` builds the site and deploys it to GitHub Pages through
`.github/workflows/deploy.yml`.
