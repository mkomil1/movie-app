import React, { useState } from "react";
import { StyleSheet, Text, Image } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  return (
    <AnimatedLoader
      visible={visible}
      overlayColor="rgb(2,6,23)"
      source={require("../../assets/loader.json")}
      animationStyle={styles.lottie}
      speed={1}
    >
    </AnimatedLoader>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200,
    color: "#fff"
  },
});
