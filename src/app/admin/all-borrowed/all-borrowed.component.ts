import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Borrowed } from 'src/app/class/borrowed';
import { ManangerService } from 'src/app/api/mananger.service';
import { AuthService } from 'src/app/api/auth.service';
import { BorrowedService } from 'src/app/api/borrowed.service';

@Component({
  selector: 'app-all-borrowed',
  templateUrl: './all-borrowed.component.html',
  styleUrls: ['./all-borrowed.component.css']
})
export class AllBorrowedComponent implements OnInit {
  txtSearch = ''
  username: string
  allBorrowed = new Array<Borrowed>()

  constructor(
    private manService: ManangerService,
    private borrowedService: BorrowedService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username')
    if (this.username != null)
      this.txtSearch = this.username

    this.getAllBorrowed(this.username)
  }

  getAllBorrowed(username?: string, page?: number) {
    // get all the borrowed history
    this.borrowedService.getSearchBorrowed(this.cookieService.get('token'), username, page)
        .subscribe(res => {
          this.allBorrowed = new Array<Borrowed>()
          let allBorrowed = res.body['borrowed']
          allBorrowed.forEach(t => {
            this.allBorrowed.push(new Borrowed(
              t['_id'],
              t['username'],
              t['bookId'],
              t['status'],
              t['date_borrow'],
              t['date_expire'],
              t['date_return'],
              t['history_status'],
              t['fee'],
              t['paid'],
            ))
          })
        }, error => {
          console.error('GetAllBorrwed: '+error)
        })
  }
}
