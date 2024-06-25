import styles from './Subcategories.module.css';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setFilter } from '../../../store/slices/products-slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTranslation, Subcategories } from '../../../helpers/translationMapper';

export function SubcategoriesList({
  setVisibility
}: {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { planet } = useAppSelector((state) => state.planet_slice);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const subcategories = [Subcategories.pets, Subcategories.food, Subcategories.appliances];

  const onSubcategoryClick = (subcategory: Subcategories) => {
    dispatch(setFilter(null));
    setVisibility(false);
    navigation(`/catalog/${planet}/${subcategory}`);
  };

  return (
    <div className={styles.list}>
      {subcategories.map((subcategory) => (
        <label key={subcategory} className={styles.list_item}>
          <input
            type="radio"
            name="subcategory"
            value={subcategory}
            checked={location.pathname.includes(subcategory)}
            onChange={() => onSubcategoryClick(subcategory)}
            className={styles.radio}
          />
          {getTranslation(subcategory).toUpperCase()}
        </label>
      ))}
    </div>
  );
}
