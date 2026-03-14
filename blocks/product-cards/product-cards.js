import { createOptimizedPicture } from '../../scripts/aem.js';

function optimizeImage(imageCell) {
  const picture = imageCell.querySelector('picture');
  const img = picture?.querySelector('img');

  if (!picture || !img) return picture || imageCell.firstElementChild;
  if (img.src.endsWith('.svg')) return picture;

  return createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
}

function buildTitle(nameCell) {
  const heading = nameCell.querySelector('h1, h2, h3, h4, h5, h6');

  if (heading) {
    heading.classList.add('product-cards-card-title');
    return heading;
  }

  const title = document.createElement('h3');
  title.className = 'product-cards-card-title';
  title.textContent = nameCell.textContent.trim();
  return title;
}

function buildDescription(descriptionCell) {
  const description = document.createElement('div');
  description.className = 'product-cards-card-description';
  description.append(...descriptionCell.childNodes);
  return description;
}

function buildCta(ctaCell) {
  const link = ctaCell.querySelector('a');

  if (!link) return null;

  link.classList.add('product-cards-card-cta');
  link.title = link.title || link.textContent.trim();
  return link;
}

function buildBadge(badgeCell) {
  const badgeText = badgeCell?.textContent.trim();

  if (!badgeText) return null;

  const badge = document.createElement('span');
  badge.className = 'product-cards-card-badge';
  badge.textContent = badgeText;
  return badge;
}

export default function decorate(block) {
  const list = document.createElement('ul');

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const [
      imageCell,
      nameCell,
      descriptionCell,
      ctaCell,
      badgeCell,
    ] = cells;

    if (!imageCell || !nameCell || !descriptionCell || !ctaCell) return;

    const item = document.createElement('li');
    const article = document.createElement('article');
    article.className = 'product-cards-card';

    const media = document.createElement('div');
    media.className = 'product-cards-card-image';
    const image = optimizeImage(imageCell);
    if (image) media.append(image);

    const badge = buildBadge(badgeCell);
    if (badge) media.append(badge);

    const body = document.createElement('div');
    body.className = 'product-cards-card-body';
    body.append(buildTitle(nameCell));
    body.append(buildDescription(descriptionCell));

    const cta = buildCta(ctaCell);
    if (cta) body.append(cta);

    article.append(media, body);
    item.append(article);
    list.append(item);
  });

  block.replaceChildren(list);
}
