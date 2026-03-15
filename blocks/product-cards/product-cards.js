import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * decorate the product cards block
 * @param {Element} block the block
 */
export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'product-card';

    const cells = [...row.children];

    // First cell contains image and optional badge
    const imageCell = cells[0];
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'product-card-image';

    // Check if there's badge text before the picture
    const textNodes = [...imageCell.childNodes].filter(
      (node) => (node.nodeType === Node.TEXT_NODE && node.textContent.trim())
        || (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'PICTURE'),
    );

    const picture = imageCell.querySelector('picture');

    if (textNodes.length > 0 && picture) {
      // Extract badge text
      const badgeText = textNodes.map((node) => (node.nodeType === Node.TEXT_NODE ? node.textContent : node.textContent)).join('').trim();

      if (badgeText) {
        const badge = document.createElement('span');
        badge.className = 'product-badge';
        badge.textContent = badgeText;
        imageWrapper.append(badge);
      }
    }

    if (picture) {
      imageWrapper.append(picture);
    }

    // Second cell contains heading, description, and CTA
    const contentCell = cells[1];
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'product-card-body';

    while (contentCell?.firstElementChild) {
      contentWrapper.append(contentCell.firstElementChild);
    }

    li.append(imageWrapper, contentWrapper);
    ul.append(li);
  });

  // Optimize all images
  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]),
    );
  });

  block.replaceChildren(ul);
}
