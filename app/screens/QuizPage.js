import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useQuiz } from "../context/QuizContext";

const QuizPage = ({ route, navigation }) => {
  const { quizId } = route.params;
  const { quizzes } = useQuiz();
 

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  const allQuestions = quizzes[quizId]?.questions;

if (!allQuestions) {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>No Questions Available for this Quiz!</Text>
    </View>
  );
}


  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === allQuestions[currentQuestionIndex].correct_option) {
      setScore(score + 1);
    }
  };

  const renderOptions = () => {
    const currentQuestion = allQuestions[currentQuestionIndex];

    return currentQuestion.options.map((option, index) => {
      const isCorrect = option === currentQuestion.correct_option;
      const isSelected = option === selectedOption;
      const backgroundColor = selectedOption
        ? isCorrect
          ? "#7be25b" // Green for correct
          : isSelected
          ? "#f0222b" // Red for incorrect
          : "#cfcdcc" // Gray for unselected
        : "#fac782"; // Default color

      return (
        <TouchableOpacity
          key={index}
          style={[styles.optionButton, { backgroundColor }]}
          onPress={() => handleOptionSelect(option)}
          disabled={!!selectedOption}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      );
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      navigation.navigate("Result", { score, total: allQuestions.length });
    }
  };

  const currentQuestion = allQuestions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      {renderOptions()}
      <TouchableOpacity
        style={[
          styles.nextButton,
          !selectedOption && styles.disabledNextButton,
        ]}
        onPress={handleNext}
        disabled={!selectedOption}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#38588b",
    justifyContent: "center",
  },
  question: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "#fac782",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  selectedOption: {
    backgroundColor: "#7be25b",
  },
  optionText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: "#7be25b",
    padding: 15,
    borderRadius: 10,
    marginTop: 50,
  },
  disabledNextButton: {
    backgroundColor: "#cfcdcc",
  },
  nextButtonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  errorText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default QuizPage;
