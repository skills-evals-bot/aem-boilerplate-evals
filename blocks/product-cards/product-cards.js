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
        // Extract badge (strong element in its own paragraph)
        const badgeParagraph = div.querySelector('p:has(> strong:only-child)');
        if (badgeParagraph) {
          const badge = document.createElement('span');
          badge.className = 'product-cards-card-badge';
          badge.textContent = badgeParagraph.querySelector('strong').textContent;
          badgeParagraph.remove();
          // Prepend badge to the image div sibling
          const imageDiv = li.querySelector('.product-cards-card-image');
          if (imageDiv) imageDiv.append(badge);
        }
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
