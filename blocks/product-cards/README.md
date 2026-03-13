# Product Cards Block

A responsive grid layout for displaying product cards with images, titles, descriptions, and call-to-action links.

## Features

- Responsive grid layout (3 columns on desktop, 2 on tablet, 1 on mobile)
- Product images with automatic optimization
- Optional badge overlays (e.g., "Sale", "New", "Featured")
- Product titles and descriptions
- Call-to-action buttons

## Content Structure

Each row in the block represents one product card with the following columns:

| Column | Content | Required | Notes |
|--------|---------|----------|-------|
| 1 | Image + Badge | Yes | Add product image. Optional: include badge text (e.g., "Sale", "New") which will appear as an overlay on the image. |
| 2 | Product Name | Yes | Product title. Can be plain text or a heading. |
| 3 | Description | Yes | Short product description. |
| 4 | CTA Link | Yes | Call-to-action link (e.g., "Shop Now", "Learn More"). |

## Example

```
| Product Cards |
|---|---|---|---|
| ![Headphones](image.jpg) New | Premium Wireless Headphones | Experience crystal-clear audio with noise-cancelling technology. | [Shop Now](/products/headphones) |
| ![Watch](image2.jpg) Sale | Smart Fitness Watch | Track your health and fitness goals with advanced sensors. | [View Details](/products/watch) |
| ![Speaker](image3.jpg) | Bluetooth Speaker | Take your music anywhere with waterproof design. | [Learn More](/products/speaker) |
```

## Badge Usage

To add a badge overlay to a product image:
- Include the badge text in the same cell as the image
- The badge will automatically appear in the top-right corner of the image
- Common badge labels: "Sale", "New", "Featured", "Limited"

## Styling

The block uses CSS custom properties for colors:
- `--background-color`: Card background color
- `--highlight-background-color`: Badge background color (defaults to red)
- `--text-color`: Text color

### Responsive Breakpoints

- Mobile: < 600px (1 column)
- Tablet: 600px - 899px (2 columns)
- Desktop: ≥ 900px (3 columns)
