import { Component, OnInit , AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Globals } from '../globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit {
  /* Variables */
  private storeId:number = 1;
  private products;
  private images = ['assets/img/gallery/image1.jpeg', 'assets/img/gallery/image2.jpeg', 'assets/img/gallery/image3.jpeg', 'assets/img/gallery/image4.jpeg', 'assets/img/gallery/image5.jpeg']
  private urlFilters = {
    categoryId: '',
    order: 'name',
    dir: 'asc',
    page: 1,
    limit: 12
  };
  /* Constructor */
  constructor(public apiService:ApiService, public global:Globals) {
    this.getProductsbyCategory();
  }
  /* Live */
  ngOnInit() {
  	// this.getCountries();
  	// this.getHomeCategories();
  }

  ngAfterViewInit(){

  }
  public getCountries = async () => {
  	this.apiService.requestAllCountries(this.storeId).subscribe((data: {}) => {
  			console.log(data);
  	});
  }

  public getProductsbyCategory = async () => {
  	this.apiService.requestProducts(this.storeId, this.urlFilters ).subscribe((data: {}) => {
        console.log('Getting products for category: ' + this.urlFilters.categoryId)
        console.log(data);
        this.products = data['results'];
        this.products = this.products.slice(0, 5);
    });
  }

}
