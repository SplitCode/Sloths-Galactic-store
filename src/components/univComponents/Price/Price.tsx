import { formatPrice } from '../../../helpers/formatPrice';
import styles from './Price.module.css';

export function Price({
  price,
  discountPrice,
  classes
}: {
  price: number | null;
  discountPrice?: number | '';
  classes?: string[];
}) {
  return (
    <div className={`${styles.product_price_wrapper} ${classes?.join(' ')}`}>
      {price && (
        <span className={discountPrice ? styles.crossed_price : styles.product_price}>
          {formatPrice(price)}
        </span>
      )}
      {discountPrice && <span className={styles.discount_price}>{formatPrice(discountPrice)}</span>}
    </div>
  );
}
