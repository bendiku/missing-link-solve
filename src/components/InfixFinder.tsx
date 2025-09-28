import './InfixFinder.css'
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';

const GLOSSARY_FILE_PATH = 'assets/data/ordliste_sortert_unik_a-z.txt';
const MIN_LENGTH = 3;
const DEBOUNCE_DELAY = 300;
const MAX_RESULTS = 20;

const InputSection = () => {
  const [prefix, setPrefix] = useState<string>('');
  const [suffix, setSuffix] = useState<string>('');
  const [words, setWords] = useState<Set<string>>(new Set());
  const [infixResults, setInfixResults] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false);


  // Create word set on mount
  useEffect(() => {
    readWordListFile();
  }, []);

  // Memoized prefix matches for better performance
  const prefixMatches = useMemo(() => {
    if (prefix.length < MIN_LENGTH) return [];
    return Array.from(words).filter(word => word.startsWith(prefix));
  }, [prefix, words]);

  // Efficient search implementation
  const findInfixes = useCallback(() => {
    if (prefix.length < MIN_LENGTH || suffix.length < MIN_LENGTH) {
      setInfixResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);

    // Use setTimeout to allow the UI to update with the searching indicator
    setTimeout(() => {
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
      setSearching(false);
    }, 100); // Small timeout to ensure the UI shows the searching indicator
  }, [prefix, suffix, prefixMatches, words]);

  // Debounced search to prevent too frequent updates
  const debouncedSearch = useMemo(
    () => debounce((callback: () => void) => {
      setSearching(true);
      callback();
    }, DEBOUNCE_DELAY),
    []
  );

  useEffect(() => {
    if (initialLoadComplete) {
      setSearching(true);
      if (prefix.length >= MIN_LENGTH && suffix.length >= MIN_LENGTH) {
        debouncedSearch(() => findInfixes());
      } else {
        // setInfixResults([]);
        setSearching(false);
      }
    }
    return () => debouncedSearch.cancel();
  }, [prefix, suffix, debouncedSearch, findInfixes, initialLoadComplete]);

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
      setInitialLoadComplete(true);
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

  const handleInputFocus = (inputType: 'prefix' | 'suffix') => {
    if (inputType === 'prefix'){
      setPrefix('');
    } else if (inputType === 'suffix') {
      setSuffix('');
    }
    // setInfixResults([]);
  };

  const canSearch = prefix.length >= MIN_LENGTH && suffix.length >= MIN_LENGTH;

  return (
    <>
      {/* Instructions for elderly users */}
      <div className="instructions">
        <p>Dette verktøyet hjelper deg å finne ordkombinasjoner ut i fra prefiks og suffikser.</p>
        <p>Skriv inn minst tre bokstaver i hvert felt.</p>
      </div>

      {/* Horizontal input container */}
      <div className="input-container">
        <div className="webflow-style-input">
          <div className="input-label">Prefiks:</div>
          <input
            type="text"
            name="prefix"
            value={prefix}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus('prefix')}
            placeholder="Skriv prefiks her"
            disabled={loading}
            autoComplete='off'
          />
        </div>

        <div className="webflow-style-input">
          <div className="input-label">Suffiks:</div>
          <input
            type="text"
            name="suffix"
            value={suffix}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus('suffix')}
            placeholder="Skriv suffiks her"
            disabled={loading}
            autoComplete='off'
          />
        </div>
      </div>

      {/* Search status indicator */}
      {(loading || searching) && (
        <div className="search-status">
          <div className="loading-spinner"></div>
          <span>{loading ? 'Laster ordliste...' : 'Søker etter infiks...'}</span>
        </div>
      )}

      {/* Results display when not searching */}
      {!loading && !searching && (
        <>
          {canSearch && infixResults.length === 0 && (
            <div className="no-results">
              Ingen infiks funnet for "{prefix}" og "{suffix}".
            </div>
          )}

          {infixResults.length > 0 && (
            <div className="results-container">
              <div className="results-title">{infixResults.length} mulige infiks:</div>
              <ul className="results-list">
                {infixResults.map((item, index) => (
                  <li key={index}>{item.toUpperCase()}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default InputSection;