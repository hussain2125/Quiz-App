import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useQuiz } from "../context/QuizContext";

const QuizList = ({ navigation }) => {
  const { quizzes } = useQuiz();
  const quizList = Object.keys(quizzes).map((key) => ({
    id: key,
    title: quizzes[key].title,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose a Quiz</Text>
      <FlatList
        data={quizList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.quizButton}
            onPress={() => navigation.navigate("Quiz", { quizId: item.id })}
          >
            <Text style={styles.quizButtonText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("CreateQuiz")}
      >
        <Text style={styles.createButtonText}>Create Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#38588b", padding: 20 },
  heading: { fontSize: 24, color: "#fff", marginBottom: 20 },
  quizButton: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fac782",
    borderRadius: 10,
  },
  quizButtonText: { fontSize: 18, color: "#fff" },
  createButton: {
    padding: 15,
    marginTop: 20,
    backgroundColor: "#7be25b",
    borderRadius: 10,
  },
  createButtonText: { fontSize: 18, color: "#fff" },
});

export default QuizList;
