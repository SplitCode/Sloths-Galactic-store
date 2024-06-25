import styles from './Sidebar.module.css';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import arrowIcon from '../../assets/img/arrow.svg';
import { BgPlanets } from './Bg-planets';
import { SubcategoriesList } from './Subcategories/Subcategories';
import { planetsConfig, usePlanetClickHandler } from '../../helpers/planetsConfig';
import { Planet } from '../univComponents/Planet/Planet';

export function Sidebar() {
  const locationPath = useLocation().pathname;
  const isShowSubcategory = locationPath.startsWith('/catalog');
  const { planet } = useAppSelector((state) => state.planet_slice);
  const [isSidebarVisible, setVisibility] = useState<boolean>(false);

  const onPlanetClick = usePlanetClickHandler();

  const onSidebarHandlerClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setVisibility(!isSidebarVisible);
  };

  return (
    <>
      <BgPlanets />
      <aside className={styles.sidebar + ' ' + (isSidebarVisible ? styles.sidebar__visible : '')}>
        <form className={styles.form}>
          <div className={styles.planet_list}>
            {planetsConfig.map((planetItem) => (
              <div className={styles.catalog_item} key={planetItem.value}>
                <Planet
                  key={planetItem.value}
                  planetItem={planetItem}
                  onClick={(e) => {
                    onPlanetClick(e);
                    setVisibility(false);
                  }}
                  classes={[styles.planet]}
                />
                {planetItem.value === planet && isShowSubcategory && (
                  <SubcategoriesList setVisibility={setVisibility} />
                )}
              </div>
            ))}
          </div>
          <button onClick={onSidebarHandlerClick} className={styles.arrow_wrapper}>
            <img src={arrowIcon} alt="arrow" className={styles.arrow} />
          </button>
        </form>
      </aside>
    </>
  );
}
