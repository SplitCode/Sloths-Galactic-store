import type { LineItem } from '@commercetools/platform-sdk';
import { useAppSelector } from '../../../store/hooks';
import styles from './Cart.module.css';
import { Loader } from '../Loader/Loader';
import { Item } from './Item/Item';

export function Cart() {
  const { cart, isLoading, errorMessage } = useAppSelector((state) => state.cart_slice);
  if (isLoading) return <Loader />;
  if (errorMessage) {
    return (
      <section className={styles.cart}>
        <h1 className={styles.title}>Корзина</h1>
        <p className={styles.error_message}>Хм... {errorMessage}</p>
      </section>
    );
  }

  return (
    <section className={styles.cart}>
      <h1 className={styles.title}>Корзина</h1>

      {cart?.lineItems.length ? (
        <div className={styles.products_wrapper}>
          {cart.lineItems.map((item: LineItem) => {
            return <Item key={item.id} itemData={item} cart={cart} />;
          })}
        </div>
      ) : (
        <p className={styles.empty_message}>
          Корзина пуста... Но космос бесконечен, и так же бесконечны возможности для покупок!
        </p>
      )}
    </section>
  );
}
