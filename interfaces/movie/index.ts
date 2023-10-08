import { IPagination } from '../pagination';

export interface IMovie {
  id: number;
  movieCode: string[];
  title_en: string;
  title_th: string;
  rating_id: number;
  rating: string;
  duration: number;
  release_date: string;
  sneak_date: string;
  synopsis_th: string;
  synopsis_en: string;
  director: string;
  actor: string;
  genre: string;
  poster_ori: string;
  poster_url: string;
  trailer: string;
  tr_ios: string;
  tr_hd: string;
  tr_sd: string;
  tr_mp4: string;
  date_update: string;
  trailer_cms_id: string;
  trailer_ivx_key: string;
  is_favorite: boolean;
}

export interface IMovieEdge {
  node: IMovie;
}

export interface IMovies {
  edges: IMovieEdge[];
  pageInfo: IPagination;
}
