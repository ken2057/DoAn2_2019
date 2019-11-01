import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  configUrl = 'assets/config.json';
  public REST_API_SERVER: string
  

  constructor(public http: HttpClient) { 
    this.REST_API_SERVER = "https://library-project-2-api.herokuapp.com"
    // this.REST_API_SERVER = "http://127.0.0.1:5000"
  }

}
