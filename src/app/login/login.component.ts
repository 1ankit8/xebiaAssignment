import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";

import { UserCredential } from "../../models-classes/login/user-credential";
import { Api } from "../../models-classes/api";
import { Person } from "../../models-classes/person";
import { Persons } from "../../models-classes/persons";

import { SharedServiceService } from "../shared-service.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userCredential = new UserCredential('', '');
  loginForm: FormGroup;
  allApi: Api;
  user: Person;
  allUsers: Persons;
  errorMessage: string;
  findingUser: boolean;
  constructor(private router: Router, private sharedService: SharedServiceService) { }

  ngOnInit() {
    this.findingUser = false;
    this.sharedService.getData().subscribe(
      api => this.allApi = api,
      error => { this.goToError(error.status) }
    )
        this.initiateLoginForm();
  }

  initiateLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  onSubmit() {
    this.userCredential = new UserCredential(this.loginForm.value.username, this.loginForm.value.password);
    this.findUser();
  }

  private findUser(url?: string) {
    this.findingUser = true;
    this.sharedService.getData(url ? url : this.allApi.people).subscribe(
      allUsers => {
        this.allUsers = allUsers;
        this.user = this.allUsers.results.filter((user) => {
          this.findingUser = false;
          return user.name == this.userCredential.username && user.birth_year == this.userCredential.password;
        })[0];

        if (!this.user) {
          if (this.allUsers.next)
            this.findUser(this.allUsers.next)
          else {
            this.errorMessage = "No such user";
            this.findingUser = false;
            return null;
          }
        } else {
          sessionStorage.setItem('user',this.user.name);
          this.sharedService.sendUser(this.user);
          this.router.navigate(['user']);
        }
      },
      error => { this.goToError(error.status) }
    )
  }

  goToError(errorCode){
    this.router.navigate(['error'], errorCode);
  }

}
