import { useDataContext } from './DataContext';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, set, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useLocation } from 'react-router-dom';
import '../Styles/NewTask.css';

export function NewTask() {

    const location = useLocation();
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment !== "");

    const knownLang = pathSegments[1];
    const learnLang = pathSegments[2];

    const [taskData, setTaskData] = useState({
        knowLang: knownLang,
        learnLang: learnLang,
        sentencePart1: '',
        sentencePart2: '',
        translation: '',
        missingWord: '',
        hints: '',
        topic: '',
        positionInTopic: '',
        createdBy: '', 
    });

    const [user, setUser] = useState(null); 
    const [tasksArray, setTasksArray] = useState([]); 

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); 
        });

        const database = getDatabase();
        const tasksRef = ref(database); 
        get(tasksRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const tasks = [];
                    snapshot.forEach((childSnapshot) => {
                        const task = childSnapshot.val();
                        tasks.push(task);
                    });
                    setTasksArray(tasks);
                }
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });

        return () => unsubscribe();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (user) {
            const sameCombinationTasks = tasksArray.filter(
                task =>
                    task.knownLang === knownLang &&
                    task.learnLang === learnLang &&
                    task.topic === taskData.topic
            );


            const nextPosition = sameCombinationTasks.length + 1; 

            const database = getDatabase();
            const tasksRef = ref(database); 
            const newTaskRef = push(tasksRef);

            set(newTaskRef, {
                ...taskData,
                positionInTopic: nextPosition,
                createdBy: user.uid,
            })
                .then(() => {
                    console.log('Task uploaded successfully!');
                    setTaskData({
                        knowLang: knownLang,
                        learnLang: learnLang,
                        sentencePart1: '',
                        sentencePart2: '',
                        translation: '',
                        missingWord: '',
                        hints: '',
                        topic: '',
                        positionInTopic: '',
                        createdBy: '', 
                    });
                })
                .catch((error) => {
                    console.error('Error uploading task:', error);
                });
        }
    };

    return (
        <div className="background-NewTask">
            <form className="NewTask-Form" onSubmit={handleSubmit}>

                <input
                    className="input-field-NewTask"
                    type="text"
                    name="sentencePart1"
                    placeholder="Sentence Part 1"
                    value={taskData.sentencePart1}
                    onChange={handleInputChange}
                    required={true}
                />
                <input
                    className="input-field-NewTask"
                    type="text"
                    name="sentencePart2"
                    placeholder="Sentence Part 2"
                    value={taskData.sentencePart2}
                    onChange={handleInputChange}
                    required={true}
                />
                <input
                    className="input-field-NewTask"
                    type="text"
                    name="translation"
                    placeholder="Translation"
                    value={taskData.translation}
                    onChange={handleInputChange}
                    required={true}
                />
                <input
                    className="input-field-NewTask"
                    type="text"
                    name="missingWord"
                    placeholder="Missing Word"
                    value={taskData.missingWord}
                    onChange={handleInputChange}
                    required={true}
                />
                <input
                    className="input-field-NewTask"
                    type="text"
                    name="hints"
                    placeholder="Hints"
                    value={taskData.hints}
                    onChange={handleInputChange}
                    required={true}
                />
                <input
                    className="input-field-NewTask"
                    type="text"
                    name="topic"
                    placeholder="Topic"
                    value={taskData.topic}
                    onChange={handleInputChange}
                    required={true}
                />

                <input className="CreateNewTask" type="submit" value="Create" />

            </form>
            
        </div>
    );
}
