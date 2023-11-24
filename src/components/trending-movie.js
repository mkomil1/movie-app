import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import MovieCard from "./movie-card";

/// Dimensions degani mani tushunishim bo'yicha lubboytelifondi oyna o'lchamini olib beradigan method
const {width} = Dimensions.get("window")
export default function TrendingMovie({ trending }) {
  return (
    <View className="mb-5">
      <Text className={"text-white text-2xl mx-4 mb-5"}>Trending Movie</Text>
      <Carousel
        // ref={(c) => {
        //   this._carousel = c;
        // }}
        data={trending}
        renderItem={({item}) => <MovieCard item={item}/>}
        /// bu yerda birinchi o'rinda nimani ko'rsatish kerak datadan shuni belgilibmiz
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.7}
        slideStyle={{display: "flex", alignItems: "center"}}
        loop={true}
        autoplay={{delay: 200}}
      />
    </View>
  );
}
