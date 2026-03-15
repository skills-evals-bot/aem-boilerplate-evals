import { createOptimizedPicture } from '../../scripts/aem.js';

function optimizeImage(container) {
  const img = container.querySelector('picture > img');

  if (!img) return;

  const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
  img.closest('picture').replaceWith(optimizedPicture);
}

function buildBadge(text) {
  const badge = document.createElement('span');
  badge.className = 'product-cards-card-badge';
  badge.textContent = text;
  return badge;
}

/**
 * Decorates the product cards block.
 * @param {Element} block The product cards block element
 */
export default function decorate(block) {
  const list = document.createElement('ul');

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (!cells.length) return;

    const card = document.createElement('li');
    const [imageCell, bodyCell, badgeCell] = cells;

    if (imageCell) {
      imageCell.className = 'product-cards-card-image';
      optimizeImage(imageCell);

      const badgeText = badgeCell?.textContent.trim();
      if (badgeText) {
        imageCell.append(buildBadge(badgeText));
      }

      card.append(imageCell);
    }

    if (bodyCell) {
      bodyCell.className = 'product-cards-card-body';
      bodyCell.querySelectorAll('a').forEach((link) => link.classList.add('product-cards-card-cta'));
      card.append(bodyCell);
    }

    list.append(card);
  });

  block.replaceChildren(list);
}
