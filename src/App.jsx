import React, { useState, useRef } from "react";
import { data } from "./assets/data";

const App = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const correctAnswerRef = useRef(null);

  const checkAnswer = (e, userAnswer) => {
    if (isAnswered) return;

    setIsAnswered(true);

    if (question.answer === userAnswer) {
      setScore((prevScore) => prevScore + 1);
      e.target.classList.add("bg-green-200", "border-green-300");
    } else {
      e.target.classList.add("bg-red-200", "border-red-300");
      correctAnswerRef.current.classList.add("bg-green-200", "border-green-300");
    }
  };

  const handleNext = () => {
    if (index < data.length - 1) {
      setIsAnswered(false);
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(data[index + 1]);

      const answers = document.querySelectorAll("li");
      answers.forEach((answer) => {
        answer.classList.remove(
          "bg-green-200",
          "border-green-300",
          "bg-red-200",
          "border-red-300"
        );
      });
    } else {
      setShowResults(true);
    }
  };

  return (
    <div className="md:w-[620px] w-[310px] m-auto bg-white text-gray-800 flex flex-col md:gap-5 gap-3 rounded-lg md:p-8 p-4">
      <h1 className="md:text-3xl text-2xl font-bold text-center">Quiz App</h1>
      <hr className="h-0.5 border-none bg-gray-400" />
      {showResults ? (
        <div className="text-center">
          <h2 className="text-2xl font-medium">Quiz Completed!</h2>
          <p className="text-xl mt-4">
            Your Score: {score} out of {data.length}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-36 md:h-12 h-10 bg-[#553f9a] hover:bg-[#492d9c] text-white md:text-xl text-lg font-medium rounded-lg cursor-pointer shadow-md transition-all duration-200"
          >
            Restart
          </button>
        </div>
      ) : (
        <>
          <h2 className="md:text-2xl text-xl font-medium">
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              ref={question.answer === 1 ? correctAnswerRef : null}
              onClick={(e) => {
                checkAnswer(e, 1);
              }}
              className="flex items-center h-12 md:px-4 px-3 border border-gray-300 rounded-lg mb-5 md:text-lg text-base cursor-pointer"
            >
              {question.option1}
            </li>
            <li
              ref={question.answer === 2 ? correctAnswerRef : null}
              onClick={(e) => {
                checkAnswer(e, 2);
              }}
              className="flex items-center  h-12 md:px-4 px-3 border border-gray-300 rounded-lg mb-5 md:text-lg text-base cursor-pointer"
            >
              {question.option2}
            </li>
            <li
              ref={question.answer === 3 ? correctAnswerRef : null}
              onClick={(e) => {
                checkAnswer(e, 3);
              }}
              className="flex items-center h-12 md:px-4 px-3 border border-gray-300 rounded-lg mb-5 md:text-lg text-base cursor-pointer"
            >
              {question.option3}
            </li>
            <li
              ref={question.answer === 4 ? correctAnswerRef : null}
              onClick={(e) => {
                checkAnswer(e, 4);
              }}
              className="flex items-center h-12 md:px-4 px-3 border border-gray-300 rounded-lg mb-5 md:text-lg text-base cursor-pointer"
            >
              {question.option4}
            </li>
          </ul>
          <button
            onClick={handleNext}
            disabled={isAnswered ? false : true}
            className="mx-auto w-36 md:h-12 h-10 bg-[#553f9a] hover:bg-[#492d9c] text-white md:text-xl text-lg font-medium rounded-lg cursor-pointer shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
          <div className="m-auto md:text-lg text-base">
            {index + 1} of {data.length} Questions
          </div>
        </>
      )}
    </div>
  );
};

export default App;
