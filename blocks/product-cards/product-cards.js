import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'product-card';

    const cells = [...row.children];

    cells.forEach((cell) => {
      if (cell.querySelector('picture')) {
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'product-card-image';

        const picture = cell.querySelector('picture');
        if (picture) {
          imageWrapper.append(picture);
        }

        const badge = cell.querySelector('p:not(:has(picture))');
        if (badge && badge.textContent.trim()) {
          const badgeEl = document.createElement('span');
          badgeEl.className = 'product-card-badge';
          badgeEl.textContent = badge.textContent.trim();
          imageWrapper.append(badgeEl);
          badge.remove();
        }

        li.append(imageWrapper);
      } else {
        const content = cell.cloneNode(true);

        const firstElement = content.firstElementChild;
        if (firstElement && (firstElement.tagName === 'H1'
            || firstElement.tagName === 'H2'
            || firstElement.tagName === 'H3'
            || firstElement.tagName === 'H4'
            || firstElement.tagName === 'H5'
            || firstElement.tagName === 'H6')) {
          const titleWrapper = document.createElement('div');
          titleWrapper.className = 'product-card-title';
          titleWrapper.append(firstElement);
          li.append(titleWrapper);
        }

        const description = content.querySelector('p:not(.button-wrapper)');
        if (description) {
          const descWrapper = document.createElement('div');
          descWrapper.className = 'product-card-description';
          descWrapper.append(description);
          li.append(descWrapper);
        }

        const buttonWrapper = content.querySelector('.button-wrapper');
        if (buttonWrapper) {
          const ctaWrapper = document.createElement('div');
          ctaWrapper.className = 'product-card-cta';
          ctaWrapper.append(buttonWrapper);
          li.append(ctaWrapper);
        }
      }
    });

    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }]),
    );
  });

  block.replaceChildren(ul);
}
