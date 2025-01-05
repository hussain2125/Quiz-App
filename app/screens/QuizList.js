import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useQuiz } from "../context/QuizContext";

const QuizList = ({ navigation }) => {
  const { quizzes, deleteQuiz } = useQuiz();
  const quizList = Object.keys(quizzes).map((key) => ({
    id: key,
    title: quizzes[key].title,
  }));

  const handleDelete = (quizId) => {
    Alert.alert(
      "Delete Quiz",
      "Are you sure you want to delete this quiz?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteQuiz(quizId) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose a Quiz</Text>
      <FlatList
        data={quizList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.quizItem}>
            <TouchableOpacity
              style={styles.quizButton}
              onPress={() => navigation.navigate("Quiz", { quizId: item.id })}
            >
              <Text style={styles.quizButtonText}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
               <Icon name="delete" size={24} color="#fff" style={{margin:5}} />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("CreateQuiz")}
      >
        <Text style={styles.createButtonText}>Create Quiz</Text>
      </TouchableOpacity>
      <StatusBar backgroundColor="#00ADB5" hidden={false}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#2E5077", padding: 20 },
  heading: { fontSize: 24, color: "#fff", marginBottom: 20, fontFamily: "ProductSans"  },
  quizItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  quizButton: { padding: 15, backgroundColor: "#00ADB5", borderRadius: 10, flex: 1, marginRight: 10 },
  quizButtonText: { fontSize: 18, color: "#fff", textAlign: "center", fontFamily: "ProductSans"  },
  deleteButton: {
    padding: 10,
    backgroundColor: "#f0222b",
    borderRadius: 10,
  },
  deleteButtonText: { fontSize: 14, color: "#fff", textAlign: "center", marginVertical: 8, fontFamily: "ProductSans"  },
  createButton: {
    padding: 15,
    marginTop: 20,
    backgroundColor: "#7be25b",
    borderRadius: 10,
  },
  createButtonText: { fontSize: 18, color: "black", textAlign: "center", fontFamily: "ProductSans"  },
});

export default QuizList;
