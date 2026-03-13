import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'product-cards-image';
      } else if (div.textContent.trim() && !div.querySelector('picture') && !div.querySelector('a') && div.children.length <= 1) {
        const badge = document.createElement('span');
        badge.className = 'product-cards-badge';
        badge.textContent = div.textContent.trim();
        const imageDiv = li.querySelector('.product-cards-image');
        if (imageDiv) {
          imageDiv.append(badge);
        }
        div.remove();
      } else {
        div.className = 'product-cards-body';
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
