import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService extends ApiService {

  public getSubjects() {
    return this.http.get(this.REST_API_SERVER + '/Subjects', {observe: 'response'})
  }
}
