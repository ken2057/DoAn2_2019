import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService extends ApiService {

  public getSubjects() {
    return this.http.get(this.REST_API_SERVER + '/Subjects', {observe: 'response'})
  }

  public postSubject(token: string, subjectName: string, action: string, oldSubject: string) {
    return this.http.post(this.REST_API_SERVER + '/Subjects',
              {
                json: {
                  'token': token,
                  'subjectName': subjectName,
                  'action': action,
                  'oldSubject': oldSubject
                },
                observe: 'response'
              })
  }
}
