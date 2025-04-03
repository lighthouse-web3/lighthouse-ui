import React from 'react';
import styles from './EcosystemBanner.module.scss';

const EcosystemBanner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.heading}>
          <span>Explore the</span>
          <br />
          <span className={styles.highlight}>Lighthouse Ecosystem</span>
        </h1>
        <p className={styles.subtext}>
          Harnessing the power of Filecoin and LLMs, Lighthouse empowers developers,
          data contributors, and users with secure, transparent, and scalable infrastructure.
        </p>
      </div>
    </section>
  );
};

export default EcosystemBanner;