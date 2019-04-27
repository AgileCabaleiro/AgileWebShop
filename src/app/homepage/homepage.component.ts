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
  private products;

  constructor(public apiService:ApiService) {
  	// this.products = this.apiService.getAllProducts();
  	// console.log(this.products);
  }

  ngOnInit() {
  	this.requestStores();

  }

  // ngAfterViewInit(){
  // 	this.products = this.requestProducts();
  // 	console.log(this.products);
  // }

  public requestStores = async () => {
  	this.apiService.getAllStores().subscribe((data: {}) => {
  			console.log(data);	
  	});
  	
  	
  }

}
