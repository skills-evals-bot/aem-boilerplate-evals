import { createOptimizedPicture } from '../../scripts/aem.js';

function moveCellContents(source, target) {
  while (source.firstChild) {
    target.append(source.firstChild);
  }
}

function buildImage(cell) {
  const picture = cell.querySelector('picture');
  const image = picture?.querySelector('img') || cell.querySelector('img');

  if (!image) return null;

  return createOptimizedPicture(image.src, image.alt, false, [{ width: '750' }]);
}

function buildTitle(cell) {
  const title = document.createElement('div');
  title.className = 'product-cards-card-title';
  moveCellContents(cell, title);
  return title;
}

function buildDescription(cell) {
  const description = document.createElement('div');
  description.className = 'product-cards-card-description';
  moveCellContents(cell, description);
  return description;
}

function buildCta(cell) {
  const cta = document.createElement('div');
  cta.className = 'product-cards-card-cta';
  moveCellContents(cell, cta);
  return cta;
}

function buildBadge(cell) {
  const text = cell?.textContent.trim();
  if (!text) return null;

  const badge = document.createElement('p');
  badge.className = 'product-cards-card-badge';
  badge.textContent = text;
  return badge;
}

export default function decorate(block) {
  const list = document.createElement('ul');

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 4) return;

    const [imageCell, titleCell, descriptionCell, ctaCell, badgeCell] = cells;

    const item = document.createElement('li');
    const card = document.createElement('article');
    card.className = 'product-cards-card';

    const media = document.createElement('div');
    media.className = 'product-cards-card-image';
    const picture = buildImage(imageCell);
    if (picture) {
      media.append(picture);
    }

    const badge = buildBadge(badgeCell);
    if (badge) {
      media.append(badge);
    }

    const body = document.createElement('div');
    body.className = 'product-cards-card-body';
    body.append(buildTitle(titleCell), buildDescription(descriptionCell), buildCta(ctaCell));

    card.append(media, body);
    item.append(card);
    list.append(item);
  });

  block.replaceChildren(list);
}
