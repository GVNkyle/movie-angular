import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { TvsService } from '../../_cores/services/tvs.service';
import { Movie, MovieDto } from '../../_cores/models/movie';
import { MoviesService } from '../../_cores/services/movies.service';
import { Tv } from '../../_cores/models/tv';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularMovies : Movie[] = [];
  upcomingMovies : Movie[] = [];
  popularTvs : Tv[] = [];
  constructor(private moviesService : MoviesService, private tvsService : TvsService) { }

  ngOnInit(): void {
    this.getMovies()
  }

  getMovies(){
    this.moviesService.getMovies('popular').pipe(first()).subscribe((movies) => this.popularMovies = movies);
    this.moviesService.getMovies('upcoming').pipe(first()).subscribe((movies) => this.upcomingMovies = movies);
    this.tvsService.getTvs('popular').pipe(first()).subscribe((tvs) => this.popularTvs = tvs);
  }

}
