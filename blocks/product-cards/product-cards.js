import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'product-cards-image';
      } else {
        div.className = 'product-cards-body';
      }
    });

    // Extract badge from body: look for a <strong> or <em> as the last element
    // that contains a single short word (e.g., "Sale", "New", "Featured")
    const body = li.querySelector('.product-cards-body');
    const imageWrap = li.querySelector('.product-cards-image');
    if (body && imageWrap) {
      const lastP = body.querySelector('p:last-child');
      if (lastP) {
        const strong = lastP.querySelector(':scope > strong:only-child');
        const em = lastP.querySelector(':scope > em:only-child');
        const badgeEl = strong || em;
        if (badgeEl && lastP.childNodes.length === 1) {
          const badge = document.createElement('span');
          badge.className = 'product-cards-badge';
          badge.textContent = badgeEl.textContent;
          imageWrap.append(badge);
          lastP.remove();
        }
      }
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
