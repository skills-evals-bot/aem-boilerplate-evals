# Content Model: Product Cards

## Block Structure

This block uses the **Collection** model - each row represents one product card.

### Example

```markdown
| Product Cards |
|---------------|
| Sale<br>![Product 1](product1.jpg) | ## Premium Widget<p>High-quality widget with advanced features and premium materials.</p><p>[Shop Now](link1)</p> |
| ![Product 2](product2.jpg) | ## Standard Widget<p>Reliable widget for everyday use.</p><p>[Learn More](link2)</p> |
| New<br>![Product 3](product3.jpg) | ## Deluxe Widget<p>Our newest widget with cutting-edge technology.</p><p>[Buy Now](link3)</p> |
```

## How It Works

Each row in the table represents one product card with two columns:

**Column 1: Image (with optional badge)**
- Optional badge text followed by line break (`<br>`)
- Product image
- If badge text is present, it will be displayed as an overlay on the image

**Column 2: Content**
- H2 heading for product name
- Paragraph for product description
- Paragraph with link for call-to-action

## Key Points

- **Each row = one product card** - Add/remove cards by adding/removing rows
- **Badge is optional** - Include text before the image (with `<br>`) for a badge overlay, or omit for no badge
- **Semantic formatting matters**:
  - H2 identifies the product name/heading
  - Paragraph text provides the description
  - Links within paragraphs become the CTA buttons
- **Consistent structure** - All cards follow the same 2-column pattern
- **Flexible content** - Description and CTA can vary in length per card
- **Maximum 3 columns on desktop** - Grid will automatically adjust based on number of cards and viewport
- **Responsive** - Scales from 1 column (mobile) to 3 columns (desktop)

## Variations

No block variants are required for the initial implementation. The grid automatically adjusts based on viewport size.
