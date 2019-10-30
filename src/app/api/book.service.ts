import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BookService extends ApiService {
  
  // ---------------------------------------------------------------------------
  //  API Book
  // ---------------------------------------------------------------------------
  public getBook(bookId: string) {
    return this.http.get(this.REST_API_SERVER + '/GetBook',
                {
                  params: { 'bookId': bookId },
                  observe: 'response'
                })
  }
  
  public getSearchBooks(subject?: string, author?: string, name?: string, page?: string) {
    return this.http.get(this.REST_API_SERVER + '/GetSearchBook',
                {
                  params: { 
                    'page': page || '0',
                    'subject': subject || '',
                    'author': author || '',
                    'name': name || ''
                  },
                  observe: 'response'
                })
  }

  public getBookAvaiable(bookId: string) {
    return this.http.get(this.REST_API_SERVER + '/BorrowBook',
                {
                  params: { 'bookId': bookId },
                  observe: 'response'
                })
  }

  public postBorrowBook(token: string, bookId: string) {
    return this.http.post(this.REST_API_SERVER + '/BorrowBook',
                {
                  json: {
                    'token': token,
                    'bookId': bookId
                  },
                  observe: 'response'
                })
  }

  public getIsBorrowedByUser(token: string, bookId: string) {
    return this.http.get(this.REST_API_SERVER + '/IsBorrowedById',
                {
                  params: {
                    'token': token,
                    'bookId': bookId
                  },
                  observe: 'response'
                })
  }

  public postReturnBook(token: string, bookId: string, status: string) {
    return this.http.post(this.REST_API_SERVER + '/ReturnBook',
                {
                  json: {
                    'token': token,
                    'bookId': bookId,
                    'status': status
                  },
                  observe: 'response'
                })
  }
}
