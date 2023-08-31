import { useDataContext } from './DataContext';
import { useLocation, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Make sure to import onAuthStateChanged
import '../Styles/AllTopics.css';

export function Alltopics() {
    const tasksData = useDataContext();

    const [singleTask, setSingleTask] = useState("");
    const location = useLocation();
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment !== "");
    const knownLang = pathSegments[1];
    const learnLang = pathSegments[2];
    const [user, setUser] = useState(null);

    const [filteredTasks, setFilteredTasks] = useState([]);

    const [uniqueTopicsArray, setUniqueTopicsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // New state for loading indicator

    useEffect(() => {
        const auth = getAuth(); 

        const unsubscribe = onAuthStateChanged(auth, (user) => { 
            setUser(user);
            setIsLoading(false); // Mark loading as done when user state is set
        });

        const userUID = user ? user.uid : null; 

        const filteredTasks = tasksData.filter(task => 
            (task.createdBy === userUID) || (!task.createdBy) && 
            (task.knowLang === knownLang && task.learnLang === learnLang)
        );

        setFilteredTasks(filteredTasks);

        const uniqueTopicsSet = new Set();
        filteredTasks.forEach(item => {
            uniqueTopicsSet.add(item.topic);
        });
        
        const topicsArray = Array.from(uniqueTopicsSet);
        setUniqueTopicsArray(topicsArray);

        return () => unsubscribe();
    }, [tasksData, knownLang, learnLang, user]);
    
    let Title
    if (knownLang === "de" && learnLang === "fr") {
        Title = "Du willst also Französisch lernen"
    } else if (knownLang === "de" && learnLang === "en") {
        Title = "Du willst also English lernen"
    } else if (knownLang === "en" && learnLang === "de") {
        Title = "So you want to learn German"
    } else if (knownLang === "en" && learnLang === "fr") {
        Title = "So you want to learn French"
    } else if (knownLang === "fr" && learnLang === "en") {
        Title = "Donc tu veux apprendre l'anglais"
    } else if (knownLang === "fr" && learnLang === "en") {
        Title = "Alors tu veux apprendre l'allemand"
    }



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
                        <Link to={'NewTask'}className="link-style">
                        <div className="SingleTopicBox" id="addnew">
                            <div className="addNewTaskButton plus-icon">
                                +
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
