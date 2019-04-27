import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class ApiService{
	/* Variables */
	
	/* Constructor */
	constructor (private http: HttpClient){}

	/* Methods*/
	requestAllStores(){
		return this.http.get('http://private-anon-d77ff3624d-gocco.apiary-mock.com/stores');
	}
	requestAllCountries(storeId:number){
		return this.http.get('https://private-anon-d77ff3624d-gocco.apiary-mock.com/stores/' + storeId + '/shops/countries');
	}
	requestHomeCategories(storeId:number){
		return this.http.get('https://private-anon-d77ff3624d-gocco.apiary-mock.com/stores/' + storeId + '/home');
	}
	
}