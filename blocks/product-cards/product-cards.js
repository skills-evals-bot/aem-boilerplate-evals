import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length && div.querySelector('picture')) {
        div.className = 'product-cards-card-image';
        // Extract badge text if present (paragraph without a picture, at any depth)
        const badge = div.querySelector('p:not(:has(picture))');
        if (badge && badge.textContent.trim()) {
          const badgeEl = document.createElement('span');
          badgeEl.className = 'product-cards-card-badge';
          badgeEl.textContent = badge.textContent.trim();
          badge.remove();
          div.append(badgeEl);
        }
      } else {
        div.className = 'product-cards-card-body';
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]),
    );
  });
  block.replaceChildren(ul);
}
