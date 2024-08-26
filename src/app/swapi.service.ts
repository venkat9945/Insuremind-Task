import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {


  private peoples = 'assets/json/people.json';
  private vehicles = 'assets/json/vehicles.json';
  private startships = 'assets/json/starships.json';
  private species = 'assets/json/species.json';
  private films = 'assets/json/films.json';

  constructor(private http: HttpClient) {}

  getPeoplesData(): Observable<any> {
    return this.http.get<any>(this.peoples);
  }

  getFilmsData(): Observable<any> {
    return this.http.get<any>(this.films);
  }

  getVehiclesData(): Observable<any> {
    return this.http.get<any>(this.vehicles);
  }

  getStartshipData(): Observable<any> {
    return this.http.get<any>(this.startships);
  }

  getSpeciesData(): Observable<any> {
    return this.http.get<any>(this.species);
  }

  getPeopleDatabyId(url: any): Observable<any> {
    return this.http.get<any>(url);
  }

}
