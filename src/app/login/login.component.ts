import { Component, Input, Output, Injectable, EventEmitter, OnInit } from '@angular/core';
import { User } from '../class/user';
import { AppComponent } from '../app.component';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AppComponent]
})

export class LoginComponent implements OnInit {
  userLogin: User;

  constructor(
    public apiService: ApiService,
    public cookieService: CookieService,
    public utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.userLogin = new User()
  }

  @Output() userInfo = new EventEmitter<User>();

  onSubmit(){
    this.apiService
        .getLogin(this.userLogin)
        .subscribe(response => {
            // login succesfully
            let json = response.body
            this.cookieService.set(
              'token', json['token'],
              this.utilsService.convertSecondToDay(Number(json['expires']))
            );
            this.cookieService.set(
              'username', this.userLogin.username,
              this.utilsService.convertSecondToDay(Number(json['expires']))
            );
          }, invalid => {
            //wrong usename/password
            console.log('invalid', invalid)
          }
        )
  }
}
