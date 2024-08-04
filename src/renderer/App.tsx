import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import Settings from '../components/Settings';

const App: React.FC = () => {
  const [idleImage, setIdleImage] = useState<string>('/assets/idle.png');
  const [talkingImage, setTalkingImage] = useState<string>('/assets/talking.png');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">PNG Tuber Customizer</h1>
      <UploadForm setIdleImage={setIdleImage} setTalkingImage={setTalkingImage} />
      <Settings idleImage={idleImage} talkingImage={talkingImage} />
    </div>
  );
};

export default App;
