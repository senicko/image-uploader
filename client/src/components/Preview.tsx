import styles from './Preview.module.css';
import Check from '../assets/check.svg';

interface PreviewProps {
  uploadUrl: string;
}

export const Preview = ({ uploadUrl }: PreviewProps) => (
  <div className={styles.preview}>
    <div className={styles.icon}>
      <img src={Check} />
    </div>
    <p className={styles.header}>Uploaded Successfully</p>
    <img src={uploadUrl} className={styles.image} />
    <div className={styles.info}>
      <p className={styles.url}>{uploadUrl}</p>
      <button className={styles.button} onClick={() => navigator.clipboard.writeText(uploadUrl)}>
        Copy Link
      </button>
    </div>
  </div>
);
