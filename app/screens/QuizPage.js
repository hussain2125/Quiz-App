import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, StatusBar } from "react-native";
import { useQuiz } from "../context/QuizContext";
import ProgressBar from "../screens/ProgressBar";

const QuizPage = ({ route, navigation }) => {
  const { quizId } = route.params;
  const { quizzes } = useQuiz();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  const progress = useRef(new Animated.Value(0)).current; // Initialize progress as an Animated.Value

  const allQuestions = quizzes[quizId]?.questions;

  if (!allQuestions) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          No Questions Available for this Quiz!
        </Text>
      </View>
    );
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === allQuestions[currentQuestionIndex].correct_option) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);

      // Animate progress bar
      Animated.timing(progress, {
        toValue: (currentQuestionIndex + 1) / allQuestions.length, // Fractional progress
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      // Animate to complete (100%) before navigating to results
      Animated.timing(progress, {
        toValue: 1, // 100% progress
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        navigation.navigate("Result", { score, total: allQuestions.length });
      });
    }
  };

  const currentQuestion = allQuestions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <ProgressBar progress={progress} totalQuestions={1} />

      {/* White Box for the Question */}
      <View style={styles.questionBox}>
        {/* Question Number */}
        <Text style={styles.questionCounter}>
          {currentQuestionIndex + 1} / {allQuestions.length}
        </Text>
        <Text style={styles.question}>{currentQuestion.question}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => {
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
        })}
      </View>

      {/* Next Button */}
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
      <StatusBar backgroundColor="#fac782" hidden={false}/>
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
  questionBox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    position: "relative",
  },
  questionCounter: {
    fontSize: 14,
    color: "#888",
    position: "absolute",
    top: 10,
    right: 15,
    fontFamily: "ProductSans",
  },
  question: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
    fontFamily: "ProductSans",
    marginVertical: 10,
  },
  optionsContainer: {
    marginVertical: 20,
  },
  optionButton: {
    backgroundColor: "#fac782",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  optionText: {
    fontSize: 19,
    color: "black",
    textAlign: "center",
    fontFamily: "ProductSans",
  },
  nextButton: {
    backgroundColor: "#7be25b",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  disabledNextButton: {
    backgroundColor: "#cfcdcc",
  },
  nextButtonText: {
    fontSize: 26,
    color: "black",
    textAlign: "center",
    fontFamily: "Bungee",
  },
  errorText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default QuizPage;
