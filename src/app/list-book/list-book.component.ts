import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { Book } from '../class/book';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../api/book.service';


@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
  public bookClicked = -1
  public books = new Array<Book>()
  total = 0
  dataLoaded = false
  txtSearch: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.searchBook();
    this.txtSearch = ''
    this.dataLoaded = true;
  }

  searchBook(name?: string, subject?: string, author?: string, page?: number) {
    // show some error
    if (page < 1) { return }

    this.spinner.show();

    this.books = new Array<Book>()
    this.bookService.getSearchBooks(subject, author, name, page + '')
      .subscribe(response => {
        // get lists book from return
        this.books = new Array<Book>()
        let json = response.body
        // add all the book into books varible
        json['books'].forEach(book => {
          this.books.push(new Book(
            book['_id'],
            book['name'],
            book['author'],
            book['subjects'],
            book['books'],
            book['image'],
            book['deleted']
          ));
        });
        this.total = json['total']
        this.spinner.hide();
      }, error => {
        console.error('error searchBook: ' + error);
        this.spinner.hide();
      });
  }

  public btnFindBookName() {
    this.searchBook(this.txtSearch)
  }

  public btnFindAuthorName() {
    this.searchBook(null, null, this.txtSearch)
  }

  public btnFindSubject() {
    this.searchBook(null, this.txtSearch)
  }
}
