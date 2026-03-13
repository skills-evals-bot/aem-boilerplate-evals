import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * loads and decorates the product cards block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'product-card';

    const cells = [...row.children];
    let badge = null;

    cells.forEach((cell, index) => {
      if (index === 0) {
        const picture = cell.querySelector('picture');
        const textContent = cell.textContent.trim();

        if (picture) {
          const imageWrapper = document.createElement('div');
          imageWrapper.className = 'product-card-image';

          const img = picture.querySelector('img');
          if (img) {
            const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
            imageWrapper.append(optimizedPicture);
          }

          const badgeText = textContent.replace(img?.alt || '', '').trim();
          if (badgeText) {
            badge = document.createElement('span');
            badge.className = 'product-card-badge';
            badge.textContent = badgeText;
            imageWrapper.append(badge);
          }

          li.append(imageWrapper);
        }
      } else if (index === 1) {
        const heading = cell.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) {
          const title = document.createElement('h3');
          title.className = 'product-card-title';
          title.textContent = heading.textContent;
          li.append(title);
        } else if (cell.textContent.trim()) {
          const title = document.createElement('h3');
          title.className = 'product-card-title';
          title.textContent = cell.textContent.trim();
          li.append(title);
        }
      } else if (index === 2) {
        if (cell.textContent.trim()) {
          const description = document.createElement('p');
          description.className = 'product-card-description';
          description.textContent = cell.textContent.trim();
          li.append(description);
        }
      } else if (index === 3) {
        const link = cell.querySelector('a');
        if (link) {
          const ctaWrapper = document.createElement('div');
          ctaWrapper.className = 'product-card-cta';

          const cta = document.createElement('a');
          cta.href = link.href;
          cta.textContent = link.textContent;
          cta.className = 'button primary';
          cta.title = link.title || link.textContent;

          ctaWrapper.append(cta);
          li.append(ctaWrapper);
        }
      }
    });

    ul.append(li);
  });

  block.replaceChildren(ul);
}
