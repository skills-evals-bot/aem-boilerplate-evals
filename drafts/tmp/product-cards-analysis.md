# Product Cards Block - Analysis

## Task Description

Create a new block that displays a grid of product cards for showcasing products with images, information, and call-to-action links.

## Requirements Analysis

### Author Inputs

Authors will provide per card:
- **Image** (required) - Product image
- **Product name** (required) - Title/name of the product
- **Description** (required) - Short description text
- **CTA link** (required) - Link destination
- **CTA text** (required) - Link text/label
- **Badge** (optional) - Badge text for overlay (e.g., "Sale", "New", "Featured")

### Layout Requirements

- **Grid layout** - Cards displayed in a responsive grid
- **Desktop** - Maximum 3 columns
- **Tablet** - 2 columns (based on available space)
- **Mobile** - 1 column

### Visual Requirements

- Each card displays:
  - Product image at top
  - Badge overlay on image (when provided)
  - Product name below image
  - Description text
  - Call-to-action button/link
- Cards should have consistent styling
- Grid should use CSS Grid for responsive layout

### Interactive Requirements

- CTA link should be clickable
- Cards should have hover states for better UX
- Accessible keyboard navigation

### Responsive Behavior

- **Mobile (< 600px)**: 1 column, full width cards
- **Tablet (600px - 899px)**: 2 columns
- **Desktop (900px+)**: 3 columns maximum

## Acceptance Criteria

### Visual & Layout
- ✅ Cards display in responsive grid (3 cols desktop → 2 cols tablet → 1 col mobile)
- ✅ Each card shows image, name, description, and CTA
- ✅ Optional badge overlays display correctly on images when provided
- ✅ Cards have consistent spacing and styling
- ✅ Images maintain proper aspect ratio

### Functionality
- ✅ CTA links work correctly
- ✅ Cards without badges render properly (badge is truly optional)
- ✅ Hover states provide visual feedback
- ✅ Works across all viewports (mobile, tablet, desktop)

### Accessibility
- ✅ Semantic HTML structure
- ✅ Images have proper alt text
- ✅ Links are keyboard accessible
- ✅ Proper heading hierarchy

### Performance
- ✅ Images use eager loading for first row, lazy for rest
- ✅ No console errors
- ✅ Minimal JavaScript bundle size

### Edge Cases
- ✅ Handles varying content lengths (long names, short descriptions, etc.)
- ✅ Works with different numbers of cards (1, 2, 3, 6, etc.)
- ✅ Gracefully handles missing optional badge

## Notes

- Block should be self-contained with its own CSS and JS
- Use CSS Grid for responsive layout with auto-fit/minmax pattern
- Badge should be positioned absolutely over the image
- Consider card container as clickable or just the CTA button
