import { Book } from './../../class/book';
import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { CookieService } from 'ngx-cookie-service';

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
    public apiService: ApiService
  ) { }

  @Input() bookId: number;

  ngOnInit() {
    this.bookDetail = new Book()
    if (this.bookId != null) {
      this.apiService.getBook(this.bookId.toString())
          .subscribe(response => {
            let json = response.body
            this.bookDetail = new Book(
              json['_id'],
              json['name'],
              json['author'],
              json['subject'],
              json['books'],
              '' // image
            )
            // set if still have book for borrow
            this.isAvaiable = this.bookDetail.books.filter(t => t == '').length == 0 ? false : true
            this.btnBorrowText = this.isAvaiable ? 'Borrow' : 'Out of order'
            this.checkUserBorrowed()
            this.btnBorrowText = this.isAvaiable ? 'Borrowed' : this.btnBorrowText
            // after get data from API then show it
            this.dataAvaialbe = true
          }, error => {
            console.log(error)
          })
    }
  }

  checkUserBorrowed() {
    this.apiService.getIsBorrowedByUser(this.cookieService.get('token'), this.bookId.toString())
        .subscribe(response => {
          let json = response.body
          this.isAvaiable = json['borrowed'] ? false : this.isAvaiable
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
            console.log('done')
          }, error => {
            console.log('error borrow')
          })
    }
  }
}
