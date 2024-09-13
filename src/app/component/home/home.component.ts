import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../../services/movie-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public listaPeliculas: any[];
  public listaSeries: any[];

  constructor(private service: MovieApiService) {
  }

  ngOnInit() {
    this.service.getJsonPopular().subscribe( (data: any) => {
      this.listaPeliculas = data.results;
    })
    this.service.getJsonSeriesPupular().subscribe( (data: any) => {
      this.listaSeries = data.results;
    });
  }

}
