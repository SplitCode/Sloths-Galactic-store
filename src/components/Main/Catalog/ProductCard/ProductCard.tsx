import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';
import type { ProductCardProps } from '../../Main.interfaces';
import { formatPrice } from '../../../../helpers/formatPrice';
import { getPlanetFromLocation } from '../../../../helpers/locationHandlers';
import { getSubcategoryFromProductType } from '../../../../helpers/idsMapper';
import { cutSentence } from '../../../../helpers/cutSentence';


export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const bgImageUrl = product.masterVariant?.images ? product.masterVariant?.images[0]?.url : null;
  const price = product.masterVariant?.prices ? product.masterVariant.prices[0]?.value.centAmount : null;
  const discountPrice = product.masterVariant?.prices
    ? product.masterVariant.prices[0]?.discounted?.value.centAmount
    : '';
  const location = useLocation();
  const planet = getPlanetFromLocation(location.pathname);
  const subcategory = getSubcategoryFromProductType(product.productType.id);
  const handleClick = (productKey: string): void => {
    navigate({ pathname: `/catalog/${planet}/${subcategory}/${productKey}` });
  };

  return (
    <div
      className={styles.product_card}
      onClick={() => {
        if (product.masterVariant.key) {
          handleClick(product.masterVariant.key);
        }
      }}
    >
      <div className={styles.product_image_wrapper}>
        <div className={styles.product_image} style={{ backgroundImage: `url(${bgImageUrl})` }} />
        <div className={styles.product_image_glow_wrapper}>
          <img src={bgImageUrl || ''} alt="glow" className={styles.product_image_glow} />
        </div>
      </div>
      <div className={styles.product_desc_wrapper}>
        <p className={styles.product_desc}>{cutSentence(product.description?.ru)}</p>
      </div>
      <div className={styles.product_info_wrapper}>
        <h3 className={styles.product_name}>{product.name.ru}</h3>
        {price && (
          <span className={discountPrice ? styles.crossed_price : styles.product_price}>
            {formatPrice(price)}
          </span>
        )}
        {discountPrice && <span className={styles.discount_price}>{formatPrice(discountPrice)}</span>}
      </div>
    </div>
  );
}
