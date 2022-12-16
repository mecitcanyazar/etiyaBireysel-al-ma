import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { DashboardCategoriesListComponent } from './components/dashboard-categories-list/dashboard-categories-list.component';
import { CategoryFormPageComponent } from './pages/category-form-page/category-form-page.component';
import { DashboardCategoriesPageComponent } from './pages/dashboard-categories-page/dashboard-categories-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CategoryFormComponent,
    CategoryListComponent,
    DashboardCategoriesListComponent,
    CategoryFormPageComponent,
    DashboardCategoriesPageComponent,
  ],
  imports: [CommonModule, CategoriesRoutingModule,FormsModule,CoreModule,ReactiveFormsModule,SharedModule],
  exports: [
    CategoryFormComponent,
    CategoryListComponent,
    DashboardCategoriesListComponent,
    CategoryFormPageComponent,
    DashboardCategoriesPageComponent,
  ],
})
export class CategoriesModule {}
