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
  public bookClicked = -1;
  public books = new Array<Book>();
  dataLoaded = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.searchBook();
    this.dataLoaded = true;

  }

  searchBook(name?: string, subject?: string, author?: string, page?: number) {
    if (page < 1) {
      // show error
      return
    }
    this.books = new Array<Book>()
    this.bookService.getSearchBooks(subject, author, name, page + '')
      .subscribe(response => {
        let json = response.body
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
      }, error => {
        console.error('error searchBook: ' + error);
      });
  }

}
