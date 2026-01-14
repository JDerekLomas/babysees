// Script to fix broken Wikimedia URLs by querying the API for correct paths

const brokenImages = [
  { word: "Lightning", category: "Nature", filename: null, search: "lightning storm nature" },
  { word: "Dragon", category: "Mythology", filename: "Paolo_Uccello_047b.jpg", search: "dragon medieval painting" },
  { word: "Phoenix", category: "Mythology", filename: "Phoenix_detail_from_Aberdeen_Bestiary.jpg" },
  { word: "Unicorn", category: "Mythology", filename: "The_Hunt_of_the_Unicorn_Tapestry_7.jpg" },
  { word: "Griffin", category: "Mythology", filename: "Adriaen_Collaert_-_Griffin.jpg" },
  { word: "Chimera", category: "Mythology", filename: "Chimera_d%27arezzo%2C_fi%2C_04.JPG" },
  { word: "Pegasus", category: "Mythology", filename: "Odilon_Redon_-_Pegasus.jpg" },
  { word: "Leviathan", category: "Mythology", filename: "Destruction_of_Leviathan.png" },
  { word: "Snowflake", category: "Microscopic", filename: "SnowflakesWilsonBentley.jpg" },
  { word: "Virus", category: "Microscopic", filename: "Phage.jpg" },
  { word: "Bacteria", category: "Microscopic", filename: "EscherichiaColi_NIAID.jpg" },
  { word: "Mosaic", category: "Art", filename: "Ravenna_BW_4.JPG" },
  { word: "Stained Glass", category: "Art", filename: null, search: "stained glass cathedral" },
  { word: "Sculpture", category: "Art", filename: "%27David%27_by_Michelangelo_Fir_JBU005.jpg" },
  { word: "Tapestry", category: "Art", filename: "Bayeux_Tapestry_scene57_Harold_death.jpg" },
  { word: "Alchemy", category: "Alchemical", filename: "Amphitheatrum_sapientiae_aeternae_-_Alchemist%27s_Laboratory.jpg" },
  { word: "Macrocosm", category: "Alchemical", filename: "RobertFludd-Utriusque_Cosmi.jpg" },
  { word: "Rebis", category: "Alchemical", filename: "Rebis.png" },
  { word: "Labyrinth", category: "Alchemical", filename: "Fotothek_df_tg_0006090_Architektur_%5E_Labyrinth.jpg" },
];

async function getUrlFromFilename(filename) {
  const decoded = decodeURIComponent(filename);
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(decoded)}&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query?.pages;
    if (!pages) return null;

    const page = Object.values(pages)[0];
    if (page.pageid === -1 || !page.imageinfo) return null;

    return {
      thumburl: page.imageinfo[0].thumburl,
      fullurl: page.imageinfo[0].url,
      title: page.title
    };
  } catch (e) {
    console.error(`Error fetching ${filename}:`, e.message);
    return null;
  }
}

async function searchForImage(query, limit = 3) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=${limit}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800&format=json`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query?.pages;
    if (!pages) return [];

    return Object.values(pages).map(p => ({
      title: p.title,
      thumburl: p.imageinfo?.[0]?.thumburl,
      license: p.imageinfo?.[0]?.extmetadata?.LicenseShortName?.value
    })).filter(p => p.thumburl);
  } catch (e) {
    console.error(`Error searching ${query}:`, e.message);
    return [];
  }
}

async function main() {
  console.log("=== FIXING BROKEN WIKIMEDIA URLS ===\n");

  const results = [];

  for (const img of brokenImages) {
    console.log(`Processing: ${img.word} (${img.category})`);

    let result = { word: img.word, category: img.category, status: "failed" };

    // Try to get URL from filename first
    if (img.filename) {
      const urlData = await getUrlFromFilename(img.filename);
      if (urlData) {
        result = {
          ...result,
          status: "fixed",
          url: urlData.thumburl,
          source: "filename_lookup"
        };
        console.log(`  ✓ Fixed: ${urlData.thumburl.substring(0, 80)}...`);
      } else {
        console.log(`  ✗ Filename not found, searching...`);
      }
    }

    // If no filename or lookup failed, search
    if (result.status === "failed" && img.search) {
      const searchResults = await searchForImage(img.search);
      if (searchResults.length > 0) {
        result = {
          ...result,
          status: "search_result",
          url: searchResults[0].thumburl,
          alternatives: searchResults.slice(1),
          source: "search"
        };
        console.log(`  ~ Found via search: ${searchResults[0].title}`);
      } else {
        console.log(`  ✗ No search results`);
      }
    }

    results.push(result);

    // Rate limiting
    await new Promise(r => setTimeout(r, 200));
  }

  console.log("\n=== RESULTS ===\n");

  const fixed = results.filter(r => r.status === "fixed");
  const searched = results.filter(r => r.status === "search_result");
  const failed = results.filter(r => r.status === "failed");

  console.log(`Fixed via filename: ${fixed.length}`);
  console.log(`Found via search: ${searched.length}`);
  console.log(`Failed: ${failed.length}`);

  console.log("\n=== UPDATED URLS FOR VIEWER ===\n");

  for (const r of results) {
    if (r.url) {
      console.log(`{ word: "${r.word}", image: "${r.url}", category: "${r.category}" },`);
    } else {
      console.log(`// NEEDS MANUAL: ${r.word} (${r.category})`);
    }
  }

  // Output JSON for easy use
  const outputPath = '/Users/dereklomas/babysees/scripts/fixed-urls.json';
  const fs = await import('fs');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\nFull results saved to: ${outputPath}`);
}

main();
