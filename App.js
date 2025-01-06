import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import Welcome from "./app/screens/Welcome";
import QuizList from "./app/screens/QuizList";
import QuizPage from "./app/screens/QuizPage";
import CreateQuiz from "./app/screens/CreateQuiz";
import Result from "./app/screens/Result";
import PostQuiz from "./app/screens/PostQuiz"; // Import PostQuiz screen
import { QuizProvider } from "./app/context/QuizContext";

const Stack = createNativeStackNavigator();

const loadFonts = async () => {
  await Font.loadAsync({
    Bungee: require("./app/assets/fonts/Bungee.ttf"),
    ProductSans: require("./app/assets/fonts/ProductSans.ttf"),
    ProductSansBold: require("./app/assets/fonts/ProductSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <QuizProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="QuizList"
            component={QuizList}
            options={{
              title: "Available Quizzes",
              headerStyle: { backgroundColor: "#00ADB5" },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontFamily: "Bungee", // Apply Bungee for header
              },
            }}
          />
          <Stack.Screen
            name="Quiz"
            component={QuizPage}
            options={{
              title: "Questions",
              headerStyle: { backgroundColor: "#fac782" },
              headerTintColor: "black",
              headerTitleStyle: {
                fontFamily: "Bungee", // Apply Bungee for header
              },
            }}
          />
          <Stack.Screen
            name="CreateQuiz"
            component={CreateQuiz}
            options={{
              title: "Create Quiz",
              headerStyle: { backgroundColor: "#7be25b" },
              headerTintColor: '#1B2021',
              headerTitleStyle: {
                fontFamily: "Bungee", // Apply Bungee for header
              },
            }}
          />
          <Stack.Screen
            name="PostQuiz"
            component={PostQuiz} // Add PostQuiz screen
            options={{
              title: "Post Quiz",
              headerStyle: { backgroundColor: "#7be25b" },
              headerTintColor: '#1B2021',
              headerTitleStyle: {
                fontFamily: "Bungee", // Apply Bungee for header
              },
            }}
          />
          <Stack.Screen
            name="Result"
            component={Result}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QuizProvider>
  );
}