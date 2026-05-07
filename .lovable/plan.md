
## Goal

Take the current live atdbtrade.com site (from `assets_2.zip`), integrate the real equipment photos (from `REAL_PHOTOS_OF_EQUIPEMENTS_ATDB_1.zip`) according to the mapping CSV/PDF, and produce a final deploy-ready zip file — preserving all existing design, content, and functionality.

## What will be done

### 1. Extract and analyze the current site files

Unzip `assets_2.zip` (the live hosting bundle) to understand the full file structure — HTML, JS, CSS, assets, and routing. This is the baseline that must not be broken.

### 2. Extract and optimize real equipment photos

Unzip `REAL_PHOTOS_OF_EQUIPEMENTS_ATDB_1.zip` and `atdb_gallery.zip`. Using the `ATDB_real_photo_mapping.csv`, map each photo to its target equipment ID:

| Equipment ID | Equipment Name | Photos |
|---|---|---|
| ATDB-CR-002 | Liebherr LTM 1070-4.1 Crane | 2 photos |
| ATDB-EX-002 | CAT 320BU Excavator | 2 photos |
| ATDB-RR-004 | Dynapac CC20 Double Drum | 2 photos |
| ATDB-RR-005 | Bomag BW Tandem Vibratory | 2 photos |
| ATDB-RR-008 | Sakai HV60 Mini Tandem | 3 photos |
| ATDB-LD-001 | CASE 770EX Magnum Backhoe | 1 photo |
| ATDB-SP-004 | Honda 80k-100 Sand Compactor | 3 photos |
| ATDB-SP-005 | Honda ER2500CX Generator | 1 photo |

Photos will be placed in `equipment/` folder organized by equipment ID, optimized/compressed for web.

### 3. Update equipment data with real photo paths

Locate the JS data arrays that define equipment items. For each equipment ID that has real photos, add the real photo paths alongside (or replacing) the existing AI-generated images. The real photos will appear on:
- Individual equipment detail pages
- Equipment category listing pages
- The homepage "Featured Equipment" cards

### 4. Populate the "Live Fleet Photos" section

The homepage already has a "Live fleet photos / Current-condition photo stream" section (currently showing only one Sakai photo from Supabase). Wire all real photos into this section with:
- Category filter tabs (All, Road Rollers, Mobile Cranes, Excavators, Loaders, Support Equipment)
- Responsive grid layout with balanced cropping
- Equipment ID and name labels on each photo

### 5. Add WhatsApp quote CTAs per equipment card

Each featured equipment card will have a "Rent Now" button that opens WhatsApp with a prefilled message like:
```
Hello ATDB Trade International,
I'd like to rent the [Equipment Name] ([ID] · [Capacity]).
Project location: 
Duration (days): 
Please share availability and a quotation. — ATDB website
```
This pattern already exists on the live site — it will be verified and ensured for every equipment card.

### 6. Match the footer exactly from live site

Extract and verify the footer matches the live atdbtrade.com 1:1:
- ATDB logo + tagline
- EXPLORE links (Equipment, Projects, About, Contact)
- OFFICES section (Corporate: Dhaka, Branch: Tangail)
- CONTACT section (phone, email)
- WhatsApp and Facebook social icons
- Bottom bar: "A Sazid Hossain Architecture" badge + copyright

### 7. Verify and package

- Compare the modified site against the live atdbtrade.com to confirm nothing is broken
- Fix any errors found
- Package everything into a final deploy-ready zip file at `/mnt/documents/`

## What will NOT change

- Site design system, colors, fonts, layout
- All existing text content and translations (EN/BN)
- Navigation, routing, page structure
- Project highlights section
- "Why ATDB" section
- Any existing AI-generated equipment images (kept alongside real photos)
- WhatsApp floating button and Get Quote button behavior

## Output

A single deploy-ready zip file delivered to you, ready to upload to your hosting.
