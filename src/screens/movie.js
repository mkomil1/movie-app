import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  Image500,
  fetchMovieCredits,
  fetchMovieDetail,
  fetchSimilarMovie,
} from "../api";
import Loader from "../components/loader";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import UpcomingMovie from "../components/upcoming-movie";
const Movie = (props) => {
  const navigation = useNavigation();
  const [isfavourite, setisFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);
  // iz navigate berilgan parametrdagi qiymat useRoute hook bilan olib ishlata olamiz
  //// bu yerda params da navigate da bergan parametrdagi qiymatimiz kelmoqda va biz uni item deb nomlab olmoqdamiz va uni item deb ishlatishimiz mumkin
  const { params: id } = useRoute();

  const { width, height } = Dimensions.get("window");

  const getMovieDetail = async (id) => {
    const data = await fetchMovieDetail(id);
    setMovie(data);
    setIsLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    setCast(data.cast);
  };

  const getSimilarMovie = async (id) => {
    const data = await fetchSimilarMovie(id);
    setSimilarMovie(data.results);
  };

  useState(() => {
    getMovieDetail(id);
    getMovieCredits(id);
    getSimilarMovie(id);
  }, [id]);

  return (
    <View className="flex-1">
      <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4">
        {/* go back bitta oldingi screenga qaytaradi */}
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className={"flex-1 bg-slate-900"}
      >
        <View className="w-full">
          {isLoading ? (
            <Loader />
          ) : (
            <View>
              <Image
                source={{ uri: Image500(movie.poster_path) }}
                style={{ width, height: height * 0.5 }}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23, 23, 23, 0.8)",
                  "rgba(23, 23, 23, 1)",
                ]}
                style={{ width, height: height * 0.4 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
              />
            </View>
          )}
        </View>
        <View className="space-y-4 -mt-4">
          <Text className="text-white text-center text-3xl font-bold tracking-widest">
            {movie?.title}
          </Text>
          {movie?.id ? (
            <Text className="text-neutral-400 font-semibold text-base text-center">
              {/* Biz bu yerda split qilib release_date massiv qilib va uni ichidan birinchi yani yil o'zini olibmiz, */}
              {movie?.status} ・ {movie?.release_date?.split("-")[0]} ・{" "}
              {movie?.runtime} min
            </Text>
          ) : null}
          <View className="flex-row  justify-center mx-4 space-x-2 flex-wrap">
            {movie?.genres?.map((genre, idx) => (
              <Text
                key={idx}
                className={
                  "text-neutral-400 font-semibold text-base text-center"
                }
              >
                {genre.name} {idx + 1 !== movie?.genres.length ? "・" : null}
              </Text>
            ))}
          </View>
          <Text className="text-neutral-400 mx-4 tracking-wider">
            {movie?.overview}
          </Text>
        </View>
        {movie?.id && cast.length > 0 && <Cast cast={cast} />}
        {movie?.id && similarMovie.length > 0 && <UpcomingMovie upcoming={similarMovie} title={"Similar movies"} />}
      </ScrollView>
    </View>
  );
};

export default Movie;
