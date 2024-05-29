import styles from './Subcategories.module.css';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSubcategory } from '../../../store/slices/planet-slice';
export enum Subcategories {
  food = 'еда',
  pets = 'питомцы',
  appliances = 'техника'
}

export function SubcategoriesList() {
  const { subcategory } = useAppSelector((state) => state.planet_slice);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.list}>
      <label className={styles.list_item}>
        <input
          type="radio"
          name="subcategory"
          value={Subcategories.pets}
          defaultChecked={subcategory === Subcategories.pets}
          onClick={() => {
            dispatch(setSubcategory(Subcategories.pets));
          }}
          className={styles.radio}
        />
        {Subcategories.pets.toUpperCase()}
      </label>
      <label className={styles.list_item}>
        <input
          type="radio"
          name="subcategory"
          value={Subcategories.food}
          defaultChecked={subcategory === Subcategories.food}
          onClick={() => {
            dispatch(setSubcategory(Subcategories.food));
          }}
          className={styles.radio}
        />
        {Subcategories.food.toUpperCase()}
      </label>
      <label className={styles.list_item}>
        <input
          type="radio"
          name="subcategory"
          value={Subcategories.appliances}
          defaultChecked={subcategory === Subcategories.appliances}
          onClick={() => {
            dispatch(setSubcategory(Subcategories.appliances));
          }}
          className={styles.radio}
        />
        {Subcategories.appliances.toUpperCase()}
      </label>
    </div>
  );
}
