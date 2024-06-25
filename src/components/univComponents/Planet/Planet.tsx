import type { MouseEventHandler } from 'react';
import type { PlanetConfig } from '../../../helpers/helpers.interfaces';
import { useAppSelector } from '../../../store/hooks';
import styles from './Planet.module.css';

export function Planet({
  planetItem,
  onClick,
  classes
}: {
  planetItem: PlanetConfig;
  onClick: MouseEventHandler<HTMLInputElement>;
  classes?: string[];
}) {
  const { planet } = useAppSelector((state) => state.planet_slice);

  return (
    <label className={styles.planet_item}>
      <input
        type="radio"
        name="picked"
        value={planetItem.value}
        className={`${styles.planet} ${styles[planetItem.className]} ${classes?.join(' ')}`}
        defaultChecked={planetItem.value === planet}
        onClick={onClick}
      />
      <div className={styles.planet_name}>
        <span className={styles.underline}>_</span>
        {planetItem.label}
      </div>
    </label>
  );
}
