import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartsRoutingModule } from './carts-routing.module';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MyCartComponent],
  imports: [
    CommonModule,
    CartsRoutingModule,
    SharedModule
  ],
  exports:[]
})
export class CartsModule { }
