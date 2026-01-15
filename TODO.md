# BabySees TODO

## Immediate: Book 2 Image Fixes
- [x] Replace Honeycomb → `assets/book2/honeycomb.jpg` (CC BY 3.0, Healthnutlady)
- [x] Replace Ripples → `assets/book2/ripples.jpg` (CC BY 2.0, Sergiu Bacioiu)
- [x] Replace Web → `assets/book2/web.jpg` (CC0, TGoeller)
- [x] Replace Cell → `assets/book2/cell.png` (CC BY 4.0, Howard Vindin)
- [x] Replace Neuron → `assets/book2/neuron.png` (CC BY-SA 4.0, ManuelSchottdorf)

**Options:**
1. Generate with AI (MuleRouter skill) - best for patterns
2. Find better Wikimedia/NASA sources
3. Download locally to avoid URL issues

---

## Book Structure Updates

### Book 1: "What We See" - Needs Review
- [ ] Review current arc (Bright → Cool → Warm)
- [ ] Consider restructuring around a journey (Light → Earth → Life?)
- [ ] Add detailed credits with license property
- [ ] Verify all images load

### Book 3: "What We Dream" - Needs Review
- [ ] Review current arc
- [ ] Consider: Creatures → Architecture → Art → Symbols?
- [ ] Add detailed credits
- [ ] Verify all images load

### Book 4: "What We Feel" - Needs Review
- [ ] Uses AI-generated images (MuleRouter)
- [ ] Check for duplicate images
- [ ] Add detailed credits
- [ ] Verify all images load

---

## Image Acquisition Workflow

See `CLAUDE.md` for full agent instructions.

### Infrastructure (Done)
- [x] `assets/` directory structure created
- [x] `assets/manifest.json` for tracking metadata
- [x] `.gitignore` updated (images local-only, manifest committed)
- [x] `CLAUDE.md` documents the workflow

### Process
1. WebSearch for Wikimedia/NASA/public domain images
2. Use `curl` to fetch page (WebFetch blocked by Wikipedia)
3. Validate license (PD, CC0, CC-BY, CC-BY-SA)
4. Download to `assets/{book}/{word}.jpg`
5. Update `manifest.json` with metadata
6. Fallback: MuleRouter AI generation

### Production Hosting
- [ ] Set up Vercel Blob for image hosting
- [ ] Update HTML to use Blob URLs in production

---

## AI Generation Queue

### Patterns (Book 2)
- [ ] Honeycomb (hexagonal, golden, macro)
- [ ] Ripples (concentric circles, water)
- [ ] Web (spider web with dew, geometric)
- [ ] Tessellation (Islamic/Escher style)

### Microscopy Style (Book 2)
- [ ] Cell (fluorescent, colorful, dramatic)
- [ ] Neuron (glowing dendrites, dark background)

### Abstract Concepts
- [ ] Atom (visualization)
- [ ] Infinity (visual representation)
- [ ] Vortex (stylized spiral)

---

## Technical Improvements

### Review Interface
- [x] Move feedback to side panel
- [x] Add Clear All Feedback button
- [ ] Consider: Auto-clear when page count changes?
- [ ] Consider: Store feedback by word, not index?

### Credits System
- [x] Add license property to pages (Book 2)
- [x] Add getCreditsHTML() function (Book 2)
- [ ] Apply to Books 1, 3, 4

### Image Reliability
- [ ] Download critical images locally
- [ ] Add fallback images for broken URLs
- [ ] Consider: Image proxy service?

---

## Content Strategy Refinements

### What Makes a Good Arc
1. **Intuitive start** - Patterns, familiar shapes
2. **Scale journey** - Small → large OR familiar → exotic
3. **Emotional end** - Wonder, cosmos, infinity

### What Makes a Good Image
- [ ] High contrast (baby vision)
- [ ] Visually striking (adult would frame it)
- [ ] Real/photographic preferred over illustration
- [ ] Accurate to concept (not decorative)

### What Makes a Good Word
- [ ] Phonetically interesting ("Nebula" > "Space")
- [ ] Concept has depth to grow into
- [ ] Not too abstract for visual representation

---

## Done
- [x] Review interface - feedback in side panel
- [x] Clear All Feedback button
- [x] Book 2 arc restructure (Patterns first)
- [x] Book 2 detailed credits
- [x] Session notes updated
- [x] Image acquisition agent workflow (CLAUDE.md)
- [x] Local assets infrastructure (assets/, manifest.json, .gitignore)
