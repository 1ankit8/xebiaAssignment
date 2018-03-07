import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Person } from "../models-classes/person";

import { SharedServiceService } from "./shared-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: Person;
  searchValue:string;
  constructor(private sharedService: SharedServiceService, private router:Router) {
    this.sharedService.user$.subscribe(
      user => this.user = user
    )
  }
  ngOnInit() {
    if(!this.user)
    this.router.navigate(['login'])
  }

  logout(){
    this.user = null;
    this.router.navigate(['login']);
  }

  search(event:any){
    this.sharedService.searchPlanets(event.target.value);
  }
}
