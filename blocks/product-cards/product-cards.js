import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);

    const divs = [...li.children];
    let imageDiv = null;
    let bodyDiv = null;
    const remaining = [];

    divs.forEach((div) => {
      if (!imageDiv && div.querySelector('picture')) {
        div.className = 'product-cards-card-image';
        imageDiv = div;
      } else if (!bodyDiv && (div.querySelector('a') || div.querySelectorAll(':scope > *').length > 1)) {
        div.className = 'product-cards-card-body';
        bodyDiv = div;
      } else {
        remaining.push(div);
      }
    });

    // Remaining text-only divs become badges on the image
    remaining.forEach((div) => {
      const text = div.textContent.trim();
      if (text && imageDiv) {
        const badge = document.createElement('span');
        badge.className = 'product-cards-card-badge';
        badge.textContent = text;
        imageDiv.append(badge);
      }
      div.remove();
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
