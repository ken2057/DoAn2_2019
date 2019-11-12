import { Book } from './../../class/book';
import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/api/book.service';
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  bookDetail: Book;
  isAvaiable = false;
  dataAvaialbe = false;
  btnBorrowText = ''

  constructor(
    private cookieService: CookieService,
    private bookService: BookService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  @Input() bookId: number;

  ngOnInit() {
    this.bookId = Number(this.route.snapshot.paramMap.get('bookId'))
    this.getBookInfo()
  }

  getBookInfo() {
    this.bookDetail = new Book()
    if (this.bookId != null) {
      this.bookService.getBook(this.bookId.toString())
        .subscribe(response => {
          let json = response.body
          this.bookDetail = new Book(
            json['_id'],
            json['name'],
            json['author'],
            json['subjects'],
            json['books'],
            json['image'],
            false,
            json['year_released'],
            json['publisher'],
            json['price']
          )
          // set if still have book for borrow
          this.isAvaiable = this.bookDetail.books.filter(t => t == '').length == 0 ? false : true
          this.checkUserBorrowed()
        }, error => {
          console.log(error)
        })
    }
  }

  checkUserBorrowed() {
    if (this.cookieService.get('token') != "")
      this.bookService.getIsBorrowedByUser(this.cookieService.get('token'), this.bookId.toString())
        .subscribe(response => {
          let json = response.body
          // this.isAvaiable = json['borrowed'] ? false : this.isAvaiable
          // // is borrwed and not avaiable => borrowed
          // // is borrowed and avaiable => borrowed
          // // not borrow and not avaiable => Out of order
          // // not borrow and avaiable => Borrow
          // this.btnBorrowText = json['borrowed'] ? 'Borrowed' : this.isAvaiable ? 'Borrow' : 'Out of order'
          this.btnBorrowText = json['status']
          this.isAvaiable = json['status'] == 'Borrow'
          this.btnBorrowText = this.isAvaiable ? 'Borrow' : this.btnBorrowText
        }, error => {
          this.btnBorrowText = 'Borrow'
        })
    else
      this.btnBorrowText = this.isAvaiable ? 'Borrow' : 'Out of order'
    
    // after get data from API then show it
    this.dataAvaialbe = true
  }

  public btnBorrowClick() {
    let token = this.cookieService.get('token')

    if (token == "") {
      this.router.navigate(['/Login'], { relativeTo: this.route })
      return
    }

    this.authService.getCheckToken(token)
      .subscribe(response => {
        this.bookService.postBorrowBook(token, this.bookId.toString())
          .subscribe(response => {
            console.log('done borrow')
            this.btnBorrowText = 'Wait To Get'
            this.isAvaiable = false
          }, error => {
            console.error(error)
          })
      }
        , response => {
          if (response.status == 400 || response.status == 401)
            this.cookieService.deleteAll()
          this.router.navigate(['/Login'], { relativeTo: this.route })
        })
  }

  public btnReturnClick() {
    this.callPostReturn('return')
  }

  public btnLostClick() {
    this.callPostReturn('lost')
  }

  public btnCancelOrder() {
    this.callPostReturn('cancel')
  }

  callPostReturn(status: string) {
    this.bookService.postReturnBook(
      this.cookieService.get('token'),
      this.bookId + '',
      status
    ).subscribe(response => {
      this.getBookInfo()
    }, error => {
      console.error('error returnBook: ' + error.toString())
    })
  }

  public onBack() {
    this.router.navigate(['/Search']);
  }

}
