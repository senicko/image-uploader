import { ChangeEvent, DragEvent } from 'react';
import Image from '../assets/image.svg';
import styles from './UploadForm.module.css';

interface UploadFormProps {
  onFileSelected: (file: File) => void;
}

export const UploadForm = ({ onFileSelected }: UploadFormProps) => {
  const handleDropUpload = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    if (files.length !== 1) return;
    onFileSelected(files[0]);
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length !== 1) return;
    onFileSelected(files[0]);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Upload your image</h1>
      <p className={styles.info}>File should be jpeg, png, ...</p>
      <div
        className={styles.dropZone}
        onDrop={handleDropUpload}
        onDragOver={e => e.preventDefault()}
      >
        <img src={Image} />
        <p className={styles.info}>Drag & Drop your image here</p>
      </div>
      <span className={styles.spacer}>or</span>
      <input id='file-upload' type='file' hidden onChange={handleUpload} />
      <label htmlFor='file-upload' className={styles.button}>
        Choose a file
      </label>
    </div>
  );
};
