import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './HomePage';
import WhatKnow from './WhatKnow';
import WhatWant from './WhatWant';
import { Alltopics } from './AllTopics';
import { SingleTask } from './SingleTask';
import tasksData from './Tasks/tasks.json';

export function Wrapper() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const uniqueTopics = [...new Set(tasksData.map(task => task.topic))];
    setTopics(uniqueTopics);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<WhatKnow />} />

        <Route path="/learn/en" element={<WhatWant />} />
        <Route path="/learn/en/de" element={<Alltopics />} />
        <Route path="/learn/en/fr" element={<Alltopics />} />

        <Route path="/learn/de" element={<WhatWant />} />
        <Route path="/learn/de/en" element={<Alltopics />} />
        <Route path="/learn/de/fr" element={<Alltopics />} />

        <Route path="/learn/fr" element={<WhatWant />} />
        <Route path="/learn/fr/de" element={<Alltopics />} />
        <Route path="/learn/fr/en" element={<Alltopics />} />
        
        {topics.map(topic => (
          <Route key={topic} path={`/learn/:lang/:learn/${topic}`} element={<SingleTask />} />
        ))}
      </Routes>
    </Router>
  );
};

