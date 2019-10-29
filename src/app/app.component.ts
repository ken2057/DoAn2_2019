import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';
import { User } from './class/user';
import { UtilsService } from './utils.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

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
    private cookieService: CookieService,
    private apiService: ApiService,
    private utilsService: UtilsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe(val => {
      if(val instanceof NavigationEnd)
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
                this.utilsService.convertSecondToDay(Number(json['expires']))
              )
              this.isLogin = true
              this.apiService.getPermission(this.cookieService.get('token'))
                      .subscribe(res => this.role = Number(res.body['role']), err => this.role = 9)

            }, error => { 
              console.error('checkToken: '+error)
              this.resetAllValue()
            })
    }
  }

  public btnLogoutClick() {
    this.resetAllValue()
  }

  resetAllValue() {
    this.role = 9
    this.isLogin = false
    this.cookieService.deleteAll()
  }
}
