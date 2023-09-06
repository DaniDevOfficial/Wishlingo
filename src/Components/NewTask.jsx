import { useDataContext } from './DataContext';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, set, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useLocation, Link } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoggedIn(!!user);
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
                    toast.success('Task uploaded successfully! Start Learning');
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
                    toast.error('Error uploading task');
                });
        }
    };
    if (!loggedIn) {
        return <div className='centered background-NewTask'>
        <div>You need to be logged in to access this page.</div>
        <Link to="/signin">
          <button type="submit" id="startLearningButton">Login</button>
        </Link>
        <p className="create-account-link">
          No account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    }

    return (
        <div className="background-NewTask">

            <form className="NewTask-Form" onSubmit={handleSubmit}>
                <label htmlFor="sentencePart1">Sentence Part 1:</label>
                <input
                    className="input-field-NewTask"
                    type="text"
                    id="sentencePart1"
                    name="sentencePart1"
                    placeholder="Hello, how"
                    value={taskData.sentencePart1}
                    onChange={handleInputChange}
                    required={true}
                />

                <label htmlFor="sentencePart2">Sentence Part 2:</label>
                <input
                    className="input-field-NewTask"
                    type="text"
                    id="sentencePart2"
                    name="sentencePart2"
                    placeholder="you?"
                    value={taskData.sentencePart2}
                    onChange={handleInputChange}
                    required={true}
                />

                <label htmlFor="translation">Translation:</label>
                <input
                    className="input-field-NewTask"
                    type="text"
                    id="translation"
                    name="translation"
                    placeholder="Hallo, wie geht es dir?"
                    value={taskData.translation}
                    onChange={handleInputChange}
                    required={true}
                />

                <label htmlFor="missingWord">Missing Word:</label>
                <input
                    className="input-field-NewTask"
                    type="text"
                    id="missingWord"
                    name="missingWord"
                    placeholder="are"
                    value={taskData.missingWord}
                    onChange={handleInputChange}
                    required={true}
                />

                <label htmlFor="hints">Hints:</label>
                <input
                    className="input-field-NewTask"
                    type="text"
                    id="hints"
                    name="hints"
                    placeholder="Frag nach dem Zustand einer Person."
                    value={taskData.hints}
                    onChange={handleInputChange}
                    required={true}
                />

                <label htmlFor="topic">Topic:</label>
                <input
                    className="input-field-NewTask"
                    type="text"
                    id="topic"
                    name="topic"
                    placeholder="Begrüßungen"
                    value={taskData.topic}
                    onChange={handleInputChange}
                    required={true}
                />

                <input className="CreateNewTask" type="submit" value="Create" />

            </form>


        </div>
    );
}
