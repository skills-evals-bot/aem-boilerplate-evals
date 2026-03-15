import { createOptimizedPicture } from '../../scripts/aem.js';

function optimizeImage(cardImage) {
  const image = cardImage.querySelector('picture img');
  if (!image) return;

  const optimizedPicture = createOptimizedPicture(image.src, image.alt, false, [{ width: '750' }]);
  const picture = cardImage.querySelector('picture');
  if (picture) {
    picture.replaceWith(optimizedPicture);
  }
}

function decorateCard(row) {
  const cells = [...row.children];
  const [imageCell, contentCell, badgeCell] = cells;
  const card = document.createElement('li');
  const article = document.createElement('article');
  article.className = 'product-cards-card';

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'product-cards-card-image';
  if (imageCell) {
    while (imageCell.firstElementChild) {
      imageWrapper.append(imageCell.firstElementChild);
    }
    optimizeImage(imageWrapper);
  }

  const badgeText = badgeCell?.textContent.trim();
  if (badgeText) {
    const badge = document.createElement('p');
    badge.className = 'product-cards-card-badge';
    badge.textContent = badgeText;
    imageWrapper.append(badge);
  }

  const body = document.createElement('div');
  body.className = 'product-cards-card-body';
  if (contentCell) {
    while (contentCell.firstElementChild) {
      body.append(contentCell.firstElementChild);
    }
  }

  const cta = body.querySelector('a[href]');
  if (cta) cta.classList.add('product-cards-card-cta');

  article.append(imageWrapper, body);
  card.append(article);
  return card;
}

/**
 * Decorates the product cards block.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const list = document.createElement('ul');
  [...block.children].forEach((row) => {
    list.append(decorateCard(row));
  });
  block.replaceChildren(list);
}
