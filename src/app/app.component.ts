import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';
import { User } from './class/user';
import { UtilsService } from './utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Home';

  public user: User;

  constructor(
    public cookieService: CookieService,
    public apiService: ApiService,
    public utilsService: UtilsService
  ) {}

  ngOnInit() {
    // check token expire or not
    if(this.cookieService.get('token') != null) {
      this.apiService
            .getCheckToken(this.cookieService.get('token'))
            .subscribe( response => {
              let json = response.body

              if (response.status == 200) {
                this.cookieService.set(
                  'username', json['username'],
                  this.utilsService.convertSecondToDay(Number(json['expires'])))
              }
              else if (response.status == 203) {
                this.cookieService.deleteAll()
              }
            })
    }

  }

  /**
   * click_btn
   */
  public click_btn() {
    
  }

  @Output() userInfo = new EventEmitter<User>();
  public getLogin(ue: User){
    this.user = ue;
  }
}
