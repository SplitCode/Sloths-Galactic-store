import styles from './ImageModal.module.css';
import { Button } from '../../../univComponents/Button/Button';
import type { ImageModalProps } from '../../Main.interfaces';
import { Carousel } from 'react-responsive-carousel';
import { useState } from 'react';

export function ImageModal({ images, startIndex, active, setActive }: ImageModalProps) {
  const [closing, setClosing] = useState(false);

  const handleAnimationEnd: React.AnimationEventHandler<HTMLDivElement> = (event) => {
    if (event.animationName === styles['close-stripe']) {
      setActive(false);
    }
  };

  return (
    <div className={`${styles.modal} ${active ? styles.active : ''} ${closing ? styles.closing : ''}`}>
      <div className={styles.starry_background}></div>
      <div className={styles.modal_content} onAnimationEnd={handleAnimationEnd}>
        <Carousel
          className={styles.images_carousel}
          selectedItem={startIndex}
          showArrows
          showIndicators={false}
          showStatus={false}
          infiniteLoop={true}
          useKeyboardArrows
          autoPlay={true}
          stopOnHover
          swipeable
          showThumbs={false}
        >
          {images.map((image) => (
            <div key={image.url} className={styles.image_container}>
              <img src={image.url} alt={image.label} className={styles.enlarged_image} />
            </div>
          ))}
        </Carousel>
        <Button type="button" onClick={() => setClosing(true)}>
          Закрыть
        </Button>
      </div>
    </div>
  );
}
