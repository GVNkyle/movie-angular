import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, firstValueFrom, of, tap, take } from 'rxjs';
import { TvsService } from '../../_cores/services/tvs.service';
import { Tv } from '../../_cores/models/tv';
import { NgxNotiflixService, MSG_CONST } from 'ngx-spa-utilities';

@Component({
  selector: 'app-tvs',
  templateUrl: './tvs.component.html',
  styleUrls: ['./tvs.component.scss'],
})
export class TvsComponent implements OnInit {
  searchValue: string | null = null;
  tvs: Tv[] = [];
  genreId: string | null = null;
  constructor(private route: ActivatedRoute, private tvsService: TvsService, private notiflix: NgxNotiflixService) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getTvsByGenres(genreId, 1);
      } else {
        this.getPagedTvs(1);
      }
    });
  }

  async getPagedTvs(page: number, searchKeys?: string) {
    await firstValueFrom(this.tvsService.searchTvs(page, searchKeys).pipe(
      tap((tvs) => (this.tvs = tvs)),
      catchError(() => {
        this.notiflix.error(MSG_CONST.UNKNOWN_ERROR);
        return of(null);
      })
    ));
  }

  paginate(event: any) {
    let pageNumber = event.page + 1;
    if (this.genreId) {
      this.getTvsByGenres(this.genreId, pageNumber);
    } else if (this.searchValue) {
      this.getPagedTvs(pageNumber, this.searchValue);
    } else {
      this.getPagedTvs(pageNumber);
    }
  }

  async getTvsByGenres(genreId: string, page: number) {
    await firstValueFrom(this.tvsService.getTvsByGenres(genreId, page).pipe(
      tap((tvs) => {
        this.tvs = tvs;
      }),
      catchError(() => {
        this.notiflix.error(MSG_CONST.UNKNOWN_ERROR);
        return of(null);
      })
    ));
  }

  searchChanged() {
    if (this.searchValue) this.getPagedTvs(1, this.searchValue);
  }
}
