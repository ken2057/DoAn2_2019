import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private REST_API_SERVER = "http://localhost:5000";

  constructor(private http: HttpClient) { 
    
  }

  configUrl = 'assets/config.json';


  public sendGetRequest(){
    return this.http.get(this.REST_API_SERVER+'/GetBooks/');
  }
}
