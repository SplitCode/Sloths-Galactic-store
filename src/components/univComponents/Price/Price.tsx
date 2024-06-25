import { formatPrice } from '../../../helpers/formatPrice';
import styles from './Price.module.css';

export function Price({
  price,
  discountPrice,
  classes,
  promoCodePrice
}: {
  price: number | null;
  discountPrice?: number | '';
  promoCodePrice?: number;
  classes?: string[];
}) {
  return (
    <div className={`${styles.product_price_wrapper} ${classes?.join(' ')}`}>
      {price && (
        <span
          className={`${styles.product_price} ${(discountPrice || promoCodePrice) && styles.crossed_price}`}
        >
          {formatPrice(price)}
        </span>
      )}
      {discountPrice && (
        <span className={`${styles.discount_price} ${promoCodePrice && styles.crossed_price}`}>
          {formatPrice(discountPrice)}
        </span>
      )}
      {promoCodePrice && <span className={styles.promo_code_price}>{formatPrice(promoCodePrice)}</span>}
    </div>
  );
}
