import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import {
  fetchPopularMovie,
  fetchTopRatedMovie,
  fetchTrendingMovie,
  fetchUpcomingMovie,
} from "../api";
import TrendingMovie from "../components/trending-movie";
import UpcomingMovie from "../components/upcoming-movie";
import TopRatedMovie from "../components/top-rated-movie";
import Loader from "../components/loader";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation()

  const getTrendingMovie = async () => {
    const data = await fetchTrendingMovie();
    setTrending(data.results);
    setIsLoading(false);
  };
  const getUpcomingMovie = async () => {
    const data = await fetchUpcomingMovie();
    setUpcoming(data.results);
  };
  const getTopRatedMovie = async () => {
    const data = await fetchTopRatedMovie();
    setTopRated(data.results);
  };
  const getPopularMovie = async () => {
    const data = await fetchPopularMovie();
    setPopular(data.results);
  };

  useEffect(() => {
    getTrendingMovie();
    getUpcomingMovie();
    getTopRatedMovie();
    getPopularMovie();
  }, []);

  return (
    <View className="flex-1 bg-slate-900 ">
      <SafeAreaView>
        <StatusBar style="inverted" />
        <View className="flex-row justify-between items-center mx-4 mt-2  pb-2">
          <Image source={require("../../assets/favicon.png")} />
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={30} color={"white"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/* Biz scroll joylar cardlar yoki boshqa narslardi scroll bo'lishi uchun scrollView ga olshimiz kerak */}
      {/* showsVerticalScrollIndicator bu scroll di ko'rsatish yoki o'chirib qo'yish uchun ishlatamiz */}
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {trending.length > 0 && <TrendingMovie trending={trending} />}
          {upcoming.length > 0 && (
            <UpcomingMovie upcoming={upcoming} title={"Upcoming movie"} />
          )}
          {upcoming.length > 0 && (
            <UpcomingMovie
              upcoming={trending.reverse()}
              title={"Trending movie"}
            />
          )}
          {popular.length > 0 && (
            <UpcomingMovie upcoming={popular} title={"Popular movie"} />
          )}
          {topRated.length > 0 && <TrendingMovie trending={topRated} />}
        </ScrollView>
      )}
    </View>
  );
}
