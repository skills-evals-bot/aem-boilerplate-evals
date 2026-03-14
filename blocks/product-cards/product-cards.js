/**
 * Decorates the product cards block
 * Expected structure: Each row represents a card with:
 * - Column 1: Image
 * - Column 2: Badge text (optional)
 * - Column 3: Product name
 * - Column 4: Description
 * - Column 5: CTA link
 * @param {Element} block The product cards block element
 */
export default function decorate(block) {
  const cards = [];

  [...block.children].forEach((row) => {
    const cells = [...row.children];

    if (cells.length < 4) {
      return;
    }

    const card = document.createElement('div');
    card.className = 'product-card';

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'product-card-image';

    const picture = cells[0].querySelector('picture');
    if (picture) {
      imageWrapper.appendChild(picture);
    }

    const badgeText = cells[1]?.textContent.trim();
    if (badgeText) {
      const badge = document.createElement('span');
      badge.className = 'product-card-badge';
      badge.textContent = badgeText;
      imageWrapper.appendChild(badge);
    }

    const content = document.createElement('div');
    content.className = 'product-card-content';

    const name = document.createElement('h3');
    name.className = 'product-card-name';
    name.textContent = cells[2]?.textContent.trim() || '';
    content.appendChild(name);

    const description = document.createElement('p');
    description.className = 'product-card-description';
    description.textContent = cells[3]?.textContent.trim() || '';
    content.appendChild(description);

    const linkCell = cells[4] || cells[3];
    const link = linkCell?.querySelector('a');
    if (link) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.className = 'product-card-cta';
      const ctaLink = link.cloneNode(true);
      ctaLink.className = 'button primary';
      ctaWrapper.appendChild(ctaLink);
      content.appendChild(ctaWrapper);
    }

    card.appendChild(imageWrapper);
    card.appendChild(content);
    cards.push(card);
  });

  block.textContent = '';
  cards.forEach((card) => {
    block.appendChild(card);
  });
}
