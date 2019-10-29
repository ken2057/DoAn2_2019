import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/api.service';
import { Book } from 'src/app/class/book';
import { Router, ActivatedRoute } from '@angular/router';

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
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.apiService.getPermission(this.cookieService.get('token'))
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
                      book['image'],
                      book['deleted']
                    ));
        });
        console.log(this.books);
      }, error => {
        console.error('error searchBook: ' + error);
      });
  }

  public viewBook(bookId: number) {
    this.bookClicked = bookId;
    console.log(this.bookClicked);
  }

  public deleteBook(bookId: string) {
    this.apiService.postDelteBook(this.cookieService.get('token'), bookId)
        .subscribe(response => {
          let bookRemove = new Book()
          this.books.forEach(t => {
            bookRemove = t.isbn == bookId ? t : bookRemove
          })
          this.books = this.books.filter(t => t != bookRemove)
          
        }, error => {
          console.error('error deleteBook: '+error)
        })
  }
}
