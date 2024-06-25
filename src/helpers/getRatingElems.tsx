export function getRatingElems({ rating, classes }: { rating: number; classes: string[] }) {
  const uniqueKeys = Array.from({ length: 5 }, () => crypto.randomUUID());

  const result = Array(rating > 5 ? 5 : rating)
    .fill(null)
    .map((_, i) => <span key={uniqueKeys[i]} className={classes.join(' ')} data-active />)
    .concat(
      Array(5 - rating)
        .fill(null)
        .map((_, i) => <span key={uniqueKeys[i + rating]} className={classes.join(' ')} />)
    );

  return result;
}
