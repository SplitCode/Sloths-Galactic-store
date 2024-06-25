import { useState } from 'react';
import styles from './Modal.module.css';
import { Button } from '../univComponents/Button/Button';
import type { ModalProps } from '../Main/Main.interfaces';

export function Modal({ modalState, modalCallback, className, children, bg }: ModalProps) {
  const [closing, setClosing] = useState(false);

  const handleAnimationEnd: React.AnimationEventHandler<HTMLDivElement> = (event) => {
    if (event.animationName === styles['close-stripe']) {
      modalCallback(false);
    }
  };

  const handleClose = () => {
    setClosing(true);
  };

  return (
    <div
      className={`${styles.modal} ${modalState ? styles.active : ''} ${closing ? styles.closing : ''}`}
      onClick={handleClose}
    >
      {bg && bg}
      <div
        className={className + ' ' + styles.modal_content}
        onAnimationEnd={handleAnimationEnd}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <Button type="button" onClick={() => setClosing(true)}>
          Закрыть
        </Button>
      </div>
    </div>
  );
}
