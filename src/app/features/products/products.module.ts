import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductFormPageComponent } from './pages/product-form-page/product-form-page.component';
import { DashboardProductListComponent } from './components/dashboard-product-list/dashboard-product-list.component';
import { DiscontinuedPipe } from './pipes/discontinued.pipe';
import { FilterCategoryIdPipe } from './pipes/filter-category-id.pipe';
import { FilterProductByPricePipe } from './pipes/filter-product-by-price.pipe';
import { FilterProductPipe } from './pipes/filter-product.pipe';
import { AllFiltersToProductsPipe } from './pipes/all-filters-to-products.pipe';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardProductsPageComponent } from './pages/dashboard-products-page/dashboard-products-page.component';

@NgModule({
  declarations: [
    DashboardProductsPageComponent,
    ProductCardComponent,
    ProductFormComponent,
    ProductListComponent,
    ProductFormPageComponent,
    DashboardProductListComponent,
    DiscontinuedPipe,
    FilterCategoryIdPipe,
    FilterProductByPricePipe,
    FilterProductPipe,
    AllFiltersToProductsPipe,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    DashboardProductsPageComponent,
    ProductCardComponent,
    ProductFormComponent,
    ProductListComponent,
    ProductFormPageComponent,
    DashboardProductListComponent,
    DiscontinuedPipe,
    FilterCategoryIdPipe,
    FilterProductByPricePipe,
    FilterProductPipe,
    AllFiltersToProductsPipe,
  ],
})
export class ProductsModule {}
