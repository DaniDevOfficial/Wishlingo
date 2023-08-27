import tasksData from './Tasks/tasks.json';
import { useLocation, Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../Styles/AllTopics.css'
export function Alltopics() {
    const [singleTask, setSingleTask] = useState("")
    const location = useLocation();
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment !== "");
    const knownLang = pathSegments[0];
    const learnLang = pathSegments[1];

    const filteredTasks = tasksData.filter(task => task.knowLang === knownLang && task.learnLang === learnLang);

    const uniqueTopicsSet = new Set();
    filteredTasks.forEach(item => {
        uniqueTopicsSet.add(item.topic);
    });

    const uniqueTopicsArray = Array.from(uniqueTopicsSet);

    return (
        <>
            <div className="background-containerTopics">
                <div className='Title'>sum title</div>
                <div className="grid-container" id="Topics">

                {uniqueTopicsArray.map((topic, index) => (
                    <Link key={index} to={`${topic}`}>
                        <div onClick={() => setSingleTask(topic)} key={index}>{topic}</div>
                    </Link>
                ))}
                </div>
            </div>
        </>
    )
}