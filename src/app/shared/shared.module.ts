import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AlertComponent } from './components/alert/alert.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { HighlightDirective } from './directives/highlight.directive';
import { ButtonDirective } from './directives/button.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { sharedReducers } from './store/shared.reducers';

@NgModule({
  declarations: [
    AlertComponent,
    NavbarComponent,
    LoginPageComponent,
    MainLayoutComponent,
    TodoItemComponent,
    TodoListComponent,
    HighlightDirective,
    ButtonDirective
  ],
  imports: [CommonModule, SharedRoutingModule,FormsModule,ReactiveFormsModule,StoreModule.forRoot(sharedReducers),],
  exports: [
    AlertComponent,
    NavbarComponent,
    MainLayoutComponent,
    TodoItemComponent,
    TodoListComponent,
    HighlightDirective,
    ButtonDirective,


  ],
  // LoginPageComponent'i kullananan başka bir modül olmadığı için export etmeme gerek kalmadı.
})
export class SharedModule {}
