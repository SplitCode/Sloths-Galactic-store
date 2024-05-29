import { useEffect } from 'react';
import { getPlanetProducts, getSubcategoryProducts } from '../../../api/products/getProducts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Loader } from '../Loader/Loader';
import { ProductCard } from './ProductCard/ProductCard';
import type { ProductsSliceState } from '../../../store/slices/products-slice';
import styles from './Catalog.module.css';
import { getSubcategoryId } from '../../../helpers/idsMapper';
import { Filters } from './Filters/Filters';

export function Catalog() {
  const dispatch = useAppDispatch();
  const { isProductsLoading, isFilteredLoading, products, filteredProducts }: ProductsSliceState =
    useAppSelector((state) => state.products_slice);
  const { planet } = useAppSelector((state) => state.planet_slice);
  const { subcategory } = useAppSelector((state) => state.planet_slice);
  useEffect(() => {
    if (planet) {
      dispatch(getPlanetProducts(planet));
    }
  }, [dispatch, planet]);

  useEffect(() => {
    if (planet && subcategory) {
      const subcategoryId = getSubcategoryId(planet, subcategory);
      if (subcategoryId) {
        dispatch(getSubcategoryProducts(subcategoryId));
      }
    } else {
      if (planet) {
        dispatch(getPlanetProducts(planet));
      }
    }
  }, [dispatch, subcategory, planet]);

  return isProductsLoading || isFilteredLoading ? (
    <Loader />
  ) : (
    <>
      <Filters />
      <section className={styles.cards_wrapper}>
        {(filteredProducts.length ? filteredProducts : products).map((productData, index) => (
          <ProductCard product={productData} key={index} />
        ))}
      </section>
    </>
  );
}
