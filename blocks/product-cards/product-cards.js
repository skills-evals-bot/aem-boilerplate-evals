import { createOptimizedPicture } from '../../scripts/aem.js';

function getTextContent(element) {
  return element?.textContent.trim() || '';
}

function moveChildren(source, target) {
  while (source?.firstChild) {
    target.append(source.firstChild);
  }
}

function createCard(row) {
  const cells = [...row.children];

  if (cells.length === 0) {
    return null;
  }

  const [imageCell, nameCell, descriptionCell, ctaCell, badgeCell] = cells;
  const item = document.createElement('li');
  const article = document.createElement('article');
  article.className = 'product-cards-card';

  if (imageCell) {
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'product-cards-card-image';

    const image = imageCell.querySelector('img');
    if (image) {
      const optimizedPicture = createOptimizedPicture(image.src, image.alt, false, [
        { media: '(min-width: 900px)', width: '600' },
        { media: '(min-width: 600px)', width: '500' },
        { width: '750' },
      ]);
      imageWrapper.append(optimizedPicture);
    }

    const badgeText = getTextContent(badgeCell);
    if (badgeText) {
      const badge = document.createElement('p');
      badge.className = 'product-cards-badge';
      badge.textContent = badgeText;
      imageWrapper.append(badge);
    }

    article.append(imageWrapper);
  }

  const body = document.createElement('div');
  body.className = 'product-cards-card-body';

  if (nameCell) {
    const title = nameCell.querySelector('h1, h2, h3, h4, h5, h6') || document.createElement('h3');
    title.classList.add('product-cards-card-title');
    if (!title.parentElement) {
      title.textContent = getTextContent(nameCell);
    }
    body.append(title);
  }

  if (descriptionCell) {
    const description = document.createElement('div');
    description.className = 'product-cards-card-description';
    moveChildren(descriptionCell, description);
    body.append(description);
  }

  if (ctaCell) {
    const cta = document.createElement('div');
    cta.className = 'product-cards-card-cta';
    moveChildren(ctaCell, cta);

    const link = cta.querySelector('a');
    if (link) {
      link.title = link.title || link.textContent.trim();
      link.setAttribute('aria-label', link.getAttribute('aria-label') || `${link.textContent.trim()} ${getTextContent(nameCell)}`.trim());
    }

    body.append(cta);
  }

  article.append(body);
  item.append(article);

  return item;
}

/**
 * loads and decorates the product cards block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const list = document.createElement('ul');

  [...block.children].forEach((row) => {
    const card = createCard(row);
    if (card) list.append(card);
  });

  block.replaceChildren(list);
}
