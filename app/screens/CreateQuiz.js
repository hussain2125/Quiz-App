import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useQuiz } from "../context/QuizContext";

const CreateQuiz = ({ navigation }) => {
  const { addQuiz } = useQuiz();

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(null);

  const handleAddQuestion = () => {
    if (
      currentQuestion.trim() &&
      options.every((opt) => opt.trim()) &&
      correctOptionIndex !== null
    ) {
      const newQuestion = {
        question: currentQuestion,
        options,
        correct_option: options[correctOptionIndex],
      };
      setQuestions([...questions, newQuestion]);
      setCurrentQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectOptionIndex(null);
    } else {
      alert("Please fill out the question, all options, and select the correct option.");
    }
  };

  const handleAddQuiz = () => {
    if (title.trim() && questions.length > 0) {
      const quizId = Date.now().toString(); // Unique ID for the quiz
      addQuiz(quizId, title, questions);
      navigation.goBack(); // Return to the QuizList screen
    } else {
      alert("Please provide a title and add at least one question.");
    }
  };

  const renderOptionInput = (index) => (
    <TextInput
      key={index}
      style={styles.optionInput}
      placeholder={`Option ${index + 1}`}
      placeholderTextColor="#999"
      value={options[index]}
      onChangeText={(text) => {
        const newOptions = [...options];
        newOptions[index] = text;
        setOptions(newOptions);
      }}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a New Quiz</Text>
      <TextInput
        style={styles.input}
        placeholder="Quiz Title"
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.subheading}>Add a Question</Text>
      <TextInput
        style={styles.input}
        placeholder="Question"
        placeholderTextColor="#999"
        value={currentQuestion}
        onChangeText={setCurrentQuestion}
      />
      {options.map((_, index) => renderOptionInput(index))}

      <Text style={styles.subheading}>Select the Correct Option</Text>
      <View style={styles.correctOptionContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.correctOptionButton,
              correctOptionIndex === index && styles.correctOptionSelected,
            ]}
            onPress={() => setCorrectOptionIndex(index)}
          >
            <Text style={styles.correctOptionText}>{`Option ${index + 1}`}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.addQuestionButton} onPress={handleAddQuestion}>
        <Text style={styles.addQuestionButtonText}>Add Question</Text>
      </TouchableOpacity>

      <FlatList
        data={questions}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.questionPreview}>
            <Text style={styles.questionPreviewText}>
              {index + 1}. {item.question}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addQuizButton} onPress={handleAddQuiz}>
        <Text style={styles.addQuizButtonText}>Add Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38588b",
    padding: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    color: "#ffffff",
    marginVertical: 10,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "100%",
    color: "#333",
  },
  optionInput: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: "100%",
    color: "#333",
  },
  correctOptionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  correctOptionButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#cfcdcc",
    marginRight: 10,
  },
  correctOptionSelected: {
    backgroundColor: "#7be25b",
  },
  correctOptionText: {
    color: "#333",
  },
  addQuestionButton: {
    backgroundColor: "#7be25b",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  addQuestionButtonText: {
    fontSize: 18,
    color: "#ffffff",
  },
  questionPreview: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    width: "100%",
  },
  questionPreviewText: {
    color: "#333",
  },
  addQuizButton: {
    backgroundColor: "#fac782",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  addQuizButtonText: {
    fontSize: 18,
    color: "#ffffff",
  },
});

export default CreateQuiz;
