import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const columns = [...row.children];

    // Column 1: Image
    const imageCol = columns[0];
    if (imageCol) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'product-cards-image';
      const picture = imageCol.querySelector('picture');
      if (picture) imageWrapper.append(picture);

      // Column 3 (optional): Badge
      const badgeCol = columns[2];
      if (badgeCol) {
        const badgeText = badgeCol.textContent.trim();
        if (badgeText) {
          const badge = document.createElement('span');
          badge.className = 'product-cards-badge';
          badge.textContent = badgeText;
          imageWrapper.append(badge);
        }
      }

      li.append(imageWrapper);
    }

    // Column 2: Product details (name, description, CTA)
    const bodyCol = columns[1];
    if (bodyCol) {
      const body = document.createElement('div');
      body.className = 'product-cards-body';
      while (bodyCol.firstElementChild) body.append(bodyCol.firstElementChild);
      li.append(body);
    }

    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]),
    );
  });

  block.replaceChildren(ul);
}
