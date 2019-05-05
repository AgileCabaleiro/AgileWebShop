import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class ApiService{
	/* Variables */
	
	/* Constructor */
	constructor (private http: HttpClient){}

	/* Methods */
	requestAllStores(){
		return this.http.get('http://private-anon-d77ff3624d-gocco.apiary-mock.com/stores');
	}
	requestAllCountries(storeId:number){
		return this.http.get('https://private-anon-d77ff3624d-gocco.apiary-mock.com/stores/' + storeId + '/shops/countries');
	}
	/* Methods - Categories */ 
	requestHomeCategories(storeId:number){
		return this.http.get('https://private-anon-d77ff3624d-gocco.apiary-mock.com/stores/' + storeId + '/home');
	}
	requestCategoriesSortBy(storeId:number, categoryId){
		return this.http.get('https://private-anon-a95bd54e9f-gocco.apiary-mock.com/stores/' + storeId + '/categories/' + categoryId + '}/sortby');
	}
	/* Methods - Products */
	requestProducts(storeId:number, filters){
		const url = 'http://private-anon-d77ff3624d-gocco.apiary-mock.com/stores/' + storeId + '/products/search?filters=&with_text=&category_id=' + filters.categoryId + '&order=' + filters.order + '&dir=' + filters.dir + '&page=' + filters.page + '&limit=' + filters.limit;
		console.log(url);
		return this.http.get(url);
	}
	requestProductByModelId(storeId:number, modelId){
		const url = 'https://private-anon-a95bd54e9f-gocco.apiary-mock.com/stores/' + storeId + '/products?scan_code=' + modelId;
		console.log(url);
		return this.http.get(url);
	}
	/* Methods - HTML */
	requestFAQ(storeId:number){
		const url = 'https://private-anon-d53ae91229-gocco.apiary-mock.com/stores/' + storeId + '/faq';
		console.log(url);
		return this.http.get(url);
	}
	requestPrivacy(storeId:number){
		const url = 'https://private-anon-d53ae91229-gocco.apiary-mock.com/stores/' + storeId + '/privacy';
		console.log(url);
		return this.http.get(url);
	}
	requestShoppingGuide(storeId:number){
		const url = 'https://private-anon-d53ae91229-gocco.apiary-mock.com/stores/' + storeId + '/shopping_guide';
		console.log(url);
		return this.http.get(url);
	}
	requestShippingCosts(storeId:number){
		const url = 'https://private-anon-d53ae91229-gocco.apiary-mock.com/stores/' + storeId + '/shipping_costs';
		console.log(url);
		return this.http.get(url);
	}	
	requestContacts(storeId:number){
		const url = 'https://private-anon-d53ae91229-gocco.apiary-mock.com/stores/' + storeId + '/contacts';
		console.log(url);
		return this.http.get(url);
	}	
}