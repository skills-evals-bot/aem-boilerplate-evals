# Product Cards Block - Analysis

## Task
Create a new "product-cards" block displaying a responsive grid of product cards.

## Author Inputs
- **Image** (required): Product photo
- **Product name** (required): Heading text
- **Short description** (required): Paragraph text
- **CTA link** (required): Link with text
- **Badge** (optional): Overlay text on the image (e.g., "Sale", "New", "Featured")

## Layout & Responsive Behavior
- Desktop (≥900px): 3-column grid
- Tablet (≥600px): 2-column grid
- Mobile (<600px): 1-column stack

## Visual Design
- Cards with image at top, text content below
- Badge overlays positioned top-left of image
- Cards should have subtle visual separation (border or shadow)
- CTA styled as a link/button at the bottom of the card

## Acceptance Criteria
1. Block renders a grid of product cards from authored content
2. Each card displays: image, product name, description, CTA link
3. Badge overlay appears on image when author provides badge text
4. Badge does not appear when omitted
5. Grid is 3 columns on desktop (≥900px), 2 on tablet (≥600px), 1 on mobile
6. Cards are visually distinct (border/shadow)
7. Responsive and accessible (proper alt text, semantic HTML, keyboard navigable links)
8. No console errors
9. Passes linting
