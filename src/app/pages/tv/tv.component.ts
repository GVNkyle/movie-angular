import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { IMAGES_SIZES } from '../../_cores/constants/image-sizes';
import { Tv, TvCredits, TvImage, TvTrailer } from '../../_cores/models/tv';
import { TvsService } from '../../_cores/services/tvs.service';

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
  constructor(private route : ActivatedRoute,private tvsService : TvsService) { }

  ngOnInit(): void {
    this.route.params.pipe().subscribe(({ id }) => {
      this.getTv(id);
      this.getTrailer(id);
      this.getImages(id);
      this.getCredits(id);
    });
  }

  getTv(id: string) {
    this.tvsService
      .getTv(id)
      .pipe(first())
      .subscribe((tv) => {this.tv = tv ; console.log(tv)});
  }

  getTrailer(id: string) {
    this.tvsService
      .getTrailer(id)
      .pipe(first())
      .subscribe((trailer) => (this.trailers = trailer));
  }

  getImages(id: string) {
    this.tvsService
      .getImages(id)
      .pipe(first())
      .subscribe((images) => (this.images = images));
  }

  getCredits(id: string){
    this.tvsService
      .getCredits(id)
      .pipe(first())
      .subscribe((credits) => this.credits = credits);
  }



}
