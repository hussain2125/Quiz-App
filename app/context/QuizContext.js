import React, { createContext, useState, useContext } from "react";

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState({
    1: {
      title: "Traffic Rules Quiz",
      questions: [
        { 
          question: "What should you do when approaching a yellow traffic light?",
          options: [
            "Speed up and cross the intersection quickly",
            "Come to a complete stop",
            "Slow down and prepare to stop",
            "Ignore the light and continue driving",
          ],
          correct_option: "Slow down and prepare to stop",
        },
        {
          question: "What does a red octagonal sign indicate?",
          options: [
            "Yield right of way",
            "Stop and proceed when safe",
            "Merge with traffic",
            "No left turn allowed",
          ],
          correct_option: "Stop and proceed when safe",
        },
      ],
    },
    2: {
      title: "General Knowledge Quiz",
      questions: [
        {
          question: "Who wrote 'Hamlet'?",
          options: [
            "Charles Dickens",
            "William Shakespeare",
            "Mark Twain",
            "Jane Austen",
          ],
          correct_option: "William Shakespeare",
        },
        {
          question: "What is the capital of France?",
          options: ["Berlin", "Madrid", "Paris", "Lisbon"],
          correct_option: "Paris",
        },
      ],
    },
  });
  

  const addQuiz = (quizId, title, questions) => {
    setQuizzes((prev) => ({
      ...prev,
      [quizId]: { title, questions },
    }));
  };

  return (
    <QuizContext.Provider value={{ quizzes, addQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};
