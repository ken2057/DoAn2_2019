import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';
import { User } from './class/user';
import { UtilsService } from './utils.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Home';

  public user: User;
  public isLogin = false;
  public role = 9;

  constructor(
    public cookieService: CookieService,
    public apiService: ApiService,
    public utilsService: UtilsService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.router.events.subscribe(val => {
      if(val['urlAfterRedirects'] == '/')
        this.checkToken()
    })
  }

  ngOnInit() {
    this.checkToken()
  }

  checkToken() {
    // check token expire or not
    if(this.cookieService.get('token') != '') {
      this.apiService
            .getCheckToken(this.cookieService.get('token'))
            .subscribe( response => {
              let json = response.body
              this.cookieService.set(
                'username', json['username'],
                this.utilsService.convertSecondToDay(Number(json['expires'])))
              this.isLogin = true
              this.getTokenPermission()
            }, error => { 
              this.resetAllValue()
            })
    }
  }

  public btnLogoutClick() {
    this.cookieService.deleteAll()
    this.resetAllValue()
  }

  @Output() userInfo = new EventEmitter<User>();
  public getLogin(ue: User){
    this.user = ue;
  }

  getTokenPermission() {
    this.apiService.getPermission(this.cookieService.get('token'))
        .subscribe(response => {
          let json = response.body
          console.log(json)
          this.role = Number(json)
          
        }, error => { this.role = 9 })
  }

  resetAllValue() {
    this.role = 9
    this.isLogin = false
    this.cookieService.deleteAll()
  }
}
