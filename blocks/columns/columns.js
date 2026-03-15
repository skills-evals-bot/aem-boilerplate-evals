export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  const isZPattern = block.classList.contains('z-pattern');

  // setup image columns
  [...block.children].forEach((row, rowIndex) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });

    // apply z-pattern alternating layout
    if (isZPattern && rowIndex % 2 === 1) {
      row.classList.add('columns-row-reversed');
    }
  });
}
