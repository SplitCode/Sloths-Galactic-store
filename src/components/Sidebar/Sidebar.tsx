import styles from './Sidebar.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPlanet, Planets } from '../../store/slices/planet-slice';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import arrowIcon from '../../assets/img/arrow.svg';
import { BgPlanets } from './Bg-planets';
import { SubcategoriesList } from './Subcategories/Subcategories';
import { setFilter } from '../../store/slices/products-slice';

export function Sidebar() {
  const dispatch = useAppDispatch();
  const locationPath = useLocation().pathname;
  const notShow = ['/login', '/register'].includes(locationPath);
  const isShowSubcategory = locationPath.startsWith('/catalog');
  const { planet } = useAppSelector((state) => state.planet_slice);
  const [isSidebarVisible, setVisibility] = useState<boolean>(false);
  const navigation = useNavigate();
  const onPlanetClick: MouseEventHandler<HTMLInputElement> = (e) => {
    if (e.target instanceof HTMLInputElement) {
      const value = e.target.value as Planets;
      setVisibility(false);
      dispatch(setPlanet(value));
      navigation(`/catalog/${value}`);
      dispatch(setFilter(null));
    }
  };

  return (
    !notShow && (
      <>
        <BgPlanets />
        <aside className={styles.sidebar + ' ' + (isSidebarVisible ? styles.sidebar__visible : '')}>
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
                {planet === Planets.mars && isShowSubcategory && (
                  <SubcategoriesList setVisibility={setVisibility} />
                )}
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
                {planet === Planets.venus && isShowSubcategory && (
                  <SubcategoriesList setVisibility={setVisibility} />
                )}
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
                {planet === Planets.earth && isShowSubcategory && (
                  <SubcategoriesList setVisibility={setVisibility} />
                )}
              </div>
            </div>
            <div onClick={() => setVisibility(!isSidebarVisible)} className={styles.arrow_wrapper}>
              <img src={arrowIcon} alt="arrow" className={styles.arrow} />
            </div>
          </form>
        </aside>
      </>
    )
  );
}
