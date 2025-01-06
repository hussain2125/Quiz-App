import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import LocalQuizzes from "./LocalQuizzes"; // Existing functionality
import WebQuizzes from "./WebQuizzes"; // New online quiz functionality
import { useQuiz } from "../context/QuizContext";
import { TouchableOpacity, View } from "react-native";

const Tab = createBottomTabNavigator();

const QuizList = () => {
  const { fetchPublicQuizzes } = useQuiz();
  const [uploadModalVisible, setUploadModalVisible] = useState(false);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#00ADB5" },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#fff",
        headerStyle: { backgroundColor: "#2E5077" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontSize: 20, fontFamily: "ProductSans" },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Choose Local Quizzes') {
            iconName = 'home-outline';
          } else if (route.name === 'Choose Web Quizzes') {
            iconName = 'globe';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Choose Local Quizzes"
        component={LocalQuizzes} // Local quizzes tab
        options={{
          tabBarLabel: "Local",
          headerTitleStyle: { fontSize: 20, fontFamily: "ProductSans" },
        }}
      />
      <Tab.Screen
        name="Choose Web Quizzes"
        options={{ 
          tabBarLabel: "Web",
          headerTitleStyle: { fontSize: 20, fontFamily: "ProductSans" },
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={fetchPublicQuizzes}>
                <Icon name="refresh" size={25} color="#fff" style={{ marginRight: 15 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setUploadModalVisible(true)}>
                <Icon name="cloud-upload-outline" size={25} color="#fff" style={{ marginRight: 15 }} />
              </TouchableOpacity>
            </View>
          ),
         }}
      >
        {props => <WebQuizzes {...props} uploadModalVisible={uploadModalVisible} setUploadModalVisible={setUploadModalVisible} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default QuizList;