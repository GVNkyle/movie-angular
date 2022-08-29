import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Movie,
  MovieCredits,
  MovieDto,
  MovieImage,
  MovieTrailerDto,
} from '../models/movie';
import { of, switchMap } from 'rxjs';
import { GenresDto } from '../models/genre';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = '9a5f6f8e54a84fb4f6444d2a4b8a4a84';
  
  getMovies(type: string = 'upcoming', count: number = 12) {
    return this.http
      .get<MovieDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`)
      .pipe(switchMap((res) => of(res.results.slice(0, count))));
  }

  searchMovies(page: number, searchValue? : string) {
    let uri = searchValue ? '/search/movie' : '/movie/popular';
    return this.http
      .get<MovieDto>(
        `${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`
      )
      .pipe(switchMap((res) => of(res.results)));
  }

  getMovie(id: string) {
    return this.http.get<Movie>(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`
    );
  }

  getTrailer(id: string) {
    return this.http
      .get<MovieTrailerDto>(
        `${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`
      )
      .pipe(switchMap((res) => of(res.results)));
  }

  getImages(id: string) {
    return this.http.get<MovieImage>(
      `${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`
    );
  }

  getCredits(id: string) {
    return this.http.get<MovieCredits>(
      `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`
    );
  }

  getGenre() {
    return this.http
      .get<GenresDto>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`)
      .pipe(switchMap((res) => of(res.genres)));
  }

  getMoviesByGenres(genreId: string, page: number) {
    return this.http
      .get<MovieDto>(
        `${this.baseUrl}/discover/movie?with_genres=${genreId}&page=${page}&api_key=${this.apiKey}`
      )
      .pipe(switchMap((res) => of(res.results)));
  }
}
