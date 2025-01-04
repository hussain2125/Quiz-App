import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./app/screens/Welcome";
import QuizList from "./app/screens/QuizList";
import QuizPage from "./app/screens/QuizPage";
import CreateQuiz from "./app/screens/CreateQuiz";
import Result from "./app/screens/Result";
import { QuizProvider } from "./app/context/QuizContext";

const Stack = createNativeStackNavigator();

export default function App() {
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
              headerStyle: { backgroundColor: "#fac782" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
          <Stack.Screen
            name="Quiz"
            component={QuizPage}
            options={{
              title: "Questions",
              headerStyle: { backgroundColor: "#fac782" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
          <Stack.Screen
            name="CreateQuiz"
            component={CreateQuiz}
            options={{
              title: "Create Quiz",
              headerStyle: { backgroundColor: "#7be25b" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
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
