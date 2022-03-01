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
import { first } from 'rxjs';
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
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe().subscribe(({ id }) => {
      this.getMovie(id);
      this.getTrailer(id);
      this.getImages(id);
      this.getCredits(id);
    });
  }

  getMovie(id: string) {
    this.moviesService
      .getMovie(id)
      .pipe(first())
      .subscribe((movie) => (this.movie = movie));
  }

  getTrailer(id: string) {
    this.moviesService
      .getTrailer(id)
      .pipe(first())
      .subscribe((trailer) => (this.trailers = trailer));
  }

  getImages(id: string) {
    this.moviesService
      .getImages(id)
      .pipe(first())
      .subscribe((images) => (this.images = images));
  }

  getCredits(id: string) {
    this.moviesService
      .getCredits(id)
      .pipe(first())
      .subscribe((credits) => (this.movieCredits = credits));
  }
}
