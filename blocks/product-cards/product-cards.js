import { createOptimizedPicture } from '../../scripts/aem.js';

function createCardImage(imageCell, badgeCell) {
  const wrapper = document.createElement('div');
  wrapper.className = 'product-cards-card-image';

  const image = imageCell.querySelector('img');
  if (image) {
    const optimizedPicture = createOptimizedPicture(image.src, image.alt, false, [{ width: '750' }]);
    wrapper.append(optimizedPicture);
  }

  const badgeText = badgeCell?.textContent.trim();
  if (badgeText) {
    const badge = document.createElement('p');
    badge.className = 'product-cards-card-badge';
    badge.textContent = badgeText;
    wrapper.append(badge);
  }

  return wrapper;
}

function createBodySection(cell, className) {
  const section = document.createElement('div');
  section.className = className;
  section.append(...cell.childNodes);
  return section;
}

function createCardLink(linkCell) {
  const wrapper = document.createElement('div');
  wrapper.className = 'product-cards-card-cta';

  const link = linkCell.querySelector('a[href]');
  if (link) {
    link.title = link.title || link.textContent.trim();
    wrapper.append(link);
  } else {
    wrapper.append(...linkCell.childNodes);
  }

  return wrapper;
}

export default function decorate(block) {
  const list = document.createElement('ul');

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 4) return;

    const [imageCell, nameCell, descriptionCell, linkCell, badgeCell] = cells;
    const item = document.createElement('li');
    const article = document.createElement('article');
    article.className = 'product-cards-card';

    article.append(createCardImage(imageCell, badgeCell));

    const body = document.createElement('div');
    body.className = 'product-cards-card-body';
    body.append(
      createBodySection(nameCell, 'product-cards-card-name'),
      createBodySection(descriptionCell, 'product-cards-card-description'),
      createCardLink(linkCell),
    );

    article.append(body);
    item.append(article);
    list.append(item);
  });

  block.replaceChildren(list);
}
