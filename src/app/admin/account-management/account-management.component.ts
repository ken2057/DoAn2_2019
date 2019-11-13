import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/api/auth.service';
import { AdminService } from 'src/app/api/admin.service';
import { ManangerService } from 'src/app/api/mananger.service';

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
    private manService: ManangerService,
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
    // get all the user info
    this.adminService.getUsersInfo(this.cookieService.get('token'))
        .subscribe(res => {
          // get list user from respone
          let accounts = res.body['users']
          this.accounts = new Array<User>()
          // add to accounts
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
              account['date_expire'],
              account['active'] == undefined ? true : account['active'],
              account['account_point']
            ))
          })
        })
  }

  getRole() {
    // get role of the current user access to this component
    this.authService.getPermission(this.cookieService.get('token'))
          .subscribe(Response => {
            // get the role position to disable some function in html
            this.role = Number(Response.body['role'])
            console.log(this.role)
          }, error => {
            console.error(error)
          })
  }

  public btnActiveAccount(username: string) {
    // active/deactive account so they can't borrow the book
    this.manService.postActiveAccount(this.cookieService.get('token'), username)
        .subscribe(response => {
          // successful => reload the data
          this.getAllAccount()
        }, error => {
          console.error(error)
        })
  }
}


