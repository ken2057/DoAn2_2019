import { Component, Input, Output, Injectable, EventEmitter } from '@angular/core';
import { User } from '../class/user';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AppComponent]
})
@Injectable()
export class LoginComponent extends AppComponent {
  userLogin = new User();

  @Output() userInfo = new EventEmitter<User>();

  convertSecondToDay(seconds){
    let date = new Date();
    return new Date(date.getTime() + (1000 * seconds))
  }

  onSubmit(){
    this.apiService.postLogin(this.userLogin)
        .subscribe(
          (val) => {
            this.cookieService.set(
              'token', val['token'],
              this.convertSecondToDay(Number(val['expires']))
            );
            this.cookieService.set(
              'username', this.userLogin.username,
              this.convertSecondToDay(Number(val['expires']))
            );

            this.userInfo.emit(this.userLogin);
          },
          response => {
              console.log("POST call in error", response);
          },
          () => {
              console.log("The POST observable is now completed.");
          });
  }
}
