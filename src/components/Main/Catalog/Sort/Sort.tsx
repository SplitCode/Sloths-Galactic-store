import styles from './Sort.module.css';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import type { ChangeEvent } from 'react';
import { SortValues } from '../../Main.interfaces';
import { setSort } from '../../../../store/slices/products-slice';

export function Sort() {
  const { sort } = useAppSelector((state) => state.products_slice);
  const dispatch = useAppDispatch();

  const onHandleClick = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortValues;
    dispatch(setSort(value || null));
  };

  return (
    <select id="sort-select" className={styles.select_field} onChange={onHandleClick} value={sort ?? ''}>
      <option className={styles.option} value="">
        Без сортировки
      </option>
      <option className={styles.option} value={SortValues.priceUp}>
        по возрастанию цены
      </option>
      <option className={styles.option} value={SortValues.priceDown}>
        по убыванию цены
      </option>
      <option className={styles.option} value={SortValues.alphabet}>
        по алфавиту
      </option>
    </select>
  );
}
