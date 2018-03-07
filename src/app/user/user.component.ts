import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Persons } from '../../models-classes/persons';

import { SharedServiceService } from "../shared-service.service";
import { Person } from '../../models-classes/person';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: Person;
  userName:string;
  constructor(
    private sharedService: SharedServiceService,
    private router: Router,
    private route : ActivatedRoute
  ) { 
    this.route.queryParams.subscribe(params=>{
      this.userName = params['user']
    })
  }

  ngOnInit() {

  }

}
