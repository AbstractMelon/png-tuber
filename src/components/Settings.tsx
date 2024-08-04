import React from 'react';

interface SettingsProps {
  idleImage: string;
  talkingImage: string;
}

const Settings: React.FC<SettingsProps> = ({ idleImage, talkingImage }) => {
  return (
    <div>
      <h2 className="text-xl">Settings</h2>
      <div>
        <img src={idleImage} alt="Idle" className="w-24 h-24" />
        <img src={talkingImage} alt="Talking" className="w-24 h-24" />
      </div>
    </div>
  );
};

export default Settings;
