import { Component, OnInit , AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit {
  /* Variables */
  private storeId:number = 1;
  private homeCategories = [];
  private products;
  /* Constructor */
  constructor(public apiService:ApiService) {

  }
  /* Live */
  ngOnInit() {
  	// this.getCountries();
  	this.getStores();
  	this.getHomeCategories();
  }

  ngAfterViewInit(){

  }

  public getStores = async () => {
  	this.apiService.requestAllStores().subscribe((data: {}) => {
  			console.log(data);
  	});
  }
  public getCountries = async () => {
  	this.apiService.requestAllCountries(this.storeId).subscribe((data: {}) => {
  			console.log(data);
  	});
  }
  public getHomeCategories = async () => {
  	this.apiService.requestHomeCategories(this.storeId).subscribe((data: {}) => {
  			this.homeCategories = data[Object.keys(data)[0]]; // avoid stupid object, convert into usefull array
  			console.log(this.homeCategories);
  	});
  }

}
