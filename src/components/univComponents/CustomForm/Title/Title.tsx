import styles from './Title.module.css';

export function Title({ mainText, additionText }: { mainText: string; additionText: string }) {
  return (
    <>
      <h2 className={styles.titleAddition}>{additionText}</h2>
      <h1 className={styles.titleMain}>{mainText}</h1>
    </>
  );
}
