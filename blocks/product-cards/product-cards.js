import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'product-cards-card-image';
      } else {
        div.className = 'product-cards-card-body';
        // Detect badge: first element is a short <p> with only text, followed by a heading
        const first = div.firstElementChild;
        const second = first?.nextElementSibling;
        if (
          first?.tagName === 'P'
          && !first.querySelector('a, picture')
          && second?.tagName?.match(/^H[1-6]$/)
          && first.textContent.trim().length <= 30
        ) {
          const badge = document.createElement('span');
          badge.className = 'product-cards-badge';
          badge.textContent = first.textContent.trim();
          first.remove();
          // Place badge on the image container
          const imageDiv = li.querySelector('.product-cards-card-image');
          if (imageDiv) imageDiv.append(badge);
        }
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimized);
  });
  block.replaceChildren(ul);
}
