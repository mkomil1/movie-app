import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import MovieCard from "./movie-card";

/// Dimensions degani mani tushunishim bo'yicha lubboytelifondi oyna o'lchamini olib beradigan method
const {width} = Dimensions.get("window")
export default function TrendingMovie({ trending }) {
  return (
    <View className="my-5">
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
        autoplay={true}
        autoplayDelay={3000}
        autoplayInterval={3000}
        
      />
    </View>
  );
}
