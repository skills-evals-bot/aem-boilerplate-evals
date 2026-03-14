import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    const divs = [...li.children];

    // First div: image + optional badge
    // Second div: product name, description, CTA link
    divs.forEach((div, index) => {
      if (index === 0 && div.querySelector('picture')) {
        div.className = 'product-cards-card-image';
        // Check for badge text alongside the image
        const textContent = [...div.childNodes]
          .filter((node) => node.nodeType === Node.TEXT_NODE || (node.nodeType === Node.ELEMENT_NODE && !node.querySelector('picture') && node.tagName !== 'PICTURE'))
          .map((node) => node.textContent.trim())
          .filter(Boolean)
          .join('');
        if (textContent) {
          const badge = document.createElement('span');
          badge.className = 'product-cards-badge';
          badge.textContent = textContent;
          // Remove text nodes and non-picture elements
          [...div.childNodes].forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) node.remove();
            else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'PICTURE' && !node.querySelector('picture')) node.remove();
          });
          div.append(badge);
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
