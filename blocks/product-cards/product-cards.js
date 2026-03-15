import { createOptimizedPicture } from '../../scripts/aem.js';

function createTitleElement(content) {
  const title = document.createElement('h3');
  title.className = 'product-cards-card-title';
  title.textContent = content.textContent.trim();
  return title;
}

function createDescriptionElement(content) {
  const description = document.createElement('div');
  description.className = 'product-cards-card-description';
  description.append(...content.childNodes);
  return description;
}

function createImageElement(content, badgeText, productName) {
  const wrapper = document.createElement('div');
  wrapper.className = 'product-cards-card-image';

  const picture = content.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPicture = createOptimizedPicture(
      img.src,
      img.alt || productName,
      false,
      [{ width: '600' }],
    );
    wrapper.append(optimizedPicture);
  }

  if (badgeText) {
    const badge = document.createElement('span');
    badge.className = 'product-cards-card-badge';
    badge.textContent = badgeText;
    wrapper.append(badge);
  }

  return wrapper;
}

function createCtaElement(content) {
  if (!content) return null;

  const link = content.querySelector('a[href]');
  if (!link) return null;

  const wrapper = document.createElement('p');
  wrapper.className = 'product-cards-card-cta';
  link.classList.add('product-cards-card-link');
  wrapper.append(link);
  return wrapper;
}

function decorateRow(row) {
  const columns = [...row.children];
  if (columns.length < 3) return null;

  const [imageContent, nameContent, descriptionContent, ctaContent, badgeContent] = columns;
  const productName = nameContent.textContent.trim();
  const badgeText = badgeContent?.textContent.trim();

  const card = document.createElement('li');
  card.className = 'product-cards-card';

  const article = document.createElement('article');
  article.className = 'product-cards-card-content';

  article.append(createImageElement(imageContent, badgeText, productName));

  const body = document.createElement('div');
  body.className = 'product-cards-card-body';
  body.append(
    createTitleElement(nameContent),
    createDescriptionElement(descriptionContent),
  );

  const cta = createCtaElement(ctaContent);
  if (cta) body.append(cta);

  article.append(body);
  card.append(article);
  return card;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const list = document.createElement('ul');

  [...block.children].forEach((row) => {
    const card = decorateRow(row);
    if (card) list.append(card);
  });

  block.replaceChildren(list);
}
