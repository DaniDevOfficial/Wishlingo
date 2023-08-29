import tasksData from './Tasks/tasks.json';
import { useLocation, Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../Styles/AllTopics.css'

export function Alltopics() {
    const [singleTask, setSingleTask] = useState("");
    const location = useLocation();
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment !== "");
    const knownLang = pathSegments[1];
    const learnLang = pathSegments[2];
    console.log(knownLang)
    console.log(learnLang)
    let Title
    if(knownLang === "de" && learnLang === "fr"){
        Title = "Du willst also Französisch lernen"
    } else if (knownLang === "de" && learnLang === "en"){
        Title = "Du wilst also English lernen"
    } else if (knownLang === "en" && learnLang === "de"){
        Title = "So you want to learn German"
    } else if (knownLang === "en" && learnLang === "fr"){
        Title = "So you want to learn French"
    } else if (knownLang === "fr" && learnLang === "en"){
        Title = "Donc tu veux apprendre l'anglais"
    } else if (knownLang === "fr" && learnLang === "en"){
        Title ="Alors tu veux apprendre l'allemand"}

    const filteredTasks = tasksData.filter(task => task.knowLang === knownLang && task.learnLang === learnLang);

    const uniqueTopicsSet = new Set();
    filteredTasks.forEach(item => {
        uniqueTopicsSet.add(item.topic);
    });

    const uniqueTopicsArray = Array.from(uniqueTopicsSet);

    return (
        <>
            <div className="background-containerTopics">
            <div className="flex-container">

                <div className='Title'>{Title}</div>
                <div className="grid-container-topics" id="Topics">

                    {uniqueTopicsArray.map((topic, index) => (
                        <Link key={index} to={`${topic}`} className="link-style">
                            <div className="SingleTopicBox">
                                <div className="SingleTopic linear-wipe" onClick={() => setSingleTask(topic)} key={index}>{topic}</div>
                            </div>
                        </Link>
                    ))}
                    </div>
                </div>
            </div>
        </>
    )
}
