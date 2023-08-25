import React, { useState } from 'react';
import { Link } from "react-router-dom"
const langs = {
  "german": "ge",
  "english": "en",
  "french": "fr"
};

export default function WhatKnow() {
  const [speaking, setSpeaking] = useState(null);

  return (
    <>
      {Object.entries(langs).map(([key, value], index) => {
        return (
         <button key={index} onClick={() => setSpeaking(value)}>
          {key}
        </button>
        );
      })}
      {speaking}
    </>
  );
}
