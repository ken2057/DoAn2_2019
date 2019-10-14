import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Account } from './account';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular';
  account = new Account('', '');
  
  bookName: string;
  bookPrice: number;
  bookAuthor: string;

  constructor(
        private cookieService: CookieService,
        private apiService: ApiService
        ) {
          
        }

  public ngOnInit(): void {
    this.cookieService.set('token', '123', 500);
    this.apiService.sendGetRequest()
      .subscribe(data => {
        this.bookName = data['name'];
        this.bookPrice = data['price'];
        this.bookAuthor = data['author'];
      });
    
  }

  /**
   * click_btn
   */
  public click_btn() {
    this.cookieService.set('a', '234');
    this.cookieService.set('token', '1');
  }
}
