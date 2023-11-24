import React from "react";
import { Image185, Image500 } from "../api";
import { Image, TouchableWithoutFeedback, View } from "react-native";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MovieCard({ item }) {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Movie", item)}
    >
      <Image
        source={{ uri: Image500(item.poster_path) }}
        style={{ width: width * 0.7, height: height * 0.5 }}
        className={"rounded-3xl"}
      />
    </TouchableWithoutFeedback>
  );
}
