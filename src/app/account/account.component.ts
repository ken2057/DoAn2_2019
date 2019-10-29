import { Component, OnInit, Injectable, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';
import { UtilsService } from '../utils.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  public username: string;

  constructor(
    private cookieService: CookieService,
    private apiService: ApiService,
    private utilService: UtilsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let role: Number
    this.apiService.getPermission(this.cookieService.get('token'))
            .subscribe(res => role = Number(res.body), err => role = 9)
            
    if (role == 9){
      this.router.navigate([''], {relativeTo: this.route})
      return
    }
    
    this.username = this.cookieService.get('username');
  }
}
