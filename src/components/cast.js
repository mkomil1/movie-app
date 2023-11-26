import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image185, Image342 } from "../api";
import { useNavigation } from "@react-navigation/native";

const Cast = ({ cast }) => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation()
  return (
    <View className="my-6">
      <Text className={"text-white text-lg mx-4 mb-5"}>Actors</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, idx) => (
            <TouchableOpacity key={idx} onPress={() => navigation.navigate("Person", person.id)} className="mr-4">
              <View className="overflow-hidden rounded-full border w-20 h-20 border-neutral-500 items-center">
                <Image
                  source={{ uri: Image185(person.profile_path) }}
                  className="rounded-2xl w-20 h-24"
                />
              </View>
              <Text className="text-white text-xs mt-1">
                {person?.character.length > 10
                  ? person.character.slice(0, 10) + "..."
                  : person.character}
              </Text>
              <Text className="text-neutral-400 text-xs">
                {person?.original_name.length > 10
                  ? person.original_name.slice(0, 10) + "..."
                  : person.original_name}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default Cast;
