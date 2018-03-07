import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";

import { Planet } from "../models-classes/planet";
import { Person } from "../models-classes/person";

import { environment } from "../environments/environment";

import { Api } from "../models-classes/api";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedServiceService {

  private user = new Subject<Person>();
  private planet = new Subject<Planet>();
  private search = new Subject<string>();

  planet$ = this.planet.asObservable();
  user$ = this.user.asObservable();
  search$ = this.search.asObservable().debounceTime(500).distinctUntilChanged();

  constructor(private http:HttpClient) { }

  
  getData(url?:string){
    return this.http.get<any>(url? url : environment.source);
  }

  searchPlanets(searchKey){
    this.search.next(searchKey)
  }

  showPlanet(planet:Planet){
    this.planet.next(planet);
  }

  sendUser(user:Person){
    this.user.next(user);
  }
}
