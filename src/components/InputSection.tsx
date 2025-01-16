import './InputSection.scss'
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';

const GLOSSARY_FILE_PATH = 'resources/ordliste_sortert_unik_a-z.txt';
const MIN_LENGTH = 3;
const DEBOUNCE_DELAY = 300;

const InputSection = () => {
  const [prefix, setPrefix] = useState<string>('');
  const [infix, setInfix] = useState<string>('');
  const [suffix, setSuffix] = useState<string>('');
  const [words, setWords] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(false);

  // Create word set on mount
  useEffect(() => {
    readWordListFile();
  }, []);

  // Memoized prefix matches for better performance
  const prefixMatches = useMemo(() => {
    if (prefix.length < MIN_LENGTH) return [];
    return Array.from(words).filter(word => 
      word.startsWith(prefix)
    );
  }, [prefix, words]);

  // Efficient search implementation
  const findInfix = useCallback(() => {
    if (prefix.length < MIN_LENGTH || suffix.length < MIN_LENGTH) {
      setInfix('');
      return;
    }

    // Create a Map to store potential infixes
    const potentialInfixes = new Map<string, boolean>();

    // Find all words that start with the prefix
    for (const word of prefixMatches) {
      const possibleInfix = word.slice(prefix.length);
      if (possibleInfix.length >= 2) {
        potentialInfixes.set(possibleInfix, true);
      }
    }

    // Find matching infixes that can form valid words with the suffix
    for (const [infix] of potentialInfixes) {
      if (words.has(infix + suffix)) {
        setInfix(infix);
        return;
      }
    }

    setInfix('');
  }, [prefix, suffix, prefixMatches, words]);

  // Debounced search to prevent too frequent updates
  const debouncedSearch = useMemo(
    () => debounce(findInfix, DEBOUNCE_DELAY),
    [findInfix]
  );

  useEffect(() => {
    debouncedSearch();
    return () => debouncedSearch.cancel();
  }, [prefix, suffix, debouncedSearch]);

  async function readWordListFile() {
    setLoading(true);
    try {
      const response = await fetch(GLOSSARY_FILE_PATH);
      if (!response.ok) {
        throw new Error(`Could not read response from: ${GLOSSARY_FILE_PATH}`);
      }
      const text = await response.text();
      setWords(new Set(text.split('\n').map(line => line.trim())));
    } catch (error) {
      console.error('Error reading the file:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'prefix') {
      setPrefix(value.toLowerCase().trim());
    } else if (name === 'suffix') {
      setSuffix(value.toLowerCase().trim());
    }
  };

  return (
    <>
      <div className="container">
        <div className="demo-flex-spacer"></div>
        <div className="webflow-style-input">
          <input
            type="text"
            name="prefix"
            value={prefix}
            onChange={handleInputChange}
            placeholder="Enter prefix..."
            disabled={loading}
          />
        </div>
        <div className="demo-flex-spacer"></div>
      </div>

      <div className="form__group field">
        <input
          type="input"
          className="form__field"
          placeholder=""
          name="name"
          id="name"
          readOnly
          tabIndex={-1}
          value={loading ? 'Loading...' : infix}
        />
      </div>

      <div className="container">
        <div className="demo-flex-spacer"></div>
        <div className="webflow-style-input">
          <input
            type="text"
            name="suffix"
            value={suffix}
            onChange={handleInputChange}
            placeholder="Enter suffix..."
            disabled={loading}
          />
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
};

export default InputSection;