import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/class/book';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';
import { ManangerService } from 'src/app/api/mananger.service';
import { BookService } from 'src/app/api/book.service';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.css']
})
export class BookManagementComponent implements OnInit {
  public bookClicked = -1;
  public books = new Array<Book>();
  dataLoaded = false;

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private manService: ManangerService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.authService.getPermission(this.cookieService.get('token'))
            .subscribe(res => { 
              let role = Number(res.body['role'])
              if(role != 0 && role != 1 ) {
                this.router.navigate([''], {relativeTo: this.route})              
              } else {
                //have permission
                this.searchBook();
                this.dataLoaded = true
              }
            }, 
            err => console.error(err))
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

  public deleteBook(bookId: string) {
    this.manService.postDelteBook(this.cookieService.get('token'), bookId)
        .subscribe(response => {
          let bookRemove = new Book()
          this.books.forEach(t => {
            bookRemove = t.isbn == bookId ? t : bookRemove
          })
          // this.books = this.books.filter(t => t != bookRemove)
          this.books.splice(this.books.indexOf(bookRemove), 1)
          
        }, error => {
          console.error('error deleteBook: '+error)
        })
  }
}
