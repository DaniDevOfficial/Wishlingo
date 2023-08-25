import tasksData from './Tasks/tasks.json';



export function Alltopics () {
    const filteredTasks = tasksData.filter(task => task.knowLang === "de" && task.learnLang === "en");
    console.log(filteredTasks);

    return(
        <>
            
        
        </>
    )
}