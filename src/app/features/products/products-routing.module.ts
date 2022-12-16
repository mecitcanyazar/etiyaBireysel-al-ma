import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardProductsPageComponent } from './pages/dashboard-products-page/dashboard-products-page.component';
import { ProductFormPageComponent } from './pages/product-form-page/product-form-page.component';

const routes: Routes = [{
  path: 'dashboard', // Grand Parent route
  children: [
    {
      path: 'products', // Parent route
      children: [
        {
          path: '',
          pathMatch: 'full',
          component: DashboardProductsPageComponent,
        },
        { path: 'add', component: ProductFormPageComponent }, //= dashboard/products/add
        { path: 'edit/:productId', component: ProductFormPageComponent },
      ],
    },

  ],

},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
