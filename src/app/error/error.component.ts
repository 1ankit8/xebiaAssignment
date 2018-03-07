import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  errorCode:any;
  constructor(private router: Router,
    private route: ActivatedRoute) {
      this.route.queryParams.subscribe(params=>{
        this.errorCode = params['errorCode']
      })
     }

  ngOnInit() {
  }

}
