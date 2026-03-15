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

    // Process each cell in the row
    cells.forEach((cell, index) => {
      if (index === 0) {
        // First cell: Image with optional badge
        const picture = cell.querySelector('picture');
        const badge = cell.querySelector('p:not(:has(picture))');

        if (picture) {
          const imageContainer = document.createElement('div');
          imageContainer.className = 'product-card-image';

          // Check for badge text
          if (badge && badge.textContent.trim()) {
            const badgeElement = document.createElement('span');
            badgeElement.className = 'product-card-badge';
            badgeElement.textContent = badge.textContent.trim();
            imageContainer.appendChild(badgeElement);
          }

          imageContainer.appendChild(picture);
          li.appendChild(imageContainer);
        }
      } else if (index === 1) {
        // Second cell: Product name
        const name = cell.querySelector('p, h1, h2, h3, h4, h5, h6');
        if (name) {
          const nameContainer = document.createElement('div');
          nameContainer.className = 'product-card-name';
          nameContainer.textContent = name.textContent;
          li.appendChild(nameContainer);
        }
      } else if (index === 2) {
        // Third cell: Description
        const description = cell.querySelector('p');
        if (description) {
          const descContainer = document.createElement('div');
          descContainer.className = 'product-card-description';
          descContainer.textContent = description.textContent;
          li.appendChild(descContainer);
        }
      } else if (index === 3) {
        // Fourth cell: CTA
        const link = cell.querySelector('a');
        if (link) {
          const ctaContainer = document.createElement('div');
          ctaContainer.className = 'product-card-cta';
          ctaContainer.appendChild(link);
          li.appendChild(ctaContainer);
        }
      }
    });

    ul.appendChild(li);
  });

  // Optimize images
  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]),
    );
  });

  block.replaceChildren(ul);
}
