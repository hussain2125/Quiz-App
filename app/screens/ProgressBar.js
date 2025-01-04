import React from "react";
import { View, Animated, StyleSheet } from "react-native";

const ProgressBar = ({ progress, totalQuestions }) => {
  const progressAnim = progress.interpolate({
    inputRange: [0, totalQuestions],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View
        style={[
          {
            height: 5,
            borderRadius: 5,
            backgroundColor: "#EDA276" + "90",
          },
          {
            width: progressAnim,
          },
        ]}
      ></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    width: "80%",
    height: 5,
    borderRadius: 5,
    backgroundColor: "#00000020",
    marginBottom: 10,
  },
});

export default ProgressBar;
