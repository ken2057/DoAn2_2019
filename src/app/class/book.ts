export class Book {
  public isbn: string;
  public name: string;
  public price: number;
  public author: string;

  constructor(isbn?: string, name?: string, price?: number, author?: string){
    this.isbn = isbn || '';
    this.name = name || '';
    this.price = price || 0;
    this.author = author || '';
  }
}
