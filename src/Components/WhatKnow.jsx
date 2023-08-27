import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Selector.css'

export const langs = {
  "german": 'de',
  "english": 'en',
  "french": 'fr',
};
export const flagImages = {
  german: require(`./Flags/german.png`),
  english: require(`./Flags/english.png`),
  french: require(`./Flags/french.png`),
};

export default function WhatKnow() {
  const [speaking, setSpeaking] = useState(null);

  return (
    <div className="background-container"> 
      <div className="flex-container">
        <div className='Question'>Which Language Do you Speak</div>
        <div className="grid-container" id="KnownLangGrid">
          {Object.entries(langs).map(([key, value], index) => {
            return (
              <Link className="flag-link" key={index} to={`/${value}`}>
                <img className="FlagImage" src={flagImages[key]} alt={key} onClick={() => setSpeaking(value)} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}