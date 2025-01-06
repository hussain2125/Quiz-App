import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { useQuiz } from "../context/QuizContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/Ionicons';

const WebQuizzes = ({ navigation, uploadModalVisible, setUploadModalVisible }) => {
  const { publicQuizzes, fetchPublicQuizzes, loading, quizzes, createPublicQuiz } = useQuiz();
  const [localQuizzes, setLocalQuizzes] = useState([]);

  useEffect(() => {
    const loadLocalQuizzes = async () => {
      const storedQuizzes = await AsyncStorage.getItem("publicQuizzes");
      if (storedQuizzes) {
        setLocalQuizzes(JSON.parse(storedQuizzes));
      } else {
        await fetchPublicQuizzes();
      }
    };

    loadLocalQuizzes();
  }, []);

  useEffect(() => {
    setLocalQuizzes(publicQuizzes);
  }, [publicQuizzes]);

  const handleUploadQuiz = async (quizId) => {
    const quiz = quizzes[quizId];
    if (quiz) {
      await createPublicQuiz(quiz);
      setUploadModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00ADB5" style={styles.loading} />
      ) : localQuizzes.length > 0 ? (
        <FlatList
          data={localQuizzes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.quizButton}
              onPress={() => navigation.navigate("Quiz", { quizId: item.id })}
            >
              <Text style={styles.quizButtonText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.text}>No Web Quizzes Available</Text>
      )}
      <TouchableOpacity
        style={styles.postQuizButton}
        onPress={() => navigation.navigate("PostQuiz")}
      >
        <Text style={styles.postQuizButtonText}>Post Quiz</Text>
      </TouchableOpacity>

      {/* Upload Modal */}
      <Modal
        isVisible={uploadModalVisible}
        onBackdropPress={() => setUploadModalVisible(false)}
        onBackButtonPress={() => setUploadModalVisible(false)}
        swipeDirection="down"
        onSwipeComplete={() => setUploadModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Upload Local Quiz</Text>
          <ScrollView>
            {Object.keys(quizzes).filter(key => quizzes[key].isLocal).map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.modalQuizButton}
                onPress={() => handleUploadQuiz(key)}
              >
                <Text style={styles.modalQuizButtonText}>{quizzes[key].title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setUploadModalVisible(false)}
          >
            <Text style={styles.closeModalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#2E5077" },
  text: { fontSize: 20, color: "#fff", fontFamily: "ProductSans" },
  quizButton: {
    padding: 15,
    backgroundColor: "#00ADB5",
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    paddingHorizontal: 70,
  },
  quizButtonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontFamily: "ProductSans",
  },
  postQuizButton: {
    padding: 8,
    marginTop: 20,
    backgroundColor: "#7be25b",
    borderRadius: 10,
  },
  postQuizButtonText: {
    fontSize: 18,
    color: "#1B2021",
    textAlign: "center",
    fontFamily: "Bungee",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    height: '60%',
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 25,
    marginBottom: 10,
    fontFamily: "ProductSansBold",
  },
  modalQuizButton: {
    padding: 15,
    backgroundColor: "#00ADB5",
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    paddingHorizontal: 70,
  },
  modalQuizButtonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
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
});

export default WebQuizzes;