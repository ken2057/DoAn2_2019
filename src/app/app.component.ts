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
  title = 'Angular';
  
  bookName: string;
  bookPrice: number;
  bookAuthor: string;

  constructor(
    public cookieService: CookieService,
    public apiService: ApiService,
    public user: User
    ) {}

  public ngOnInit(): void {
    // this.cookieService.set('token', '123', 500);
    // this.apiService.sendGetRequest()
    //   .subscribe(data => {
    //     this.bookName = data['name'];
    //     this.bookPrice = data['price'];
    //     this.bookAuthor = data['author'];
    //   });
    
  }

  /**
   * click_btn
   */
  public click_btn() {
    
  }

  @Output() userInfo = new EventEmitter<User>();
  public getLogin(ue: User){
    // this.userInfo.emit(ue);
    this.user = ue;
    console.log('done '+ue.username +' - '+ue.password);
  }
}