import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  // ---------------------------------------------------------------------------
  //  API Auth
  // ---------------------------------------------------------------------------

  public getPermission(token: string) {
    return this.http.get(this.REST_API_SERVER + '/Permission',
            {
              headers: new HttpHeaders({
                'Authorization': token
              }),
              observe: 'response'
            })
  }

  public getCheckToken(token: string) {
    return this.http.get(this.REST_API_SERVER + '/CheckToken',
            {
              headers: new HttpHeaders({
                'Authorization': token
              }),
              observe: 'response'
            })
  }

}
