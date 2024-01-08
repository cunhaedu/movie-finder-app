import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { MovieGenreModel, MovieModel, MoviesList } from '../../../models/movie.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  httpClient = inject(HttpClient);

  BASE_URL = 'https://api.themoviedb.org/3';
  API_KEY = environment.tmdbApiKey;

  getGenreList(): Observable<MovieGenreModel[]> {
    return this.httpClient.get<{ genres: MovieGenreModel[] }>(
      `${this.BASE_URL}/genre/movie/list`,
      {
        params: {
          api_key: this.API_KEY,
          language: 'en-US'
        }
      }
    ).pipe(map(data => data.genres));
  }

  getTopRatedMovies(page = 1): Observable<MoviesList> {
    return this.httpClient.get<MoviesList>(
      `${this.BASE_URL}/movie/top_rated`,
      {
        params: {
          api_key: this.API_KEY,
          page,
          language: 'en-US'
        }
      }
    );
  }

  getMovieDetails(id: number): Observable<MovieModel> {
    return this.httpClient.get<MovieModel>(
      `${this.BASE_URL}/movie/${id}`,
      {
        params: {
          api_key: this.API_KEY,
          language: 'en-US'
        }
      }
    );
  }
}
