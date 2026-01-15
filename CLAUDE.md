# BabySees - Claude Agent Instructions

## Project Overview

Visual vocabulary picture book for toddlers featuring high-contrast imagery. 4 books, ~20 pages each, deployed on Vercel.

## Image Acquisition Workflow

When asked to acquire/find/replace images for BabySees:

### 1. Search for Images

Use WebSearch to find candidates:
```
{word} site:commons.wikimedia.org public domain OR CC0
```

Category-specific queries:
- **Cosmos**: `{word} site:nasa.gov OR site:esahubble.org`
- **Microscopic**: `{word} microscopy site:commons.wikimedia.org OR site:flickr.com/photos/niaid`
- **Nature**: `{word} site:commons.wikimedia.org macro photo`

### 2. Fetch Page Details

**IMPORTANT**: WebFetch returns 403 for Wikipedia/Wikimedia. Use curl instead:

```bash
# Get image URLs from Wikimedia Commons page
curl -s "https://commons.wikimedia.org/wiki/File:Example.JPG" | grep -oi 'upload\.wikimedia\.org[^"]*\.\(jpg\|JPG\|png\|PNG\)' | head -5

# Extract license info (look for CC BY, CC0, Public Domain)
curl -s "https://commons.wikimedia.org/wiki/File:Example.JPG" | grep -i "licensetpl"
```

### 3. Validate License

**Acceptable (in priority order):**
1. Public Domain (NASA, US Gov, PD-old)
2. CC0 (no restrictions)
3. Unsplash License
4. CC BY (attribution only)
5. CC BY-SA (share-alike ok)

**Reject:**
- CC BY-NC (non-commercial)
- CC BY-ND (no derivatives)
- All Rights Reserved
- Unknown/unclear

### 4. Download Image

```bash
curl -L -o assets/{book}/{word}.jpg "{thumbnail_url}"
```

Target 800px width. Wikimedia thumbnail pattern:
```
https://upload.wikimedia.org/wikipedia/commons/thumb/{hash}/{filename}/800px-{filename}
```

### 5. Update Manifest

Add entry to `assets/manifest.json`:
```json
{
  "book2/honeycomb": {
    "localPath": "assets/book2/honeycomb.jpg",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:...",
    "thumbnailUrl": "https://upload.wikimedia.org/.../800px-...",
    "license": {
      "type": "CC BY 3.0",
      "attribution": "Author / Wikimedia Commons",
      "attributionRequired": true,
      "url": "https://creativecommons.org/licenses/by/3.0"
    },
    "source": "wikimedia",
    "downloaded": "YYYY-MM-DD"
  }
}
```

### 6. Fallback: AI Generation

When no good public domain image exists, use MuleRouter:
```
Skill: mulerouter-skills
Generate: {descriptive prompt for the concept}
```

Download immediately - URLs are ephemeral:
```bash
curl -L -o assets/{book}/{word}.png "{mulerouter_url}"
```

Mark as AI-generated in manifest:
```json
{
  "source": "ai-generated",
  "generator": {
    "model": "wan2.5",
    "prompt": "..."
  }
}
```

## Directory Structure

```
assets/
├── book1/
│   └── {word}.jpg
├── book2/
├── book3/
├── book4/
└── manifest.json    # Committed to git

# Images themselves are gitignored (hosted on Vercel Blob in production)
```

## Data Format

Pages defined in each `book*.html`:
```javascript
const pages = [
  {
    word: "Honeycomb",
    image: "assets/book2/honeycomb.jpg",  // Local path
    category: "Patterns",
    license: "Healthnutlady / Wikimedia Commons, CC BY 3.0"
  }
]
```

## Source Documentation

Curated image suggestions (not actual files) in:
- `images/cosmos/sources.md`
- `images/nature/sources.md`
- `images/microscopic/sources.md`
- etc.

Check these before searching - may have pre-vetted URLs.
