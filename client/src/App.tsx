import { useState } from 'react';
import styles from './App.module.css';
import { Loader } from './components/Loader';
import { Preview } from './components/Preview';
import { UploadForm } from './components/UploadForm';

type UploadStage = 'upload' | 'process' | 'preview';

interface UploadResponse {
  url: string;
}

export const App = () => {
  const [stage, setStage] = useState<UploadStage>('upload');
  const [uploadUrl, setUploadUrl] = useState<string>(
    'http://localhost:8080/uploads/1657108015454742000.jpeg'
  );

  const upload = async (file: File) => {
    setStage('process');

    const data = new FormData();
    data.set('payload', file);

    const res = await fetch('http://localhost:8080/upload-image', {
      method: 'POST',
      body: data
    });

    const { url } = (await res.json()) as UploadResponse;

    setUploadUrl(url);
    setStage('preview');
  };

  const render = () => {
    switch (stage) {
      case 'upload':
        return <UploadForm onFileSelected={upload} />;
      case 'process':
        return <Loader />;
      case 'preview':
        return <Preview uploadUrl={uploadUrl} />;
    }
  };

  return <div className={styles.wrapper}>{render()}</div>;
};

export default App;
