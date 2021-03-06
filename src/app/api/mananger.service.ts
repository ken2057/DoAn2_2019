import { Injectable } from '@angular/core';
import { Book } from '../class/book';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManangerService extends ApiService {
  
  // ---------------------------------------------------------------------------
  //  API mananger
  // ---------------------------------------------------------------------------

  public getAllBorrowed(token: string, page?: number) {
    return this.http.get(this.REST_API_SERVER + '/Manager/GetBorrowed',
                {
                  headers: new HttpHeaders({
                    'Authorization': token
                  }),
                  params: {
                    'page': ''+page || '0'
                  },
                  observe: 'response'
                })
  }

  public postDelteBook(token: string, bookId: string) {
    return this.http.post(this.REST_API_SERVER + '/Manager/DeleteBook',
                {
                  json: {
                    'token': token,
                    'bookId': bookId
                  },
                  observe: 'response'
                })
  }

  public postEditBook(token: string, book: Book) {
    return this.http.post(this.REST_API_SERVER + '/Manager/EditBook',
                {
                  json: {
                    'token': token,
                    'book': book
                  },
                  observe: 'response'
                })
  }

  public getUserWithId(token: string, username: string) {
    return this.http.get(this.REST_API_SERVER + '/Manager/GetUser', 
              {
                headers: new HttpHeaders({
                  'Authorization': token
                }),
                params: {
                  'username': username
                },
                observe: 'response'
              })
  }

  public postActiveAccount(token: string, username: string, action: string) {
    return this.http.post(this.REST_API_SERVER + '/Manager/ActiveAccount',
              {
                json: {
                  'token': token,
                  'username': username,
                  'action': action
                },
                observe: 'response'
              })
  }

  public postAddBook(token: string, book: Book) {
    return this.http.post(this.REST_API_SERVER + '/Manager/AddBook',
              {
                json: {
                  'token': token,
                  'book': book
                },
                observe: 'response'
              })
  }

  public getConfigs(token: string) {
    return this.http.get(this.REST_API_SERVER + '/Manager/Config',
              {
                headers: new HttpHeaders({
                  'Authorization': token
                }),
                observe: 'response'
              })
  }

  public postConfigs(token: string, configs) {
      return this.http.post(this.REST_API_SERVER + '/Manager/Config',
                {
                  json: {
                    'token': token,
                    'configs': configs
                  },
                  observe: 'response'
                })
    }
}
