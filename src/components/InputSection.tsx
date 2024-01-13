// InputSection.tsx

import React, { useState } from 'react';
import './InputSection.scss'

const InputSection = () => {

  const [prefix, setPrefix] = useState<string>('');
  const [suffix, setSuffix] = useState<string>('');
  const [infix, setInfix] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'prefix') {
      setPrefix(value);
    } else if (name === 'suffix') {
      setSuffix(value);
    }
  };

  return (
    <>
      <div className="container">

        <div className="demo-flex-spacer"></div>

        <div className="webflow-style-input">
          <input className="" type="text"></input>
          <button type="submit"><i className="icon ion-android-arrow-forward"></i></button>
        </div>

        <div className="demo-flex-spacer"></div>

      </div>
      <div className="form__group field">
        <input type="input" className="form__field" placeholder='' name="name" id='name' readOnly required tabIndex={-1} value={infix} />
      </div>
      <div className="container">

        <div className="demo-flex-spacer"></div>

        <div className="webflow-style-input">
          <input className="" type="text"></input>
          <button type="submit"><i className="icon ion-android-arrow-forward"></i></button>
        </div>

        <div className="demo-flex-spacer"></div>

      </div>
    </>
  );
};

export default InputSection;
