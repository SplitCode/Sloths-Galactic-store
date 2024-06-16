import type { LineItem } from '@commercetools/platform-sdk';
import { useAppSelector } from '../../../store/hooks';
import styles from './Cart.module.css';
import { Loader } from '../Loader/Loader';
import { Item } from './Item/Item';
import { CartSummary } from './CartSummary/CartSummary';
import { HorizontalSidebar } from '../../HorizontalSidebar/HorizontalSidebar';

export function Cart() {
  const { cart, isLoading, errorMessage } = useAppSelector((state) => state.cart_slice);
  if (isLoading) return <Loader />;
  if (errorMessage && !cart) {
    return (
      <section className={styles.cart}>
        <h1 className={styles.title}>Корзина</h1>
        <div className={styles.error_message}>
          Хм... {errorMessage}
          <HorizontalSidebar />
        </div>
      </section>
    );
  }

  return (
    <section className={styles.cart}>
      <h1 className={styles.title}>Корзина</h1>

      {cart?.lineItems.length ? (
        <div className={styles.cart_content}>
          <div className={styles.products_wrapper}>
            {cart.lineItems.map((item: LineItem) => {
              return <Item key={item.id} itemData={item} />;
            })}
          </div>
          <CartSummary cart={cart} />
        </div>
      ) : (
        <div className={styles.empty_message}>
          Корзина пуста... Но космос бесконечен, и так же бесконечны возможности для покупок!
          <HorizontalSidebar />
        </div>
      )}
    </section>
  );
}
