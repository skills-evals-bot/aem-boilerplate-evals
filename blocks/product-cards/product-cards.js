/**
 * Decorates the product cards block
 * @param {Element} block The product-cards block element
 */
export default async function decorate(block) {
  const cards = [];

  [...block.children].forEach((row) => {
    const card = {};
    const cells = [...row.children];

    if (cells[0]) {
      const picture = cells[0].querySelector('picture');
      card.image = picture || null;
    }

    if (cells[1]) {
      card.name = cells[1].textContent.trim();
    }

    if (cells[2]) {
      card.description = cells[2].textContent.trim();
    }

    if (cells[3]) {
      const link = cells[3].querySelector('a');
      card.link = link || null;
    }

    if (cells[4]) {
      const badgeText = cells[4].textContent.trim();
      card.badge = badgeText || null;
    }

    cards.push(card);
  });

  block.textContent = '';

  const grid = document.createElement('div');
  grid.className = 'product-cards-grid';

  cards.forEach((card) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'product-card';

    if (card.image) {
      const imageContainer = document.createElement('div');
      imageContainer.className = 'product-card-image';
      imageContainer.appendChild(card.image);

      if (card.badge) {
        const badge = document.createElement('span');
        badge.className = 'product-card-badge';
        badge.textContent = card.badge;
        imageContainer.appendChild(badge);
      }

      cardEl.appendChild(imageContainer);
    }

    const content = document.createElement('div');
    content.className = 'product-card-content';

    if (card.name) {
      const name = document.createElement('h3');
      name.className = 'product-card-name';
      name.textContent = card.name;
      content.appendChild(name);
    }

    if (card.description) {
      const description = document.createElement('p');
      description.className = 'product-card-description';
      description.textContent = card.description;
      content.appendChild(description);
    }

    if (card.link) {
      const linkWrapper = document.createElement('p');
      linkWrapper.className = 'button-wrapper';
      card.link.className = 'button primary';
      linkWrapper.appendChild(card.link);
      content.appendChild(linkWrapper);
    }

    cardEl.appendChild(content);
    grid.appendChild(cardEl);
  });

  block.appendChild(grid);
}
