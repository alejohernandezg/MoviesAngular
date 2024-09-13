import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MovieApiService {
  private baseURL = 'https://api.themoviedb.org/3/';
  private apiKey = '15d2ea6d0dc1d476efbca3eba2b9bbfb';
  private pupularUrl = 'movie/popular?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&language=en-US&page=1';

  constructor(private http: HttpClient) { }

  getJsonPopular() {
    return this.http.get(this.baseURL + this.pupularUrl);
  }

  getJsonById(idMovie: string) {
    return this.http.get(this.baseURL + 'movie/' + idMovie + '?api_key=' + this.apiKey);
  }

  getJsonByName(nameMovie: string) {
    return this.http.get(this.baseURL + 'search/movie?api_key=' + this.apiKey + '&query=' + nameMovie);
  }

  getJsonTopRated() {
    return this.http.get(this.baseURL + 'movie/top_rated?api_key=' + this.apiKey);
  }

  getJsonVideoById(id: string) {
    return this.http.get(this.baseURL + 'movie/' + id + '?api_key=' + this.apiKey);
  }

  getJsonSimilarById(id: string) {
    return this.http.get(this.baseURL + 'movie/' + id + '/similar?api_key=' + this.apiKey);
  }

  getJsonMovieArtistasById(id: string) {
    return this.http.get(this.baseURL + 'movie/' + id + '/credits?api_key=' + this.apiKey);
  }

  //SERIES

  getJsonSeriesPupular() {
    return this.http.get(this.baseURL + 'tv/popular?api_key=' + this.apiKey);
  }

  getJsonSeriesTopRated() {
    return this.http.get(this.baseURL + 'tv/top_rated?api_key=' + this.apiKey);
  }

  getJsonSeriesById(id: string) {
    return this.http.get(this.baseURL + 'tv/' + id + '?api_key=' + this.apiKey);
  }

  getJsonVideoSerieById(id: string) {
    return this.http.get(this.baseURL + 'tv/' + id + '?api_key=' + this.apiKey);
  }

  getJsonSeriesSimilarById(id: string) {
    return this.http.get(this.baseURL + 'tv/' + id + '/similar?api_key=' + this.apiKey);
  }

  getJsonSeriesByName(name: string) {
    return this.http.get(this.baseURL + 'search/tv?api_key=' + this.apiKey + '&query=' + name);
  }

  getJsonSeriesArtistasById(id: string) {
    return this.http.get(this.baseURL + 'tv/' + id + '/credits?api_key=' + this.apiKey);
  }

  //ARTISTAS

  getJsonArtistas() {
    return this.http.get(this.baseURL + 'person/popular?api_key=' + this.apiKey);
  }

  getJsonArtistaById(id: number) {
    return this.http.get(this.baseURL + 'person/' + id + '?api_key=' + this.apiKey);
  }

  getJsonArtistaMoviesById(id: string) {
    return this.http.get(this.baseURL + 'person/' + id + '/movie_credits?api_key=' + this.apiKey);
  }

  getJsonArtistaSeriesById(id: string) {
    return this.http.get(this.baseURL + 'person/' + id + '/tv_credits?api_key=' + this.apiKey);
  }

  getJsonArtistaByName(name: string) {
    return this.http.get(this.baseURL + 'search/person?api_key=' + this.apiKey + '&query=' + name);
  }
}
