import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from "@angular/router";
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Options } from 'ng5-slider';
import { Globals } from '../globals';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  /* Variables*/
  public storeId : number = 1;
  public homeCategories = [];
  public actualCategory = null;
  public categoryId : string;
  public subCategoryId: string;
  public products;
  public filters;
  public sortBy;
  public selectedSortByObj;
  // private selectedShowPerPage = 12;
  public maxValue = 200;
  public minValue = 0;
  public bannerImage : string;
  public urlFilters = {
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
  constructor(private route: ActivatedRoute, public apiService:ApiService, public router: Router, public global:Globals) { 
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
        this.changeActualCategory();
      }
    });
  }
  /* Life cycle methods */
  ngOnInit() {
    this.global.componentSelector = 'categories';
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
  private changeActualCategory(){
    this.homeCategories.forEach((element) => {
      if(element.categoryId == this.categoryId){
        this.actualCategory = element;
        this.bannerImage = element['imageUrl'];	
      }
    });
  }
  public getProductsbyCategory = async () => {
  	this.apiService.requestProducts(this.storeId, this.urlFilters ).subscribe((data: {}) => {
        console.log('Getting products for category: ' + this.urlFilters.categoryId)
        console.log(data);
  			this.products = data['results'].slice(0, this.urlFilters.limit); // Slice with visual purposes only, need fix on API
  			this.filters = data['filters'];
  			// this.minValue = this.filters[3].min;
  			this.maxValue = this.filters[3].max;
    });
  }
  public getHomeCategories = async () => {
  	this.apiService.requestHomeCategories(this.storeId).subscribe((data: {}) => {
  			this.homeCategories = data[Object.keys(data)[0]]; // avoid stupid object, convert it into usefull array
        this.changeActualCategory();
  	});
  }
  public getSortBy = async () => {
    this.apiService.requestCategoriesSortBy(this.storeId, this.subCategoryId).subscribe((data: {}) => {
      this.sortBy = data;
      this.selectedSortByObj = data[0];
    });
  }
}
