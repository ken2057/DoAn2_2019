import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/api.service';
import { UtilsService } from 'src/app/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  dataLoaded = false
  public accounts = new Array<User>();

  constructor(
    private cookieService: CookieService,
    private apiService: ApiService,
    private utilService: UtilsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.apiService.getPermission(this.cookieService.get('token'))
            .subscribe(res => {
              let role = Number(res.body['role'])
              if(role != 0 && role != 1 ) {
                this.router.navigate([''], {relativeTo: this.route})
              } else {
                //have permission
                // do sth
                this.searchAccount();
                this.dataLoaded = true
              }
            },
            err => console.error(err))
  }

  searchAccount() {
    // find account info
  }
}
