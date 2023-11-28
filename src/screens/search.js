import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image185, Image500, fetchSearchMovie } from "../api";
import { debounce } from "lodash";
import Loader from "../components/loader";

export default function Search() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { width, height } = Dimensions.get("window");
  const handleSearch = (searchText) => {
    if (searchText && searchText.length > 3) {
      setIsLoading(true);
      fetchSearchMovie({
        query: searchText,
        include_adult: false,
        page: "1",
      }).then((data) => {
        setIsLoading(false);
        console.log("API-request");
        setResults(data.results);
      });
    } else {
      setResults([]);
      setIsLoading(false);
    }
  };
  //// biz agar handleSearchdi o'zini ishlatadigan bo'lsak inputga har bir harf yozilganda har safar api ga so'rov yuboradi bu yomon, shuni uchun biz lodash package yulab olib lodash bilan ishlasak har bir harf yozilganda nechadir ml sekunda so'rov yuboradi , va ml sekundi biz qo'lda beramiz

  // bu koddi o'zim yozganman faqat tushunish oson bo'lsin deb qoldirganman shunga savol tu'gilishi mumkin handleSearch ga seachText qayerdan kelibdi degan, bu javobi uzunroq varyanti
  //   const handleTextDobounce = useCallback(debounce(searchText => handleSearch(searchText), 4000), []);
  /// bu esa qisqa toza yo'li
  const handleTextDobounce = useCallback(debounce(handleSearch, 4000), []);

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View
        className={
          "mx-4 mb-3 flex-row justify-between items-center border border-neutral-400 rounded-full"
        }
      >
        <TextInput
          placeholder="Search movie"
          placeholderTextColor={"lightgray"}
          onChangeText={handleTextDobounce}
          className={
            "py-1 pl-6 flex-1 text-base font-semibold text-white tracking-wide"
          }
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full  p-3 bg-neutral-400"
        >
          <XMarkIcon color={"white"} size={25} />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <Loader />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item) => (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("Movie", item.id)}
                key={item.id}
              >
                <View className="space-y-2 mb-4">
                  <Image
                    source={{ uri: Image185(item.poster_path) }}
                    className="rounded-3xl"
                    style={{ width: width * 0.44, height: height * 0.3 }}
                  />
                  <Text className="text-gray-300 ml-1">
                    {item.title.length > 22
                      ? item.title.slice(0, 22) + "..."
                      : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="justify-center">
          <Image
            source={require("../../assets/favicon.png")}
            className="w-96 h-96"
          />
          <Text className="text-white text-3xl text-center">
            Movies not found
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
