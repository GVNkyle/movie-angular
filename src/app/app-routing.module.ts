import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresComponent } from './pages/genres/genres.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieComponent } from './pages/movie/movie.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { TvComponent } from './pages/tv/tv.component';
import { TvsComponent } from './pages/tvs/tvs.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'movies',
    component: MoviesComponent,
  },
  {
    path: 'movies/genres/:genreId',
    component: MoviesComponent,
  },
  {
    path: 'movie/:id',
    component: MovieComponent,
  },
  {
    path: 'genres',
    component: GenresComponent,
  },
  {
    path: 'tvshows',
    component: TvsComponent,
  },
  {
    path: 'tvshows/genres/:genreId',
    component: TvsComponent,
  },
  {
    path: 'tvshow/:id',
    component: TvComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
