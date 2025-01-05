// welcome.js
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  SafeAreaView,
  StatusBar,
  Linking,
} from "react-native";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Ionicons';

const Welcome = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Info Button */}
        <TouchableOpacity style={styles.infoButton} onPress={toggleModal}>
          <Icon name="information-circle-outline" size={40} color="white" />
        </TouchableOpacity>

        {/* Welcome Image */}
        <Image style={styles.image} source={require("../assets/welcome.png")} />

        {/* Welcome Text */}
        <View style={styles.subContainer}>
          <Text style={[styles.text, { fontFamily: "ProductSans" }]}>
            Ready For your Quiz Test?
          </Text>
        </View>

        {/* Let's Start Button */}
        <Pressable
          onPress={() => {
            navigation.navigate("QuizList");
          }}
          style={({ pressed }) => [
            styles.btn,
            pressed && styles.btnPressed, // Keep original pressed effect
          ]}
        >
          <Text style={[styles.btnText, { fontFamily: "Bungee" }]}>
            Let's Begin
          </Text>
        </Pressable>

        {/* Modal */}
        <Modal
          isVisible={isModalVisible}
          onSwipeComplete={toggleModal}
          swipeDirection="down"
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalIndicator} />
            </View>

            {/* Modal Body */}
            <Text style={styles.modalTitle}>Quiz App</Text>
            <Text style={styles.modalDescription}>
              Developed by Hussain ©2024
            </Text>
            <Text style={[styles.modalDescription, {marginBottom: 5}]}>
              Bahauddin Zakariya University{"\n"} (7th Semester Project)
            </Text>
            <Text style={styles.modalSubDescription}>
              This is a MCQs Quiz app developed in{'\n'} 
              <Text style={{ fontWeight: "bold" }}>React Native Expo</Text>
            </Text>
            <Text style={styles.modalSubDescription}>
              Special thanks to my instructor,{" "}
              <Text style={{ fontWeight: "bold" }}>Sir Muzzamil Mehboob</Text>,
              for his guidance and support throughout this project.
            </Text>
            <Text style={styles.modalSubDescription}>
            Feel free to reach out to me at:{"\n"}
              <Text
                style={{ color: "blue" }}
                onPress={() => Linking.openURL("mailto:OceanShah86@gmail.com")}
              >
                OceanShah86@gmail.com
              </Text>
            </Text>

            {/* Close Button */}
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <StatusBar backgroundColor="#2E5077" hidden={false} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2E5077",
  },
  container: {
    flex: 1,
    backgroundColor: "#2E5077",
    alignItems: "center",
    justifyContent: "center",
  },
  infoButton: {
    position: "absolute",
    top: 10,
    right: 20,
    
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  infoText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 350,
    resizeMode: "contain",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 25,
    color: "#ffffff",
  },
  btn: {
    backgroundColor: "#00ADB5",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  btnPressed: {
    opacity: 0.8,
  },
  btnText: {
    fontSize: 20,
    textAlign: "center",
    color: "#ffffff",
    letterSpacing: 1.1,
  },
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    height: "50%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 10,
  },
  modalIndicator: {
    width: 50,
    height: 5,
    backgroundColor: "#cccccc",
    borderRadius: 2.5,
  },
  modalTitle: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "ProductSansBold",
  },
  modalDescription: {
    fontSize: 19,
    textAlign: "center",
    color: "#555555",
    marginVertical: 3,
    fontFamily: "ProductSansBold",
  },
  modalSubDescription: {
    fontSize: 17,
    textAlign: "center",
    color: "#555555",
    marginVertical: 5,
    fontFamily: "ProductSans",
  },
  closeButton: {
    backgroundColor: "#00ADB5",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 13,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#ffffff",
  },
});

export default Welcome;
