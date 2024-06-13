import styles from './Subcategories.module.css';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setFilter } from '../../../store/slices/products-slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTranslation, Subcategories } from '../../../helpers/translationMapper';
import { useMemo } from 'react';
import { isSubcategory } from '../../../helpers/isEnumValue';

export function SubcategoriesList({
  setVisibility
}: {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { planet } = useAppSelector((state) => state.planet_slice);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const subcategory = useMemo(() => {
    return location.pathname.split('/').find((part) => isSubcategory(part));
  }, [location.pathname]);
  const onSubcategoryClick = (subcategory: Subcategories) => {
    dispatch(setFilter(null));
    setVisibility(false);
    navigation(`/catalog/${planet}/${subcategory}`);
  };
  return (
    <div className={styles.list}>
      <label className={styles.list_item}>
        <input
          type="radio"
          name="subcategory"
          value={Subcategories.pets}
          checked={subcategory === Subcategories.pets}
          onChange={() => onSubcategoryClick(Subcategories.pets)}
          className={styles.radio}
        />
        {getTranslation(Subcategories.pets).toUpperCase()}
      </label>
      <label className={styles.list_item}>
        <input
          type="radio"
          name="subcategory"
          value={Subcategories.food}
          checked={subcategory === Subcategories.food}
          onChange={() => onSubcategoryClick(Subcategories.food)}
          className={styles.radio}
        />
        {getTranslation(Subcategories.food).toUpperCase()}
      </label>
      <label className={styles.list_item}>
        <input
          type="radio"
          name="subcategory"
          value={Subcategories.appliances}
          checked={subcategory === Subcategories.appliances}
          onChange={() => onSubcategoryClick(Subcategories.appliances)}
          // onClick={() => onSubcategoryClick(Subcategories.appliances)}
          className={styles.radio}
        />
        {getTranslation(Subcategories.appliances).toUpperCase()}
      </label>
    </div>
  );
}
