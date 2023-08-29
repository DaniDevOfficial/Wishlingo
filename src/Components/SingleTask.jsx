import tasksData from './Tasks/tasks.json';
import { useLocation, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../Styles/TaskStyling.css'
export function SingleTask() {
  const location = useLocation();
  const currentPath = location.pathname;
  const pathSegments = currentPath.split('/').filter(segment => segment !== "");

  const knownLang = pathSegments[1];
  const learnLang = pathSegments[2];
  const topic = decodeURIComponent(pathSegments[3]);


  let noTasksAvailableForThisParamText = "No tasks found for the specified parameters.";
  let rightText = "Correct!";
  let wrongText = "Wrong!";
  let theAnswerIsText = "The correct answer is: ";
  let checkAnswerText = "Check Answer";
  let nextText = "Next";
  let resultsForExerciseText = "Results for Exercise: ";
  let youGotText = "You got ";
  let outOfText = "Out of  "
  let stayStrongText = "Stay Strong and Learn even More!!";
  let doneText = "Done";
  let correctText = "Questions Correct";



  if (knownLang === "de") {
    noTasksAvailableForThisParamText = "Keine Aufgaben für die angegebenen Parameter gefunden.";
    rightText = "Richtig!";
    wrongText = "Falsch!";
    theAnswerIsText = "Die richtige Lösung ist: ";
    checkAnswerText = "Antwort überprüfen";
    nextText = "Weiter";
    resultsForExerciseText = "Ergebnisse für Übung: ";
    youGotText = "Du hast ";
    outOfText = "von ";
    correctText = " Fragen richtig";
    stayStrongText = "Bleib stark und lerne noch mehr!!";
    doneText = "Weiter";
  } else if (knownLang === "fr") {
    noTasksAvailableForThisParamText = "Aucune tâche trouvée pour les paramètres spécifiés.";
    rightText = "Correct !";
    wrongText = "Faux !";
    theAnswerIsText = "La solution correcte est :";
    checkAnswerText = "Vérifier la réponse";
    nextText = "Suivant";
    resultsForExerciseText = "Résultats de l'exercice :";
    youGotText = "Vous avez";
    outOfText = "sur ";
    correctText = " Questions correctes";
    stayStrongText = "Restez fort et apprenez encore plus !!";
    doneText = "Terminé";
  }


  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState();
  const [amoutOfCorrect, setAmountOfCorrect] = useState(0)
  const [noMoreTasksLeft, setNoMoreTasksLeft] = useState(false)


  const filteredTaskForTopic = tasksData.filter(
    task => task.knowLang === knownLang && task.learnLang === learnLang && task.topic === topic
  );

  const task = filteredTaskForTopic[currentTaskIndex];
  const sentencePart1 = task.sentencePart1;
  const sentencePart2 = task.sentencePart2;
  const translatedSentence = task.translation;
  const missingWord = task.missingWord;
  const missingWordLength = missingWord.length
  console.log(missingWordLength)


  const goToNextTask = () => {
    if (currentTaskIndex < filteredTaskForTopic.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
      setUserInput("");
      setIsCorrect();
    } else if (currentTaskIndex === filteredTaskForTopic.length - 1) {
      return (
        setNoMoreTasksLeft(true)
      )

    }
  };


  if (!task) {
    return <p>{noTasksAvailableForThisParamText}</p>;
  }



  const handleInputChange = event => {
    setUserInput(event.target.value);
  };

  const checkAnswer = () => {
    if (userInput.toLowerCase() === missingWord.toLowerCase()) {
      setIsCorrect(true);
      let tempCorrect = amoutOfCorrect + 1
      setAmountOfCorrect(tempCorrect)
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div>    {noMoreTasksLeft ? (
      <div>
        <p>{resultsForExerciseText} {topic}</p>
        <div> {youGotText} {amoutOfCorrect} {outOfText} {filteredTaskForTopic.length}  {correctText}</div>
        <div>{stayStrongText}</div>
        <Link to={`/learn/${knownLang}/${learnLang}`}> {doneText}</Link>
      </div>
    ) : (
      <>
        <p>
          {sentencePart1}
          <input
            type="text"
            value={userInput}
            maxLength={missingWordLength}
            id="answerInput"
            onChange={handleInputChange}
            style={{ "--missingwordLength": missingWordLength }}
          />
          {sentencePart2}
        </p>
        
        <p>{translatedSentence.replace(missingWord, "________")}</p>
        <button onClick={checkAnswer}>{checkAnswerText}</button>
        {isCorrect ? <p>{rightText}</p> : <p>{wrongText}</p>}
        <p>{theAnswerIsText} {missingWord}</p>
        {amoutOfCorrect}
        <button onClick={goToNextTask}>{nextText}</button>
        {currentTaskIndex}
        {filteredTaskForTopic.length - 1}
      </>
    )}

    </div>
  );
}
