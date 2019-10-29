import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/api.service';
import { UtilsService } from 'src/app/utils.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {

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

    if (role != 0 && role != 1)
      this.router.navigate([''], {relativeTo: this.route})
  }
}
