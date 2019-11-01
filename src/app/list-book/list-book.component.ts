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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.getSearchBook()
  }

  getSearchBook(subject?: string, author?: string, name?: string, page?: string) {
    this.books = new Array<Book>();
    this.bookService.getSearchBooks(subject, author, name, page)
          .subscribe(res => {
            let result = res.body['books']
            result.forEach(book => {
              this.books.push(new Book(
                book['_id'],
                book['name'],
                book['subjects'],
                book['books'],
                book['image']
              ))
            });
          }, error => {
            console.error(error)
          })
  }
}
