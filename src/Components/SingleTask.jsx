import { useDataContext } from './DataContext';
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

  const tasksData = useDataContext();
  const filteredTaskForTopic = tasksData.filter(
    task => task.knowLang === knownLang && task.learnLang === learnLang && task.topic === topic
  );
  let noTasksAvailableForThisParamText = "No tasks found for the specified parameters.";
  let rightText = "Correct!";
  let wrongText = "Wrong!";
  let theAnswerIsText = "Your answer is Wrong!! The correct answer is: ";
  let checkAnswerText = "Check Answer";
  let nextText = "Next";
  let resultsForExerciseText = "Results for Exercise: ";
  let youGotText = "You got ";
  let outOfText = "Out of  "
  let stayStrongText = "Stay Strong and Learn even More!!";
  let doneText = "Chose another Topic";
  let correctText = "Questions Correct";



  if (knownLang === "de") {
    noTasksAvailableForThisParamText = "Keine Aufgaben für die angegebenen Parameter gefunden.";
    rightText = "Richtig!";
    wrongText = "Falsch!";
    theAnswerIsText = "Deine Antwort ist falsch!! Die richtige Lösung ist: ";
    checkAnswerText = "Antwort überprüfen";
    nextText = "Weiter";
    resultsForExerciseText = "Ergebnisse für Übung: ";
    youGotText = "Du hast ";
    outOfText = "von ";
    correctText = " Fragen richtig";
    stayStrongText = "Bleib stark und lerne noch mehr!!";
    doneText = "Anderes Thema auswählen";
  } else if (knownLang === "fr") {
    noTasksAvailableForThisParamText = "Aucune tâche trouvée pour les paramètres spécifiés.";
    rightText = "Correct !";
    theAnswerIsText = "Votre réponse est fausse !! La solution correcte est :";
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
  const [isHintVisible, setIsHintVisible] = useState(false);



  const task = filteredTaskForTopic[currentTaskIndex];
  const sentencePart1 = task.sentencePart1;
  const sentencePart2 = task.sentencePart2;
  const translatedSentence = task.translation;
  const missingWord = task.missingWord;
  const hint = task.hints;
  const missingWordLength = missingWord.length
  const progressPercentage = (currentTaskIndex / (filteredTaskForTopic.length)) * 100;


  const goToNextTask = () => {
    if (currentTaskIndex < filteredTaskForTopic.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
      setUserInput("");
      setIsCorrect();
      setIsHintVisible(false);
    } else if (currentTaskIndex === filteredTaskForTopic.length - 1) {
      return (
        setNoMoreTasksLeft(true)
      )

    }
  };

  const toggleHint = () => {
    setIsHintVisible(!isHintVisible);
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
    <div>
      {noMoreTasksLeft ? (
        <div className="background-singleTask">
          <div className="progressbar" style={{ width: `100%` }}></div>
          <h2>{resultsForExerciseText} {topic}</h2>
          <div className="results-summary">
            <p>{youGotText} {amoutOfCorrect} {outOfText} {filteredTaskForTopic.length} {correctText}</p>
            <p>{stayStrongText}</p>
          </div>
          <Link to={`/learn/${knownLang}/${learnLang}`} className="done-link">{doneText}</Link>
        </div>
      ) : (
        <>
        wasd
          <div className="background-singleTask" id='withanimation'>
            <div className="progressbar" style={{ width: `${progressPercentage}%` }}></div>
            <h2>{topic}</h2>
            <br />
            <p>
              <div className="task-content">
                <p className='task'>
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
                <div className="translation-hint-container">
                  <p className="translation">{translatedSentence}</p>
                  {isHintVisible ? (
                    <p className="hint-content">{hint}</p>
                  ) : (
                    <button className="hint-button" onClick={toggleHint}>Hint</button>
                  )}
                </div>
              </div>
              {isCorrect === undefined ? (
                <button className="button" onClick={checkAnswer}>{checkAnswerText}</button>
              ) : (
                <button className="button" onClick={goToNextTask}>{nextText}</button>
              )}
            </p>
            {isCorrect === true ? <p className="feedback-message right-answer">{rightText}</p> : null}
            {isCorrect === false ? <p className="feedback-message wrong-answer">{theAnswerIsText} {missingWord}</p> : null}
          </div>
        </>
      )}
    </div>
  );
}
