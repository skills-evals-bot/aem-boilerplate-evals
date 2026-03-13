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
        // Extract badge: last <p> containing only a <strong> element
        const paragraphs = div.querySelectorAll('p');
        const lastP = paragraphs[paragraphs.length - 1];
        if (lastP && lastP.children.length === 1 && lastP.querySelector('strong') && !lastP.querySelector('a')) {
          const badge = document.createElement('span');
          badge.className = 'product-cards-badge';
          badge.textContent = lastP.textContent;
          lastP.remove();
          // Badge will be placed on the image; store on li for now
          li.dataset.badge = badge.textContent;
        }
      }
    });
    // Add badge overlay to image container if present
    if (li.dataset.badge) {
      const imageDiv = li.querySelector('.product-cards-card-image');
      if (imageDiv) {
        const badge = document.createElement('span');
        badge.className = 'product-cards-badge';
        badge.textContent = li.dataset.badge;
        imageDiv.append(badge);
      }
      delete li.dataset.badge;
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
