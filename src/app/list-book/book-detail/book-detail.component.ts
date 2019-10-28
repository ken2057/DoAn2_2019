import { Book } from './../../class/book';
import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { CookieService } from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  bookDetail: Book;
  isAvaiable = false;
  dataAvaialbe = false;
  btnBorrowText = 'Borrow'

  constructor(
    public cookieService: CookieService,
    public apiService: ApiService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  @Input() bookId: number;

  ngOnInit() {
    this.bookId = Number(this.route.snapshot.paramMap.get('bookId'))
    console.log(this.bookId)
    this.getBookInfo()
  }

  getBookInfo() {
    this.bookDetail = new Book()
    if (this.bookId != null) {
      this.apiService.getBook(this.bookId.toString())
          .subscribe(response => {
            let json = response.body
            this.bookDetail = new Book(
              json['_id'],
              json['name'],
              json['author'],
              json['subjects'],
              json['books'],
              '' // image
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
    this.apiService.getIsBorrowedByUser(this.cookieService.get('token'), this.bookId.toString())
        .subscribe(response => {
          let json = response.body
          // is borrwed and not avaiable => borrowed
          // is borrowed and avaiable => borrowed
          // not borrow and not avaiable => Out of order
          // not borrow and avaiable => Borrow
          this.btnBorrowText = json['borrowed'] ? 'Borrowed' : this.isAvaiable ? 'Borrow' : 'Out of order'
          this.isAvaiable = json['borrowed'] ? false : this.isAvaiable

          // after get data from API then show it
          this.dataAvaialbe = true
        })
  }

  public btnBorrowClick() {
    let token = this.cookieService.get('token')
    let isExpire = false;

    this.apiService.getCheckToken(token)
          .subscribe(response => console.log('token fine')
            ,response => {
              if(response.status == 400) 
                console.log('token expires')
                isExpire = true
            })
    
    if (isExpire) {
      // event here
    } else {
      this.apiService.postBorrowBook(token, this.bookId.toString())
          .subscribe(response => {
            console.log('done borrow')
            this.btnBorrowText = 'Borrowed'
            this.isAvaiable = false
          }, error => {
            console.log('error borrow: ' + error.toString())
          })
    }
  }

  public btnReturnClick() {
    this.callPostReturn('return')
  }

  public btnLostClick() {
    this.callPostReturn('lost')
  }

  callPostReturn(status: string) {
    this.apiService.postReturnBook(
            this.cookieService.get('token'), 
            this.bookId+'', 
            status
          ).subscribe(response => {
            this.getBookInfo()
          }, error => {
            console.log('error returnBook: ' + error.toString())
          })
  }

  public onBack() {
    this.router.navigate(['/Search']);
  }
}
