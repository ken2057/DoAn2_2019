import { Component, Input, Output, Injectable, EventEmitter, OnInit } from '@angular/core';
import { User } from '../class/user';
import { AppComponent } from '../app.component';
import { CookieService } from 'ngx-cookie-service';
import { UtilsService } from '../utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../api/account.service';
import { DialogService } from '../services/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AppComponent]
})

export class LoginComponent implements OnInit {
  userLogin: User;
  isLogin = false;

  form = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    passWord: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(
    private accService: AccountService,
    private cookieService: CookieService,
    private utilsService: UtilsService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.userLogin = new User()
    this.userLogin.username = this.route.snapshot.queryParams['username'] || ''
  }

  @Output() userInfo = new EventEmitter<User>();

  onSubmit() {
    if(this.userLogin.username == '' || this.userLogin.password == ''){
      this.dialogService.openModal('Error', 'Nice try')
      return
    }


    this.spinner.show();
    this.isLogin = true
    this.accService.getLogin(this.userLogin)
        .subscribe(response => {
            // login succesfully
            this.cookieService.deleteAll()
            let json = response.body
            this.cookieService.set('token', json['token'])
            this.cookieService.set('username', this.userLogin.username)
            this.router.navigate([''], {relativeTo: this.route})

            this.spinner.hide();
          }, error => {
            //wrong usename/password
            console.error(error)
            this.dialogService.openModal('Error', error.error)
            this.isLogin = false
            this.spinner.hide();
          }
        )
  }

  clickSignUp() {
    this.isLogin = !this.isLogin
  }

  finishSignUp(username: string) {
    this.userLogin.username = username
    this.clickSignUp()
  }
}
