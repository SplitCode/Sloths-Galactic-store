import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';
import type { ProductCardProps } from '../../Main.interfaces';
import { getPlanetFromLocation } from '../../../../helpers/locationHandlers';
import { getSubcategoryFromProductType } from '../../../../helpers/idsMapper';
import { cutSentence } from '../../../../helpers/cutSentence';
import emptyCartIcon from './../../../../assets/img/emptyCartIcon.png';
import cartIcon from './../../../../assets/img/cartIcon.png';
import { useEffect, useState } from 'react';
import { useCart } from '../../../../helpers/useCart';
import { MiniLoader } from '../../Loader/Loader';
import { Price } from '../../../univComponents/Price/Price';

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
  const handleClick = (): void => {
    if (product.masterVariant.key) {
      navigate({ pathname: `/catalog/${planet}/${subcategory}/${product.masterVariant.key}` });
    }
  };

  const [isInCart, setIsInCart] = useState(false);
  const { cart, isCartLoading, addToCart } = useCart();

  useEffect(() => {
    if (cart) {
      const isProductInCart = cart.lineItems.some((item) => item.productId === product.id);
      setIsInCart(isProductInCart);
    }
  }, [cart, product.id]);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    await addToCart(product.id);
    setIsInCart(true);
  };

  return (
    <div className={styles.product_card} onClick={handleClick}>
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
        <h3 className={`${styles.product_name} ${discountPrice && styles.product_discount_name}`}>
          {product.name.ru}
        </h3>
        <Price price={price} discountPrice={discountPrice} />
      </div>

      <button className={styles.cart_button} disabled={isInCart || isCartLoading} onClick={handleAddToCart}>
        {isCartLoading ? (
          <MiniLoader />
        ) : (
          <img src={isInCart ? cartIcon : emptyCartIcon} alt="cart icon" className={styles.cart_icon} />
        )}
      </button>
    </div>
  );
}
