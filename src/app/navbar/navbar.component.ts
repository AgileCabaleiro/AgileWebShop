import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  /* Variables*/
  private stores = null;
  private subStores = null;
  private selectedStore : number = 2; //Default España
  /* Constructor */
  constructor(public apiService:ApiService, public global:Globals) { }
  /* Lyfe cycle methods */
  ngOnInit() {
    this.getStores();
    this.getHomeCategories();
  }
  /* Functions */
  public getStores = async () => {
  	this.apiService.requestAllStores().subscribe((data: {}) => {
        this.stores = data;
  			console.log(this.stores);
  	});
  }
  public getHomeCategories = async () => {
  	this.apiService.requestHomeCategories(this.global.selectedStoreId).subscribe((data: {}) => {
  			this.global.homeCategories = data[Object.keys(data)[0]]; // avoid stupid object, convert into usefull array
  			console.log(this.global.homeCategories);
  	});
  }

}
