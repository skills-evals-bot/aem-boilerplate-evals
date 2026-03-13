import { createOptimizedPicture } from '../../scripts/aem.js';

function appendClonedChildren(target, source) {
  target.append(...[...source.childNodes].map((child) => child.cloneNode(true)));
}

function buildImageCell(content, badgeText) {
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'product-cards-card-image';

  const image = content.querySelector('picture, img');
  if (image) {
    const sourceImage = image.tagName === 'PICTURE' ? image.querySelector('img') : image;
    if (sourceImage?.src) {
      imageWrapper.append(
        createOptimizedPicture(sourceImage.src, sourceImage.alt, false, [{ width: '750' }]),
      );
    }
  }

  if (badgeText) {
    const badge = document.createElement('span');
    badge.className = 'product-cards-card-badge';
    badge.textContent = badgeText;
    imageWrapper.append(badge);
  }

  return imageWrapper;
}

function buildBodyCell(nameContent, descriptionContent, ctaContent) {
  const body = document.createElement('div');
  body.className = 'product-cards-card-body';

  if (nameContent?.textContent.trim()) {
    const title = document.createElement('h3');
    title.className = 'product-cards-card-title';
    appendClonedChildren(title, nameContent);
    body.append(title);
  }

  if (descriptionContent?.textContent.trim()) {
    const description = document.createElement('div');
    description.className = 'product-cards-card-description';
    appendClonedChildren(description, descriptionContent);
    body.append(description);
  }

  const ctaLink = ctaContent?.querySelector('a[href]');
  if (ctaLink) {
    const cta = ctaLink.cloneNode(true);
    cta.classList.add('product-cards-card-cta');
    cta.title = cta.title || cta.textContent.trim();
    body.append(cta);
  }

  return body;
}

export default function decorate(block) {
  const list = document.createElement('ul');

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const [imageContent, nameContent, descriptionContent, ctaContent, badgeContent] = cells;

    if (!imageContent && !nameContent && !descriptionContent && !ctaContent) {
      return;
    }

    const item = document.createElement('li');
    item.className = 'product-cards-card';

    const badgeText = badgeContent?.textContent.trim();
    item.append(buildImageCell(imageContent || document.createElement('div'), badgeText));
    item.append(buildBodyCell(nameContent, descriptionContent, ctaContent));

    list.append(item);
  });

  block.replaceChildren(list);
}
