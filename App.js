import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Home } from "./src/screens/home";
import AppNavigation from "./src/navigations/app.navigation";
import TabNavigation from "./src/navigations/tab.navigation";

// nativewind approach
export default function App() {
  return (
    <AppNavigation/>
  );
}
