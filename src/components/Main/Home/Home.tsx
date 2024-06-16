import styles from './Home.module.css';
import { HorizontalSidebar } from '../../HorizontalSidebar/HorizontalSidebar';
import fluffyIcon from '../../../assets/img/fluffy.png';
import plasticIcon from '../../../assets/img/plastic.png';
import foodIcon from '../../../assets/img/food.png';

const salesConfig = [
  {
    code: 'LoveFluffy',
    discountSize: '20%',
    discountFor: 'всех Пушистиков',
    img: fluffyIcon
  },
  {
    code: 'FOODIE',
    discountSize: '15%',
    discountFor: 'всё съедобное',
    img: foodIcon
  },
  {
    code: 'PlasticWorldHasWon',
    discountSize: '10%',
    discountFor: 'товары из пластика',
    img: plasticIcon
  }
];

export function Home() {
  return (
    <section className={styles.home_page}>
      <h1 className={styles.home_page_title}>Sloth&apos;s galactic store</h1>
      <h2 className={styles.home_page_subtitle}>Ваш портал в мир межгалактических покупок</h2>
      <HorizontalSidebar />

      <div className={styles.sales}>
        <h3 className={styles.home_page_subtitle}>Доступны промокоды!</h3>
        {salesConfig.map((sale) => (
          <div className={styles.sale} key={sale.code}>
            <div className={styles.sale_text}>
              Промокод <span className={styles.accent_text}>{sale.code}</span>
              <div className={styles.line}></div>
            </div>
            <div className={styles.sale_text}>
              Скидка<span className={styles.accent_text}>&nbsp;{sale.discountSize}</span>
              <div className={styles.line}></div>
            </div>
            <div className={styles.sale_text}>
              на<span className={styles.accent_text}>&nbsp;{sale.discountFor}</span>!
              <div className={styles.line}></div>
            </div>
            <img src={sale.img} className={styles.sale_img} alt="sale" />
          </div>
        ))}
      </div>
    </section>
  );
}
