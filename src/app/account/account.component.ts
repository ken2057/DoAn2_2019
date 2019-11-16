import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, Injectable, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../class/user';
import { AuthService } from '../api/auth.service';
import { AccountService } from '../api/account.service';
import { ManangerService } from '../api/mananger.service';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  user = new User()
  dataLoaded = false;
  isAdmin = false;

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private accService: AccountService,
    private manService: ManangerService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    let username = this.route.snapshot.paramMap.get('username')
    if(username == null)
      this.getAccountInfo()
    else
      this.getAccountInfoWithId(username) // admin or manager

    this.dataLoaded = true
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
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
            account['borrowed'],
            '',
            account['birth'],
            account['address'],
            account['date_creted'],
            account['date_expire']
          )
        }, error => {
            console.error(error)
            this.dialogService.openModal('Error', error.error)
          })
  }

  updateAccountInfo() {
    this.accService.postAccountInfo(this.cookieService.get('token'), this.user)
        .subscribe(res => {console.log(res)},
                  error => {console.log(error); this.dialogService.openModal('Error', error.error)})
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
            this.isAdmin = true
          }, error => {
            console.error(error)
            this.dialogService.openModal('Error', error.error)
          })
  }
}
