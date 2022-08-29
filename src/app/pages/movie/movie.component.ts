import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Movie,
  MovieCredits,
  MovieImage,
  MovieTrailer,
} from '../../_cores/models/movie';
import { MoviesService } from '../../_cores/services/movies.service';
import { IMAGES_SIZES } from '../../_cores/constants/image-sizes';
import { catchError, firstValueFrom, of, tap } from 'rxjs';
import { NgxNotiflixService, MSG_CONST } from 'ngx-spa-utilities';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  movie: Movie | null = null;
  trailers: MovieTrailer[] = [];
  images: MovieImage | null = null;
  movieCredits: MovieCredits | null = null;
  readonly imagesSizes = IMAGES_SIZES;
  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private notiflix: NgxNotiflixService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe().subscribe(({ id }) => {
      this.getMovie(id);
      this.getTrailer(id);
      this.getImages(id);
      this.getCredits(id);
    });
  }

  async getMovie(id: string) {
    await firstValueFrom(this.moviesService.getMovie(id).pipe(
      tap((movie) => (this.movie = movie)),
      catchError(() => {
        this.notiflix.error(MSG_CONST.UNKNOWN_ERROR);
        return of(null);
      })
    ));
  }

  async getTrailer(id: string) {
    await firstValueFrom(this.moviesService.getTrailer(id).pipe(
      tap((trailer) => (this.trailers = trailer)),
      catchError(() => {
        this.notiflix.error(MSG_CONST.UNKNOWN_ERROR);
        return of(null);
      })
    ));
  }

  async getImages(id: string) {
    await firstValueFrom(this.moviesService.getImages(id).pipe(
      tap((images) => (this.images = images)),
      catchError(() => {
        this.notiflix.error(MSG_CONST.UNKNOWN_ERROR);
        return of(null);
      })
    ));
  }

  async getCredits(id: string) {
    await firstValueFrom(this.moviesService.getCredits(id).pipe(
      tap((credits) => (this.movieCredits = credits)),
      catchError(() => {
        this.notiflix.error(MSG_CONST.UNKNOWN_ERROR);
        return of(null);
      })
    ));
  }
}
