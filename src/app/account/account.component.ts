import { Component, OnInit, Injectable, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';
import { UtilsService } from '../utils.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  public username: string;
  dataLoaded = false;

  constructor(
    private cookieService: CookieService,
    private apiService: ApiService,
    private utilService: UtilsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.apiService.getPermission(this.cookieService.get('token'))
            .subscribe(res => { 
              let role = Number(res.body['role'])
              console.log(role)
              if(role == 3) {
                this.router.navigate(['/Login'], {relativeTo: this.route})
              } else {
                //have permission
                this.loadData()
                this.dataLoaded = true
              }
            }, 
            err => console.log(err))
  }

  loadData() {
    this.username = this.cookieService.get('username');
  }
}
