import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitAnswer } from "../reducers/quiz";

export const QuestionOne = () => {
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );
  const answersArray = useSelector((state) => state.quiz.answers);
  const dispatch = useDispatch();

  // I added this state instead of using 'isCorrect' to track whether an answer has been selected
  // (It is used to disable further selections) and is the answer correct
  const [answerSelected, setAnswerSelected] = useState(false);

  // I added this state to track the index of the selected answer
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const submit = (index) => {
    // Disabling further selections with submit
    setAnswerSelected(true);

    // Tracking the selected answer index with submit
    setSelectedAnswerIndex(index);

    dispatch(submitAnswer({ questionId: question.id, answerIndex: index }));

    console.log("questionOne submit ID", question.id);
    console.log("questionOne index", index);
    answersArray.map((obj) => console.log(obj.isCorrect));
  };

  // Reset states when moving to the next question
  useEffect(() => {
    setAnswerSelected(false);
    setSelectedAnswerIndex(null);
  }, [question]);

  return (
    <div>
      <div className="option-container">
        <span className="progress">Question {question.id}/5</span>
        <div className="question">
          <h2>{question.questionText}</h2>
        </div>
        <div className="option-button">
          <button
            onClick={() => submit(0)}
            className={`${answerSelected && selectedAnswerIndex === 0
              ? selectedAnswerIndex === question.correctAnswerIndex
                ? "correct"
                : "incorrect"
              : ""
              }`}
            disabled={answerSelected}
          >
            {question.options[0]}
          </button>
        </div>
        <div className="option-button">
          <button
            onClick={() => submit(1)}
            className={`${answerSelected && selectedAnswerIndex === 1
              ? selectedAnswerIndex === question.correctAnswerIndex
                ? "correct"
                : "incorrect"
              : ""
              }`}
            disabled={answerSelected}
          >
            {question.options[1]}
          </button>
        </div>
        <div className="option-button">
          <button
            onClick={() => submit(2)}
            className={`${answerSelected && selectedAnswerIndex === 2
                ? selectedAnswerIndex === question.correctAnswerIndex
                  ? "correct"
                  : "incorrect"
                : ""
              }`}
            disabled={answerSelected}
          >
            {question.options[2]}
          </button>
        </div>
        <div className="eval">
          {selectedAnswerIndex !== null && (
            <div>
              {selectedAnswerIndex === question.correctAnswerIndex ? (
                <div>Correct!</div>
              ) : (
                <div>Incorrect!</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// {question.options.map((option) => (
//   <div key={option}>
//     <button onClick={() => submit(option)}>{option}</button>
//   </div>
// ))}
