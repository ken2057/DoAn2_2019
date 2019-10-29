import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';
import { map } from "rxjs/operators";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  role = 9

  constructor() { }

  convertSecondToDay(seconds){
    let date = new Date()
    return new Date(date.getTime() + (1000 * seconds))
  }
}
