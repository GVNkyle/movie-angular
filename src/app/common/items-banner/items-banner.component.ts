import { Component, Input } from '@angular/core';
import { Tv } from 'src/app/_cores/models/tv';
import { Movie } from '../../_cores/models/movie';

@Component({
  selector: 'items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss'],
})
export class ItemsBannerComponent {
  @Input() movies: Movie[] = [];
  @Input() tvs: Tv[] = [];
  @Input() title: string = '';
  @Input() type: string = '';
}
