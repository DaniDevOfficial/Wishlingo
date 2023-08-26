import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
        
        {topics.map(topic => (
          <Route key={topic} path={`/:lang/:learn/${topic}`} element={<SingleTask />} />
        ))}
      </Routes>
    </Router>
  );
};

