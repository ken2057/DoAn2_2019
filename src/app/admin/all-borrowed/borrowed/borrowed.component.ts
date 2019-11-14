import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/api/auth.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BorrowedService } from 'src/app/api/borrowed.service';
import { CookieService } from 'ngx-cookie-service';
import { Borrowed } from 'src/app/class/borrowed';
import { Location } from '@angular/common';
import { BookService } from 'src/app/api/book.service';

@Component({
  selector: 'app-borrowed',
  templateUrl: './borrowed.component.html',
  styleUrls: ['./borrowed.component.css']
})
export class BorrowedComponent implements OnInit {
  borrowedId: string
  borrowedInfo: Borrowed
  moneyPay: number
  dataLoaded = false
  isValidPay = false
  role = 9

  constructor(
    private authSerivce: AuthService,
    private borrowedService: BorrowedService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private location: Location
  ) {}

  ngOnInit() {
    this.moneyPay = 0

    this.borrowedId = this.route.snapshot.paramMap.get('borrowedId')

    this.getUserPermission()
    this.getBorrowedInfo()
  }

  // get user perrmission to enable/disable button
  getUserPermission() {
    this.authSerivce.getPermission(this.cookieService.get('token'))
      .subscribe(res => {
        this.role = res.body['role']
      }, error => {
        console.error(error)
      })
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
          result['fee'] || 0,
          result['paid'] || 0
        )
        this.dataLoaded = true
      }, error => {
        console.error(error)
      })
  }

  public onBack() {
    this.location.back()
  }

  public btnAddPay() {
    this.borrowedService.postAddPay(
      this.cookieService.get('token'), 
      this.borrowedInfo._id, 
      this.moneyPay
    ).subscribe(Response => {
      this.getBorrowedInfo()
      this.moneyPay = 0
      this.isValidPay = false
    }, error => {
      console.error(error)
    })
  }
  
  public onChangePay() {
    // disable btn add money when money not valid format
    this.isValidPay = this.moneyPay >= 1000 
             && this.moneyPay % 1000 == 0
             && this.moneyPay <= this.borrowedInfo.fee - this.borrowedInfo.paid
  }

  public btnSentBook() {
    this.callPostReturn('sent')
  }

  public btnReturnBook() {
    this.callPostReturn('return')
  }

  public btnLostBook() {
    this.callPostReturn('lost')
  }

  public btnCancelOrder() {
    this.callPostReturn('cancel')
  }

  public btnAddPayFee() {

  }

  callPostReturn(status: string) {
    // start post method set return/lost/cancel book
    this.borrowedService.postUpdateBorrowed(
      this.cookieService.get('token'),
      this.borrowedInfo._id,
      status
    ).subscribe(response => {
      // success => start reload the book info
      this.getBorrowedInfo()
    }, error => {
      console.error(error)
    })
  }
}
