import { Component, OnInit , AfterViewInit } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit {
  /* Variables */
  private storeId:number = 1;
  private homeCategories;
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
  			this.homeCategories = data.categories;
  			console.log(this.homeCategories);
  	});
  }

}
