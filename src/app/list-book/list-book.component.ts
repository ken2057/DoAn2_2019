import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
  bookClicked = 1;

  books = [{
    isbn: '0884210642',
    image: 'none',
    name: 'Quick dinner menus',
    author: 'Margaret Happel',
    subject: 'Dinners and dining',
    quantity: 2
  },
  {
    isbn: '0884210642',
    image: 'none',
    name: 'Quick dinner menus',
    author: 'Margaret Happel',
    subject: 'Dinners and dining',
    quantity: 2
  }];

  constructor() {
  }

  ngOnInit() {
  }
}
