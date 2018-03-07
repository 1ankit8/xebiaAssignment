import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { FlashMessagesService } from "ngx-flash-messages";
import { Router } from "@angular/router";

import { SharedServiceService } from "../shared-service.service";

import { Planets } from "../../models-classes/planets";
import { Observable } from 'rxjs/Observable';
import { Planet } from '../../models-classes/planet';

@Component({
  selector: 'app-all-planets',
  templateUrl: './all-planets.component.html',
  styleUrls: ['./all-planets.component.css']
})
export class AllPlanetsComponent implements OnInit {
  allPlanets: Planets;
  onlyPlanets: Planet[];
  onlyPlanetsCopy: Planet[];
  maxPopulation: number = 0;
  average: number = 0;
  searchCounter: Date[] = [];



  constructor(private router : Router, private sharedService: SharedServiceService, private flashMessagesService: FlashMessagesService) {
    this.sharedService.search$.subscribe(
      searchval => {
        this.search(searchval);
      }
    )
  }

  ngOnInit() {
    this.getAllPlanets();
  }

  getAllPlanets(url?: string) {
    this.sharedService.getData(url ? url : environment.source + 'planets').subscribe(
      allPlanets => {
        this.allPlanets = allPlanets;
        if (this.onlyPlanets)
          this.onlyPlanets = this.onlyPlanets.concat(this.allPlanets.results);
        else
          this.onlyPlanets = this.allPlanets.results;
        if (this.allPlanets.next) {
          this.getAllPlanets(this.allPlanets.next);
        } else {
          this.onlyPlanetsCopy = this.onlyPlanets;
          this.findMaxPopulation(this.onlyPlanets);
        }
      },
      error => { this.goToError(error.status) }
    )
  }

  private findMaxPopulation(planets: Planet[]) {
    let galacticPopulation = 0;
    for (var i = 0; i < this.onlyPlanets.length; i++) {
      if (!isNaN(Number(this.onlyPlanets[i].population))) {
        galacticPopulation += Number(this.onlyPlanets[i].population);
        if (Number(this.onlyPlanets[i].population) > this.maxPopulation) {
          this.maxPopulation = Number(this.onlyPlanets[i].population);
        }
      }

      this.average = galacticPopulation / this.onlyPlanets.length;
    }
  }

  getPopulationPercentile(population) {
    if (isNaN(population))
      return 20;
    let populationPercentile = population * 200 / this.average;
    if (populationPercentile < 20)
      return 20;
    else if (populationPercentile > 200)
      return 200;
    else return populationPercentile;
  }

  showPlanet(planet: Planet, event: any) {
    var allDivs = document.getElementsByClassName("planet") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < allDivs.length; i++) {
      allDivs[i].style.background = "radial-gradient(whitesmoke, blue)";
    }
    event.target.style.background = "radial-gradient(whitesmoke, red)";
    this.sharedService.showPlanet(planet);
  }

  search(val) {
    if (!val || val == '')
      this.onlyPlanets = this.onlyPlanetsCopy;
    if (!this.onlyPlanets || this.searchCountExceded())
      return;
    this.onlyPlanets = this.onlyPlanets.filter((planet) => {
      return planet.name.indexOf(val) > -1;
    })
  }
  private searchCountExceded() {
    if (sessionStorage.getItem('user') == 'Luke Skywalker')
      return false;

    if (!this.searchCounter || this.searchCounter.length < 15) {
      this.searchCounter.push(new Date());
      return false;
    } else {
      let startTime = new Date(this.searchCounter[0]).getTime() / 1000;
      let presentTime = new Date().getTime() / 1000;
      let difference = Math.floor(presentTime - startTime);
      if (difference >= 60) {
        this.searchCounter.shift();
        this.searchCounter.push(new Date());
        return false;
      } else {
        this.flashMessagesService.show('ALERT! You have exhausted your search limits. Please try after ' + difference + ' seconds.', {
          classes: ['alert'],
          timeout: 3000
        });
        return true;
      }
    }

  }

  goToError(errorCode){
    this.router.navigate(['error'], errorCode);
  }

}
