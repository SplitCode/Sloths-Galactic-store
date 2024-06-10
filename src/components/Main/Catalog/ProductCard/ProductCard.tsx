import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';
import type { ProductCardProps } from '../../Main.interfaces';
import { getPlanetFromLocation } from '../../../../helpers/locationHandlers';
import { getSubcategoryFromProductType } from '../../../../helpers/idsMapper';
import { cutSentence } from '../../../../helpers/cutSentence';
import emptyCartIcon from './../../../../assets/img/emptyCartIcon.png';
import cartIcon from './../../../../assets/img/cartIcon.png';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { createCart } from '../../../../api/cart/createCart';
import { MiniLoader } from '../../Loader/Loader';
import { Price } from '../../../univComponents/Price/Price';
import { updateCart } from '../../../../api/cart/updateCart';

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

  const [isInCart, setIsInCart] = useState(false);
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart_slice);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cart) {
      const isProductInCart = cart.lineItems.some((item) => item.productId === product.id);
      setIsInCart(isProductInCart);
    }
  }, [cart, product.id]);

  const addToCart = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsLoading(true);

    try {
      if (!cart) {
        const newCart = await createCart();
        await dispatch(
          updateCart({
            actions: [{ action: 'addLineItem', quantity: 1, productId: product.id }],
            version: newCart.version,
            ID: newCart.id
          })
        );
      } else {
        await dispatch(
          updateCart({
            actions: [{ action: 'addLineItem', quantity: 1, productId: product.id }],
            version: cart.version,
            ID: cart.id
          })
        );
      }
      setIsInCart(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
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
        <h3 className={`${styles.product_name} ${discountPrice && styles.product_discount_name}`}>
          {product.name.ru}
        </h3>
        <Price price={price} discountPrice={discountPrice} />
      </div>

      <button className={styles.cart_button} disabled={isInCart || isLoading} onClick={addToCart}>
        {isLoading ? (
          <MiniLoader />
        ) : (
          <img src={isInCart ? cartIcon : emptyCartIcon} alt="cart icon" className={styles.cart_icon} />
        )}
      </button>
    </div>
  );
}
