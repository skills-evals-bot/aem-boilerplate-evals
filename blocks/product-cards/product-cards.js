import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const cols = [...row.children];

    // Extract content from columns
    const imageCol = cols[0];
    const badgeCol = cols[1];
    const contentCol = cols[2];

    // Create card structure
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'product-cards-image';

    // Process image
    const picture = imageCol?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        imageWrapper.append(optimizedPicture);
      }
    }

    // Add badge if present
    const badgeText = badgeCol?.textContent?.trim();
    if (badgeText) {
      const badge = document.createElement('span');
      badge.className = 'product-cards-badge';
      badge.textContent = badgeText;
      imageWrapper.append(badge);
    }

    // Process content (name, description, CTA)
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'product-cards-content';

    if (contentCol) {
      // Move all content from the content column
      while (contentCol.firstChild) {
        contentWrapper.append(contentCol.firstChild);
      }
    }

    // Assemble card
    li.append(imageWrapper, contentWrapper);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
