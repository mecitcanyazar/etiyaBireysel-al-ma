import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductFormPageComponent } from './pages/product-form-page/product-form-page.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardProductsPageComponent } from './pages/dashboard-products-page/dashboard-products-page.component';
import { DashboardProductListComponent } from './components/dashboard-product-list/dashboard-product-list.component';
import { DashboardCategoriesPageComponent } from './pages/dashboard-categories-page/dashboard-categories-page.component';
import { DashboardCategoriesListComponent } from './components/dashboard-categories-list/dashboard-categories-list.component';
import { CategoryFormPageComponent } from './pages/category-form-page/category-form-page.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FilterProductPipe } from './pipes/filter-product.pipe';
import { FilterProductByPricePipe } from './pipes/filter-product-by-price.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { ButtonDirective } from './directives/button.directive';
import { FilterCategoryIdPipe } from './pipes/filter-category-id.pipe';
import { AllFiltersToProductsPipe } from './pipes/all-filters-to-products.pipe';
import { DiscontinuedPipe } from './pipes/discontinued.pipe';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { IfNotDirective } from './core/directives/if-not.directive';
import { DateInterceptor } from './interceptors/date.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { OverlayLoadingComponent } from './core/components/overlay-loading/overlay-loading.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';


@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    ProductListComponent,
    HomePageComponent,
    LoginPageComponent,
    LoadingSpinnerComponent,
    ProductFormComponent,
    ProductFormPageComponent,
    DashboardProductsPageComponent,
    DashboardProductListComponent,
    DashboardCategoriesPageComponent,
    DashboardCategoriesListComponent,
    CategoryFormPageComponent,
    CategoryFormComponent,
    ProductCardComponent,
    FilterProductPipe,
    FilterProductByPricePipe,
    HighlightDirective,
    ButtonDirective,
    FilterCategoryIdPipe,
    AllFiltersToProductsPipe,
    DiscontinuedPipe,
    TodoListComponent,
    TodoItemComponent,
  ], // HTML tarafındaki angular bileşenlerini tanımlar
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,//required animation module added
    ToastrModule.forRoot({ // ToastrModule added
      positionClass:"toast-top-right"
    }), SharedModule, CoreModule, FeaturesModule,

  ], // Angular modülleri import edeceğimiz yer.Angular cli kendisi yapacak.
  exports:[],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:DateInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
  ], // IoC Container'daki Dependency Injection'ları tanımlar
  bootstrap: [AppComponent], // Hangi bileşenin ilk açıldığında çalışacağını belirtir
})
export class AppModule {}
