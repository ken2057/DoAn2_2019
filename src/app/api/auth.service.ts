import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

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

}
