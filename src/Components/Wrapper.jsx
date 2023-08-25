import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WhatKnow from './WhatKnow';
import WhatWant from './WhatWant';
import { Alltopics } from './AllTopics';

export function Wrapper ()  {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WhatKnow />} />

        <Route path="/en" element={<WhatWant />} />
        <Route path="/en/de" element={<Alltopics />} />
        <Route path="/en/fr" element={<Alltopics />} />

        <Route path="/de" element={<WhatWant />} />
        <Route path="/de/en" element={<Alltopics />} />
        <Route path="/de/fr" element={<Alltopics />} />

        <Route path="/fr" element={<WhatWant />} />
        <Route path="/fr/de" element={<Alltopics />} />
        <Route path="/fr/en" element={<Alltopics />} />

      </Routes>
    </Router>
  );
};

