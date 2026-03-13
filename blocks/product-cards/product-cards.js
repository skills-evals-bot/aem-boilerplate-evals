import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'product-card';

    const cells = [...row.children];
    const imageCell = cells[0];
    const nameCell = cells[1];
    const descCell = cells[2];
    const ctaCell = cells[3];
    const badgeCell = cells[4];

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'product-card-image-wrapper';

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          imageWrapper.append(optimizedPicture);
        }
      }
    }

    if (badgeCell && badgeCell.textContent.trim()) {
      const badge = document.createElement('span');
      badge.className = 'product-card-badge';
      badge.textContent = badgeCell.textContent.trim();
      imageWrapper.append(badge);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'product-card-content';

    if (nameCell && nameCell.textContent.trim()) {
      const name = document.createElement('h3');
      name.className = 'product-card-name';
      name.textContent = nameCell.textContent.trim();
      contentWrapper.append(name);
    }

    if (descCell && descCell.textContent.trim()) {
      const desc = document.createElement('p');
      desc.className = 'product-card-description';
      desc.textContent = descCell.textContent.trim();
      contentWrapper.append(desc);
    }

    if (ctaCell) {
      const ctaLink = ctaCell.querySelector('a');
      if (ctaLink) {
        ctaLink.className = 'product-card-cta';
        const ctaWrapper = document.createElement('div');
        ctaWrapper.className = 'product-card-cta-wrapper';
        ctaWrapper.append(ctaLink);
        contentWrapper.append(ctaWrapper);
      }
    }

    li.append(imageWrapper);
    li.append(contentWrapper);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
