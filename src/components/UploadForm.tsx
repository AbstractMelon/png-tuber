import React from 'react';

interface UploadFormProps {
  setIdleImage: (url: string) => void;
  setTalkingImage: (url: string) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ setIdleImage, setTalkingImage }) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'idle' | 'talking') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);

      if (type === 'idle') {
        setIdleImage(url);
      } else {
        setTalkingImage(url);
      }
    }
  };

  return (
    <div>
      <div>
        <label>Upload Idle Image</label>
        <input type="file" onChange={(e) => handleFileUpload(e, 'idle')} />
      </div>
      <div>
        <label>Upload Talking Image</label>
        <input type="file" onChange={(e) => handleFileUpload(e, 'talking')} />
      </div>
    </div>
  );
};

export default UploadForm;
