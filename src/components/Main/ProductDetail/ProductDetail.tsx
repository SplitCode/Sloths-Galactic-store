import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../../../api/products/getProducts';
import type { Product } from '@commercetools/platform-sdk';
import { Loader, MiniLoader } from '../Loader/Loader';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './ProductDetail.module.css';
import { ImageModal } from './ImageModal/ImageModal';
import { Price } from '../../univComponents/Price/Price';
import { Button } from '../../univComponents/Button/Button';
import { useCart } from '../../../helpers/useCart';

export function ProductDetail() {
  const { productKey } = useParams<{ productKey: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalActive, setModalActive] = useState(true);
  const [modalImageIndex, setModalImageIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const { cart, isCartLoading, addToCart } = useCart();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!productKey) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const fetchedProduct = await getProduct(productKey);
      setProduct(fetchedProduct || null);
      setIsLoading(false);
    };

    fetchData();
  }, [productKey]);

  useEffect(() => {
    if (cart && product) {
      const isProductInCart = cart.lineItems.some((item) => item.productId === product.id);
      setIsInCart(isProductInCart);
    }
  }, [cart, product]);

  const openModal = (index: number) => {
    setModalImageIndex(index);
    setModalActive(true);
  };

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (product) {
      e.stopPropagation();
      await addToCart(product.id);
      setIsInCart(true);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <p className={styles.noproduct_message}>Таких товаров к нам еще не завезли...</p>;
  }

  const { name, description, masterVariant } = product.masterData.current;
  const images = masterVariant?.images || [];
  const price = masterVariant?.prices ? masterVariant.prices[0]?.value.centAmount : null;
  const discountPrice = masterVariant?.prices ? masterVariant.prices[0]?.discounted?.value.centAmount : '';

  return (
    <div className={styles.product_wrapper}>
      <button
        className={styles.link_back}
        onClick={() => {
          navigate(-1);
        }}
      >
        НАЗАД
      </button>
      <div className={styles.product_detail}>
        <h1 className={styles.product_name}>{name?.ru}</h1>
        <div className={styles.images_gallery}>
          <Carousel
            className={styles.images_carousel}
            centerMode={true}
            centerSlidePercentage={100}
            showArrows
            showIndicators={false}
            showStatus={false}
            autoPlay={true}
            infiniteLoop={true}
            interval={5000}
            stopOnHover
            swipeable
            useKeyboardArrows
            thumbWidth={65}
          >
            {images.map((image, index) => (
              <div key={image.url} className={styles.image_container} onClick={() => openModal(index)}>
                <img src={image.url} alt={image.label} className={styles.product_image} />
              </div>
            ))}
          </Carousel>
        </div>
        <p className={styles.product_desc}>{description?.ru}</p>
        <Price classes={[styles.product_price_wrapper]} price={price} discountPrice={discountPrice} />
        <div className={styles.button_wrapper}>
          <Button
            minimal
            type="button"
            classes={[styles.cart_button]}
            disabled={isInCart || isCartLoading}
            onClick={handleAddToCart}
          >
            {isCartLoading ? <MiniLoader /> : isInCart ? 'В корзине' : 'Добавить в корзину'}
          </Button>
          {isInCart && (
            <Button
              minimal
              type="button"
              classes={[styles.cart_button]}
              disabled={isCartLoading}
              onClick={() => setIsInCart(false)}
            >
              {isCartLoading ? <MiniLoader /> : 'Удалить из корзины'}
            </Button>
          )}
        </div>
        {modalActive && modalImageIndex !== null && (
          <ImageModal
            images={images}
            startIndex={modalImageIndex}
            active={modalActive}
            setActive={setModalActive}
          />
        )}
      </div>
    </div>
  );
}
