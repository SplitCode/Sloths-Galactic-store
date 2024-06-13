import styles from './HorizontalSidebar.module.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPlanet, Planets } from '../../store/slices/planet-slice';
import type { MouseEventHandler } from 'react';
import { setFilter } from '../../store/slices/products-slice';

export function HorizontalSidebar() {
  const dispatch = useAppDispatch();
  const { planet } = useAppSelector((state) => state.planet_slice);
  const navigation = useNavigate();
  const onPlanetClick: MouseEventHandler<HTMLInputElement> = (e) => {
    if (e.target instanceof HTMLInputElement) {
      const value = e.target.value as Planets;
      dispatch(setPlanet(value));
      navigation(`/catalog/${value}`);
      dispatch(setFilter(null));
    }
  };

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.home_page_subtitle}>КАТАЛОГ ТОВАРОВ С РАЗНЫХ ПЛАНЕТ</h2>
      <form className={styles.form}>
        <div className={styles.planet_list}>
          <div className={styles.catalog_item}>
            <label className={styles.planet_item}>
              <input
                type="radio"
                name="picked"
                value={Planets.mars}
                className={styles.planet + ' ' + styles.mars}
                defaultChecked={planet === Planets.mars}
                onClick={onPlanetClick}
              />
              _Марс
            </label>
          </div>
          <div className={styles.catalog_item}>
            <label className={styles.planet_item}>
              <input
                type="radio"
                name="picked"
                value={Planets.venus}
                className={styles.planet + ' ' + styles.venus}
                defaultChecked={planet === Planets.venus}
                onClick={onPlanetClick}
              />
              _Венера
            </label>
          </div>
          <div className={styles.catalog_item}>
            <label className={styles.planet_item}>
              <input
                type="radio"
                name="picked"
                value={Planets.earth}
                defaultChecked={planet === Planets.earth}
                className={styles.planet + ' ' + styles.earth}
                onClick={onPlanetClick}
              />
              _Земля
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
