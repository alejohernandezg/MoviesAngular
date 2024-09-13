import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../../services/movie-api.service';
import { Select_List } from '../../modals/select-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public titleSearch = '';
  public dataMovies: any[] = [];

  public listaMovies: any[];
  public listaSeries: any[];
  public listaArtistas: any[];

  public selectedLevel: number = 1;
  public selectLista: Select_List[] = [
    {id: 1, name: 'Peliculas'},
    {id: 2, name: 'Series'},
    {id: 3, name: 'Artista'}
  ];

  constructor(private service: MovieApiService,
              private route: Router) { }

  ngOnInit() {

  }

  buscar(termino: string) {
    if (termino != '') {
      if (this.selectedLevel == 1) {
        this.service.getJsonByName(termino).subscribe( (data: any) => {
          if (data != null) {
            this.listaMovies = data.results;
          }
        });
      } else if (this.selectedLevel == 2) {
        this.service.getJsonSeriesByName(termino).subscribe( (data: any) => {
          if (data != null) {
            this.listaSeries = data.results;
          }
        });
      } else if (this.selectedLevel == 3) {
        this.service.getJsonArtistaByName(termino).subscribe( (data: any) => {
          if (data != null){
            this.listaArtistas = data.results;
          }
        });
      }
    }
  }

  getInfoMovie(id: string) {
    this.route.navigate(['/movie', 'MV-' + id]);
  }

  getInfoSerie(id: string) {
    this.route.navigate(['/movie', 'SR-' + id]);
  }

  getInfoArtista(id: string) {
    this.route.navigate(['/artistas', id]);
  }

}
