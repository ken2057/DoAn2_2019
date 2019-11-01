import { Component, OnInit, Injectable, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../class/user';
import { AuthService } from '../api/auth.service';
import { AccountService } from '../api/account.service';
import { ManangerService } from '../api/mananger.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  user = new User()
  dataLoaded = false;

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private accService: AccountService,
    private manService: ManangerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.authService.getPermission(this.cookieService.get('token'))
            .subscribe(res => { 
              let role = Number(res.body['role'])
              if(role == 3) {
                this.router.navigate(['/Login'], {relativeTo: this.route})
              } else {
                //have permission
                let username = this.route.snapshot.paramMap.get('username')
                if(username == null)
                  this.getAccountInfo()
                else 
                  this.getAccountInfoWithId(username)

                this.dataLoaded = true
              }
            }, 
            err => console.log(err))
  }

  getAccountInfo() {
    this.accService.getAccountInfo(this.cookieService.get('token'))
        .subscribe(response => {
          let json = response.body
          let account = json['account']
          this.user = new User(
            account['_id'],
            '',
            account['email'],
            account['borrowed']
          )          
        }, error => {
          console.error('getAccountInfo: '+error)
          })
  }

  updateAccountInfo() {
    this.accService.postAccountInfo(this.cookieService.get('token'), this.user)
        .subscribe(res => {console.log(res)},
                  err => {console.log(err)})
  }

  getAccountInfoWithId(username: string) {
    this.manService.getUserWithId(this.cookieService.get('token'), username)
          .subscribe( res => {
            let user = res.body['user']
            this.user = new User(
              user['_id'],
              '',
              user['email'],
              user['borrowed']
            )
          }, error => {
            console.error(error)
          })
  }
}
