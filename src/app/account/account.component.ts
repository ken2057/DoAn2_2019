import { Component, OnInit, Injectable, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { User } from '../class/user';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  public username: string;

  constructor(public cookieService: CookieService) {}

  ngOnInit(){
    this.username = this.cookieService.get('username');
  }
}
