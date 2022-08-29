import { Component, OnInit } from '@angular/core';
import { catchError, firstValueFrom, of, tap } from 'rxjs';
import { TvsService } from '../../_cores/services/tvs.service';
import { Movie } from '../../_cores/models/movie';
import { MoviesService } from '../../_cores/services/movies.service';
import { Tv } from '../../_cores/models/tv';
import { NgxNotiflixService, MSG_CONST } from 'ngx-spa-utilities';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  popularTvs: Tv[] = [];
  constructor(private moviesService: MoviesService, private tvsService: TvsService, private notiflix: NgxNotiflixService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  async getMovies() {
    await firstValueFrom(this.moviesService.getMovies('popular').pipe(
      tap((movies) => this.popularMovies = movies), 
      catchError(() => {
        this.notiflix.error(MSG_CONST.UNKNOWN_ERROR);
        return of(null);
      })
    ));
    await firstValueFrom(this.moviesService.getMovies('upcoming').pipe(
      tap((movies) => this.upcomingMovies = movies),
      catchError(() => {
        this.notiflix.error(MSG_CONST.UNKNOWN_ERROR);
        return of(null);
      })
    ));
    await firstValueFrom(this.tvsService.getTvs('popular').pipe(
      tap((tvs) => this.popularTvs = tvs),
      catchError(() => {
        this.notiflix.error(MSG_CONST.UNKNOWN_ERROR);
        return of(null);
      })
    ));
  }

}
