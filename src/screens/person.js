import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchPersonDetail, fetchPersonMovies } from "../api";
import Loader from "../components/loader";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";

export default function Person() {
  const [person, setPerson] = useState([]);
  const [personMovies, setPersonMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isfavourite, setisFavourite] = useState(false);

  
  const navigation = useNavigation()
  const { params: id } = useRoute();

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
        <ScrollView
          className="flex-1 "
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        ></ScrollView>
      )}
    </View>
  );
}
