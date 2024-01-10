// InputSection.tsx

import React from 'react';

interface InputSectionProps {
  prefix: string;
  suffix: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ prefix, suffix, handleInputChange }) => {

const shouldDisplayConcatenatedText = () => {
    return true;
}
    
  return (
    <>
      <div className="input-label">
        <input
          className="input-field"
          type="text"
          name="prefix"
          value={prefix}
          onChange={handleInputChange}
        />
      </div>
      {shouldDisplayConcatenatedText() && (  
        <span className="concatenated-text">{prefix} {suffix}</span>
      ) || <span className="concatenated-text">{prefix} {suffix}</span>}
      <div className="input-label">
        <input
          className="input-field"
          type="text"
          name="suffix"
          value={suffix}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default InputSection;
