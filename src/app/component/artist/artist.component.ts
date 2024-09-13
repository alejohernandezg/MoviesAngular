import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../../services/movie-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  public listaArtistas: any[];
  public dataArtista: any;

  constructor(private service: MovieApiService,
              private router: Router) {
    this.service.getJsonArtistas().subscribe( (data: any) => {
      this.listaArtistas = data.results;
      this.dataArtista = this.listaArtistas[0];
    });
  }

  ngOnInit() {
  }

  displayInfo(id: number) {
    this.router.navigate(['/artistas', id]);
  }

}
