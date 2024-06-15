import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useMemo } from 'react';
import styles from '../../../univComponents/Checkbox/Checkbox.module.css';
import style from './Filters.module.css';
import type { Filter } from '../../Main.interfaces';
import { setFilter } from '../../../../store/slices/products-slice';
import { useLocation } from 'react-router-dom';
import { isSubcategory } from '../../../../helpers/isEnumValue';

export function Filters() {
  const dispatch = useAppDispatch();
  const { products, filter } = useAppSelector((state) => state.products_slice);
  const location = useLocation();

  const attributes = useMemo(() => {
    const subcategory = location.pathname.split('/').find((part) => isSubcategory(part));
    if (!subcategory || !products.length) return [];

    const attributeSet = new Set<string>();
    const uniqueAttributes: Filter[] = [];

    products.forEach((product) => {
      product.masterVariant?.attributes?.forEach((attribute) => {
        const attributeString = JSON.stringify({ type: attribute.name, value: attribute.value });
        if (!attributeSet.has(attributeString)) {
          attributeSet.add(attributeString);
          uniqueAttributes.push({ type: attribute.name, value: attribute.value[0] });
        }
      });
    });

    return uniqueAttributes;
  }, [products, location.pathname]);

  const filterValue = filter?.value;

  const handleChange = (atr: Filter) => {
    dispatch(setFilter(atr.value === filterValue ? null : atr));
  };

  return (
    <div className={style.filters}>
      {attributes.map((atr) => (
        <label key={`${atr.type}-${atr.value}`} className={style.filter_item}>
          <input
            className={styles.checkbox}
            type="checkbox"
            value={atr.value}
            checked={filterValue === atr.value}
            onChange={() => handleChange(atr)}
          />
          {atr.value}
        </label>
      ))}
    </div>
  );
}
