import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './class/user';
import * as sha1 from 'sha1/sha1';
import { Book } from './class/book';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private REST_API_SERVER = "http://127.0.0.1:5000";
  private REST_API_SERVER = "https://library-project-2-api.herokuapp.com";

  constructor(private http: HttpClient) { 
  }

  configUrl = 'assets/config.json';

  // ---------------------------------------------------------------------------
  //  API Admin
  // ---------------------------------------------------------------------------

  public getUsersInfo(token: string) {
    return this.http.get(this.REST_API_SERVER + '/Admin/GetUsers',
            {
              params: {
                'token': token
              },
              observe: 'response'
            })
  }

  public postSetRole(token: string, accountId: string, role: string) {
    return this.http.post(this.REST_API_SERVER + '/Admin/SetRole',
            {
              json: {
                'token': token,
                'accountId': accountId,
                'role': role,
              },
              observable: 'response'
            })
  }

  // ---------------------------------------------------------------------------
  //  API Account
  // ---------------------------------------------------------------------------

  public getLogin(user: User) {
    return this.http.get(this.REST_API_SERVER + '/Login',
            {
              params: {
                'username': user.username,
                'password': sha1(user.password)
              },
              observe: 'response'
            })
  }

  public postSignUp(user: User) {
    user.password = sha1(user.password)
    return this.http.post(this.REST_API_SERVER + '/SignUp',
            {
              user,
              observe: 'response'
            })
  }

  public getUserBorrowed(token: string) {
    return this.http.post(this.REST_API_SERVER + '/SignUp',
            {
              params: {
                'token': token
              }, observe: 'response'
            })
  }

  public getAccountInfo(token: string) {
    return this.http.get(this.REST_API_SERVER + '/User/Info',
            {
              params: {
                'token': token
              }, observe: 'response'
            })
  }

  public postAccountInfo(token: string, user: User) {
    return this.http.post(this.REST_API_SERVER + '/User/Info',
            {
              json: {
                'token': token,
                'user': user
              }, observe: 'response'
            })
  }

  // ---------------------------------------------------------------------------
  //  API Auth
  // ---------------------------------------------------------------------------

  public getPermission(token: string) {
    return this.http.get(this.REST_API_SERVER + '/Permission',
            {
              params: {
                'token': token
              },
              observe: 'response'
            })
  }

  public getCheckToken(token: string) {
    return this.http.get(this.REST_API_SERVER + '/CheckToken',
            {
              params: {
                'token': token
              },
              observe: 'response'
            })
  }

  public postLogout(token: string) {
    return this.http.post(this.REST_API_SERVER + '/Logout',
            {
              json: {
                'token': token
              },
              observe: 'response'
            })
  }

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

  // ---------------------------------------------------------------------------
  //  API mananger
  // ---------------------------------------------------------------------------

  public getAllBorrowed(token: string, page?: number) {
    return this.http.get(this.REST_API_SERVER + '/Manager/GetBorrowed',
                {
                  params: {
                    'token': token,
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
}
