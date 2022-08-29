import { Movie } from './movie';

export interface Tv extends Movie {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  languages: string[];
  episode_run_time: number[];
  number_of_episodes: number;
}

export interface TvDto {
  page: number;
  results: Tv[];
  total_results: number;
  total_pages: number;
}

export interface TvTrailer {
  results: {
    site: string;
    key: string;
  }[];
}

export interface TvImage {
  backdrops: {
    file_path: string;
  }[];
}

export interface TvCredits {
  cast: {
    name: string;
    profile_path: string;
  }[];
}

export interface Gerne {
  genres: {
    id: number;
    name: string;
  }[];
}
