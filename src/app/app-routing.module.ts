import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { HomeComponent } from './component/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './component/search/search.component';
import { MovieComponent } from './component/movie/movie.component';
import { ArtistComponent } from './component/artist/artist.component';
import { MovieDetailComponent } from './component/movie-detail/movie-detail.component';
import { ArtistDetailComponent } from './component/artist-detail/artist-detail.component';
import { AboutComponent } from './component/about/about.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'artistas', component: ArtistComponent},
  {path: 'artistas/:id', component: ArtistDetailComponent},
  {path: 'search', component: SearchComponent},
  {path: 'movie', component: MovieComponent},
  {path: 'movie/:id', component: MovieDetailComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
