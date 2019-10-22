import { ChildBook } from './child-book';

export class Book {


  constructor(
    public isbn: string,
    public name: string,
    public author: string,
    public books: Array<ChildBook>
  ) {}
}
