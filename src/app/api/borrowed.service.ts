import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class BorrowedService extends ApiService {

	public getBorrowed(token: string, borrowedId: string) {
		return this.http.get(this.REST_API_SERVER + '/Borrowed', 
										{
											headers: new HttpHeaders({
												'Authorization': token
											}),
											params: {
												'borrowedId': borrowedId
											},
											observe: 'response'
										})
	}
}
