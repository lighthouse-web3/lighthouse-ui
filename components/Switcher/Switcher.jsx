import React from 'react';
import styles from './Switcher.module.scss';

function Switcher({ title1, title2, activeTitle, setActiveTitle }) {
  const isRightActive = activeTitle === title2;

  return (
    <div
      className={styles.switcher}
      data-active={isRightActive ? 'right' : 'left'}
    >
      <button
        className={`${styles.switchButton} ${
          activeTitle === title1 ? styles.active : ''
        }`}
        onClick={() => setActiveTitle(title1)}
      >
        {title1}
      </button>
      <button
        className={`${styles.switchButton} ${
          activeTitle === title2 ? styles.active : ''
        }`}
        onClick={() => setActiveTitle(title2)}
      >
        {title2}
      </button>
    </div>
  );
}

export default Switcher;