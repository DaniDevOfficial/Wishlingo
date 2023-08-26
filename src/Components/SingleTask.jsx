import tasksData from './Tasks/tasks.json';
import { useLocation, Link } from 'react-router-dom';
import React, { useState } from 'react';
export function SingleTask () {

    const location = useLocation();
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment !== "");
    const knownLang = pathSegments[0];
    const learnLang = pathSegments[1];
    const topic = decodeURIComponent(pathSegments[2]);



    const filteredTaskForTopic = tasksData.filter(task => task.knowLang === knownLang && task.learnLang === learnLang && task.topic === topic);
    return(
        <>
        </>
    )
}