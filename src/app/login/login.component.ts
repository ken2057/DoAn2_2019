import { Component, Input, Output, Injectable, EventEmitter, OnInit } from '@angular/core';
import { User } from '../class/user';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AppComponent]
})

export class LoginComponent extends AppComponent {
  userLogin: User;

  ngOnInit() {
    this.userLogin = new User()
  }

  @Output() userInfo = new EventEmitter<User>();

  convertSecondToDay(seconds){
    let date = new Date()
    return new Date(date.getTime() + (1000 * seconds))
  }

  onSubmit(){
    this.apiService
        .getLogin(this.userLogin)
        .subscribe(response => {
            // login succesfully
            let json = response.body
            this.cookieService.set(
              'token', response.body['token'],
              this.convertSecondToDay(Number(json['expires']))
            );
            this.cookieService.set(
              'username', this.userLogin.username,
              this.convertSecondToDay(Number(json['expires']))
            );
          }, invalid => {
            //wrong usename/password
            console.log('invalid', invalid)
          }
        )
  }
}
