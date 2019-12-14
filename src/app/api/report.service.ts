import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends ApiService {

  public getRpExpireBorrowed(token: string, time: string) {
    let t = time.split('-')
    return this.http.get(this.REST_API_SERVER + '/Report/ExpireBorrowed', 
              {
                headers: new HttpHeaders({
                  'Authorization': token
                }),
                params: { 
                  'month': t[1],
                  'year': t[0]
                },
                observe: 'response'
              })
  }

  public getRpSubjectBorrowed(token: string, time: string) {
    let t = time.split('-')
    return this.http.get(this.REST_API_SERVER + '/Report/SubjectBorrowed', 
              {
                headers: new HttpHeaders({
                  'Authorization': token
                }),
                params: { 
                  'month': t[1],
                  'year': t[0]
                },
                observe: 'response'
              })
  }
}
