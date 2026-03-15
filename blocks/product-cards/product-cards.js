import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'product-cards-card-image';
      } else if (div.querySelector('picture')) {
        // Image column with extra text = badge
        const badge = div.querySelector('p:not(:has(picture))');
        if (badge) {
          const badgeEl = document.createElement('span');
          badgeEl.className = 'product-cards-card-badge';
          badgeEl.textContent = badge.textContent.trim();
          badge.remove();
        }
        div.className = 'product-cards-card-image';
        // Store badge to append after image wrapper is set up
        const badgeText = div.querySelector('.product-cards-card-badge');
        if (badgeText) div.append(badgeText);
      } else {
        div.className = 'product-cards-card-body';
      }
    });

    // Handle badge: check if first text in image div was extracted
    // Alternative approach: badge is authored as first cell text alongside image
    const imageDiv = li.querySelector('.product-cards-card-image');
    if (imageDiv) {
      // Check for badge text nodes or paragraphs without pictures
      const nonPictureParagraphs = [...imageDiv.querySelectorAll('p')].filter(
        (p) => !p.querySelector('picture'),
      );
      nonPictureParagraphs.forEach((p) => {
        const text = p.textContent.trim();
        if (text) {
          const badge = document.createElement('span');
          badge.className = 'product-cards-card-badge';
          badge.textContent = text;
          imageDiv.append(badge);
        }
        p.remove();
      });
    }

    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]),
    );
  });

  block.replaceChildren(ul);
}
