import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends ApiService {

  public getUsersInfo(token: string) {
    return this.http.get(this.REST_API_SERVER + '/Admin/GetUsers',
            {
              params: {
                'token': token
              },
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
