import { Component, OnInit } from '@angular/core';
import { catchError, firstValueFrom, of, tap } from 'rxjs';
import { TvsService } from '../../_cores/services/tvs.service';
import { Genre } from '../../_cores/models/genre';
import { MoviesService } from '../../_cores/services/movies.service';
import { NgxNotiflixService, MSG_CONST } from 'ngx-spa-utilities';
@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  movieGenres: Genre[] = [];
  tvGenres: Genre[] = [];

  constructor(
    private moviesService: MoviesService,
    private tvsService: TvsService,
    private notiflix: NgxNotiflixService
  ) { }

  async ngOnInit(): Promise<void> {
    await firstValueFrom(this.moviesService
      .getGenre()
      .pipe(
        tap((res) => {
          this.movieGenres = res;
        }), catchError(() => {
          this.notiflix.error(MSG_CONST.UNKNOWN_ERROR);
          return of(null);
        })
      ));

    await firstValueFrom(this.tvsService.getGenre().pipe(
      tap((res) => {
        this.tvGenres = res;
      }), catchError(() => {
        this.notiflix.error(MSG_CONST.UNKNOWN_ERROR);
        return of(null);
      })
    ));
  }
}
