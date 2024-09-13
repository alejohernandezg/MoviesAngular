import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../../services/movie-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss'],
  providers: [NgbCarouselConfig]
})
export class ArtistDetailComponent implements OnInit {
  
  public idArtista: any;
  public artistData: any;
  public listPeliculasArtista: any[];
  public listSeriesArtista: any[];

  constructor(private service: MovieApiService,
              private route: Router,
              private activateRoute: ActivatedRoute,
              private config: NgbCarouselConfig) {
    config.interval = 3000;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    this.activateRoute.params.subscribe( params => {
      this.idArtista = params['id'];
      this.service.getJsonArtistaById(this.idArtista).toPromise()
      .then( (data: any) => {
        this.artistData = data;
      })
      .then( () => {
        this.service.getJsonArtistaMoviesById(this.idArtista).subscribe( (dataMoviesArtist: any) => {
          this.listPeliculasArtista = dataMoviesArtist.cast;
          if (this.listPeliculasArtista.length != 0) {
            this.listPeliculasArtista = dataMoviesArtist.cast;
          }else {
            this.listPeliculasArtista = null;
          }
        });
        this.service.getJsonArtistaSeriesById(this.idArtista).subscribe( (dataSeriesArtist: any) => {
          console.log(dataSeriesArtist);
          this.listSeriesArtista = dataSeriesArtist.cast;
          
        });
      });
    });
  }

  getInfoMovie(id: string) {
    this.route.navigate(['/movie', 'MV-' + id]);
  }

  getInfoSerie(id: string) {
    this.route.navigate(['/movie', 'SR-' + id]);
  }
}
