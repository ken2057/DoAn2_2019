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
          // get that status from server
          this.btnBorrowText = json['status']
          // if teh status is 'Borrow' set avaiable
          this.isAvaiable = json['status'] == 'Borrow'
          // change the text with the isAvaible
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
    // get token 
    let token = this.cookieService.get('token')
    // if token empty direct to login
    if (token == "") {
      this.router.navigate(['/Login'], { relativeTo: this.route })
      return
    }
    // check valid token
    this.authService.getCheckToken(token)
      .subscribe(response => {
        // if token valid => call the post method to start borrow the book
        this.bookService.postBorrowBook(token, this.bookId.toString())
          .subscribe(response => {
            // borrow successful 
            // change the btnTxt to 'Wait to Get'
            // for user come to the librarian to get the book
            this.btnBorrowText = 'Wait To Get'
            // make borrow button disable
            this.isAvaiable = false
          }, error => {
            console.error(error)
          })
      }
        , response => {
          // if token invalid, delete all the cookie and redirect to login
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
    // start post method set return/lost book
    this.bookService.postReturnBook(
      this.cookieService.get('token'),
      this.bookId + '',
      status
    ).subscribe(response => {
      // success => start reload the book info
      this.getBookInfo()
    }, error => {
      console.error(error)
    })
  }

  public onBack() {
    this.router.navigate(['/Search']);
  }

}
