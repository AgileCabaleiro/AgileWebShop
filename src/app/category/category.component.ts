import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from "@angular/router";
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Options } from 'ng5-slider';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  /* Variables*/
  private storeId : number = 1;
  private homeCategories = [];
  private actualCategory = {};
  private categoryId : string;
  private subCategoryId: string;
  private products;
  private filters;
  private sortBy;
  private selectedSortByObj;
  // private selectedShowPerPage = 12;
  private maxValue = 200;
  private minValue = 0;
  private bannerImage : string;
  private urlFilters = {
    categoryId: '',
    order: 'name',
    dir: 'asc',
    page: 1,
    limit: 12
  };
  options: Options = {
    floor: 0,
    ceil: 1200
  };
  /* Constructor */
  constructor(private route: ActivatedRoute, public apiService:ApiService, public router: Router) { 
  	// this.categoryId = this.route.snapshot.paramMap.get("categoryId");
  	// if ( this.route.snapshot.paramMap.get("subCategoryId") != undefined ){
  	// 	this.subCategoryId = this.route.snapshot.paramMap.get("subCategoryId");
    // }
    this.getSortBy();
    router.events.subscribe(data => {
      if(data instanceof ActivationEnd){
        this.categoryId = data.snapshot.params['categoryId'];
        this.subCategoryId = data.snapshot.params['subCategoryId'];
        this.urlFilters.categoryId = this.subCategoryId;
        if(this.subCategoryId == undefined){
          this.urlFilters.categoryId = this.categoryId;
        }
        this.getProductsbyCategory();
      }
    });
  }
  /* Life cycle methods */
  ngOnInit() {
    this.getHomeCategories();
  }
  /* EVENTS */
  onChangeSortingSelect(value){
    console.log('onChangeSortingSelect with value: ');
    console.log(value); 
    this.urlFilters.dir = value.direction;
    this.urlFilters.order = value.order;
    this.getProductsbyCategory();
  }
  /* Functions */
  public getProductsbyCategory = async () => {
  	this.apiService.requestProducts(this.storeId, this.urlFilters ).subscribe((data: {}) => {
        console.log('Getting products for category: ' + this.urlFilters.categoryId)
        console.log(data);
  			this.products = data['results'];
  			this.filters = data['filters'];
  			// this.minValue = this.filters[3].min;
  			this.maxValue = this.filters[3].max;
    });
  }
  public getHomeCategories = async () => {
  	this.apiService.requestHomeCategories(this.storeId).subscribe((data: {}) => {
  			this.homeCategories = data[Object.keys(data)[0]]; // avoid stupid object, convert it into usefull array
  			this.homeCategories.forEach((element) => {
  				if(element.categoryId == this.categoryId){
  					this.actualCategory = element;
  					this.bannerImage = element['imageUrl'];	
  					console.log(this.actualCategory);
  				}
  			})
  	});
  }
  public getSortBy = async () => {
    this.apiService.requestCategoriesSortBy(this.storeId, this.subCategoryId).subscribe((data: {}) => {
      this.sortBy = data;
      this.selectedSortByObj = data[0];
    });
  }
}
