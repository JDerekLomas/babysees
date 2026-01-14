# BabySees TODO

## Immediate: Book 2 Image Fixes
- [ ] Replace Honeycomb (current Unsplash not ideal)
- [ ] Replace Ripples (current Unsplash not ideal)
- [ ] Replace Web (current Unsplash not ideal)
- [ ] Replace Cell (need dramatic fluorescent microscopy)
- [ ] Replace Neuron (need real neuron, not diagram)

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

### Current Process (Manual)
1. Find image on Wikimedia/NASA/etc
2. Copy direct thumbnail URL (800px)
3. Add to pages array with license info
4. Test in browser
5. If broken, try Unsplash or generate

### Ideal Process (To Build)
1. Curate concept list per book
2. For each concept:
   - Search sources (NASA, Wikimedia, NIH)
   - If no good match → generate with AI
3. Download all images locally
4. Reference local paths (no external URL breakage)
5. Auto-generate credits from metadata

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
