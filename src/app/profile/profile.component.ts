import { Component } from '@angular/core';
import { SwapiService } from '../swapi.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  url: any = '';
  profileData: any = {};
  films: any[] = [];
  vehicles: any[] = [];
  starships: any[] = [];
  species: any[] = [];

  isLoading: boolean = false;

  constructor(
    private swapiService: SwapiService,
    private route: ActivatedRoute
  ) {
    this.url = this.route.snapshot.queryParams['url'];
    this.getFilms();
    this.getVehicles();
    this.getStarships();
    this.getSpecies();
  }

  ngOnInit(): void {
    this.getPeopleData();
  }

  getFilms() {
    this.swapiService.getFilmsData().subscribe((data) => {
      this.films = data;
    });
  }

  getVehicles() {
    this.swapiService.getVehiclesData().subscribe((data) => {
      this.vehicles = data;
    });
  }

  getStarships() {
    this.swapiService.getStartshipData().subscribe((data) => {
      this.starships = data;
    });
  }

  getSpecies() {
    this.swapiService.getSpeciesData().subscribe((data) => {
      this.species = data;
    });
  }

  getPeopleData() {
    this.isLoading = true;
    this.swapiService.getPeopleDatabyId(this.url).subscribe({
      next: (response: any) => {
        if (response) {
          this.isLoading = false;
          var fData: any = [];
          if (response.films.length > 0) {
            response.films.forEach((fe: any, fi: any) => {
              var fv = this.films.filter((v) => v.url == fe);
              if (fv.length > 0) {
                fData.push(fv[0].title);
              }
            });
          }

          var vData: any = [];
          if (response.vehicles.length > 0) {
            response.vehicles.forEach((e: any, i: any) => {
              var vv = this.vehicles.filter((v) => v.url == e);
              if (vv.length > 0) {
                vData.push(vv[0].name);
              }
            });
          }

          var sData: any = [];
          if (response.starships.length > 0) {
            response.starships.forEach((ee: any, ii: any) => {
              var ss = this.starships.filter((v) => v.url == ee);
              if (ss.length > 0) {
                sData.push(ss[0].name);
              }
            });
          }

          var speData: any = [];
          if (response.species.length > 0) {
            response.species.forEach((eee: any, iii: any) => {
              var sp = this.species.filter((sp) => sp.url == eee);
              if (sp.length > 0) {
                speData.push(sp[0].name);
              }
            });
          }

          response.filmsArr = fData;
          response.vehiclesArr = vData;
          response.starshipsArr = sData;
          response.speciesArr = speData;
          this.profileData = response;
        }
      },
      error: (error) => {},
    });
  }
}
