import { Component, Input, Output, Injectable, EventEmitter, OnInit } from '@angular/core';
import { User } from '../class/user';
import { AppComponent } from '../app.component';
import { CookieService } from 'ngx-cookie-service';
import { UtilsService } from '../utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../api/account.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { style } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AppComponent]
})

export class LoginComponent implements OnInit {
  userLogin: User;
  isLogin = true;
  form = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    passWord: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    private accService: AccountService,
    private cookieService: CookieService,
    private utilsService: UtilsService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userLogin = new User()
    this.userLogin.username = this.route.snapshot.queryParams['username'] || ''
  }

  @Output() userInfo = new EventEmitter<User>();

  onSubmit() {
    this.accService.getLogin(this.userLogin)
        .subscribe(response => {
            // login succesfully
            this.cookieService.deleteAll()
            let json = response.body
            this.cookieService.set('token', json['token'])
            this.cookieService.set('username', this.userLogin.username)
            this.router.navigate([''], {relativeTo: this.route})
          }, error => {
            //wrong usename/password
            console.error('login: ', error)
            this.openDialog()
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
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialog, {
      width: '300px',
      position: {top: '2%',left: '43%'},

    });
  }
}


@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialog {
  constructor(public dialogRef: MatDialogRef<LoginDialog>){
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
