# BabySees Session Notes
**Date:** 2026-01-13

## Project Summary
Picture book for toddlers (2-4) featuring rich, complex imagery with sophisticated vocabulary. "BabySees: A Picture Book for Emerging Brains"

## What Was Accomplished

### 1. Content Strategy
- Created `/strategy/content-strategy.md` with 7 categories, ~55 concepts
- Categories: Cosmos, Nature, Fractals, Mythology, Microscopic, Art, Alchemical

### 2. Image Research (Completed)
Launched 7 "haiku agents" that produced source documentation:
- `/images/cosmos/sources.md` — NASA imagery (excellent, all public domain)
- `/images/nature/sources.md` — USGS, NOAA, Unsplash, Pexels
- `/images/fractals/sources.md` — Wikimedia, Pixabay
- `/images/mythology/sources.md` — Met Museum, Wikimedia (masterworks found)
- `/images/microscopic/sources.md` — NIH, NIAID, CDC, Cell Image Library
- `/images/art/sources.md` — Met Museum, Wikimedia, Unsplash
- `/images/alchemical/sources.md` — Wikimedia (Maier, Khunrath, Fludd, etc.)

### 3. Source Library Research
Searched historical alchemical texts for context:
- Ouroboros: Maier's Atalanta Fugiens (1618)
- Salamander: Khunrath, Paracelsus
- Green Lion: Rosarium Philosophorum
- Macrocosm: Robert Fludd (1,141 pages)
- Rebis, Caduceus: Various sources

### 4. Viewer Prototype
- Built `/viewer/index.html` with:
  - 5 layout options (Bottom Band, Floating, Knockout, Corner, Vertical)
  - 4 font options (Inter, Playfair, Space Grotesk, System)
  - 4 color options (White, Warm, Cool, Gold)
  - Thumbs up/down feedback system
  - Comment field for rejection reasons
  - Export tab with copy-to-clipboard
  - Broken image auto-detection

## What Went Wrong

### Image URL Problem
The sources.md files contain **landing page URLs**, not direct image URLs. Examples:
- Wikimedia: `https://commons.wikimedia.org/wiki/File:X.jpg` (landing page)
- Should be: `https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/X.jpg/800px-X.jpg` (direct)

When I tried to construct URLs, many were wrong because Wikimedia URLs depend on the file's MD5 hash for the path structure.

### Unsplash Fallback Failed
Switched to Unsplash for reliability, but Unsplash images are:
- Tagged by users, not curated for accuracy
- A "nebula" photo might just be stars
- A "fractal" photo might just be abstract art
- Lost the scientific/educational accuracy that makes the book valuable

## Images That Need Generation (from research)
1. **Atom** — Cannot be photographed
2. **DNA** — Existing diagrams lack visual drama
3. **Neuron** — May need simplified version
4. **Infinity** — Abstract concept
5. **Tessellation** — Escher-style (copyrighted originals)
6. **Mandelbrot** — Custom toddler-optimized colors
7. **Vortex** — Stylized version

## Next Session: Recommended Approach

### Option A: Download Images Locally
1. Go through each sources.md file
2. Manually visit each URL and download the image
3. Save to `/images/{category}/` folders
4. Reference local files in viewer
5. This guarantees accuracy and reliability

### Option B: Fix URLs Systematically
1. For each Wikimedia file, fetch the actual page
2. Extract the direct image URL from the page HTML
3. Use WebFetch or a script to automate this
4. Update viewer with verified URLs

### Option C: Build Image Acquisition Tool
1. Create a script that takes a Wikimedia File: URL
2. Scrapes the direct image URL
3. Downloads to local folder
4. Generates the viewer JSON

### Immediate Next Steps
1. Pick 5-10 priority images to verify manually
2. Test that the verified URLs work
3. Build out from there
4. Consider using the MuleRouter skill for generating the 7 images that need AI generation

## File Structure
```
babysees/
├── SESSION_NOTES.md (this file)
├── strategy/
│   └── content-strategy.md
├── images/
│   ├── cosmos/sources.md
│   ├── nature/sources.md
│   ├── fractals/sources.md
│   ├── mythology/sources.md
│   ├── microscopic/sources.md
│   ├── art/sources.md
│   └── alchemical/sources.md
├── viewer/
│   └── index.html
└── content/ (empty, for final book content)
```

## Key Insight
The research phase was successful — the agents found excellent, accurate, public domain imagery. The implementation phase (viewer) failed because of URL format issues. The content is there; it just needs proper URL resolution.
