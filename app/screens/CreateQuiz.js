import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Modal,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import { useQuiz } from "../context/QuizContext";

const CreateQuiz = ({ navigation }) => {
  const { addQuiz } = useQuiz();

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  // Toggle Modal
  const toggleModal = () => setModalVisible(!isModalVisible);

  // Header-right button
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={toggleModal}>
          <Icon name="information-circle-outline" size={30} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>How to Create a Quiz</Text>
            <Text style={styles.modalInstruction}>• Provide a meaningful quiz title.</Text>
            <Text style={styles.modalInstruction}>
              • Add questions and their respective options (minimum 4).
            </Text>
            <Text style={styles.modalInstruction}>
              • Select the correct option for each question.
            </Text>
            <Text style={styles.modalInstruction}>
              • Click "Add Question" after entering the Question & Options.
            </Text>
            <Text style={styles.modalInstruction}>
              • Once you've added all questions, click "Add Quiz" to save.
            </Text>
            <TouchableOpacity style={styles.closeModalButton} onPress={toggleModal}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
      <StatusBar backgroundColor="#7be25b" hidden={false} />
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


  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInstruction: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "left",
    width: "100%",
  },
  closeModalButton: {
    marginTop: 20,
    backgroundColor: "#7be25b",
    padding: 10,
    borderRadius: 5,
    paddingHorizontal: 30,
  },
  closeModalButtonText: {
    color: "#1B2021",
    fontWeight: "bold",
  },
  // ... (rest of the existing styles remain unchanged)

  heading: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 20,
    fontFamily: "ProductSans",
  },
  subheading: {
    fontSize: 18,
    color: "#ffffff",
    marginVertical: 10,
    fontFamily: "ProductSans",
  },
  input: {
    fontFamily: "ProductSans",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "100%",
    color: "#333",
  },
  optionInput: {
    fontFamily: "ProductSans",
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
    fontFamily: "ProductSans",
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
    fontFamily: "ProductSans",
    color: "#1B2021",
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
    fontFamily: "ProductSans",
  },
  addQuizButton: {
    backgroundColor: "#7be25b",
    padding: 5,
    borderRadius: 10,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  addQuizButtonText: {
    fontSize: 18,
    fontFamily: "Bungee",
    color: "#1B2021",
  },
});

export default CreateQuiz;
