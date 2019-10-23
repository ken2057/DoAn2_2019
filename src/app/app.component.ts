import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';
import { User } from './class/user';

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
    public apiService: ApiService
  ) {}

  public ngOnInit(): void {
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
