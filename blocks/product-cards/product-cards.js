import { createOptimizedPicture } from '../../scripts/aem.js';

function buildImageColumn(column, badgeText) {
  const wrapper = document.createElement('div');
  wrapper.className = 'product-cards-card-image';

  const picture = column.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      wrapper.append(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
    }
  }

  if (badgeText) {
    const badge = document.createElement('p');
    badge.className = 'product-cards-card-badge';
    badge.textContent = badgeText;
    wrapper.append(badge);
  }

  return wrapper;
}

function buildBodyColumn(titleColumn, descriptionColumn, ctaColumn) {
  const body = document.createElement('div');
  body.className = 'product-cards-card-body';

  const title = document.createElement('h3');
  title.className = 'product-cards-card-title';
  title.innerHTML = titleColumn.innerHTML;
  body.append(title);

  const description = document.createElement('div');
  description.className = 'product-cards-card-description';
  description.innerHTML = descriptionColumn.innerHTML;
  body.append(description);

  const ctaLink = ctaColumn.querySelector('a');
  if (ctaLink) {
    const ctaWrapper = document.createElement('p');
    ctaWrapper.className = 'product-cards-card-cta';
    ctaLink.classList.add('product-cards-card-link');
    ctaWrapper.append(ctaLink);
    body.append(ctaWrapper);
  }

  return body;
}

export default function decorate(block) {
  const list = document.createElement('ul');

  [...block.children].forEach((row) => {
    const columns = [...row.children];
    const [imageColumn, titleColumn, descriptionColumn, ctaColumn, badgeColumn] = columns;

    if (!imageColumn || !titleColumn || !descriptionColumn || !ctaColumn) {
      return;
    }

    const item = document.createElement('li');
    item.className = 'product-cards-card';

    const badgeText = badgeColumn?.textContent.trim();
    item.append(buildImageColumn(imageColumn, badgeText));
    item.append(buildBodyColumn(titleColumn, descriptionColumn, ctaColumn));

    list.append(item);
  });

  block.replaceChildren(list);
}
