import { ChildBook } from './child-book';

export class Book {
  public isbn: string;
  public name: string;
  public author: string;
  public books: Array<ChildBook>;

  constructor(isbn?: string, name?: string, author?: string, books?: Array<ChildBook>){
    this.isbn = isbn || '';
    this.name = name || '';
    this.author = author || '';
    this.books = books || new Array<ChildBook>();
  }
}
