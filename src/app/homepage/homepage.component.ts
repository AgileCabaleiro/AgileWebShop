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
  // private storeId:number = 1;
  private products;
  private carouselContent = [{image: 'assets/img/gallery/image1.jpeg', title: 'Special Offers',undertext: "That you won't see anywhere else" }, 
  {image: 'assets/img/gallery/image2.jpeg',title: 'Summer Collection',undertext: 'Looking for something fresh'},
  {image: 'assets/img/gallery/image5.jpeg',title: 'Winter is comming!',undertext: 'Get ready with our winter specials'},
  {image: 'assets/img/gallery/image3.jpeg',title: 'Best Male Youth Fashion',undertext: 'For your little men'},
  {image:'assets/img/gallery/image4.jpeg',title: 'Best Female Youth Fashion',undertext: 'For your little princess'}
  ]
  private urlFilters = { // We should set some filters to get featured products or flash offers
    categoryId: '',
    order: 'name',
    dir: 'asc',
    page: 1,
    limit: 12
  };
  /* Constructor */
  constructor(public apiService:ApiService, public global:Globals) {
    
  }
  /* Live cycle methods */
  ngOnInit() {
  	// this.getCountries();
    // this.getHomeCategories();
    this.getProductsbyCategory();
  }

  ngAfterViewInit(){

  }
  public getCountries = async () => {
  	this.apiService.requestAllCountries(this.global.selectedStoreId).subscribe((data: {}) => {
  	});
  }
  public getProductsbyCategory = async () => {
  	this.apiService.requestProducts(this.global.selectedStoreId, this.urlFilters ).subscribe((data: {}) => {
        this.products = data['results'];
        this.products = this.products.slice(0, 5);
    });
  }

}
