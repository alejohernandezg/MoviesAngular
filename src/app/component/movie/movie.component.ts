import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../../services/movie-api.service';
import { Select_List } from '../../modals/select-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  public movies: any[] = [];
  public moviesRecent: any[] = [];

  public seriesPopular: any[] = [];
  public seriesTopRated: any[] = [];

  public displayMovies: any[] = [];

  public dataMovie: any;

  public selectedLevel: number = 1;

  public botonPopulares: boolean = true;
  public botonRecientes: boolean = false;

  public selectLista: Select_List[] = [
    {id: 1, name: 'Peliculas'},
    {id: 2, name: 'Series'}
  ];

  public nombre: string = 'Peliculas';

  constructor(private service: MovieApiService, private router: Router) {
    // Peliculas
    this.service.getJsonPopular().subscribe( (data: any) => {
      // console.log(data);
      this.movies = data.results;
      this.dataMovie = data.results[0];
      this.displayMovies = this.movies;
    });
    this.service.getJsonTopRated().subscribe( (data:any) => {
      this.moviesRecent = data.results;
    });
    // Series
    this.service.getJsonSeriesPupular().subscribe( (data: any) => {
      this.seriesPopular = data.results;
    });

    this.service.getJsonSeriesTopRated().subscribe( (data: any) => {
      this.seriesTopRated = data.results;
    });
  }

  ngOnInit() {
  }

  displayInfo(id: number) {
    // alert(id);
    if (this.selectedLevel == 1) {
      if (this.botonPopulares) {
        this.dataMovie = this.movies[id];
      } else if (this.botonRecientes) {
        this.dataMovie = this.moviesRecent[id];
      }
    } else if (this.selectedLevel == 2) {
      if (this.botonPopulares) {
        this.dataMovie = this.seriesPopular[id];
      } else if (this.botonRecientes) {
        this.dataMovie = this.seriesTopRated[id];
      }
    }
  }

  getPopulares(){
    if (this.selectedLevel == 1) {
      if (this.botonPopulares == false) {
        this.botonPopulares = true;
        this.botonRecientes = false;
        this.displayMovies = [];
        this.displayMovies = this.movies;
      }
    } else if (this.selectedLevel == 2) {
      if (this.botonPopulares == false) {
        this.botonPopulares = true;
        this.botonRecientes = false;
        this.displayMovies = [];
        this.displayMovies = this.seriesPopular;
      }
    }
  }

  getMejorPuntuadas(){
    if (this.selectedLevel == 1) {
      if (this.botonRecientes == false) {
        this.botonRecientes = true;
        this.botonPopulares = false;
        this.displayMovies = [];
        this.displayMovies = this.moviesRecent;
      }
    } else if(this.selectedLevel == 2) {
      if (this.botonRecientes == false) {
        this.botonRecientes = true;
        this.botonPopulares = false;
        this.displayMovies = [];
        this.displayMovies = this.seriesTopRated;
      }
    }
  }

  selected( ){
    if (this.selectedLevel == 1) {
      this.nombre = '';
      this.nombre = 'Peliculas';
      if (this.botonPopulares) {
        this.displayMovies = [];
        this.displayMovies = this.movies;
      } else if (this.botonRecientes) {
        this.displayMovies = [];
        this.displayMovies = this.moviesRecent;
      }
    } else if (this.selectedLevel == 2) {
      this.nombre = '';
      this.nombre = 'Series';
      if (this.botonPopulares) {
        this.displayMovies = [];
        this.displayMovies = this.seriesPopular;
      } else if (this.botonRecientes) {
        this.displayMovies = [];
        this.displayMovies = this.seriesTopRated;
      }
    }
  }

  buscarDetalle(id: number) {
    if (this.selectedLevel == 1) {
      this.router.navigate(['/movie', 'MV-' + id]);
    } else if (this.selectedLevel == 2) {
      this.router.navigate(['/movie', 'SR-' + id]);
    }
  }
}
