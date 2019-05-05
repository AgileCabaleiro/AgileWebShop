import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Globals } from './globals';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoryComponent } from './category/category.component';
import { Ng5SliderModule } from 'ng5-slider';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { HtmlRenderComponent } from './html-render/html-render.component';


const appRoutes: Routes = [
  { path: 'category/:categoryId', component: CategoryComponent},
  { path: 'category/:categoryId/subcategory/:subCategoryId', component: CategoryComponent},
  { path: '', component: HomepageComponent},
  { path: 'home', component: HomepageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'product/:modelId', component: ProductViewComponent},
  { path: 'render/:view', component: HtmlRenderComponent},
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    CategoryComponent,
    LoginComponent,
    RegisterComponent,
    ProductViewComponent,
    HtmlRenderComponent
  ],
  imports: [
    BrowserModule,
    Angular2FontawesomeModule,
    HttpClientModule,
    Ng5SliderModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes,
      { enableTracing: false } // <-- debugging purposes only)
    )
  ],
  providers: [ApiService, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
