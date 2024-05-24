import type { ProductData } from '@commercetools/platform-sdk';
import styles from './ProductCard.module.css';
interface ProductCardProps {
  product: ProductData;
}
export function ProductCard({ product }: ProductCardProps) {
  const bgImageUrl = product.masterVariant?.images ? product.masterVariant?.images[0]?.url : '';
  return (
    <div className={styles.product_card}>
      <div className={styles.product_image} style={{ backgroundImage: `url(${bgImageUrl})` }} />
      <h3 className={styles.product_name}>{product.name.ru}</h3>
      <p className={styles.product_desc}>{product.description?.ru}</p>
    </div>
  );
}
