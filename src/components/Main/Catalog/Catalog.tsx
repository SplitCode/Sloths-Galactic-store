import { useEffect } from 'react';
import { getProducts } from '../../../api/products/getProducts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Loader } from '../Loader/Loader';
import { ProductCard } from './ProductCard/ProductCard';
import type { ProductsSliceState } from '../../../store/slices/products-slice';
import styles from './Catalog.module.css';

export function Catalog() {
  const dispatch = useAppDispatch();
  const { isProductsLoading, products }: ProductsSliceState = useAppSelector((state) => state.products_slice);
  const { planet } = useAppSelector((state) => state.planet_slice);
  useEffect(() => {
    if (planet) {
      dispatch(getProducts(planet));
    }
  }, [dispatch, planet]);

  return isProductsLoading ? (
    <Loader />
  ) : (
    <>
      <h1>Каталог</h1>
      <section className={styles.cards_wrapper}>
        {products.map((productData, index) => (
          <ProductCard product={productData} key={index} />
        ))}
      </section>
    </>
  );
}
