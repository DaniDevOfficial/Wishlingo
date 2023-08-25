import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <>
      {Object.entries(langs).map(([key, value], index) => {
        return (
          <Link key={index} to={`/${value}`}>
            <button onClick={() => setSpeaking(value)}>
            <img src={flagImages[key]} alt={key} />
            </button>
          </Link>
        );
      })}
      {speaking}
    </>
  );
}
