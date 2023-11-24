import { api_key } from "../constants";
import { apiRequest } from "./axios";

const base_url = "https://api.themoviedb.org/3";

const trendingMovie = `${base_url}/trending/movie/day?api_key=${api_key}`;
const upcomingMovie = `${base_url}/movie/upcoming?api_key=${api_key}`;
const topRatedMovie = `${base_url}/movie/top_rated?api_key=${api_key}`;
const popularMovie = `${base_url}/movie/popular?api_key=${api_key}`;
//// bu yerda id kinoni rasmiga bosilganda o'sha kinoni id keladi va o'sha kinoni ma'lumotlarini olshimiz mumkin bo'lgan url
const movieDetail = (id) => `${base_url}/movie/${id}?api_key=${api_key}`;
/// bu yerda esa shu kinoni o'ynagan actyorlar haqida m'alumotlar olibmiz id dan keyin credits qo'yshimiz kerak
const movieCredits = (id) =>
  `${base_url}/movie/${id}/credits?api_key=${api_key}`;
// bu yerda esa o'sha kinoga o'xshash kinolar olsan bo'ladigan url fantastik bo'lsa fantastik chiqaradi misol uchun , id dan keyin similar o'xshash kinolar
const similarMovie = (id) =>
  `${base_url}/movie/${id}/similar?api_key=${api_key}`;

export const fetchTrendingMovie = () => {
  return apiRequest(trendingMovie);
};

export const fetchUpcomingMovie = () => {
  return apiRequest(upcomingMovie);
};

export const fetchTopRatedMovie = () => {
  return apiRequest(topRatedMovie);
};

export const fetchPopularMovie = () => {
  return apiRequest(popularMovie);
};

export const fetchMovieDetail = (id) => {
  return apiRequest(movieDetail(id));
};

export const fetchMovieCredits = (id) => {
  return apiRequest(movieCredits(id));
};
export const fetchSimilarMovie = (id) => {
  return apiRequest(similarMovie(id))
}
export const Image500 = (posterPath) => {
  return posterPath ? `https://image.tmdb.org/t/p/w500` + posterPath : null;
};

export const Image342 = (posterPath) => {
  return posterPath ? `https://image.tmdb.org/t/p/342` + posterPath : null;
};

export const Image185 = (posterPath) => {
  return posterPath ? `https://image.tmdb.org/t/p/w185` + posterPath : null;
};
