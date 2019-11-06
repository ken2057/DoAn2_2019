import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/class/user';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/api/auth.service';
import { AccountService } from 'src/app/api/account.service';
import { ManangerService } from 'src/app/api/mananger.service';


@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  dataLoaded = false;
  edtUser = new User()
  form = new FormGroup({
    userName: new FormControl({value:'',disabled: true}, [Validators.required , Validators.minLength(3)]),
    passWord: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Email: new FormControl('', [Validators.required, Validators.email])
  });
  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private accService: AccountService,
    private manService: ManangerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let username = this.route.snapshot.paramMap.get('username')
    if(username == null)
      this.getAccountInfo() //user
    else
      this.getAccountInfoWithId(username) //admin - manager

    this.dataLoaded = true
  }

  getAccountInfo() {
    this.accService.getAccountInfo(this.cookieService.get('token'))
        .subscribe(response => {
          let json = response.body
          let account = json['account']
          this.edtUser = new User(
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
    this.accService.postAccountInfo(this.cookieService.get('token'), this.edtUser)
        .subscribe(res => {console.log(res)},
                  err => {console.log(err)})
  }

  getAccountInfoWithId(username: string) {
    this.manService.getUserWithId(this.cookieService.get('token'), username)
          .subscribe( res => {
            let user = res.body['user']
            this.edtUser = new User(
              user['_id'],
              '',
              user['email'],
              user['borrowed'],
              user['role']
            )
          }, error => {
            console.error(error)
          })
  }
}
