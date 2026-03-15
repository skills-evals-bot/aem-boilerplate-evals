import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length && div.querySelector('picture')) {
        div.className = 'product-cards-card-image';
        // Find badge text: any <p> inside the image column that doesn't contain a picture
        const badgeEl = div.querySelector('p:not(:has(picture))');
        if (badgeEl && badgeEl.textContent.trim()) {
          const span = document.createElement('span');
          span.className = 'product-cards-badge';
          span.textContent = badgeEl.textContent.trim();
          badgeEl.replaceWith(span);
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
