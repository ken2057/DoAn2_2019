import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  configUrl = 'assets/config.json';
  public REST_API_SERVER: string

  constructor(public http: HttpClient) { 
    this.http.get(this.configUrl)
            .subscribe(res => {
              this.REST_API_SERVER = res['API_SERVER']
            })
  }

}
