import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { GenresDto } from '../models/genre';
import { Tv, TvCredits, TvDto, TvImage, TvTrailer } from '../models/tv';

@Injectable({
  providedIn: 'root'
})
export class TvsService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = '9a5f6f8e54a84fb4f6444d2a4b8a4a84';
  constructor(private http : HttpClient) { }

  getTvs(type: string = 'popular', count: number = 12) {
    return this.http
      .get<TvDto>(`${this.baseUrl}/tv/${type}?api_key=${this.apiKey}`)
      .pipe(switchMap((res) => of(res.results.slice(0, count))));
  }

  searchTvs(page: number, searchValue? : string) {
    let uri = searchValue ? '/search/tv' : '/tv/popular';
    return this.http
      .get<TvDto>(
        `${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`
      )
      .pipe(switchMap((res) => of(res.results)));
  }

  getTvsByGenres(genreId: string, page: number) {
    return this.http
      .get<TvDto>(
        `${this.baseUrl}/discover/tv?with_genres=${genreId}&page=${page}&api_key=${this.apiKey}`
      )
      .pipe(switchMap((res) => of(res.results)));
  }

  getTv(id: string) {
    return this.http.get<Tv>(`${this.baseUrl}/tv/${id}?api_key=${this.apiKey}`);
  }

  getTrailer(id: string) {
    return this.http
      .get<TvTrailer>(`${this.baseUrl}/tv/${id}/videos?api_key=${this.apiKey}`);
  }

  getImages(id: string) {
    return this.http.get<TvImage>(`${this.baseUrl}/tv/${id}/images?api_key=${this.apiKey}`);
  }

  getCredits(id: string) {
    return this.http.get<TvCredits>(`${this.baseUrl}/tv/${id}/credits?api_key=${this.apiKey}`);
  }

  getGenre() {
    return this.http
      .get<GenresDto>(`${this.baseUrl}/genre/tv/list?api_key=${this.apiKey}`)
      .pipe(switchMap((res) => of(res.genres)));
  }
}
