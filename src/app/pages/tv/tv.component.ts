import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, firstValueFrom, of, tap } from 'rxjs';
import { IMAGES_SIZES } from '../../_cores/constants/image-sizes';
import { Tv, TvCredits, TvImage, TvTrailer } from '../../_cores/models/tv';
import { TvsService } from '../../_cores/services/tvs.service';
import { NgxNotiflixService, MSG_CONST } from 'ngx-spa-utilities';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {
  tv : Tv | null = null;
  trailers: TvTrailer | null = null;
  images : TvImage | null = null;
  credits : TvCredits | null = null;
  readonly imagesSizes = IMAGES_SIZES;
  constructor(private route: ActivatedRoute, private tvsService: TvsService, private notiflix: NgxNotiflixService) { }

  ngOnInit(): void {
    this.route.params.pipe().subscribe(({ id }) => {
      this.getTv(id);
      this.getTrailer(id);
      this.getImages(id);
      this.getCredits(id);
    });
  }

  async getTv(id: string) {
    await firstValueFrom(this.tvsService.getTv(id).pipe(
      tap((tv) =>  this.tv = tv),
      catchError(() => {
        this.notiflix.error(MSG_CONST.UNKNOWN_ERROR);
        return of(null);
      })
    ))
  }

  async getTrailer(id: string) {
    await firstValueFrom(this.tvsService.getTrailer(id).pipe(
      tap((trailer) => (this.trailers = trailer)),
      catchError(() => {
        this.notiflix.error(MSG_CONST.UNKNOWN_ERROR);
        return of(null);
      })
    ));
  }

  async getImages(id: string) {
    await firstValueFrom(this.tvsService.getImages(id).pipe(
      tap((images) => (this.images = images)),
      catchError(() => {
        this.notiflix.error(MSG_CONST.UNKNOWN_ERROR);
        return of(null);
      })
    ));
  }

  async getCredits(id: string){
    await firstValueFrom(this.tvsService.getCredits(id).pipe(
      tap((credits) => this.credits = credits),
      catchError(() => {
        this.notiflix.error(MSG_CONST.UNKNOWN_ERROR);
        return of(null);
      })
    ));
  }
}
