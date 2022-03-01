import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, take } from 'rxjs';
import { Movie } from '../../_cores/models/movie';
import { MoviesService } from '../../_cores/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  searchValue: string | null = null;
  movies: Movie[] = [];
  genreId: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenres(genreId, 1);
      } else {
        this.getPagedMovies(1);
      }
    });
  }

  getPagedMovies(page: number, searchKeys?: string) {
    this.moviesService
      .searchMovies(page, searchKeys)
      .pipe(first())
      .subscribe((movies) => (this.movies = movies));
  }

  paginate(event: any) {
    let pageNumber = event.page + 1;
    if (this.genreId) {
      this.getMoviesByGenres(this.genreId, pageNumber);
    } else if (this.searchValue) {
      this.getPagedMovies(pageNumber, this.searchValue);
    } else {
      this.getPagedMovies(pageNumber);
    }
  }

  getMoviesByGenres(genreId: string, page: number) {
    this.moviesService
      .getMoviesByGenres(genreId, page)
      .pipe(first())
      .subscribe((movies) => {
        this.movies = movies;
      });
  }

  searchChanged() {
    if (this.searchValue) this.getPagedMovies(1, this.searchValue);
  }
}
