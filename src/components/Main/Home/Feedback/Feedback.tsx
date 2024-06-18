import styles from './Feedback.module.css';
import { Carousel } from 'react-responsive-carousel';
import { getRatingElems } from '../../../../helpers/getRatingElems';
import { feedbackConfig } from '../../../../helpers/feedbackConfig';

export function Feedback() {
  return (
    <Carousel
      className={styles.carousel}
      showArrows
      showIndicators={false}
      centerMode
      centerSlidePercentage={100}
      showStatus={false}
      infiniteLoop
      autoPlay
      interval={8000}
      useKeyboardArrows
      stopOnHover
      swipeable
      showThumbs={false}
    >
      {feedbackConfig.map((feedback) => {
        return (
          <div key={feedback.name} className={styles.feedback}>
            <div className={styles.avatar} style={{ backgroundImage: `url(${feedback.avatar})` }} />
            <p className={`${styles.text} ${styles.name}`}>{feedback.name}</p>
            <p className={styles.text}>{feedback.comment}</p>
            <div className={styles.rating}>
              {...getRatingElems({ rating: feedback.stars, classes: [styles.star] })}
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
