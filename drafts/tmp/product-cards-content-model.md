# Content Model: Product Cards

## Block Structure

| Product Cards |
|---------------|
| ![Product image](product1.jpg) | Sale | ## Product Name<p>Short description of the product.</p><p>[Shop Now](link)</p> |
| ![Product image](product2.jpg) | | ## Another Product<p>Description without a badge.</p><p>[Learn More](link)</p> |
| ![Product image](product3.jpg) | New | ## Third Product<p>Featured product description here.</p><p>[Buy Now](link)</p> |

## How It Works

This is a **Collection model** where each row represents one product card.

**Column structure:**
1. **Image** - Product image (required)
2. **Badge** - Optional badge text (e.g., "Sale", "New", "Featured") - leave empty if no badge
3. **Content** - Contains:
   - **Heading** (H2 or H3) - Product name (required)
   - **Paragraph(s)** - Product description (required)
   - **Link** - Call-to-action (required)

## Key Points

- Each row = one product card
- Badge column is optional - authors can leave it empty or omit it entirely for cards without badges
- Use semantic formatting:
  - H2 or H3 for product name
  - Paragraph text for description
  - Link for CTA
- Content is flexible - authors can include multiple paragraphs if needed
- Decoration code will:
  - Position badge as overlay on image
  - Style card as cohesive unit
  - Create responsive grid layout

## Authoring Tips for Users

- Add/remove cards by adding/removing rows
- Keep descriptions concise for best visual consistency
- Badge text should be short (1-2 words like "Sale" or "New")
- If no badge needed, leave second column empty
