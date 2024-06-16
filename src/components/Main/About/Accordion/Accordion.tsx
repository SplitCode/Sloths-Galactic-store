import { useEffect, useState } from 'react';
import styles from './Accordion.module.css';
import type { AccordionProps } from '../../Main.interfaces';
import type { AccordionItemWithState } from '../../Main.interfaces';

export function Accordion({ data }: AccordionProps) {
  const [accordionItems, setAccordionItems] = useState<AccordionItemWithState[]>([]);

  useEffect(() => {
    const accordion = data.map((item) => ({
      title: item.title,
      content: item.content,
      open: false
    }));
    setAccordionItems(accordion);
  }, [data]);

  const handleClick = (item: AccordionItemWithState) => {
    setAccordionItems((prevItems) =>
      prevItems.map((i) => ({
        ...i,
        open: i === item ? !i.open : false
      }))
    );
  };

  return (
    <ul className={styles.accordion}>
      {accordionItems.map((item) => (
        <li key={item.title}>
          <div
            className={item.open ? styles.highlighted + ' ' + styles.title_wrapper : styles.title_wrapper}
            onClick={() => handleClick(item)}
          >
            <span className={styles.title}>{item.title}</span>
          </div>
          <div className={item.open ? styles.content + ' ' + styles.open : styles.content}>
            <p
              className={
                item.open ? styles.content_text + ' ' + styles.content_text_open : styles.content_text
              }
            >
              {item.content}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
