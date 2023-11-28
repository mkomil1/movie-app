import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image342, fetchPersonDetail, fetchPersonMovies } from "../api";
import Loader from "../components/loader";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { StatusBar } from "expo-status-bar";
import UpcomingMovie from "../components/upcoming-movie";

export default function Person() {
  const [person, setPerson] = useState([]);
  const [personMovies, setPersonMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isfavourite, setisFavourite] = useState(false);

  const navigation = useNavigation();
  const { params: id } = useRoute();

  const { width, height } = Dimensions.get("window");

  const getPersonDetail = async (id) => {
    const data = await fetchPersonDetail(id);
    setPerson(data);
    setIsLoading(false);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    setPersonMovies(data.cast);
  };

  useEffect(() => {
    getPersonDetail(id);
    getPersonMovies(id);
  }, [id]);

  console.log(person);

  return (
    <View className="flex-1 bg-slate-900">
      <StatusBar style="inverted" />
      <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4">
        {/* go back bitta oldingi screenga qaytaradi */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon color={"white"} strokeWidth={2.5} size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setisFavourite((prev) => !prev)}>
          <HeartIcon
            color={isfavourite ? "red" : "white"}
            strokeWidth={2.5}
            size={35}
          />
        </TouchableOpacity>
      </SafeAreaView>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <View>
            <View
              className="flex-row justify-center"
              style={{
                shadowColor: "gray",
                shadowRadius: 40,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1,
              }}
            >
              <View className="items-center rounded-full overflow-hidden w-72 h-72 border-neutral-500 border-2">
                <Image
                  source={{ uri: Image342(person?.profile_path) }}
                  style={{ width: width * 0.74, height: height * 0.43 }}
                />
              </View>
            </View>
            <View className="mt-6">
              <Text className="text-3xl text-white font-bold text-center">
                {person?.name}
              </Text>
              <Text className="text-neutral-400 text-base text-center">
                {person?.place_of_birth}
              </Text>
            </View>
            <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Gender</Text>
                <Text className="text-neutral-400 text-sm">
                  {person?.gender === 1 ? "Female" : "Male"}
                </Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Birthday</Text>
                <Text className="text-neutral-400 text-sm">
                  {person?.birthday}
                </Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Known for</Text>
                <Text className="text-neutral-400 text-sm">
                  {person?.known_for_department}
                </Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Popularity</Text>
                <Text className="text-neutral-400 text-sm">
                  {person?.popularity?.toFixed(2)} %
                </Text>
              </View>
            </View>
            <View className={"my-6 mx-4 space-y-2"}>
              <Text className="text-white text-lg">Biography</Text>
              <Text className="text-neutral-400 text-sm tracking-wide">
                {person?.biography}
              </Text>
            </View>
            {person?.id && personMovies.length > 0 && <UpcomingMovie upcoming={personMovies}/>}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
