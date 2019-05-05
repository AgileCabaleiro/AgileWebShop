import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Globals } from '../globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  /* Variables*/
  public stores = null;
  public subStores = null;
  public selectedStore : number = 2; //Default España
  public navbarOpen = false;
  public navbarCategoriesClosed = true;
  public navbarStoresClosed = true;
  public navbarLanguagesClosed = true;
  /* Constructor */
  constructor(public apiService:ApiService, public global:Globals, public router: Router) { }
  /* Lyfe cycle methods */
  ngOnInit() {
    this.getStores();
    this.getHomeCategories();
  }
  /* Functions */
  public getStores = async () => {
  	this.apiService.requestAllStores().subscribe((data: {}) => {
        this.stores = data;
        this.subStores = data[this.selectedStore].storeViews;
  			console.log(this.stores);
  	});
  }
  public getHomeCategories = async () => {
  	this.apiService.requestHomeCategories(this.global.selectedStoreId).subscribe((data: {}) => {
  			this.global.homeCategories = data[Object.keys(data)[0]]; // avoid stupid object, convert into usefull array
  			console.log(this.global.homeCategories);
  	});
  }
  public storeLinkClick(event){
    this.global.selectedStore = event;
    this.stores.forEach(element => {
      if(element.name == event){
        this.global.selectedStoreId = element.storeViews[0].storeId;// We take first one as default
        this.subStores = element.storeViews;
        this.getHomeCategories();
        this.router.navigate(['/home'], { // With this, we go back home or refresh home content
          queryParams: {refresh: new Date().getTime()}
       });
      }
    });
  }

  public toggleNavbar(){
      this.navbarOpen = !this.navbarOpen;
  }
  public toggleCategories(){
    this.navbarCategoriesClosed = !this.navbarCategoriesClosed;
  }
  public toggleStores(){
    this.navbarStoresClosed = !this.navbarStoresClosed;
  }
  public toggleLanguages(){
    this.navbarLanguagesClosed = !this.navbarLanguagesClosed;
  }


}
