import { RouterModule, Routes } from '@angular/router';

import { DashboardProductsPageComponent } from './pages/dashboard-products-page/dashboard-products-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { ProductFormPageComponent } from './pages/product-form-page/product-form-page.component';
import { DashboardCategoriesPageComponent } from './pages/dashboard-categories-page/dashboard-categories-page.component';
import { CategoryFormPageComponent } from './pages/category-form-page/category-form-page.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'category/:categoryId', component: HomePageComponent }, // Route parametrelerimi : ile yazacağım. Değişiklik gösteren yerler  (domain'den sonraki yerler) için  : kullanıyoruz.id numarası gibi.

  { path: 'login', component: LoginPageComponent },
  { path: 'carts', component: MyCartComponent },
  {
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
      {
        path: 'categories',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: DashboardCategoriesPageComponent,
          },
          { path: 'add', component: CategoryFormPageComponent },
          { path: 'edit/:categoryId', component: CategoryFormPageComponent },
        ],
      },
    ],

  },

 //İlgili categorideki elemanlara tıkladığımda productList'e göndermesini istiyorum. homepage'e yönlendirdik çünkü productList'imiz orada.
  // pathMatch :full=> path'imiz sadece '' içermeli diyoruz./customer dediğimizde bu component görüntülenmeyecek.Aksi halde görüntülenir.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


