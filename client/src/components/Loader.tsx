import styles from './Loader.module.css';

export const Loader = () => (
  <div className={styles.loader}>
    <p className={styles.header}>Uploading...</p>
    <div className={styles.bar}></div>
  </div>
);
