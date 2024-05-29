import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useEffect, useState } from 'react';
import styles from '../../../univComponents/Checkbox/Checkbox.module.css';
import style from './Filters.module.css';
import { getFilteredProducts } from '../../../../api/products/getProducts';
import { deleteFilteredProducts } from '../../../../store/slices/products-slice';

export function Filters() {
  const dispatch = useAppDispatch();
  const { products, filteredProducts } = useAppSelector((state) => state.products_slice);
  const [attributes, setAttributes] = useState<string[]>([]);
  const { planet, subcategory } = useAppSelector((state) => state.planet_slice);
  const [checkedValue, setCheckedValue] = useState<null | string>(null);

  useEffect(() => {
    if (subcategory && products && products.length) {
      setAttributes(
        products.map((product) =>
          product.masterVariant?.attributes ? product.masterVariant?.attributes[0]?.value[0] : []
        )
      );
    }
  }, [products, subcategory]);

  useEffect(() => {
    if (filteredProducts && filteredProducts.length) {
      const value = filteredProducts?.[0]?.masterVariant?.attributes?.[0]?.value?.[0] ?? null;
      setCheckedValue(value);
    }
  }, [filteredProducts]);
  const onClick = (atr: string) => {
    if (atr === checkedValue) {
      dispatch(deleteFilteredProducts());
    } else {
      dispatch(
        getFilteredProducts({
          planet: planet,
          filter: atr
        })
      );
    }
  };
  return (
    <div className={style.filters}>
      {attributes.length > 0 &&
        Array.from(new Set(attributes)).map(
          (atr, index) =>
            atr && (
              <label key={index} className={style.filter_item} onClick={() => onClick(atr)}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  value={atr}
                  defaultChecked={checkedValue === atr}
                />
                {atr}
              </label>
            )
        )}
    </div>
  );
}
