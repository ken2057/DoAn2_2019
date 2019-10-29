import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Book } from '../class/book';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
  public bookClicked = -1
  public books = new Array<Book>()

  // books = [{
  //   isbn: '0884210642',
  //   image: 'none',
  //   name: 'Quick dinner menus',
  //   author: 'Margaret Happel',
  //   subject: 'Dinners and dining',
  //   quantity: 2
  // },
  // {
  //   isbn: '0884210642',
  //   image: 'none',
  //   name: 'Quick dinner menus',
  //   author: 'Margaret Happel',
  //   subject: 'Dinners and dining',
  //   quantity: 2
  // }];

  constructor(
    // public apiService: ApiService,
    // public router: Router,
    // public route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.searchBook()
  }

  // searchBook(name?: string, subject?: string, author?: string, page?: number) {
  //   if (page < 1)
  //     return // show error

  //   this.apiService.getSearchBooks(subject, author, name, page+'')
  //       .subscribe(response => {
  //         let json = response.body
  //         json['books'].forEach(book => {
  //           this.books.push(new Book(
  //                       book['_id'],
  //                       book['name'],
  //                       book['author'],
  //                       book['subjects'],
  //                       book['books'],
  //                       book['image']
  //                     ))
  //         })
  //         console.log(this.books)
  //       }, error => {
  //         console.log('error searchBook: ' + error)
  //       })
  // }

  // public viewBook(bookId: number) {
  //   this.bookClicked = bookId
  //   console.log(this.bookClicked)
  // }
}
