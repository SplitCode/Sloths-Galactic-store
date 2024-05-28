import { useEffect, useState } from 'react';
import styles from './ProductDetail.module.css';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../../api/products/getProducts';
import type { Product } from '@commercetools/platform-sdk';
import { Loader } from '../Loader/Loader';
import { formatPrice } from '../../../helpers/formatPrice';

export function ProductDetail() {
  const { productKey } = useParams<{ productKey: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!productKey) {
        setProduct(null);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const fetchedProduct = await getProduct(productKey);
        setProduct(fetchedProduct || null);
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productKey]);

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <div>Товар не найден</div>;
  }

  const { name, description, masterVariant } = product.masterData.current;
  const images = masterVariant?.images || [];
  const price = masterVariant?.prices ? masterVariant.prices[0]?.value.centAmount : null;
  const discountPrice = masterVariant?.prices ? masterVariant.prices[0]?.discounted?.value.centAmount : null;

  return (
    <div className={styles.product_detail}>
      <div className={styles.images_gallery}>
        {images.map((image) => (
          <div key={image.url} className={styles.image_container}>
            <img src={image.url} alt={image.label} className={styles.product_image} />
          </div>
        ))}
      </div>
      <h1 className={styles.product_name}>{name?.ru}</h1>
      <p className={styles.product_desc}>{description?.ru}</p>
      {price && (
        <span className={discountPrice ? styles.crossed_price : styles.product_price}>
          {formatPrice(price)}
        </span>
      )}
      {discountPrice && <span className={styles.discount_price}>{formatPrice(discountPrice)}</span>}
    </div>
  );
}
