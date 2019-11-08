import { Injectable } from '@angular/core';
import { User } from '../class/user';
import * as sha1 from 'sha1/sha1';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends ApiService {
  
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
              json: {
                'token': token
              },
              observe: 'response'
            })
  }

  public getAccountInfo(token: string) {
    return this.http.get(this.REST_API_SERVER + '/User/Info',
            {
              headers: new HttpHeaders({
                'Authorization': token
              }),
              observe: 'response'
            })
  }

  public postAccountInfo(token: string, user: User) {
    return this.http.post(this.REST_API_SERVER + '/User/Info',
            {
              json: {
                'token': token,
                'user': new User(
                  user.username,
                  user.password == '' ? '' : sha1(user.password),
                  user.email, 
                  null,
                  user.role
                )
              }, observe: 'response'
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
}
