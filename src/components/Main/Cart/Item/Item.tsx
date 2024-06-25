import type { LineItem } from '@commercetools/platform-sdk';
import { Price } from '../../../univComponents/Price/Price';
import styles from './Item.module.css';
import { Loader } from '../../Loader/Loader';
import deleteIcon from '../../../../assets/img/delete.svg';
import { productHeaders } from '../../../../helpers/cartConfig';
import { useCart } from '../../../../helpers/useCart';
import { useAppSelector } from '../../../../store/hooks';
import { useState } from 'react';
import { getProduct } from '../../../../api/products/getProducts';
import { getPlanetByCatalogId, getSubcategoryFromProductType } from '../../../../helpers/idsMapper';
import { useNavigate } from 'react-router-dom';

export function Item({ itemData }: { itemData: LineItem }) {
  const { updateQuantity } = useCart();
  const isUpdating = useAppSelector((state) => state.cart_slice.isUpdating);
  const [isCurrentUpdating, setCurrentUpdating] = useState(false);
  const bgImageUrl = itemData.variant?.images?.length ? itemData.variant.images[0].url : '';

  const price = itemData.price.value.centAmount;
  const discountPrice = itemData.price.discounted?.value.centAmount;
  const promoCodePrice =
    itemData.discountedPricePerQuantity[0] &&
    (itemData.discountedPricePerQuantity[0].discountedPrice.value.centAmount as number | undefined);

  const navigate = useNavigate();

  const handleUpdateQuantity = async (
    e: React.MouseEvent<HTMLButtonElement>,
    actionName: 'increment' | 'decrement' | 'remove'
  ) => {
    e.stopPropagation();
    try {
      setCurrentUpdating(true);
      await updateQuantity(actionName, itemData);
    } catch (error) {
      console.error(error);
    } finally {
      setCurrentUpdating(false);
    }
  };

  const handleProductClick = async () => {
    if (!itemData.productKey) return;

    const product = await getProduct(itemData.productKey);
    if (!product) return;
    const categoryIds = product.masterData.current.categories.map((category) => category.id);
    const planet = getPlanetByCatalogId(categoryIds[1]) || getPlanetByCatalogId(categoryIds[0]);
    const subcategory = getSubcategoryFromProductType(product.productType.id);
    const productKey = product.key;

    if (planet && subcategory && productKey) {
      navigate(`/catalog/${planet}/${subcategory}/${productKey}`);
    }
  };

  return (
    <div className={styles.product} onClick={handleProductClick}>
      {isUpdating && <div className={styles.updating}></div>}
      {isCurrentUpdating && <Loader classes={[styles.product_loader]} />}

      <div className={styles.left_line_wrapper}>
        <div className={styles.left_line}></div>
      </div>
      <div className={styles.right_line_wrapper}>
        <div className={styles.right_line}></div>
      </div>

      <button
        onClick={(e) => handleUpdateQuantity(e, 'remove')}
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
              onClick={(e) => handleUpdateQuantity(e, 'decrement')}
            >
              &ndash;
            </button>
            <span className={styles.quantity}>{itemData.quantity}</span>
            <button
              onClick={(e) => handleUpdateQuantity(e, 'increment')}
              type="button"
              className={styles.increment}
            >
              +
            </button>
          </div>

          <Price
            classes={[styles.product_price_wrapper, styles.product_cell]}
            price={price * itemData.quantity}
            discountPrice={discountPrice && discountPrice * itemData.quantity}
            promoCodePrice={promoCodePrice && promoCodePrice * itemData.quantity}
          />
        </div>
      </div>
    </div>
  );
}
