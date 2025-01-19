// InputSection.tsx

import React, { useState, useEffect } from 'react';
import './InputSection.scss'

const InputSection = () => {

  const [prefix, setPrefix] = useState<string>('');
  const [infix, setInfix] = useState<string>('');
  const [suffix, setSuffix] = useState<string>('');
  const [lines, setLines] = useState<string[]>([])
  const [solutions, setSolution] = useState<string[]>([])

  const GLOSSARY_FILE_PATH = 'resources/ordliste_sortert_unik_a-z.txt'

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'prefix') {
      setPrefix(value.toLocaleLowerCase());
    } else if (name === 'suffix') {
      setSuffix(value.toLowerCase());
    }
  }

    useEffect(() => {
        if (prefix.length >= 3 && suffix.length >= 3) {
          updateInfix();
        }
      }, [prefix, suffix]);

  async function updateInfix() {
    try {
      if(lines.length === 0){
        await readWordListFile()
      }
    } catch (error) {
      console.error(error);
    }

    const filteredLines = lines.filter(line =>
        line.trim().startsWith(prefix)
      );
      
    const bindingWord = filteredLines.map(word => word.split(prefix)[1])
    const filteredArray = bindingWord.filter(value => lines.includes(value+suffix) && value.length >= 2);

    console.log(filteredArray);

    setSolution(filteredArray);
    filteredArray.forEach((line) => {
    setInfix(line)
    if (line.trim().startsWith(prefix)) {
        setInfix(line)
    }
    })
  };

  async function readWordListFile() {
    try {
      const response = await fetch(GLOSSARY_FILE_PATH);

      if(!response.ok){
        throw new Error(`Could not read response from: ${GLOSSARY_FILE_PATH} `)
      }

      setLines((await response.text()).split('\n'));
    } catch (error) {
      throw new Error(`Error reading the file:', ${error}`)
    }
  }

  return (
    <>
      <div className="container">
        <div className="demo-flex-spacer"></div>
        <div className="webflow-style-input">
          <input className="" type="text" maxLength={16} size={4} name="prefix" value={prefix} onChange={handleInputChange} />
        </div>
        <div className="demo-flex-spacer"></div>
      </div>
      <div className="container">
        <div className="demo-flex-spacer"></div>
        <div className="webflow-style-input">
          <input className="" type="text" maxLength={16} size={4} name="suffix" value={suffix} onChange={handleInputChange} />
        </div>
        <div className="demo-flex-spacer"></div>
      </div>
      {
    solutions.map((item, index) =>
        <li key={index}>
            {item}
        </li>
    )
}
    </>
  );
}
export default InputSection;
