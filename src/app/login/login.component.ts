import { Component, Input, Output, Injectable, EventEmitter, OnInit } from '@angular/core';
import { User } from '../class/user';
import { AppComponent } from '../app.component';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { UtilsService } from '../utils.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AppComponent]
})

export class LoginComponent implements OnInit {
  userLogin: User;
  isLogin = true;

  constructor(
    public apiService: ApiService,
    public cookieService: CookieService,
    public utilsService: UtilsService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userLogin = new User()
  }

  @Output() userInfo = new EventEmitter<User>();

  onSubmit() {
    this.apiService
        .getLogin(this.userLogin)
        .subscribe(response => {
            // login succesfully
            let json = response.body
            this.cookieService.set(
              'token', json['token'],
              this.utilsService.convertSecondToDay(Number(json['expires']))
            )
            this.cookieService.set(
              'username', this.userLogin.username,
              this.utilsService.convertSecondToDay(Number(json['expires']))
            )
            this.router.navigate([''], {relativeTo: this.route})
          }, error => {
            //wrong usename/password
            console.log('invalid', error)
          }
        )
  }

  clickSignUp() {
    this.isLogin = !this.isLogin
  }

  finishSignUp(username: string) {
    this.userLogin.username = username
    this.clickSignUp()
  }
}
