import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieApiService } from '../../services/movie-api.service';
import { DomSanitizer, SafeResourceUrl  } from '@angular/platform-browser';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  providers: [NgbCarouselConfig]
})
export class MovieDetailComponent implements OnInit {

  public idData: string[];
  public infoMovie: any;
  public videoInfo: any;
  public listSimilar: any[];
  public listActores: any[];

  public name: string;
  public idiomas: string = '';

  private youtubeURL = 'https://www.youtube.com/embed/';

  constructor(private route: Router,
              private service: MovieApiService,
              private activateRoute: ActivatedRoute,
              public sanitizer: DomSanitizer,
              private config: NgbCarouselConfig) {
    config.interval = 3000;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    this.activateRoute.params.subscribe( params => {
      this.idData = params[ 'id' ].split('-');
      if ( this.idData[0] == 'MV') {
        this.name = 'Peliculas';
        this.service.getJsonById(this.idData[1]).subscribe( (data: any) => {
          this.infoMovie = data;

          this.service.getJsonVideoById(this.idData[1]).subscribe( (dataVideo: any) => {
            this.videoInfo = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeURL + dataVideo);
          });

          this.service.getJsonSimilarById(this.idData[1]).subscribe( (dataSimilars: any) => {
            if (dataSimilars.results.length != 0) {
              this.listSimilar = dataSimilars.results;
            }
          });

          this.service.getJsonMovieArtistasById(this.idData[1]).subscribe( (dataArtistas: any) => {
            this.listActores = dataArtistas.cast;
            if (this.listActores.length == 0){
              this.listActores = null;
            }
          });

          this.getIdiomas(this.infoMovie.spoken_languages);
        });
      } else if (this.idData[0] == 'SR') {
        this.name = 'Series';
        this.service.getJsonSeriesById(this.idData[1]).subscribe( (data: any) => {
          this.infoMovie = data;
          
          this.service.getJsonVideoSerieById(this.idData[1]).subscribe( (dataVideo: any) => {
            this.videoInfo = dataVideo;
          });
          
          this.service.getJsonSeriesSimilarById(this.idData[1]).subscribe( (dataSimilars: any) => {
            if (dataSimilars.results.length != 0) {
              this.listSimilar = dataSimilars.results;
            }
          });

          this.service.getJsonArtistaSeriesById(this.idData[1]).subscribe( (dataArtistas: any) => {
            this.listActores = dataArtistas.cast;
            if (this.listActores.length == 0){
              this.listActores = null;
            }
          });

          this.getIdiomasSeries(this.infoMovie.languages);
        });
      } else {
        this.route.navigate(['/movie']);
      }
    });
  }

  getVideoInfo() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeURL + this.videoInfo +'?rel=0');
  }

  getInfoMovie(id: string) {
    this.route.navigate(['/movie', 'MV-' + id]);
  }

  getInfoArtista(id: string) {
    this.route.navigate(['/artistas', id]);
  }

  getIdiomas(array: any[]){
    array.forEach(element => {
      this.idiomas += element.iso_639_1 +'(' + element.name + ') ';
    });
  }

  getIdiomasSeries(array: any[]){
    array.forEach(element => {
      this.idiomas += element + ' ';
    });
  }

}
