import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    ProductListComponent,
    HomePageComponent,
    LoginPageComponent,
    LoadingSpinnerComponent,
  ], // HTML tarafındaki angular bileşenlerini tanımlar
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule,NgxPaginationModule], // Angular modülleri import edeceğimiz yer.Angular cli kendisi yapacak.
  providers: [], // IoC Container'daki Dependency Injection'ları tanımlar
  bootstrap: [AppComponent], // Hangi bileşenin ilk açıldığında çalışacağını belirtir
})
export class AppModule {}


