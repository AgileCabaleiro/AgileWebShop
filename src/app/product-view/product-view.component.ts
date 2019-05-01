import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from "@angular/router";
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  /* Variables */
  private storeId = 1;
  private modelId;
  private productInfo = undefined;
  private selectedSize;
  private selectedSizeIndex = 0;
  private selectedQuantity = 1;
  private quantitiesArray;
  /* Constructor*/
  constructor(private route: ActivatedRoute, public apiService:ApiService, public router: Router) { 
    router.events.subscribe(data => {
      if(data instanceof ActivationEnd){
        this.modelId = data.snapshot.params['modelId'];
        this.getProductbyModelId();
      }
    });
  }
  /* Life cycle Methods */
  ngOnInit() {

  }
  /* EVENTS */
  private onChangeSelectedSize(event){
    console.log('event is: ' + event);
    for( let i=0; i < this.productInfo.sizes.length ; i++){
      if(this.productInfo.sizes[i].variantId == event){
        this.selectedSizeIndex = i;
        this.selectedQuantity = 0;
        if( parseInt(this.productInfo.sizes[i].stockQty) > 0){
          this.selectedQuantity = 1;
          this.quantitiesArray = new Array(this.productInfo.sizes[i].stockQty);
          console.log('quantitiesArray is: ')
          console.log(this.quantitiesArray);
        }
      }
    }
  }
  /* Functions*/
  public getProductbyModelId = async () => {
    this.apiService.requestProductByModelId(this.storeId, this.modelId).subscribe((data: {}) =>{
      console.log('Product data is:');
      console.log(data);
      this.productInfo = data;
      this.selectedSize = this.productInfo.sizes[0].variantId;
      this.quantitiesArray = new Array( parseInt(this.productInfo.sizes[0].stockQty));
    });
  }

}
