import { useEffect } from 'react';
import { getProducts } from '../../../api/products/getProducts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Loader } from '../Loader/Loader';
import { ProductCard } from './ProductCard/ProductCard';
import type { ProductsSliceState } from '../../../store/slices/products-slice';
import styles from './Catalog.module.css';
import { Filters } from './Filters/Filters';
import { Sort } from './Sort/Sort';
import type { getProductsRequestProps } from '../Main.interfaces';

export function Catalog() {
  const dispatch = useAppDispatch();
  const { isProductsLoading, products, filter, sort, subcategory }: ProductsSliceState = useAppSelector(
    (state) => state.products_slice
  );
  const { planet } = useAppSelector((state) => state.planet_slice);

  useEffect(() => {
    if (planet) {
      const actionPayload: getProductsRequestProps = {
        planet: planet,
        subcategory: subcategory ?? undefined,
        filter: filter.value && filter.type ? filter : undefined,
        sortValue: sort ?? undefined
      };
      dispatch(getProducts(actionPayload));
    }
  }, [dispatch, planet, subcategory, sort, filter.value]);

  return isProductsLoading ? (
    <Loader />
  ) : (
    <>
      <div className={styles.filters_wrapper}>
        <Filters />
        <Sort />
      </div>
      <section className={styles.cards_wrapper}>
        {products.map((productData, index) => (
          <ProductCard product={productData} key={index} />
        ))}
      </section>
    </>
  );
}
