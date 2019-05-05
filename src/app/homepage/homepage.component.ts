import { Component, OnInit , AfterViewInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { ActivationEnd } from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit, OnDestroy {
  /* Variables */
  public refreshSubscription;
  public refresh = null;
  public products;
  public carouselContent = [{image: 'assets/img/gallery/image1.jpeg', title: 'Special Offers',undertext: "That you won't see anywhere else" }, 
  {image: 'assets/img/gallery/image2.jpeg',title: 'Summer Collection',undertext: 'Looking for something fresh'},
  {image: 'assets/img/gallery/image5.jpeg',title: 'Winter is comming!',undertext: 'Get ready with our winter specials'},
  {image: 'assets/img/gallery/image3.jpeg',title: 'Best Male Youth Fashion',undertext: 'For your little men'},
  {image:'assets/img/gallery/image4.jpeg',title: 'Best Female Youth Fashion',undertext: 'For your little princess'}
  ]
  public urlFilters = { // We should set some filters to get featured products or flash offers
    categoryId: '',
    order: 'name',
    dir: 'asc',
    page: 1,
    limit: 12
  };
  /* Constructor */
  constructor(public apiService:ApiService, public global:Globals, public router:Router) {
    this.refreshSubscription = router.events.subscribe(data => {
      if(data instanceof ActivationEnd){
        if(this.refresh == null || this.refresh != data.snapshot.queryParamMap.get('refresh')){
          this.refresh = data.snapshot.queryParamMap.get('refresh');
          // Here we need to add all the methods that fetch API data
          console.log('refreshing');
          this.getProductsbyCategory();
        }
      }
    });
  }
  /* Live cycle methods */
  ngOnInit() {
    this.global.componentSelector = 'home';
    // this.getProductsbyCategory();
  }

  ngAfterViewInit(){

  }

  ngOnDestroy() {
    this.refreshSubscription = null;
  }

  /* Functions */
  public getCountries = async () => {
  	this.apiService.requestAllCountries(this.global.selectedStoreId).subscribe((data: {}) => {
  	});
  }
  public getProductsbyCategory = async () => {
  	this.apiService.requestProducts(this.global.selectedStoreId, this.urlFilters ).subscribe((data: {}) => {
        this.products = data['results'];
        console.log(data)
        this.products = this.products.slice(0, 5);
    });
  }

}
