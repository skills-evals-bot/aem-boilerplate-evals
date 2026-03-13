# Product Cards Block

A responsive grid block for displaying product cards with images, descriptions, and call-to-action links.

## Features

- **Responsive Grid**: Automatically adjusts from 1 column on mobile to 3 columns on desktop
- **Badge Support**: Optional overlay badges (e.g., "Sale", "New", "Featured")
- **Hover Effects**: Smooth image zoom and shadow effects on hover
- **Optimized Images**: Automatic image optimization for performance
- **Flexible Content**: Authors control all content including badge visibility

## Usage

### Authoring Structure

Each product card should be authored as a separate row in the block with the following cells:

#### With Badge:
| Badge Text | Image | Name | Description | CTA Link |
|------------|-------|------|-------------|----------|
| New | ![Product](image.jpg) | Product Name | Short description text | [Shop Now](link) |

#### Without Badge:
| Image | Name | Description | CTA Link |
|-------|------|-------------|----------|
| ![Product](image.jpg) | Product Name | Short description text | [Shop Now](link) |

### Example

```
Product Cards
New | ![Headphones](headphones.jpg) | Premium Wireless Headphones | Experience crystal-clear audio | [Shop Now](/products/headphones)
Sale | ![Watch](watch.jpg) | Fitness Smart Watch | Track your health goals | [View Details](/products/watch)
![Stand](stand.jpg) | Ergonomic Laptop Stand | Improve your posture | [Learn More](/products/stand)
```

## Responsive Breakpoints

- **Mobile** (< 600px): 1 column
- **Tablet** (≥ 600px): 2 columns
- **Desktop** (≥ 900px): 3 columns

## Styling

The block includes:
- Card hover effects (shadow and image zoom)
- Badge overlay in top-right corner
- Flexible card body that grows to fill available space
- Full-width CTA buttons for mobile
- Smooth transitions for all interactive elements

## Accessibility

- Semantic HTML structure with proper heading hierarchy
- Image alt text required (automatically uses product name if not specified)
- WCAG 2.1 AA compliant link labels
