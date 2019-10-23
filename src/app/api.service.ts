import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './class/user';
import * as sha1 from 'sha1/sha1';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private REST_API_SERVER = "http://127.0.0.1:5000";
  // private REST_API_SERVER = "https://library-project-2-api.herokuapp.com";

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

  // ---------------------------------------------------------------------------
  //  API Auth
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
    return this.http.post(this.REST_API_SERVER + '/SignUp',
            {
              user,
              observe: 'response'
            })
  }

  public getPermission(token: string) {
    return this.http.get(this.REST_API_SERVER + '/Permission',
            {
              params: {
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

  // ---------------------------------------------------------------------------
  //  API 
  // ---------------------------------------------------------------------------
}
