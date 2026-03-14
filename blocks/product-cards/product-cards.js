import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Decorates the product cards block
 * Expected structure per card (row):
 * - Column 1: Image
 * - Column 2: Badge text (optional)
 * - Column 3: Product name
 * - Column 4: Description
 * - Column 5: CTA link
 * @param {Element} block The product cards block element
 */
export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'product-card';

    const cells = [...row.children];

    const imageCell = cells[0];
    const badgeCell = cells[1];
    const nameCell = cells[2];
    const descriptionCell = cells[3];
    const ctaCell = cells[4];

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'product-card-image';

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          imageWrapper.append(createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }]));
        }
      }

      if (badgeCell && badgeCell.textContent.trim()) {
        const badge = document.createElement('span');
        badge.className = 'product-card-badge';
        badge.textContent = badgeCell.textContent.trim();
        imageWrapper.append(badge);
      }
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'product-card-body';

    if (nameCell) {
      const name = document.createElement('h3');
      name.className = 'product-card-name';
      name.textContent = nameCell.textContent.trim();
      contentWrapper.append(name);
    }

    if (descriptionCell) {
      const description = document.createElement('p');
      description.className = 'product-card-description';
      description.textContent = descriptionCell.textContent.trim();
      contentWrapper.append(description);
    }

    if (ctaCell) {
      const link = ctaCell.querySelector('a');
      if (link) {
        link.className = 'product-card-cta';
        const ctaWrapper = document.createElement('div');
        ctaWrapper.className = 'product-card-cta-wrapper';
        ctaWrapper.append(link);
        contentWrapper.append(ctaWrapper);
      }
    }

    li.append(imageWrapper, contentWrapper);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
