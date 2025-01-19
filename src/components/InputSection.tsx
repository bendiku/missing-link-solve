import './InputSection.scss'
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';

const GLOSSARY_FILE_PATH = 'resources/ordliste_sortert_unik_a-z.txt';
const MIN_LENGTH = 3;
const DEBOUNCE_DELAY = 300;
const MAX_RESULTS = 20;

const InputSection = () => {
  const [prefix, setPrefix] = useState<string>('');
  const [suffix, setSuffix] = useState<string>('');
  const [words, setWords] = useState<Set<string>>(new Set());
  const [infixResults, setInfixResults] = useState<string[]>([]);
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
  const findInfixes = useCallback(() => {
    if (prefix.length < MIN_LENGTH || suffix.length < MIN_LENGTH) {
      setInfixResults([]);
      return;
    }

    // Use Set for potential infixes
    const potentialInfixes = new Set<string>();

    // Find all words that start with the prefix
    for (const word of prefixMatches) {
      const possibleInfix = word.slice(prefix.length);
      if (possibleInfix.length >= 2) {
        potentialInfixes.add(possibleInfix);
      }
    }

    // Find matching infixes that can form valid words with the suffix
    const validInfixes: string[] = [];
    for (const potentialInfix of potentialInfixes) {
      if (words.has(potentialInfix + suffix)) {
        validInfixes.push(potentialInfix);
      }
      
      // Limit the number of results
      if (validInfixes.length >= MAX_RESULTS) break;
    }

    // Sort results alphabetically
    setInfixResults(validInfixes.sort());

  }, [prefix, suffix, prefixMatches, words]);

  // Debounced search to prevent too frequent updates
  const debouncedSearch = useMemo(
    () => debounce(findInfixes, DEBOUNCE_DELAY),
    [findInfixes]
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
      setPrefix(value.toLowerCase());
    } else if (name === 'suffix') {
      setSuffix(value.toLowerCase());
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
            placeholder="prefiks"
            disabled={loading}
          />
        </div>
        <div className="demo-flex-spacer"></div>
      </div>

      <div className="container">
        <div className="demo-flex-spacer"></div>
        <div className="webflow-style-input">
          <input
            type="text"
            name="suffix"
            value={suffix}
            onChange={handleInputChange}
            placeholder="suffiks"
            disabled={loading}
          />
        </div>
        <div className="demo-flex-spacer"></div>
      </div>
      {
    infixResults.map((item, index) =>
        <li key={index}>
            {item}
        </li>
    )
}
    </>
  );
};

export default InputSection;