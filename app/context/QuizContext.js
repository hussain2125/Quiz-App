import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState({});

  useEffect(() => {
    // Load quizzes from storage when the app starts
    const loadQuizzes = async () => {
      const storedQuizzes = await AsyncStorage.getItem("quizzes");
      if (storedQuizzes) {
        setQuizzes(JSON.parse(storedQuizzes));
      }
    };
    loadQuizzes();
  }, []);

  const addQuiz = async (quizId, title, questions) => {
    const newQuizzes = {
      ...quizzes,
      [quizId]: { title, questions },
    };
    setQuizzes(newQuizzes);
    await AsyncStorage.setItem("quizzes", JSON.stringify(newQuizzes)); // Save to storage
  };

  const deleteQuiz = async (quizId) => {
    const updatedQuizzes = { ...quizzes };
    delete updatedQuizzes[quizId]; // Remove the quiz from the state
  
    setQuizzes(updatedQuizzes); // Update the state
    await AsyncStorage.setItem("quizzes", JSON.stringify(updatedQuizzes)); // Save to storage
  };
  
  return (
    <QuizContext.Provider value={{ quizzes, addQuiz, deleteQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};
