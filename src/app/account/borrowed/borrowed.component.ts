import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/api.service';
import { UtilsService } from 'src/app/utils.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-borrowed',
  templateUrl: './borrowed.component.html',
  styleUrls: ['./borrowed.component.css']
})
export class BorrowedComponent implements OnInit {
  dataLoaded = false

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
          if(role == 3) {
            this.router.navigate(['/Login'], {relativeTo: this.route})
          } else {
            //have permission
            // do sth
            this.dataLoaded = true
          }
        }, 
        err => console.log(err))
  }
}
