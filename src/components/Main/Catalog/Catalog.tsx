import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../../../api/products/getProducts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Loader } from '../Loader/Loader';
import { ProductCard } from './ProductCard/ProductCard';
import { Search } from './Search/Search';
import type { ProductsSliceState } from '../../../store/slices/products-slice';
import styles from './Catalog.module.css';
import { Filters } from './Filters/Filters';
import { Sort } from './Sort/Sort';
import type { getProductsRequestProps } from '../Main.interfaces';
import { Breadcrumbs } from './Breadcrumbs/Breadcrumbs';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPlanetFromLocation, getSubcategoryFromLocation } from '../../../helpers/locationHandlers';
import { Sidebar } from '../../Sidebar/Sidebar';

export function Catalog() {
  const dispatch = useAppDispatch();
  const { isProductsLoading, products, filter, sort, searchQuery, total }: ProductsSliceState =
    useAppSelector((state) => state.products_slice);
  const { planet } = useAppSelector((state) => state.planet_slice);
  const navigate = useNavigate();
  const location = useLocation();
  const [limit] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(total / limit);

  const locationParts = useMemo(() => {
    const planet = getPlanetFromLocation(location.pathname);
    const subcategory = getSubcategoryFromLocation(location.pathname);
    return { planet: planet, subcategory: subcategory };
  }, [location.pathname]);

  useEffect(() => {
    if (locationParts.planet) {
      const actionPayload: getProductsRequestProps = {
        planet: locationParts.planet,
        ...(locationParts.subcategory && { subcategory: locationParts.subcategory }),
        ...(filter?.value && filter?.type && { filter }),
        ...(sort && { sortValue: sort }),
        ...(searchQuery && { searchQuery }),
        limit,
        offset: (currentPage - 1) * limit
      };
      dispatch(getProducts(actionPayload));
    }
  }, [dispatch, locationParts, sort, filter, searchQuery, limit, currentPage]);

  useEffect(() => {
    if (!locationParts.planet) {
      navigate(`${planet}`);
    }
  }, [locationParts.planet, planet, navigate]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, sort, searchQuery, locationParts]);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return isProductsLoading ? (
    <Loader />
  ) : (
    <>
      <Sidebar />
      <Breadcrumbs />
      <div className={styles.filters_wrapper}>
        <Search />
        <Filters />
        <Sort />
      </div>
      <section className={styles.cards_wrapper}>
        {products.map((productData, index) => (
          <ProductCard product={productData} key={index} />
        ))}
      </section>
      <div className={styles.pagination}>
        <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <span
            key={index + 1}
            className={`${styles['page-number']} ${currentPage === index + 1 ? styles['active'] : ''}`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </>
  );
}
