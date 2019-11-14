import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { Borrowed } from '../class/borrowed';

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

	public postBorrowedInfo(token: string, borrowed: Borrowed){
		return this.http.post(this.REST_API_SERVER + '/Borrowed', 
				{
					json: {
						'borrowed': borrowed,
						'token': token
					},
					observe: 'response'
				})
	}

	public getSearchBorrowed(token: string, username?: string, page?: number){
		return this.http.get(this.REST_API_SERVER + '/SearchBorrowed', 
				{
					headers: new HttpHeaders({
						'Authorization': token
					}),
					params: {
						'username': username || '',
						'page': page+'' || ''
					},
					observe: 'response'
				})
	}

	public postUpdateBorrowed(token: string, borrowedId: string, status: string) {
		return this.http.post(this.REST_API_SERVER + '/UpdateBorrowed',
					{
					  json: {
						'token': token,
						'borrowedId': borrowedId,
						'status': status
					  },
					  observe: 'response'
					})
	  }

	  public postAddPay(token: string, borrowedId: string, pay: number) {
		return this.http.post(this.REST_API_SERVER + '/PayFee',
					{
					  json: {
						'token': token,
						'borrowedId': borrowedId,
						'pay': pay+''
					  },
					  observe: 'response'
					})
	  }
}
