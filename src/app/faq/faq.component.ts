import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  private htmlCode: string;
  constructor(public apiService:ApiService, public global:Globals) { }

  ngOnInit() {
    this.getFAQ();
  }
  public getFAQ(){
    this.apiService.requestFAQ(this.global.selectedStoreId).subscribe((data: {}) => {
      this.htmlCode = data['content'];
      console.log(this.htmlCode);
  });
  }
}
