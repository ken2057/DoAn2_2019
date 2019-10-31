import { Injectable } from '@angular/core';

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
