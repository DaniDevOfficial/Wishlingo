import tasksData from './Tasks/tasks.json';
import { useLocation, Link } from 'react-router-dom';


export function Alltopics() {

    const location = useLocation();
    const currentPath = location.pathname;
    const known = currentPath.substring(1, 3)
    const learn = currentPath.substring(4, 6)

    const filteredTasks = tasksData.filter(task => task.knowLang === known && task.learnLang === learn);

    const uniqueTopicsSet = new Set();
    filteredTasks.forEach(item => {
        uniqueTopicsSet.add(item.topic);
    });

    const uniqueTopicsArray = Array.from(uniqueTopicsSet);

    return (
        <>
            <ul>
                {uniqueTopicsArray.map((topic, index) => (
                    <li key={index}>{topic}</li>
                ))}
            </ul>

        </>
    )
}