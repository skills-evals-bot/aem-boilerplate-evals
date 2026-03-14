import { createOptimizedPicture } from '../../scripts/aem.js';

function appendCellContent(target, cell) {
  if (!cell) return;
  [...cell.childNodes].forEach((node) => target.append(node));
}

function buildTitle(cell) {
  if (!cell) return null;

  const heading = cell.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) {
    heading.classList.add('product-cards-card-title');
    return heading;
  }

  const text = cell.textContent.trim();
  if (!text) return null;

  const title = document.createElement('h3');
  title.className = 'product-cards-card-title';
  title.textContent = text;
  return title;
}

function buildDescription(cell) {
  if (!cell) return null;

  const description = document.createElement('div');
  description.className = 'product-cards-card-description';
  appendCellContent(description, cell);

  return description.textContent.trim() ? description : null;
}

function buildCta(cell) {
  const link = cell?.querySelector('a[href]');
  if (!link) return null;

  const ctaWrapper = document.createElement('p');
  ctaWrapper.className = 'product-cards-card-cta';
  link.classList.add('button', 'primary');
  ctaWrapper.append(link);
  return ctaWrapper;
}

function buildMedia(imageCell, badgeCell, eager = false) {
  const image = imageCell?.querySelector('img');
  const badgeText = badgeCell?.textContent.trim();
  if (!image && !badgeText) return null;

  const media = document.createElement('div');
  media.className = 'product-cards-card-media';

  if (image) {
    const picture = createOptimizedPicture(
      image.src,
      image.alt,
      eager,
      [{ media: '(min-width: 900px)', width: '600' }, { width: '400' }],
    );
    media.append(picture);
  }

  if (badgeText) {
    const badge = document.createElement('span');
    badge.className = 'product-cards-card-badge';
    badge.textContent = badgeText;
    media.append(badge);
  }

  return media;
}

export default function decorate(block) {
  const list = document.createElement('ul');

  [...block.children].forEach((row, index) => {
    const [imageCell, nameCell, descriptionCell, ctaCell, badgeCell] = [...row.children];
    const item = document.createElement('li');
    const card = document.createElement('article');
    card.className = 'product-cards-card';

    const media = buildMedia(imageCell, badgeCell, index === 0);
    if (media) card.append(media);

    const body = document.createElement('div');
    body.className = 'product-cards-card-body';

    const title = buildTitle(nameCell);
    if (title) body.append(title);

    const description = buildDescription(descriptionCell);
    if (description) body.append(description);

    const cta = buildCta(ctaCell);
    if (cta) body.append(cta);

    card.append(body);
    item.append(card);
    list.append(item);
  });

  block.replaceChildren(list);
}
