import { Component, OnInit, Injectable, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';
import { UtilsService } from '../utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../class/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  user = new User()
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
    this.getAccountInfo()
  }

  getAccountInfo() {
    this.apiService.getAccountInfo(this.cookieService.get('token'))
        .subscribe(response => {
          let json = response.body
          let account = json['account']
          this.user = new User(
            account['_id'],
            '',
            account['email'],
            account['borrowed']
          )
        }, error => {
          console.error('getAccountInfo: '+error)
          })
  }

  updateAccountInfo() {
    this.apiService.postAccountInfo(this.cookieService.get('token'), this.user)
        .subscribe(res => {console.log(res)},
                  err => {console.log(err)})
  }
}
