#!/bin/bash
# Generate all Book 4 images using MuleRouter

cd /Users/dereklomas/.claude/plugins/cache/mulerouter-skills/mulerouter-skills/1.0.0/skills/mulerouter-skills
export MULEROUTER_SITE="mulerouter"
export MULEROUTER_API_KEY="sk-mr-f004a790130bf2dc378f9df5309d53be0fd6ed27754bece454206c295ec112b5"

OUTPUT_DIR="/Users/dereklomas/babysees/book4-images"
mkdir -p "$OUTPUT_DIR"

generate_image() {
  local name="$1"
  local prompt="$2"
  echo "=== Generating: $name ==="
  result=$(uv run python models/alibaba/wan2.5-t2i-preview/generation.py --prompt "$prompt" --size "1024*1024" --n 1 2>&1)
  url=$(echo "$result" | grep -o 'https://[^ ]*\.png' | head -1)
  if [ -n "$url" ]; then
    echo "$name: $url" >> "$OUTPUT_DIR/urls.txt"
    echo "Success: $url"
  else
    echo "Failed: $name"
    echo "$result"
  fi
  echo ""
}

# Clear previous URLs
> "$OUTPUT_DIR/urls.txt"

generate_image "love" "A mother gently cradling a baby in soft warm golden light, tender loving moment, soft focus, painterly illustration style, high contrast, simple composition, warm colors, cozy intimate feeling, no text"

generate_image "wonder" "A child looking up with wide eyes full of wonder, soft glowing light illuminating their face from above, magical discovery moment, warm colors, high contrast, painterly illustration style, no text"

generate_image "science" "Colorful bubbling test tubes and beakers in a magical science laboratory, bright glowing liquids in blue green purple and orange, steam rising, high contrast playful scientific equipment, illustration style, no text"

generate_image "magic" "Magical sparkles and stars swirling around open hands, mystical purple and gold colors, enchanting glow, fantasy magic spell being cast, high contrast, dreamy atmosphere, illustration style, no text"

generate_image "dream" "Soft fluffy clouds forming into whimsical fantasy shapes in a dreamy pastel sky, ethereal and peaceful, floating dream imagery, soft pinks purples and blues, high contrast, illustration style, no text"

generate_image "joy" "Bright sunburst of joyful colors radiating outward, celebration confetti and sparkles, pure happiness and delight, vibrant warm yellows oranges and pinks, high contrast, energetic composition, illustration style, no text"

generate_image "curiosity" "A glowing magnifying glass revealing hidden wonders and secrets, bright moment of discovery, colorful sparkles and light through the lens, curiosity and exploration, high contrast, magical discovery composition, illustration style, no text"

generate_image "warmth" "Cozy glowing fireplace with warm amber light filling a comfortable room, soft gentle warmth radiating, comfort and safety, warm orange and golden tones, high contrast, intimate cozy feeling, illustration style, no text"

generate_image "music" "Colorful flowing sound waves emanating from a musical instrument, rhythmic visual patterns in vibrant blues purples and golds, musical energy and harmony, high contrast, dynamic flowing composition, illustration style, no text"

generate_image "dance" "Graceful flowing fabric and swirling movement in a dance, colorful ribbons of motion in pinks purples and golds, elegant and energetic, high contrast, dynamic flowing composition, illustration style, no text"

generate_image "story" "An open magical book with colorful images and light floating out of its pages, storytelling wonder and imagination, warm glowing atmosphere, high contrast, enchanting composition, illustration style, no text"

generate_image "home" "Warm cozy home interior with soft golden light streaming through a window, comfort safety and belonging, inviting peaceful atmosphere, warm amber and cream tones, high contrast, intimate composition, illustration style, no text"

generate_image "family" "Silhouettes of a family together holding hands against a warm sunset sky, togetherness and connection, warm orange pink and purple sunset colors, high contrast, heartwarming composition, illustration style, no text"

generate_image "laughter" "Bright burst of playful joyful colors and bubbles floating upward, pure laughter and delight, sparkles and light, vibrant happy energy, high contrast, cheerful composition, illustration style, no text"

generate_image "peace" "Calm still water with perfect mirror reflection of a soft pastel sky, serene tranquility and peace, gentle soft blues pinks and lavenders, high contrast, meditative peaceful composition, illustration style, no text"

generate_image "hope" "Beautiful golden dawn breaking over a dark horizon, rays of light emerging into a new day, hope and new beginnings, warm golden orange and soft blue sky, high contrast, inspirational composition, illustration style, no text"

echo "=== All images generated! ==="
echo "URLs saved to: $OUTPUT_DIR/urls.txt"
cat "$OUTPUT_DIR/urls.txt"
