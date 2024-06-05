import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';
import type { ProductCardProps } from '../../Main.interfaces';
import { formatPrice } from '../../../../helpers/formatPrice';
import { getPlanetFromLocation } from '../../../../helpers/locationHandlers';
import { getSubcategoryFromProductType } from '../../../../helpers/idsMapper';
import { cutSentence } from '../../../../helpers/cutSentence';
import emptyBasket from './../../../../assets/img/emptyBasket.png';
import basket from './../../../../assets/img/basket.png';
import { useEffect, useState } from 'react';

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

  const [isInBasket, setIsInBasket] = useState(false);

  interface BasketItem {
    id: string;
    quantity: number;
  }

  useEffect(() => {
    const basketItems: BasketItem[] = JSON.parse(localStorage.getItem('sloth-basket') || '[]');
    const isProductInBasket = basketItems.some((item) => item.id === product.id);
    setIsInBasket(isProductInBasket);

    const handleStorageChange = () => {
      const updatedBasketItems: BasketItem[] = JSON.parse(localStorage.getItem('sloth-basket') || '[]');
      const updatedIsProductInBasket = updatedBasketItems.some((item) => item.id === product.id);
      setIsInBasket(updatedIsProductInBasket);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [product.id]);

  const addToBasket = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    const basketItems: BasketItem[] = JSON.parse(localStorage.getItem('sloth-basket') || '[]');
    if (!basketItems.some((item) => item.id === product.id)) {
      const updateBasketItem: BasketItem = {
        id: product.id,
        quantity: 1
      };
      const updatedBasketItems = [...basketItems, updateBasketItem];

      localStorage.setItem('sloth-basket', JSON.stringify(updatedBasketItems));
      setIsInBasket(true);
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
        <h3 className={styles.product_name}>{product.name.ru}</h3>
        <div className={styles.product_price_wrapper}>
          {price && (
            <span className={discountPrice ? styles.crossed_price : styles.product_price}>
              {formatPrice(price)}
            </span>
          )}
          {discountPrice && <span className={styles.discount_price}>{formatPrice(discountPrice)}</span>}
        </div>
      </div>
      <button className={styles.basket_button} disabled={isInBasket} onClick={addToBasket}>
        <img src={isInBasket ? basket : emptyBasket} alt="basket icon" className={styles.basket_icon} />
      </button>
    </div>
  );
}
