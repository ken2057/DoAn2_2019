import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/api/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BorrowedService } from 'src/app/api/borrowed.service';
import { CookieService } from 'ngx-cookie-service';
import { Borrowed } from 'src/app/class/borrowed';

@Component({
  selector: 'app-borrowed',
  templateUrl: './borrowed.component.html',
  styleUrls: ['./borrowed.component.css']
})
export class BorrowedComponent implements OnInit {
  borrowedId: string
  borrowedInfo: Borrowed

  constructor(
    private authSerivce: AuthService,
    private borrowedService: BorrowedService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.borrowedId = this.route.snapshot.paramMap.get('borrowedId')
    this.getBorrowedInfo()
  }

  getBorrowedInfo() {
    // get detail of the borrowed
    this.borrowedService.getBorrowed(this.cookieService.get('token'), this.borrowedId)
        .subscribe(Response => {
          // set the value from respone
          let result = Response.body['borrowed']
          this.borrowedInfo = new Borrowed(
            result['_id'],
            result['username'],
            result['bookId'],
            result['status'],
            result['date_borrow'],
            result['date_expire'],
            result['date_return'] || '',
            result['history_status'],
            result['fee'],
            result['paid']
          )
          console.log(this.borrowedInfo)
        }, error => {
          console.error(error)
        })
  }

  onCancel(){

  }
  btnSave(){

  }
}
