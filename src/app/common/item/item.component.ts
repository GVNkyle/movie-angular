import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../_cores/models/movie';
import { IMAGES_SIZES } from '../../_cores/constants/image-sizes';
import { Tv } from '../../_cores/models/tv';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() movie: Movie | null = null;
  @Input() tv: Tv | null = null;
  readonly imagesSizes = IMAGES_SIZES;
  constructor() {}

  ngOnInit(): void {}
}
