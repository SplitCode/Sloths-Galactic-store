import type { Cart } from '@commercetools/platform-sdk';
import styles from './CartSummary.module.css';
import { formatPrice } from '../../../../helpers/formatPrice';
import { Button } from '../../../univComponents/Button/Button';
import { useState } from 'react';
import { useAppDispatch } from '../../../../store/hooks';
import { updateCart } from '../../../../api/cart/updateCart';
import arrowIcon from '../../../../assets/img/arrow.svg';

export function CartSummary({ cart }: { cart: Cart }) {
  const dispatch = useAppDispatch();
  const [promoCode, setPromoCode] = useState('');
  const [isShow, setShow] = useState(false);

  const applyPromoCode = () => {
    dispatch(
      updateCart({
        ID: cart.id,
        version: cart.version,
        actions: [{ action: 'addDiscountCode', code: promoCode }]
      })
    );
  };

  return (
    <div className={styles.cart_total}>
      <button onClick={() => setShow(!isShow)} className={styles.arrow_wrapper}>
        <img src={arrowIcon} className={`${styles.arrow} ${isShow ? styles.active : ''}`} alt="arrow" />
      </button>

      <div className={styles.cart_total_content}>
        <div className={styles.cart_info}>
          <p>
            Цена товаров в корзине:
            <span className={styles.accent_text}>&nbsp;{formatPrice(cart.totalPrice.centAmount)}</span>
          </p>
          <p>
            Общее количество: <span className={styles.accent_text}>{cart.totalLineItemQuantity}</span>
          </p>
        </div>

        <form className={styles.promo_code}>
          <label className={styles.label}>
            <input
              className={styles.input}
              type={'text'}
              placeholder={'Промокод'}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
          </label>
          <Button
            classes={[styles.submit_promo]}
            onClick={(e) => {
              e.preventDefault();
              applyPromoCode();
            }}
            minimal
            type="submit"
          >
            Применить
          </Button>
        </form>
      </div>
    </div>
  );
}
