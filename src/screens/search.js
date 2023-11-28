import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchSearchMovie } from "../api";
import { debounce } from "lodash";

export default function Search() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSearch = (searchText) => {
    if (searchText && searchText.length > 3) {
      setIsLoading(true);
      fetchSearchMovie({
        query: searchText,
        include_adult: false,
        language: "uz-UZ",
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
    </SafeAreaView>
  );
}
