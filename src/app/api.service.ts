import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { User } from './class/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private REST_API_SERVER = "http://localhost:5000";
  private REST_API_SERVER = "https://library-project-2-api.herokuapp.com";

  constructor(private http: HttpClient) { 
  }

  configUrl = 'assets/config.json';

  // ---------------------------------------------------------------------------
  //  API Admin
  // ---------------------------------------------------------------------------

  public sendGetUsersInfo(token: string) {
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

  public sendGetLogin(user: User) {
    return this.http.get(this.REST_API_SERVER + '/Login',
            {
              params: {
                'username': user.username,
                'password': user.password
              },
              observe: 'response'
            })
  }

  public sendGetSignUp(user: User) {
    return this.http.get(this.REST_API_SERVER + '/SignUp',
            {
              params: {
                'username': user.username,
                'password': user.password,
                'email': user.email
              },
              observe: 'response'
            })
  }

  public sendGetPermission(token: string) {
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
  public sendGetBook(bookId: string) {
    return this.http.get(this.REST_API_SERVER + '/GetBook',
                {
                  params: { 'bookId': bookId },
                  observe: 'response'
                })
  }
  
  public sendGetSearchBooks(subject?: string, author?: string, name?: string, page?: string) {
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
