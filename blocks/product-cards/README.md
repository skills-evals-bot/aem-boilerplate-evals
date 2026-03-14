# Product Cards Block

A responsive grid block for displaying product cards with images, names, descriptions, call-to-action buttons, and optional badge overlays.

## Features

- **Responsive Grid**: Adapts from 1 column (mobile) to 2 columns (tablet) to 3 columns (desktop)
- **Product Information**: Image, title, description, and CTA button
- **Optional Badges**: Highlight products with "Sale", "New", "Featured", or custom badges
- **Hover Effects**: Subtle shadow effect on card hover
- **Optimized Images**: Automatically optimized for web performance
- **Semantic Markup**: Accessible HTML structure

## Content Structure

Each row in the block table represents one product card:

| Column 1 (Image + Badge) | Column 2 (Content) |
|--------------------------|-------------------|
| Product image with optional badge text | Product title (heading), description (paragraph), CTA link (strong-wrapped link) |

### Example in Microsoft Word/Google Docs

Create a table with 2 columns:

**Column 1:**
- Insert an image
- (Optional) Add a paragraph with badge text below the image (e.g., "Sale", "New", "Featured")

**Column 2:**
- Add a heading for the product name (H3 recommended)
- Add a paragraph with the product description
- Add a link for the call-to-action, wrapped in **bold** formatting for primary button style

### Example in Markdown

```markdown
| ![Premium Headphones](./media_123.png) New |
| ### Premium Headphones <p>Experience crystal-clear audio with our premium wireless headphones.</p> **[View Details](/products/headphones)** |
| ![Smart Watch](./media_124.png) Sale |
| ### Smart Watch <p>Stay connected and track your fitness goals.</p> **[Shop Now](/products/watch)** |
| ![Keyboard](./media_125.png) |
| ### Wireless Keyboard <p>Type in comfort with mechanical switches.</p> **[Learn More](/products/keyboard)** |
```

## Badge Overlay

Badges appear as colored overlays in the top-right corner of product images. To add a badge:

1. In the image cell, add a paragraph below the image
2. Type the badge text (e.g., "Sale", "New", "Featured")
3. The badge will automatically appear on the product image

If no badge text is provided, the card will display without a badge overlay.

## Button Styling

The CTA link uses AEM's automatic button decoration:

- **Bold** text (`**[Link Text](url)**`) = Primary button (filled)
- *Italic* text (`*[Link Text](url)*`) = Secondary button (outlined)
- ***Bold + Italic*** = Accent button (highlighted)

For product cards, primary buttons (bold formatting) are recommended.

## Responsive Breakpoints

- **Mobile** (< 600px): 1 column
- **Tablet** (600px - 899px): 2 columns
- **Desktop** (≥ 900px): 3 columns

## Tips for Authors

1. **Image Aspect Ratio**: Use images with a 4:3 aspect ratio for best results (e.g., 800×600, 1200×900)
2. **Description Length**: Keep descriptions concise (2-3 lines) for consistent card heights
3. **Badge Text**: Use short, impactful words (1-2 words max)
4. **CTA Text**: Use action-oriented text like "View Details", "Shop Now", "Learn More"
5. **Card Count**: Works best with 3, 6, 9, or 12 cards for even grid distribution

## Example Output

The block generates semantic HTML with the following structure:

```html
<div class="product-cards">
  <ul>
    <li class="product-card">
      <div class="product-card-image">
        <picture>...</picture>
        <span class="product-card-badge">Sale</span>
      </div>
      <div class="product-card-title">
        <h3>Product Name</h3>
      </div>
      <div class="product-card-description">
        <p>Product description...</p>
      </div>
      <div class="product-card-cta">
        <p class="button-wrapper">
          <a href="/link" class="button primary">View Details</a>
        </p>
      </div>
    </li>
  </ul>
</div>
```

## Accessibility

- Proper heading hierarchy for product titles
- Alt text on images (provided by authors)
- Semantic button elements
- Keyboard navigable
- Screen reader friendly

## Browser Support

Works in all modern browsers with CSS Grid support:
- Chrome/Edge 57+
- Firefox 52+
- Safari 10.1+
- Mobile browsers (iOS Safari, Chrome Mobile)
