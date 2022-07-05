import { useState } from 'react';
import styles from './App.module.css';
import { UploadForm } from './components/UploadForm';

type UploadStage = 'upload' | 'process' | 'preview';

export const App = () => {
  const [stage, setStage] = useState<UploadStage>('upload');

  const upload = async (file: File) => {
    setStage('process');

    const data = new FormData();
    data.set('payload', file);

    await fetch('/', {
      method: 'POST',
      body: data
    });

    setStage('preview');
  };

  const render = () => {
    switch (stage) {
      case 'upload':
        return <UploadForm onFileSelected={upload} />;
      case 'process':
        return <p>processing ...</p>;
      case 'preview':
        return <p>preview ...</p>;
    }
  };

  return <div className={styles.wrapper}>{render()}</div>;
};

export default App;
