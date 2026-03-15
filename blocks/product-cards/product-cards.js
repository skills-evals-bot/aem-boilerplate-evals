import { createOptimizedPicture } from '../../scripts/aem.js';

function getDirectCellContent(cell) {
  return [...cell.childNodes].filter((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent.trim();
    }

    return true;
  });
}

function normalizeCellContent(cell, fallbackTag = 'p') {
  const content = getDirectCellContent(cell);

  if (content.length === 1 && content[0].nodeType === Node.ELEMENT_NODE) {
    return content[0];
  }

  const wrapper = document.createElement(fallbackTag);
  wrapper.append(...content);
  return wrapper;
}

function buildCard(row) {
  const cells = [...row.children];
  const [imageCell, nameCell, descriptionCell, ctaCell, badgeCell] = cells;

  if (!imageCell || !nameCell || !descriptionCell || !ctaCell) {
    return null;
  }

  const card = document.createElement('li');
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'product-cards-card-image';

  const body = document.createElement('div');
  body.className = 'product-cards-card-body';

  const picture = imageCell.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [
      { width: '400' },
      { width: '750' },
    ]);
    imageWrapper.append(optimizedPicture);
  }

  const badgeText = badgeCell?.textContent.trim();
  if (badgeText) {
    const badge = document.createElement('p');
    badge.className = 'product-cards-card-badge';
    badge.textContent = badgeText;
    imageWrapper.append(badge);
  }

  const title = normalizeCellContent(nameCell, 'h3');
  title.classList.add('product-cards-card-title');

  const description = normalizeCellContent(descriptionCell);
  description.classList.add('product-cards-card-description');

  const link = ctaCell.querySelector('a[href]');
  if (link) {
    link.classList.add('product-cards-card-cta');
    link.title = link.title || link.textContent.trim();
  }

  body.append(title, description);
  if (link) body.append(link);

  card.append(imageWrapper, body);
  return card;
}

/**
 * Decorates the product cards block.
 * Expected authored row structure:
 * Image | Name | Description | CTA link | Optional badge text
 * @param {Element} block
 */
export default function decorate(block) {
  const list = document.createElement('ul');

  [...block.children].forEach((row) => {
    const card = buildCard(row);
    if (card) {
      list.append(card);
    }
  });

  block.replaceChildren(list);
}
