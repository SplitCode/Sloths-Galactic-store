import type { LineItem } from '@commercetools/platform-sdk';
import { useAppSelector } from '../../../store/hooks';
import styles from './Cart.module.css';
import { Price } from '../../univComponents/Price/Price';
import { formatPrice } from '../../../helpers/formatPrice';

export function Cart() {
  const cart = useAppSelector((state) => state.cart_slice.cart);

  return (
    <section>
      <h1>Корзина</h1>
      {cart ? (
        <div className={styles.products_wrapper}>
          {cart.lineItems.map((item: LineItem, index) => {
            const price = item.price.value.centAmount;
            const discountPrice = item.price.discounted?.value.centAmount;
            const bgImageUrl = item.variant?.images?.length ? item.variant.images[0].url : '';

            return (
              <div className={styles.product} key={index}>
                <div className={styles.product_image} style={{ backgroundImage: `url(${bgImageUrl})` }} />
                <p>{item.name.ru}</p>
                <Price classes={[styles.product_price_wrapper]} price={price} discountPrice={discountPrice} />
                <p>Итого: ${formatPrice(item.quantity * (discountPrice || price))}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Корзина пуста... Но космос бесконечен, и так же бесконечны возможности для покупок!</p>
      )}
    </section>
  );
}
