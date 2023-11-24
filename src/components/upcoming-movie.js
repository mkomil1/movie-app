import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Image185 } from "../api";
import { useNavigation } from "@react-navigation/native";

export default function UpcomingMovie({ upcoming, title }) {
  const { width, height } = Dimensions.get("window");
  //// Biz o'tgan darsda propsdan navigation oluvdik bu savar hook dan navigation olamiz 2 xil usul bilan ishlata olamiz propsdan yoki hood dan olib
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <Text className="text-white font-semibold text-lg mx-4">{title}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {upcoming.map((item, idx) => (
          /// TouchableWithoutFeedback biz View yoki shunga o'xshash bosilmidan componentlardi o'rashimiz mumkin va buni o'zini bosilganda hechqanday effecti yo'q
          <TouchableWithoutFeedback
            /// biz navigation ga parametr ham bershimiz mumkin  yoki props desak ham bo'ladi,  Movie componentda shu bergan parametirimzdi propsdan olib ishlata olamiz
            onPress={() => navigation.navigate("Movie", item.id)}
            key={item.id}
          >
            <View className="space-y-1 mr-4">
              <Image
                source={{ uri: Image185(item.poster_path) }}
                className="rounded-3xl"
                style={{ width: width * 0.3, height: height * 0.2 }}
              />
              <Text className="text-white">
                {item.title.length > 13
                  ? item.title.slice(0, 13) + "..."
                  : item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}
