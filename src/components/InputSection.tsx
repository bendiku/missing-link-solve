// InputSection.tsx

import React, { useState } from 'react';
import './InputSection.scss'

const InputSection = () => {

  const [prefix, setPrefix] = useState<string>('');
  const [infix, setInfix] = useState<string>('');
  const [suffix, setSuffix] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'prefix') {
      setPrefix(value);
    } else if (name === 'suffix') {
      setSuffix(value);
    }

    if (prefix !== '' && suffix !== '') {
      setInfix(value);
    }
  };

  return (
    <>
      <div className="container">
        <div className="demo-flex-spacer"></div>
        <div className="webflow-style-input">
          <input className="" type="text" name="prefix" value={prefix} onChange={handleInputChange} />
        </div>
        <div className="demo-flex-spacer"></div>
      </div>
      <div className="form__group field">
        <input type="input" className="form__field" placeholder='' name="name" id='name' readOnly tabIndex={-1} value={infix} />
      </div>
      <div className="container">
        <div className="demo-flex-spacer"></div>
        <div className="webflow-style-input">
        <input className="" type="text" name="suffix" value={suffix} onChange={handleInputChange} />
        </div>
        <div className="demo-flex-spacer"></div>
      </div>
    </>
  );
};

export default InputSection;
