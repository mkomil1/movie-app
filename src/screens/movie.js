import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

import { SafeAreaView } from "react-native-safe-area-context";
const Movie = (props) => {
  const navigation = useNavigation();
  const [isfavourite, setisFavourite] = useState(false)
  // iz navigate berilgan parametrdagi qiymat useRoute hook bilan olib ishlata olamiz
  //// bu yerda params da navigate da bergan parametrdagi qiymatimiz kelmoqda va biz uni item deb nomlab olmoqdamiz va uni item deb ishlatishimiz mumkin
  const {params: item} = useRoute()

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className={"flex-1 bg-slate-900"}
    >
      <View className="w-full">
        <SafeAreaView className="z-20 w-full flex-row justify-between items-center px-4">
          {/* go back bitta oldingi screenga qaytaradi */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon color={"white"} strokeWidth={2.5} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setisFavourite(prev => !prev)}>
            <HeartIcon color={isfavourite ? "red" : "white"} strokeWidth={2.5} size={35} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default Movie;
