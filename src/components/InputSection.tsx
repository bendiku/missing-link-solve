// InputSection.tsx

import React, { useState } from 'react';
import './InputSection.scss'

const InputSection = () => {

  const [prefix, setPrefix] = useState<string>('');
  const [infix, setInfix] = useState<string>('');
  const [suffix, setSuffix] = useState<string>('');
  const [lines, setLines] = useState<String[]>([])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'prefix') {
      setPrefix(value);
    } else if (name === 'suffix') {
      setSuffix(value);
    }

    if (prefix.length >= 3 && suffix.length >= 3) {
      updateInfix()
    }
  };

  async function updateInfix() {
    try {
      if(lines.length === 0){

        await readWordListFile()
      }
      const filteredLines = lines.filter(line =>
        line.trim().startsWith(prefix)
      );
      
      const bindingWord = filteredLines.map(word => word.split(prefix)[1])
      const filteredArray = bindingWord.filter(value => lines.includes(value+suffix) && value.length >= 2);

      console.log(filteredArray);
      
      //const results = 

      //console.log(results);
      

      filteredArray.forEach((line) => {
        if (line.trim().startsWith(prefix)) {
          setInfix(line)
        }
      })
    } catch (error) {
      console.error('Error reading the file:', error);
    }
  };

  async function readWordListFile() {
    try {
      const response = await fetch('resources/ordliste_sortert_unik_a-z.txt', { headers: { 'Content-Type': 'text/plain; charset=iso-885910' } });
      const text = await response.text();
      setLines(text.split('\n'));
    } catch (error) {
      console.error('Error reading the file:', error);
      return []; // Return an empty array or handle the error as needed
    }
  }

  function union(arr1:any, arr2:any) {
    const arr3 = arr1.concat(arr2)
    
    return arr3
  }

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
