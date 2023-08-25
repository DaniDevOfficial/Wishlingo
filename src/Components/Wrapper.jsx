import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WhatKnow from './WhatKnow';
import WhatWant from './WhatWant';

export function Wrapper ()  {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WhatKnow />} />
        <Route path="/en" element={<WhatWant />} />
        <Route path="/de" element={<WhatWant />} />
        <Route path="/fr" element={<WhatWant />} />

      </Routes>
    </Router>
  );
};

