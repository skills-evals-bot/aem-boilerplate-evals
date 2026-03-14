import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * loads and decorates the product-cards block
 * @param {Element} block The product-cards block element
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);

    const divs = [...li.children];
    // First div: image
    // Second div: body (product name, description, CTA link)
    // Optional third div: badge text
    divs.forEach((div, index) => {
      if (index === 0 && div.querySelector('picture')) {
        div.className = 'product-cards-card-image';
      } else if (index === 1) {
        div.className = 'product-cards-card-body';
      } else if (index === 2) {
        const badgeText = div.textContent.trim();
        if (badgeText) {
          const badge = document.createElement('span');
          badge.className = 'product-cards-badge';
          badge.textContent = badgeText;
          const imageDiv = li.querySelector('.product-cards-card-image');
          if (imageDiv) imageDiv.append(badge);
        }
        div.remove();
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
