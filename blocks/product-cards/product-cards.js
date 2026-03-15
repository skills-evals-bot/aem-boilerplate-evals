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

    cells.forEach((cell, index) => {
      if (index === 0 && cell.querySelector('picture')) {
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'product-card-image';

        const picture = cell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '600' }]);
          imageWrapper.append(optimizedPicture);
        }

        const textContent = cell.textContent.trim();
        const pictureText = picture ? picture.textContent : '';
        const badge = textContent.replace(pictureText, '').trim();

        if (badge) {
          const badgeEl = document.createElement('span');
          badgeEl.className = 'product-card-badge';
          badgeEl.textContent = badge;
          imageWrapper.append(badgeEl);
        }

        li.append(imageWrapper);
      } else {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'product-card-body';

        const heading = cell.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) {
          const productName = document.createElement('h3');
          productName.className = 'product-card-name';
          productName.textContent = heading.textContent;
          contentDiv.append(productName);
          heading.remove();
        }

        const description = document.createElement('div');
        description.className = 'product-card-description';

        const link = cell.querySelector('a');
        if (link) {
          const linkClone = link.cloneNode(true);
          link.remove();

          while (cell.firstChild) {
            description.append(cell.firstChild);
          }

          const ctaWrapper = document.createElement('div');
          ctaWrapper.className = 'product-card-cta';

          linkClone.className = 'button primary';
          ctaWrapper.append(linkClone);

          contentDiv.append(description);
          contentDiv.append(ctaWrapper);
        } else {
          while (cell.firstChild) {
            description.append(cell.firstChild);
          }
          contentDiv.append(description);
        }

        li.append(contentDiv);
      }
    });

    ul.append(li);
  });

  block.replaceChildren(ul);
}
