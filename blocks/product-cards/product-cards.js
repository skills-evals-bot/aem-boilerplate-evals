import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Decorates the product cards block
 * @param {Element} block The product cards block element
 */
export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'product-card';

    while (row.firstElementChild) li.append(row.firstElementChild);

    const imageContainer = li.querySelector('picture')?.parentElement;
    let badge = null;

    if (imageContainer) {
      imageContainer.className = 'product-card-image';

      const badgeText = imageContainer.querySelector('p');
      if (badgeText && badgeText.textContent.trim()) {
        badge = document.createElement('span');
        badge.className = 'product-card-badge';
        badge.textContent = badgeText.textContent.trim();
        badgeText.remove();
      }
    }

    [...li.children].forEach((div) => {
      if (div.classList.contains('product-card-image')) {
        return;
      }

      if (div.querySelector('h1, h2, h3, h4, h5, h6')) {
        div.className = 'product-card-title';
      } else if (div.querySelector('a')) {
        div.className = 'product-card-cta';
        const link = div.querySelector('a');
        if (link) {
          link.classList.add('button');
          const strong = link.closest('strong');
          const em = link.closest('em');
          if (strong && em) {
            link.classList.add('accent');
          } else if (strong) {
            link.classList.add('primary');
          } else if (em) {
            link.classList.add('secondary');
          }
        }
      } else if (div.querySelector('p')) {
        div.className = 'product-card-description';
      }
    });

    if (badge && imageContainer) {
      imageContainer.appendChild(badge);
    }

    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [
      { width: '400' },
    ]);
    img.closest('picture').replaceWith(optimizedPicture);
  });

  block.replaceChildren(ul);
}
