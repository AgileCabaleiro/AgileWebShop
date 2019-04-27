import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoryComponent } from './category/category.component';
import { Ng5SliderModule } from 'ng5-slider';


const appRoutes: Routes = [
  { path: 'category/:categoryId', component: CategoryComponent},
  { path: 'category/:categoryId/subcategory/:subCategoryId', component: CategoryComponent},
  { path: '', component: HomepageComponent},
  { path: 'home', component: HomepageComponent}
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    Angular2FontawesomeModule,
    HttpClientModule,
    Ng5SliderModule,
    RouterModule.forRoot(appRoutes,
      { enableTracing: false } // <-- debugging purposes only)
    )
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
