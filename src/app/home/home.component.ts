import { join } from 'node:path';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { SwapiService } from '../swapi.service';
import { Router } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface People {
  id: number;
  name: string;
  films: string[];
  vehicles: string[];
  starships: string[];
  species: string[];
  birth_year: string;
  url: string;
}

interface DupPeople {
  id: number;
  name: string;
  films: string[];
  vehicles: string[];
  starships: string[];
  species: string[];
  birth_year: string;
  url: string;
}

interface FilterOptions {
  films: string[];
  vehicles: string[];
  species: string[];
  starships: string[];
  birth_years: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableModule, CommonModule, MultiSelectModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title = 'insuremind';
  films: any[] = [];
  peoples: People[] = [];
  dupPeoples: any = [];
  vehicles: any[] = [];
  starships: any[] = [];
  species: any[] = [];
  birthYears: any[] = [];
  search: boolean = false;
  filterOptions: any = {
    films: [],
    vehicles: [],
    species: [],
    starships: [],
    birth_years: [],
  };

  constructor(private swapiService: SwapiService, private router: Router) {}

  ngOnInit(): void {
    this.getFilms();
    this.getVehicles();
    this.getStarships();
    this.getSpecies();
    this.getPeoples();
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

  getPeopleData(peoples: any) {
    var url = peoples.url;
    this.router.navigate(['/profile'], {
      queryParams: { url: peoples.url },
    });
  }

  filterOptionSearch() {

    this.search = true;
    var dubFilter: any = {};

    for (const key in this.filterOptions) {
      if (this.filterOptions.hasOwnProperty(key)) {
        dubFilter[key] = [];
      }

      if (this.filterOptions[key].length > 0) {
        this.filterOptions[key].forEach((e: any, x: any) => {
          if (key == 'films') {
            dubFilter[key].push(e.title);
          } else {
            dubFilter[key].push(e.name);
          }
        });
      }
    }


    this.peoples = this.simpleFilter(this.dupPeoples, dubFilter);

  }

  simpleFilter(peoples: People[], filterOptions: FilterOptions) {
    var filterDatas: any = [];
    var filterIds: any = [];
    peoples.filter((people) => {
      // Check if user matches all filter criteria
      if (filterOptions.films && filterOptions.films.length > 0) {
        filterOptions.films.forEach((value) => {
          var film = people.films.includes(value);
          if (film == true) {
            if (!filterIds.includes(people.id)) {
              filterDatas.push(people);
            }

            if (!filterIds.includes(people.id)) {
              filterIds.push(people.id);
            }
          }
        });
      }

      if (filterOptions.species && filterOptions.species.length > 0) {
        filterOptions.species.forEach((value) => {
          var species = people.species.includes(value);
          if (species == true) {
            if (!filterIds.includes(people.id)) {
              filterDatas.push(people);
            }

            if (!filterIds.includes(people.id)) {
              filterIds.push(people.id);
            }
          }
        });
      }

      if (filterOptions.vehicles && filterOptions.vehicles.length > 0) {
        filterOptions.vehicles.forEach((value) => {
          var vehicles = people.vehicles.includes(value);
          if (vehicles == true) {
            if (!filterIds.includes(people.id)) {
              filterDatas.push(people);
            }

            if (!filterIds.includes(people.id)) {
              filterIds.push(people.id);
            }
          }
        });
      }

      if (filterOptions.starships && filterOptions.starships.length > 0) {
        filterOptions.starships.forEach((value) => {
          var starships = people.starships.includes(value);
          if (starships == true) {
            if (!filterIds.includes(people.id)) {
              filterDatas.push(people);
            }

            if (!filterIds.includes(people.id)) {
              filterIds.push(people.id);
            }
          }
        });
      }

      if (filterOptions.birth_years && filterOptions.birth_years.length > 0) {
        filterOptions.birth_years.forEach((value) => {
          var birth_year = people.birth_year.includes(value);
          if (birth_year == true) {
            if (!filterIds.includes(people.id)) {
              filterDatas.push(people);
            }

            if (!filterIds.includes(people.id)) {
              filterIds.push(people.id);
            }
          }
        });
      }
    });

    return filterDatas;
  }

  getPeoples() {
    this.swapiService.getPeoplesData().subscribe((data) => {
      this.peoples = [];
      this.dupPeoples = [];
      if (data.length > 0) {
        this.peoples = [];
        var by: any = [];
        this.birthYears = [];
        data.forEach((e: any, x: any) => {
          if (!by.includes(e.birth_year) && e.birth_year != 'unknown') {
            this.birthYears.push({
              id: x,
              name: e.birth_year,
            });
          }

          by.push(e.birth_year);

          var fData: any = [];
          if (e.films.length > 0) {
            e.films.forEach((fe: any, fi: any) => {
              var fd = this.films.filter((v) => v.url == fe);
              if (fd.length > 0) {
                fData.push(fd[0].title);
              }
            });
          }

          var vData: any = [];
          if (e.vehicles.length > 0) {
            e.vehicles.forEach((ee: any, ii: any) => {
              var vv = this.vehicles.filter((v) => v.url == ee);
              if (vv.length > 0) {
                vData.push(vv[0].name);
              }
            });
          }

          var sData: any = [];
          if (e.starships.length > 0) {
            e.starships.forEach((eee: any, iii: any) => {
              var ss = this.starships.filter((v) => v.url == eee);
              if (ss.length > 0) {
                sData.push(ss[0].name);
              }
            });
          }

          var speData: any = [];
          if (e.species.length > 0) {
            e.species.forEach((eeee: any, iiii: any) => {
              var sp = this.species.filter((sp) => sp.url == eeee);
              if (sp.length > 0) {
                speData.push(sp[0].name);
              }
            });
          }

          this.peoples.push({
            id: x + 1,
            name: e.name,
            films: fData.join(','),
            vehicles: vData.join(','),
            starships: sData.join(','),
            species: speData.join(','),
            birth_year: e.birth_year,
            url: e.url,
          });

          this.dupPeoples.push({
            id: x + 1,
            name: e.name,
            films: fData,
            vehicles: vData,
            starships: sData,
            species: speData,
            birth_year: e.birth_year,
            url: e.url,
          });
        });
      }
    });
  }
}
