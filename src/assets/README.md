# Assets Folder

Place your Volunteers of America logo here.

## How to Add Your Logo

1. **Get your logo file** - PNG format with transparent background is recommended
2. **Name it** `voa-logo.png`
3. **Place it in this folder** (`src/assets/`)
4. **Replace the placeholder** - The current `voa-logo.svg` is just a placeholder showing "VOA"
5. **Rebuild the app** - Run `npm run build` or restart the dev server

## Logo Specifications

- **File name**: `voa-logo.png` (preferred) or `voa-logo.svg`
- **Recommended size**: 200x200px or similar square dimensions
- **Format**: PNG with transparent background (recommended) or SVG
- **The system will automatically**:
  - Try to load `voa-logo.png` first
  - If not found, fall back to `voa-logo.svg`
  - If neither exists, show a default icon

## Current Status

A placeholder SVG logo is included (`voa-logo.svg`) that displays "VOA" in blue. Replace this with your actual Volunteers of America logo PNG file for the best results.
