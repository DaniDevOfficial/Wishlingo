import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDataContext } from './DataContext';
import { Navbar } from './Navbar';
import { HomePage } from './HomePage';
import WhatKnow from './WhatKnow';
import WhatWant from './WhatWant';
import { Alltopics } from './AllTopics';
import { SingleTask } from './SingleTask';
import { SignIn } from './auth/SignIn';
import { SignUp } from './auth/SignUp';
import { NewTask } from './NewTask.jsx';
export function Wrapper() {
  
  const topics = useDataContext().map(task => task.topic);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<WhatKnow />} />
        <Route path="/learn/:lang" element={<WhatWant />} />
        <Route path="/learn/:lang/:learn" element={<Alltopics />} />
        <Route path="/learn/:lang/:learn/NewTask" element={<NewTask />} />
        {topics.map(topic => (
        <Route
          key={topic}
          path={`/learn/:lang/:learn/${topic}`}
          element={<SingleTask />}
        />
      ))}
      </Routes>
    </Router>
  );
};

