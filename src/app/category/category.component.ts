import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
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
  private maxValue = 200;
  private minValue = 0;
  private bannerImage : string;
  options: Options = {
    floor: 0,
    ceil: 1200
  };
  /* Constructor */
  constructor(private route: ActivatedRoute, public apiService:ApiService) { 
  	this.categoryId = this.route.snapshot.paramMap.get("categoryId");
  	if ( this.route.snapshot.paramMap.get("subCategoryId") != undefined ){
  		this.subCategoryId = this.route.snapshot.paramMap.get("subCategoryId");
  	}
  	this.getHomeCategories();
  }
  /* Life cycle methods */
  ngOnInit() {
  	this.getCategoryProducts();
  }
  /* Functions */
    public getCategoryProducts = async () => {
  	this.apiService.requestProducts(this.storeId, this.categoryId ).subscribe((data: {}) => {
  			console.log(data);
  			this.products = data['results'];
  			this.filters = data['filters'];
  			// this.minValue = this.filters[3].min;
  			this.maxValue = this.filters[3].max;
  	});
  }
  public getHomeCategories = async () => {
  	this.apiService.requestHomeCategories(this.storeId).subscribe((data: {}) => {
  			console.log(data['categories']);
  			this.homeCategories = data[Object.keys(data)[0]]; // avoid stupid object, convert into usefull array
  			console.log(this.homeCategories);
  			this.homeCategories.forEach((element) => {
  				if(element.categoryId == this.categoryId){
  					this.actualCategory = element;
  					this.bannerImage = element['imageUrl'];	
  					console.log(this.actualCategory);
  					console.log(this.bannerImage);
  				}
  			})
  	});
  }

}
