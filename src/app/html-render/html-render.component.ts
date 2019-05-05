import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Globals } from '../globals';
import { ActivatedRoute, ActivationEnd } from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'app-html-render',
  templateUrl: './html-render.component.html',
  styleUrls: ['./html-render.component.scss']
})
export class HtmlRenderComponent implements OnInit {
  public selectedView;
  public htmlCode: string = null;
  constructor(public apiService:ApiService, public global:Globals, private route: ActivatedRoute, public router: Router) { 
    router.events.subscribe(data => {
      if(data instanceof ActivationEnd){
        this.htmlCode = null;
        this.selectedView = data.snapshot.params['view'];
        console.log(this.selectedView);
        switch(this.selectedView) { 
          case 'faq': { 
             this.getFAQ();
             break; 
          } 
          case 'privacy': { 
             this.getPrivacy();
             break; 
          }
          case 'shopping_guide': { 
            this.getShoppingGuide();
            break; 
          } 
          case 'shipping_costs': { 
            this.requestShippingCosts();
            break; 
          }
          case 'contacts': { 
            this.getContacts();
            break; 
          } 
          default: { 
             //statements; 
             break; 
          } 
       } 
      }
    });
  }

  ngOnInit() {

  }

  public getFAQ(){
    this.apiService.requestFAQ(this.global.selectedStoreId).subscribe((data: {}) => {
      this.htmlCode = data['content'];
    });
  }
  public getPrivacy(){
    this.apiService.requestPrivacy(this.global.selectedStoreId).subscribe((data: {}) => {
      this.htmlCode = data['content'];
    });
  }
  public getShoppingGuide(){
    this.apiService.requestShoppingGuide(this.global.selectedStoreId).subscribe((data: {}) => {
      this.htmlCode = data['content'];
    });
  }
  public requestShippingCosts(){
    this.apiService.requestShippingCosts(this.global.selectedStoreId).subscribe((data: {}) => {
      this.htmlCode = data['content'];
    });
  }
  public getContacts(){
    this.apiService.requestContacts(this.global.selectedStoreId).subscribe((data: {}) => {
      this.htmlCode = data['content'];
    });
  }

}
