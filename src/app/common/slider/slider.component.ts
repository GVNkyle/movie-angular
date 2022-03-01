import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../_cores/models/movie';
import { IMAGES_SIZES } from '../../_cores/constants/image-sizes';
import { Tv } from '../../_cores/models/tv';
@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('1s')]),
    ]),
  ],
})
export class SliderComponent implements OnInit {
  @Input() movies: Movie[] = [];
  @Input() tvs : Tv[] = [];
  @Input() isBanner: boolean = false;
  @Input() type : string = '';
  readonly imagesSizes = IMAGES_SIZES;

  constructor() {}
  currentSlideIndex: number = 0;
  ngOnInit(): void {
    if (!this.isBanner) {
      setInterval(() => {
        this.currentSlideIndex = ++this.currentSlideIndex % this.movies.length;
      }, 5000);
    }
  }
}
