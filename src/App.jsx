import React from 'react';
import './Styles/App.css';
import { Wrapper } from './Components/Wrapper';

function App() {
  return (
    <div>
      <div id="MainBackground">
        <div className="contentwrapper">     
        <Wrapper />
        </div>
        <div className="background-svg1"></div>
        <div className="background-svg2"></div>
      </div>

    </div>
  );
}

export default App;
