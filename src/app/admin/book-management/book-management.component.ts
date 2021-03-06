import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Book } from 'src/app/class/book';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';
import { ManangerService } from 'src/app/api/mananger.service';
import { BookService } from 'src/app/api/book.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.css']
})
export class BookManagementComponent implements OnInit {
  total = 0;
  itemsPerPage: number
  dataLoaded = false
  hidden = true
  listHidden = {}

  public bookClicked = -1;
  public books = new Array<Book>();

  


  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private manService: ManangerService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService
  ) { }


  ngOnInit() {
    this.searchBook();
  }

  searchBook(name?: string, subject?: string, author?: string, page?: number) {
    if (page < 1) {
      // show error
      return
    }
    this.books = new Array<Book>()
    //Show loading screen
    this.spinner.show();

    this.bookService.getSearchBooks(subject, author, name, page + '')
      .subscribe(response => {
        // set all book add to books
        let books = response.body['books']
        this.total = Number(response.body['total'])
        books.forEach(book => {
          let b = new Book(
            book['_id'],
            book['name'],
            book['author'],
            book['subjects'],
            [book['books'].filter(t => t == '').length + ' Avaiable']
              .concat([book['books'].filter(t => t != '')]),
            book['image'],
            book['deleted']
          );
          this.books.push(b);
          if (b.books[1].length > 0)
            this.listHidden[b.isbn] = false;
        })
        this.books.sort(t => Number(t.isbn))
        this.dataLoaded = true
        //close loading screen
        this.spinner.hide();
      }, error => {
        console.error(error);
        this.dialogService.openModal('Error', error.error)
      });
  }

  public deleteBook(bookId: string) {
    //Show load screen
    this.spinner.show();
    // delete book
    this.manService.postDelteBook(this.cookieService.get('token'), bookId)
        .subscribe(response => {
          // remove deleted book from books
          let bookRemove = new Book()
          this.books.forEach(t => {
            bookRemove = t.isbn == bookId ? t : bookRemove
          })
          // this.books = this.books.filter(t => t != bookRemove)
          this.books.splice(this.books.indexOf(bookRemove), 1)
          //close loading screen
          this.spinner.hide()

        }, error => {
          console.error(error)
          this.dialogService.openModal('Error', error.error)
          this.spinner.hide();
        })
  }

  click_btnPopup(isbn: string) {
    this.listHidden[isbn] = !this.listHidden[isbn]
  }
}
