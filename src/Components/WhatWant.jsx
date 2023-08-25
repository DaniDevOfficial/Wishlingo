import { useState, useSyncExternalStore } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { langs, flagImages } from './WhatKnow';
export default function WhatWant() {

    const [learning, setLearning] = useState("")
    const location = useLocation();
    const currentPath = location.pathname;
    const cutPath = currentPath.substring(1)

    const filteredLangs = Object.fromEntries(
        Object.entries(langs).filter(([key, value]) => value !== cutPath)
    );


    return (
        <div>
      {Object.entries(filteredLangs).map(([key, value], index) => {
        return (
          <Link key={index} to={`/${cutPath}/${value}`}>
            <button onClick={() => setLearning(value)}>
            <img src={flagImages[key]} alt={key} />
            </button>
          </Link>
        );
      })}
        </div>
    );
};