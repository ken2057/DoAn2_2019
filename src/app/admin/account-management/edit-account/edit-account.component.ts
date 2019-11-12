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
  isAdmin = false;
  edtUser = new User()

  roles = [
    {'id': 1, 'name': 'User'},
    {'id': 2, 'name': 'Manager'},
    {'id': 3, 'name': 'Admin'},
  ]
  currentRole = 1
  newRole = -1

  form = new FormGroup({
    userName: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(3)]),
    passWord: new FormControl('', [Validators.minLength(3)]),
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
    if (username == null)
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
          account['borrowed'],
          '',
          account['birth'],
          account['address'],
          account['date_created'],
          account['date_expire']
        )
      }, error => {
        console.error('getAccountInfo: ' + error)
      })
  }

  updateAccountInfo() {
    this.accService.postAccountInfo(this.cookieService.get('token'), this.edtUser)
      .subscribe(res => { console.log(res) },
        err => { console.log(err) })
  }

  getAccountInfoWithId(username: string) {
    this.manService.getUserWithId(this.cookieService.get('token'), username)
      .subscribe(res => {
        let user = res.body['user']
        this.edtUser = new User(
          user['_id'],
          '',
          user['email'] || '',
          user['borrowed'] || null,
          user['role'] || null,
          user['birth'] || null,
          user['address'] || '',
          user['date_created'] || null,
          user['date_expire'] || null
          )
          this.roles.forEach(role => {
            if (role.name.toLowerCase() == user['role']){
              this.currentRole = role.id
              this.newRole = role.id
            }
          })
          this.isAdmin = true
      }, error => {
        console.error(error)
      })
  }

  onSubmit() {
    if(this.isAdmin)
      this.roles.forEach(role => {
        if (this.newRole == role.id)
          this.edtUser.role = role.name.toLowerCase()
      })

    this.accService.postAccountInfo(this.cookieService.get('token'), this.edtUser)
        .subscribe(res => {
          let username = this.route.snapshot.paramMap.get('username')
          this.router.navigate(['/Admin/AccountManagement'], {relativeTo: this.route})
        }, error => {
          console.error(error)
        })
  }
}
