import tasksData from './Tasks/tasks.json';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export function SingleTask() {
  const location = useLocation();
  const currentPath = location.pathname;
  const pathSegments = currentPath.split('/').filter(segment => segment !== "");

  const knownLang = pathSegments[0];
  const learnLang = pathSegments[1];
  const topic = decodeURIComponent(pathSegments[2]);


  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState();
  const [amoutOfCorrect, setAmountOfCorrect] = useState(0)
  const [noMoreTasksLeft, setNoMoreTasksLeft] = useState(false)


  const filteredTaskForTopic = tasksData.filter(
    task => task.knowLang === knownLang && task.learnLang === learnLang && task.topic === topic
  );

  const task = filteredTaskForTopic[currentTaskIndex];
  const originalSentence = task.sentence;
  const translatedSentence = task.translation;
  const missingWord = task.missingWord;


  const goToNextTask = () => {
    if (currentTaskIndex < filteredTaskForTopic.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
      setUserInput("");
      setIsCorrect();
    } else if (currentTaskIndex === filteredTaskForTopic.length - 1){
        return(

            setNoMoreTasksLeft(true)
        )

    }
  };


  if (!task) {
    return <p>No tasks found for the specified parameters.</p>;
  }

 

  const handleInputChange = event => {
    setUserInput(event.target.value);
  };

  const checkAnswer = () => {
    if (userInput.toLowerCase() === missingWord.toLowerCase()) {
      setIsCorrect(true);
      let tempCorrect = amoutOfCorrect+1
      setAmountOfCorrect(tempCorrect)
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div>    {noMoreTasksLeft ? (
        <p>No tasks left.</p>
      ) : (
      <>
      <p>{originalSentence}</p>
      <p>{translatedSentence.replace(missingWord, "________")}</p>
      <input type="text" value={userInput} onChange={handleInputChange} />
      <button onClick={checkAnswer}>Check Answer</button>
      {isCorrect ? <p>Richtig!</p> : <p>Falsch!</p>}
      <p>Die richtige Lösung wäre: {missingWord}</p>
      {amoutOfCorrect}
      <button onClick={goToNextTask}>Next</button>
      {currentTaskIndex}
      {filteredTaskForTopic.length - 1}
      </>
      )}
      
    </div>
  );
}
