export interface MovieGenreModel {
  id: number;
  name: string;
}

export interface MovieModel {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  tagline: string;
  genres: MovieGenreModel[];
  budget: number;
}

export interface MoviesList {
  page: number;
  results: MovieModel[];
  total_pages: number;
  total_results: number;
}
