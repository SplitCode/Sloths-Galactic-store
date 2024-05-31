import styles from './Subcategories.module.css';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSubcategory } from '../../../store/slices/planet-slice';
export enum Subcategories {
  food = 'еда',
  pets = 'питомцы',
  appliances = 'техника'
}

export function SubcategoriesList({
  setVisibility
}: {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { subcategory } = useAppSelector((state) => state.planet_slice);
  const dispatch = useAppDispatch();
  const onSubcategoryClick = (subcategory: Subcategories) => {
    dispatch(setSubcategory(subcategory));
    setVisibility(false);
  };
  return (
    <div className={styles.list}>
      <label className={styles.list_item}>
        <input
          type="radio"
          name="subcategory"
          value={Subcategories.pets}
          defaultChecked={subcategory === Subcategories.pets}
          onClick={() => onSubcategoryClick(Subcategories.pets)}
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
          onClick={() => onSubcategoryClick(Subcategories.food)}
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
          onClick={() => onSubcategoryClick(Subcategories.appliances)}
          className={styles.radio}
        />
        {Subcategories.appliances.toUpperCase()}
      </label>
    </div>
  );
}
