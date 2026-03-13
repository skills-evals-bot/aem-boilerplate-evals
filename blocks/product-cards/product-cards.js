import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Decorates the product cards block.
 * Expected structure per card (rows in authored content):
 * - Row 1: Image (with optional badge text in first cell, image in second cell)
 *   OR just Image (no badge)
 * - Row 2: Product name
 * - Row 3: Description
 * - Row 4: CTA link
 * @param {Element} block The product cards block element
 */
export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'product-card';

    const cells = [...row.children];
    let cellIndex = 0;

    let badge = null;
    let picture = null;
    let productName = null;
    let description = null;
    let cta = null;

    cells.forEach((cell) => {
      const img = cell.querySelector('picture');
      const link = cell.querySelector('a');
      const text = cell.textContent.trim();

      if (img && !picture) {
        picture = img;
      } else if (text && !picture && !link) {
        if (cellIndex === 0 && cells.length > 1 && cells[1].querySelector('picture')) {
          badge = text;
        } else if (!productName) {
          productName = text;
        } else if (!description) {
          description = text;
        }
      } else if (link && !cta) {
        cta = link;
      } else if (text && !productName) {
        productName = text;
      } else if (text && !description) {
        description = text;
      }

      cellIndex += 1;
    });

    if (picture) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'product-card-image';

      const img = picture.querySelector('img');
      if (img) {
        const optimizedPicture = createOptimizedPicture(
          img.src,
          img.alt || productName || '',
          false,
          [{ width: '750' }],
        );
        imageWrapper.appendChild(optimizedPicture);
      }

      if (badge) {
        const badgeEl = document.createElement('span');
        badgeEl.className = 'product-card-badge';
        badgeEl.textContent = badge;
        imageWrapper.appendChild(badgeEl);
      }

      li.appendChild(imageWrapper);
    }

    const body = document.createElement('div');
    body.className = 'product-card-body';

    if (productName) {
      const nameEl = document.createElement('h3');
      nameEl.className = 'product-card-name';
      nameEl.textContent = productName;
      body.appendChild(nameEl);
    }

    if (description) {
      const descEl = document.createElement('p');
      descEl.className = 'product-card-description';
      descEl.textContent = description;
      body.appendChild(descEl);
    }

    if (cta) {
      const ctaWrapper = document.createElement('p');
      ctaWrapper.className = 'product-card-cta';
      cta.className = 'button primary';
      ctaWrapper.appendChild(cta);
      body.appendChild(ctaWrapper);
    }

    li.appendChild(body);
    ul.appendChild(li);
  });

  block.replaceChildren(ul);
}
