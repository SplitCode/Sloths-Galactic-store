import styles from './PromoCodes.module.css';
import fluffyIcon from '../../../../assets/img/fluffy.png';
import plasticIcon from '../../../../assets/img/plastic.png';
import foodIcon from '../../../../assets/img/food.png';

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

export function PromoCodes() {
  return (
    <div className={styles.sales}>
      <h3 className={styles.title}>Доступны промокоды!</h3>
      <div className={styles.sales_wrapper}>
        {salesConfig.map((sale) => (
          <div className={styles.sale} key={sale.code}>
            <div className={styles.sale_image_wrapper}>
              <div className={styles.sale_image} style={{ backgroundImage: `url(${sale.img})` }} />
              <div className={styles.sale_image_glow_wrapper}>
                <img src={sale.img} alt="glow" className={styles.sale_image_glow} />
              </div>
            </div>

            <div className={`${styles.sale_text} ${styles.code}`}>
              Промокод <span className={styles.accent_text}>{sale.code}</span>
            </div>
            <div className={`${styles.sale_text} ${styles.discount_size}`}>
              Скидка<span className={styles.accent_text}>&nbsp;{sale.discountSize}</span>
            </div>
            <div className={`${styles.sale_text} ${styles.discount_for}`}>
              на<span className={styles.accent_text}>&nbsp;{sale.discountFor}</span>!
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
