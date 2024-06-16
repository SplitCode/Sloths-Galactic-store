import type { LineItem } from '@commercetools/platform-sdk';
import { formatPrice } from '../../../../helpers/formatPrice';
import { Price } from '../../../univComponents/Price/Price';
import styles from './Item.module.css';
import { Loader } from '../../Loader/Loader';
import deleteIcon from '../../../../assets/img/delete.svg';
import { productHeaders } from '../../../../helpers/cartConfig';
import { useCart } from '../../../../helpers/useCart';
import { useAppSelector } from '../../../../store/hooks';
import { useState } from 'react';

export function Item({ itemData }: { itemData: LineItem }) {
  const { updateQuantity } = useCart();
  const isUpdating = useAppSelector((state) => state.cart_slice.isUpdating);
  const [isCurrentUpdating, setCurrentUpdating] = useState(false);
  const bgImageUrl = itemData.variant?.images?.length ? itemData.variant.images[0].url : '';

  const price = itemData.price.value.centAmount;
  const discountPrice = itemData.price.discounted?.value.centAmount;
  const promoCodePrice: number | undefined =
    itemData.discountedPricePerQuantity[0] &&
    itemData.discountedPricePerQuantity[0].discountedPrice.value.centAmount;

  const handleUpdateQuantity = async (actionName: 'increment' | 'decrement' | 'remove') => {
    try {
      setCurrentUpdating(true);
      await updateQuantity(actionName, itemData);
    } catch (error) {
      console.error(error);
    } finally {
      setCurrentUpdating(false);
    }
  };

  return (
    <div className={styles.product}>
      {isUpdating && <div className={styles.updating}></div>}
      {isCurrentUpdating && <Loader classes={[styles.product_loader]} />}

      <div className={styles.left_line_wrapper}>
        <div className={styles.left_line}></div>
      </div>
      <div className={styles.right_line_wrapper}>
        <div className={styles.right_line}></div>
      </div>

      <button
        onClick={() => handleUpdateQuantity('remove')}
        title="Удалить из корзины"
        className={styles.delete_btn}
        type="button"
      >
        <img className={styles.delete_icon} src={deleteIcon} alt="delete" />
      </button>

      <div className={styles.product_content}>
        <div className={styles.product_head}>
          {productHeaders.map((header) => {
            return (
              <p key={header} className={styles.product_column_name}>
                {header}
              </p>
            );
          })}
        </div>
        <div className={styles.product_body}>
          <div className={styles.product_cell}>
            <div className={`${styles.product_image_wrapper} ${styles.product_cell}`}>
              <div className={styles.product_image} style={{ backgroundImage: `url(${bgImageUrl})` }} />
              <div className={styles.product_image_glow_wrapper}>
                <img src={bgImageUrl} alt="glow" className={styles.product_image_glow} />
              </div>
            </div>
          </div>

          <p
            className={`${styles.product_name} ${(discountPrice || promoCodePrice) && styles.discount_name} ${styles.product_cell}`}
          >
            {itemData.name.ru}
          </p>

          <Price
            classes={[styles.product_price_wrapper, styles.product_cell]}
            price={price}
            discountPrice={discountPrice}
            promoCodePrice={promoCodePrice}
          />

          <div className={`${styles.quantity_wrapper} ${styles.product_cell}`}>
            <button
              type="button"
              className={styles.decrement}
              disabled={itemData.quantity < 2}
              onClick={() => handleUpdateQuantity('decrement')}
            >
              &ndash;
            </button>
            <span className={styles.quantity}>{itemData.quantity}</span>
            <button
              onClick={() => handleUpdateQuantity('increment')}
              type="button"
              className={styles.increment}
            >
              +
            </button>
          </div>

          <p className={`${styles.total} ${styles.product_cell}`}>
            {formatPrice(itemData.totalPrice.centAmount)}
          </p>
        </div>
      </div>
    </div>
  );
}
