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

  constructor(private http: HttpClient) { }

  configUrl = 'assets/config.json';

  public sendGetRequest(){
    return this.http.get(this.REST_API_SERVER+'/GetBooks/');
  }

  public postLogin(user: User) {
    return this.http.post(this.REST_API_SERVER+'/Login/', user)
  }
}
