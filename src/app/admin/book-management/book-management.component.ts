import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/class/book';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.css']
})
export class BookManagementComponent implements OnInit {
  public bookClicked = -1;
  public books = new Array<Book>();

  constructor(
    public apiService: ApiService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.searchBook();
  }
  searchBook(name?: string, subject?: string, author?: string, page?: number) {
    if (page < 1) {
      return
    } // show error

    this.apiService.getSearchBooks(subject, author, name, page + '')
      .subscribe(response => {
        let json = response.body
        json['books'].forEach(book => {
          this.books.push(new Book(
                      book['_id'],
                      book['name'],
                      book['author'],
                      book['subjects'],
                      book['books'],
                      book['image']
                    ));
        });
        console.log(this.books);
      }, error => {
        console.log('error searchBook: ' + error);
      });
  }

  public viewBook(bookId: number) {
    this.bookClicked = bookId;
    console.log(this.bookClicked);
  }
}
