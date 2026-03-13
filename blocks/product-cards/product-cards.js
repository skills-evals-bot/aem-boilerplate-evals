import { createOptimizedPicture } from '../../scripts/aem.js';

function buildCard(row) {
  const [imageColumn, nameColumn, descriptionColumn, ctaColumn, badgeColumn] = [...row.children];
  const item = document.createElement('li');
  const article = document.createElement('article');
  article.className = 'product-cards-card';

  const media = document.createElement('div');
  media.className = 'product-cards-card-image';

  const picture = imageColumn?.querySelector('picture');
  const image = picture?.querySelector('img');
  if (image) {
    const optimizedPicture = createOptimizedPicture(image.src, image.alt, false, [{ width: '750' }]);
    media.append(optimizedPicture);
  }

  const badgeText = badgeColumn?.textContent.trim();
  if (badgeText) {
    const badge = document.createElement('span');
    badge.className = 'product-cards-card-badge';
    badge.textContent = badgeText;
    media.append(badge);
  }

  const body = document.createElement('div');
  body.className = 'product-cards-card-body';

  if (nameColumn) {
    const title = document.createElement('h3');
    title.className = 'product-cards-card-title';
    title.textContent = nameColumn.textContent.trim();
    if (title.textContent) body.append(title);
  }

  if (descriptionColumn) {
    const description = document.createElement('div');
    description.className = 'product-cards-card-description';
    description.innerHTML = descriptionColumn.innerHTML;
    body.append(description);
  }

  if (ctaColumn) {
    const cta = ctaColumn.querySelector('a[href]');
    if (cta) {
      cta.classList.add('product-cards-card-cta');
      body.append(cta);
    }
  }

  if (media.childElementCount) {
    article.append(media);
  }

  article.append(body);
  item.append(article);
  return item;
}

/**
 * Decorates the product cards block.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const list = document.createElement('ul');
  [...block.children].forEach((row) => list.append(buildCard(row)));
  block.replaceChildren(list);
}
