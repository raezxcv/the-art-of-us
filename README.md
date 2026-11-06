# The Art of Us — A Digital Scrapbook for Two
> **Project 08 of The 20-Day Digital Design Challenge**  
> *An intimate, handcrafted digital keepsake preserving Polaroids, ticket stubs, handwritten notes, and everyday memories between two people.*

---

## Concept & Visual Identity

*The Art of Us* is designed as an intimate, physical keepsake preserving the lived texture of four years shared between two creative partners (Julian & Maya, 2022–2026). It deliberately rejects the vanity metrics, uniform card grids, and glossy minimalism of modern social feeds.

Instead, it feels like opening a cherished, cloth-and-leather-bound album found on a bedside table:
- **Warm Nostalgic Palette:** Peach (`#FDE4D0`), Archival Cherry Red (`#C0392B`), Butter Yellow (`#FEF3C7`), Cream Parchment (`#FAF7F2`), and Warm Espresso Brown (`#2C1E14`).
- **Tactile Typography:** Editorial serifs ([Playfair Display](https://fonts.google.com/specimen/Playfair+Display) & [Fraunces](https://fonts.google.com/specimen/Fraunces)), casual handwriting marginalia ([Caveat](https://fonts.google.com/specimen/Caveat) & [Patrick Hand](https://fonts.google.com/specimen/Patrick+Hand)), and crisp sans-serif metadata ([Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)).
- **Physical Ephemera:** Washi tape strips (dots, stripes, grid), brass photo corners, serrated postage stamps, hole-punched ticket stubs, and interactive 3D flip-card Polaroids that turn over to reveal secret handwritten notes.

---

## Key Features

1. **The Interactive Album Cover (`/` or `/#cover`):**
   - Cloth/leather-bound album cover with embossed gold-foil lettering, stitched spine, brass corner brackets, and wax seal button.
   - Archive statistics: 13 recorded moments, 6 starred keepsakes, 1,480 miles driven, 4 seasons passed.
   - Featured Polaroid held with photo mounting corners.
   - "Open Scrapbook" latch animation with tactile paper rustle.

2. **The Chronology Timeline (`/#timeline`):**
   - Multi-column scrapbook trail with organic imperfect tilts (-2.5° to +2.5°).
   - Filter by categories: *All Pages*, *★ Starred*, *Road Trips*, *Quiet Days*, *Milestones*, *Diners & Feasts*, *Adventures*.
   - Filter by year (*2022*, *2023*, *2024*, *2025*).
   - Real-time search across titles, handwritten notes, locations, and journal prose.

3. **Memory Detail Spread (`/#detail/:id`):**
   - Two-page spread on aged parchment with ruled lines.
   - Large interactive Polaroid with 3D flip-card mechanic (flip to read secret handwritten note on the back).
   - Full journal story with illuminated initial drop cap.
   - Pinned physical ephemera (diner bill receipts, national park passes, ferry tickets, pressed daisies).
   - Previous / Next scrapbook page turns, Star/Favorite toggle, and Edit/Delete controls.
   - Related memories strip from the same season/year at the bottom margin.

4. **Add / Edit Memory Workshop (`/#add`):**
   - Crafting table workspace with live interactive Polaroid preview.
   - Choose from 13 custom-generated 35mm film rolls or upload custom photos (FileReader data URL).
   - Washi tape color picker and position selector.
   - Pinned keepsake attachment generator.
   - Local persistence to `localStorage` with celebratory confetti.

5. **The Keepsake Box Drawer:**
   - Slide-out archive drawer cataloging all preserved tickets, receipts, pressed botanical leaves, and stamps.
   - Type filtering and instant deep-linking.

6. **Web Audio Tactile Synthesizer:**
   - Zero external audio dependencies: native Web Audio API oscillators and noise generators for paper page flips, mechanical camera shutter clicks, tape peels, and rubber stamp thuds.
   - Ambient room sound generator (rain on windowpane + warm vinyl needle crackle) with mute controls.

7. **Data Archival & Portability:**
   - One-click JSON backup export and import.
   - "Restore Sample Roll" option to reset defaults.

---

## 35mm Analog Photography Assets

Thirteen original nostalgic photographs were generated and curated specifically for this project (under `public/images/memories/`), maintaining authentic Kodak Portra 400 and Kodachrome color grading, realistic 35mm film grain, and unposed intimacy:

- `diner-morning.jpg` — Two coffee mugs, split cinnamon pastry, and cozy hands at a rainy 24hr diner booth.
- `road-trip-sunset.jpg` — Open highway toward golden hour horizon with dashboard road map and cassette tape.
- `bookstore-rain.jpg` — Velvet armchair, floor book stacks, steaming mug, and rainy leaded glass.
- `birthday-cake.jpg` — Homemade strawberry sponge cake with two flickering candles on wooden table.
- `farmers-market.jpg` — Woven wicker basket brimming with yellow peaches, tomatoes, and sourdough loaf.
- `vinyl-listening.jpg` — Walnut turntable spinning black vinyl with glowing tube amplifier at midnight.
- `coastal-ferry.jpg` — Passengers leaning on wooden railing looking out to misty pine islands.
- `laundromat-night.jpg` — Late night neighborhood laundromat with retro yellow dryers and turquoise chairs.
- `wildflower-picnic.jpg` — Plaid wool blanket in daisy meadow with 35mm camera and peeled oranges.
- `autumn-park-boots.jpg` — Weathered leather boots in crimson maple leaves beside a park bench with cider.
- `mountain-drive-map.jpg` — Folded road map on classic car steering wheel from a 4-hour scenic detour.
- `first-coffee-candid.jpg` — Candid booth perspective with sugar shaker and napkin apartment lease sketch.
- `cider-and-leaves.jpg` — Rustic park bench covered in autumn foliage with steaming travel cups.

---

## Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS 3.4
- **Icons:** Lucide React
- **Animations & Effects:** CSS 3D Transforms, Canvas Confetti
- **Audio:** Native Web Audio API
- **Persistence:** LocalStorage API with JSON Export/Import

---

## Local Development

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## License

MIT • Created as part of the 20-Day Digital Design Challenge.
