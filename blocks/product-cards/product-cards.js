import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Decorates the product cards block.
 * Expected structure per card row:
 * - Cell 1: Image (with optional badge as text before/after image)
 * - Cell 2: Product name (heading)
 * - Cell 3: Description (paragraph)
 * - Cell 4: CTA link
 *
 * Badge syntax: Authors can add badge text in the same cell as the image,
 * either before or after the picture element.
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'product-cards-card';

    const cells = [...row.children];

    if (cells.length >= 4) {
      const imageCell = cells[0];
      const nameCell = cells[1];
      const descriptionCell = cells[2];
      const ctaCell = cells[3];

      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.className = 'product-cards-card-image';

      const picture = imageCell.querySelector('picture');
      let badgeText = '';

      if (picture) {
        const textNodes = [...imageCell.childNodes].filter(
          (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim(),
        );
        const textElements = [...imageCell.children].filter(
          (el) => el.tagName !== 'PICTURE',
        );

        if (textNodes.length > 0) {
          badgeText = textNodes[0].textContent.trim();
        } else if (textElements.length > 0) {
          badgeText = textElements[0].textContent.trim();
        }

        const img = picture.querySelector('img');
        if (img) {
          const optimizedPicture = createOptimizedPicture(
            img.src,
            img.alt,
            false,
            [{ width: '750' }],
          );
          cardImageWrapper.append(optimizedPicture);
        }
      }

      if (badgeText) {
        const badge = document.createElement('span');
        badge.className = 'product-cards-badge';
        badge.textContent = badgeText;
        cardImageWrapper.append(badge);
      }

      li.append(cardImageWrapper);

      const cardBody = document.createElement('div');
      cardBody.className = 'product-cards-card-body';

      const name = document.createElement('h3');
      name.className = 'product-cards-card-name';
      name.textContent = nameCell.textContent.trim();
      cardBody.append(name);

      const description = document.createElement('p');
      description.className = 'product-cards-card-description';
      description.textContent = descriptionCell.textContent.trim();
      cardBody.append(description);

      const ctaLink = ctaCell.querySelector('a');
      if (ctaLink) {
        ctaLink.className = 'product-cards-card-cta';
        cardBody.append(ctaLink);
      }

      li.append(cardBody);
    }

    ul.append(li);
  });

  block.replaceChildren(ul);
}
