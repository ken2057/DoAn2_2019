import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Borrowed } from 'src/app/class/borrowed';
import { ManangerService } from 'src/app/api/mananger.service';
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'app-all-borrowed',
  templateUrl: './all-borrowed.component.html',
  styleUrls: ['./all-borrowed.component.css']
})
export class AllBorrowedComponent implements OnInit {
  allBorrowed = new Array<Borrowed>()

  constructor(
    private manService: ManangerService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getAllBorrowed()
  }

  getAllBorrowed(page?: number) {
    // get all the borrowed history
    this.manService.getAllBorrowed(this.cookieService.get('token'), page)
        .subscribe(res => {
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
