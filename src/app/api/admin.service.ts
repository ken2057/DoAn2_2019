import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends ApiService {

  public getUsersInfo(token: string, username: string) {
    return this.http.get(this.REST_API_SERVER + '/Admin/GetUsers',
            {
              headers: new HttpHeaders({
                'Authorization': token
              }),
              params: { 'username': username },
              observe: 'response'
            })
  }

  public postSetRole(token: string, accountId: string, role: string) {
    return this.http.post(this.REST_API_SERVER + '/Admin/SetRole',
            {
              json: {
                'token': token,
                'accountId': accountId,
                'role': role,
              },
              observable: 'response'
            })
  }
}
