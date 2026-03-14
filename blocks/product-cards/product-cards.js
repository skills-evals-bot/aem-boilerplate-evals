import { createOptimizedPicture } from '../../scripts/aem.js';

function getLink(cell) {
  const link = cell.querySelector('a[href]');

  if (!link) {
    return null;
  }

  link.classList.add('product-cards-card-cta');
  link.title = link.title || link.textContent.trim();

  return link;
}

function createBadge(text) {
  if (!text) {
    return null;
  }

  const badge = document.createElement('span');
  badge.className = 'product-cards-card-badge';
  badge.textContent = text;
  return badge;
}

function createImage(cell, badgeText) {
  const wrapper = document.createElement('div');
  wrapper.className = 'product-cards-card-image';

  const picture = cell.querySelector('picture');
  const img = picture?.querySelector('img');

  if (img) {
    wrapper.append(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  }

  const badge = createBadge(badgeText);
  if (badge) {
    wrapper.append(badge);
  }

  return wrapper;
}

function createBody(nameCell, descriptionCell, ctaCell) {
  const body = document.createElement('div');
  body.className = 'product-cards-card-body';

  if (nameCell.textContent.trim()) {
    const heading = document.createElement('p');
    heading.className = 'product-cards-card-name';
    heading.textContent = nameCell.textContent.trim();
    body.append(heading);
  }

  if (descriptionCell.innerHTML.trim()) {
    const description = document.createElement('div');
    description.className = 'product-cards-card-description';
    description.innerHTML = descriptionCell.innerHTML;
    body.append(description);
  }

  const link = getLink(ctaCell);
  if (link) {
    body.append(link);
  }

  return body;
}

function createCard(row) {
  const cells = [...row.children];
  const [imageCell, nameCell, descriptionCell, ctaCell, badgeCell] = cells;

  if (!imageCell || !nameCell || !descriptionCell || !ctaCell) {
    return null;
  }

  const item = document.createElement('li');
  item.className = 'product-cards-card';

  const badgeText = badgeCell?.textContent.trim();

  item.append(createImage(imageCell, badgeText));
  item.append(createBody(nameCell, descriptionCell, ctaCell));

  return item;
}

/**
 * Decorates the product cards block.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const list = document.createElement('ul');

  [...block.children].forEach((row) => {
    const card = createCard(row);
    if (card) {
      list.append(card);
    }
  });

  block.replaceChildren(list);
}
