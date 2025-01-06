import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../firebaseConfig"; // Import Firestore config
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState({});
  const [publicQuizzes, setPublicQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load local quizzes from AsyncStorage
  const loadLocalQuizzes = async () => {
    try {
      const storedQuizzes = await AsyncStorage.getItem("quizzes");
      setQuizzes(storedQuizzes ? JSON.parse(storedQuizzes) : {});
    } catch (error) {
      console.error("Error loading local quizzes:", error);
    }
  };

  // Save quizzes to AsyncStorage
  const saveLocalQuizzes = async (quizzes) => {
    try {
      await AsyncStorage.setItem("quizzes", JSON.stringify(quizzes));
    } catch (error) {
      console.error("Error saving quizzes:", error);
    }
  };

  // Add a new quiz
  const addQuiz = async (quizId, title, questions) => {
    const newQuiz = { title, questions, isLocal: true };
    const updatedQuizzes = { ...quizzes, [quizId]: newQuiz };
    setQuizzes(updatedQuizzes);
    await saveLocalQuizzes(updatedQuizzes);
  };

  // Delete a local quiz
  const deleteQuiz = async (quizId) => {
    const updatedQuizzes = { ...quizzes };
    delete updatedQuizzes[quizId];
    setQuizzes(updatedQuizzes);
    await saveLocalQuizzes(updatedQuizzes);
  };

  // Fetch public quizzes from Firestore
  const fetchPublicQuizzes = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "quizzes"));
      const onlineQuizzes = [];
      querySnapshot.forEach((doc) => {
        onlineQuizzes.push({ id: doc.id, ...doc.data(), isLocal: false });
      });
      setPublicQuizzes(onlineQuizzes);
      const updatedQuizzes = { ...quizzes, ...Object.fromEntries(onlineQuizzes.map(q => [q.id, q])) };
      setQuizzes(updatedQuizzes);
      await saveLocalQuizzes(updatedQuizzes);
      await AsyncStorage.setItem("publicQuizzes", JSON.stringify(onlineQuizzes));
    } catch (error) {
      console.error("Error fetching public quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new public quiz in Firestore
  const createPublicQuiz = async (quizData) => {
    try {
      const newQuiz = {
        title: quizData.title,
        questions: quizData.questions,
        isPrivate: false, // For now, all quizzes are public
        isLocal: false,
      };
      await addDoc(collection(db, "quizzes"), newQuiz);
      fetchPublicQuizzes(); // Refresh the list of public quizzes
    } catch (error) {
      console.error("Error creating public quiz:", error);
    }
  };

  // Initial load of local quizzes
  useEffect(() => {
    loadLocalQuizzes();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        publicQuizzes,
        loading,
        fetchPublicQuizzes,
        createPublicQuiz,
        addQuiz, // Add addQuiz to the context value
        deleteQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};