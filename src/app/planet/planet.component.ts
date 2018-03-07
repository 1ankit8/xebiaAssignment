import { Component, OnInit } from '@angular/core';

import { SharedServiceService } from "../shared-service.service";

import { Planet } from "../../models-classes/planet";

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {

  planet: Planet;

  constructor(private sharedService: SharedServiceService) {
    this.sharedService.planet$.subscribe(
      planet => this.planet = planet
    )
  }

  ngOnInit() {
  }

}
