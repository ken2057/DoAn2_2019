import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService extends ApiService {

  public getAuthors() {
    return this.http.get(this.REST_API_SERVER + '/Author',
            {
              observe: 'response'
            })
  }
}
