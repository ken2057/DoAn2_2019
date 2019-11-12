import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/api/auth.service';
import { AdminService } from 'src/app/api/admin.service';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  public accounts = new Array<User>();
  role = 9;

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getRole()
    this.getAllAccount()
  }

  searchAccount() {
    // find account info
  }

  getAllAccount() {
    this.adminService.getUsersInfo(this.cookieService.get('token'))
        .subscribe(res => {
          let accounts = res.body['users']
          accounts.forEach(account => {
            this.accounts.push(new User(
              account['_id'],
              '',
              account['email'],
              account['borrowed'],
              account['role'],
              account['birth'],
              account['address'],
              account['date_created'],
              account['date_expire']
            ))
          })
        })
  }

  getRole() {
    this.authService.getPermission(this.cookieService.get('token'))
          .subscribe(Response => {
            this.role = Number(Response.body['role'])
          }, error => {
            console.error(error)
          })
  }
}


