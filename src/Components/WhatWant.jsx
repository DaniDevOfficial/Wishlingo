import { useState, useSyncExternalStore } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { langs, flagImages } from './WhatKnow';
export default function WhatWant() {

    const [learning, setLearning] = useState("")
    const location = useLocation();
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment !== "");
    const knownLang = pathSegments[0];



    const filteredLangs = Object.fromEntries(
        Object.entries(langs).filter(([key, value]) => value !== knownLang)
    );


    return (
        <div>
      {Object.entries(filteredLangs).map(([key, value], index) => {
        return (
          <Link key={index} to={`${value}`}>
            <button onClick={() => setLearning(value)}>
            <img src={flagImages[key]} alt={key} />
            </button>
          </Link>
        );
      })}
        </div>
    );
};