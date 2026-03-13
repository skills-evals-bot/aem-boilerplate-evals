# Product Cards Block

Display a responsive grid of product cards with images, names, descriptions, and call-to-action links.

## Features

- **Responsive Grid**: Automatically adjusts from 1 column (mobile) to 2 columns (tablet) to 3 columns (desktop)
- **Badge Support**: Optional badge overlays on images (e.g., "Sale", "New", "Featured")
- **Modern Design**: Card hover effects with smooth transitions
- **Flexible CTAs**: Each card can have its own call-to-action link

## Structure

Each product card requires 4 cells:

| Image | Name | Description | CTA |
|-------|------|-------------|-----|
| Product image + optional badge text | Product name | Short description | Link |

## Example

| Image | Name | Description | CTA |
|-------|------|-------------|-----|
| ![product1](image.jpg)<br>Sale | Premium Headphones | Crystal-clear audio with noise cancellation | [Shop Now](#buy) |
| ![product2](image2.jpg)<br>New | Smart Watch | Track your fitness goals | [Learn More](#details) |
| ![product3](image3.jpg) | Bluetooth Speaker | Powerful sound for adventures | [Buy Now](#order) |

## Badge Usage

To add a badge overlay to a product image:
1. Place the badge text in the same cell as the image
2. The badge text can appear before or after the image
3. If no badge is needed, just include the image

**With Badge:**
```
![Product](image.jpg)
Sale
```

**Without Badge:**
```
![Product](image.jpg)
```

## Styling

The block includes:
- Rounded corners and subtle borders
- Hover effect with elevation and shadow
- Responsive typography
- Accessible contrast ratios

## Responsive Breakpoints

- **Mobile** (< 600px): 1 column
- **Tablet** (600px - 899px): 2 columns
- **Desktop** (900px+): 3 columns
