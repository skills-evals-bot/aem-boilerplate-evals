export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

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

    // add row index for z-pattern variant
    if (block.classList.contains('z-pattern')) {
      row.classList.add(`row-${rowIndex + 1}`);
      if ((rowIndex + 1) % 2 === 0) {
        row.classList.add('reverse');
      }
    }
  });
}
