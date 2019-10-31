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
  dataLoaded = false
  allBorrowed = new Array<Borrowed>()

  constructor(
    private manService: ManangerService,
    private authSerivce: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.authSerivce.getPermission(this.cookieService.get('token'))
            .subscribe(res => { 
              let role = Number(res.body['role'])
              if(role != 0 && role != 1 ) {
                this.router.navigate([''], {relativeTo: this.route})
              } else {
                // do sth 
                this.getAllBorrowed()
                this.dataLoaded = true
              }
            }, 
            err => console.error(err))
  }

  getAllBorrowed(page?: number) {
    this.manService.getAllBorrowed(this.cookieService.get('token'), page)
        .subscribe(res => {
          let allBorrowed = res.body['borrowed']
          allBorrowed.forEach(t => {
            this.allBorrowed.push(new Borrowed(
              t['username'],
              t['bookId'],
              t['status'],
              t['date_borrow'],
              t['date_expire']
            ))
          });
        }, error => {
          console.error('GetAllBorrwed: '+error)
        })
  }
}
