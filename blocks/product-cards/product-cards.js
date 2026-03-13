import { createOptimizedPicture } from '../../scripts/aem.js';

function moveNodes(source, target) {
  while (source.firstChild) target.append(source.firstChild);
}

function buildImage(imageCell, badgeText) {
  const media = document.createElement('div');
  media.className = 'product-cards-card-image';

  const picture = imageCell?.querySelector('picture');
  const image = picture?.querySelector('img');

  if (image) {
    media.append(createOptimizedPicture(image.src, image.alt, false, [{ width: '750' }]));
  }

  if (badgeText) {
    const badge = document.createElement('p');
    badge.className = 'product-cards-card-badge';
    badge.textContent = badgeText;
    media.append(badge);
  }

  return media;
}

function buildContent(nameCell, descriptionCell, ctaCell) {
  const content = document.createElement('div');
  content.className = 'product-cards-card-content';

  if (nameCell?.textContent.trim()) {
    const name = document.createElement('div');
    name.className = 'product-cards-card-name';
    moveNodes(nameCell, name);
    content.append(name);
  }

  if (descriptionCell?.textContent.trim()) {
    const description = document.createElement('div');
    description.className = 'product-cards-card-description';
    moveNodes(descriptionCell, description);
    content.append(description);
  }

  if (ctaCell?.textContent.trim()) {
    const cta = document.createElement('div');
    cta.className = 'product-cards-card-cta';
    moveNodes(ctaCell, cta);
    cta.querySelectorAll('a').forEach((link) => link.classList.add('product-cards-card-link'));
    content.append(cta);
  }

  return content;
}

/** @param {Element} block */
export default function decorate(block) {
  const list = document.createElement('ul');

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const [imageCell, nameCell, descriptionCell, ctaCell, badgeCell] = cells;
    const badgeText = badgeCell?.textContent.trim();

    const item = document.createElement('li');
    item.className = 'product-cards-card';

    const card = document.createElement('article');
    card.className = 'product-cards-card-panel';
    card.append(buildImage(imageCell, badgeText));
    card.append(buildContent(nameCell, descriptionCell, ctaCell));

    item.append(card);
    list.append(item);
  });

  block.replaceChildren(list);
}
