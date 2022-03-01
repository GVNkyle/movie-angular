import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { TvsService } from '../../_cores/services/tvs.service';
import { Genre } from '../../_cores/models/genre';
import { MoviesService } from '../../_cores/services/movies.service';

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
    private tvsService: TvsService
  ) {}

  ngOnInit(): void {
    this.moviesService
      .getGenre()
      .pipe(first())
      .subscribe((res) => {
        this.movieGenres = res;
      });
    this.tvsService
      .getGenre()
      .pipe(first())
      .subscribe((res) => {
        this.tvGenres = res;
      });
  }
}
