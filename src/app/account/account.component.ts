import { Component, OnInit, Injectable, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { User } from '../class/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent extends AppComponent {
  public username: string;

  ngOnInit(){
    this.username = this.cookieService.get('username');
  }
}
