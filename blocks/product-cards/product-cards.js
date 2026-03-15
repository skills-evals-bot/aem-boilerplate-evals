import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);

    const divs = [...li.children];
    divs.forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'product-cards-image';
      } else if (div.textContent.trim() && !div.querySelector('a') && !div.querySelector('picture')) {
        div.className = 'product-cards-badge';
      } else {
        div.className = 'product-cards-body';
      }
    });

    // move badge inside image wrapper for overlay positioning
    const badge = li.querySelector('.product-cards-badge');
    const imageWrapper = li.querySelector('.product-cards-image');
    if (badge && imageWrapper) {
      const span = document.createElement('span');
      span.className = 'product-cards-badge';
      span.textContent = badge.textContent.trim();
      imageWrapper.append(span);
      badge.remove();
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
