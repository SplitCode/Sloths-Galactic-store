import styles from './ImageModal.module.css';
import { Carousel } from 'react-responsive-carousel';
import type { ImageModalProps } from '../../../Main.interfaces';
import { Modal } from '../../../../Modal/Modal';

export function ImageModal({ images, startIndex, active, setActive }: ImageModalProps) {
  const bg = <div className={styles.starry_background} />;
  return (
    <>
      <Modal modalState={active} modalCallback={setActive} className={styles.image_modal} bg={bg}>
        <Carousel
          className={styles.images_carousel}
          selectedItem={startIndex}
          showArrows
          showIndicators={false}
          showStatus={false}
          infiniteLoop={true}
          useKeyboardArrows
          swipeable
          showThumbs={false}
        >
          {images.map((image) => (
            <div key={image.url} className={styles.image_container}>
              <img src={image.url} alt={image.label} className={styles.enlarged_image} />
            </div>
          ))}
        </Carousel>
      </Modal>
    </>
  );
}
