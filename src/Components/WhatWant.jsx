import { useState, useSyncExternalStore } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { langs, flagImages } from './WhatKnow';

import '../Styles/Selector.css'
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
    <div className="background-container">
      <div className="flex-container">
        <div className='Question'>Which Language Do you Speak</div>
        <div className="grid-container">
          {Object.entries(filteredLangs).map(([key, value], index) => {
            return (
              <Link className="flag-link" key={index} to={`${value}`}>
                <img className="FlagImage" src={flagImages[key]} alt={key} onClick={() => setLearning(value)} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};