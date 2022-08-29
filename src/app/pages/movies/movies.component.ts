import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, firstValueFrom, of, tap, take } from 'rxjs';
import { Movie } from '../../_cores/models/movie';
import { MoviesService } from '../../_cores/services/movies.service';
import { NgxNotiflixService, MSG_CONST } from 'ngx-spa-utilities';

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
    private moviesService: MoviesService,
    private notiflix : NgxNotiflixService
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

  async getPagedMovies(page: number, searchKeys?: string) {
    await firstValueFrom(this.moviesService.searchMovies(page, searchKeys).pipe(
      tap((movies) => (this.movies = movies)),
      catchError(() => {
        this.notiflix.error(MSG_CONST.UNKNOWN_ERROR);
        return of(null);
      })
    ));
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

  async getMoviesByGenres(genreId: string, page: number) {
    await firstValueFrom(this.moviesService.getMoviesByGenres(genreId, page).pipe(
      tap((movies) => {
        this.movies = movies;
      }),
      catchError(() => {
        this.notiflix.error(MSG_CONST.UNKNOWN_ERROR);
        return of(null);
      })
    ));
  }

  searchChanged() {
    if (this.searchValue) this.getPagedMovies(1, this.searchValue);
  }
}
