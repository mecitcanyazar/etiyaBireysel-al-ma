import { Component, OnInit } from '@angular/core';
import {  ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/features/carts/models/cartItem';
import { CartService } from 'src/app/features/carts/services/cart.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit  {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}



  ngOnInit(): void {
    this.subscribeToCartService();

  }

  subscribeToCartService() {
    this.cartService.cartItemModel$.subscribe((response) => {
      this.cartItems = response;
    });
  }

  removeItem(cartItem: CartItem) {
    if (cartItem.id) this.cartService.removeState(cartItem.id);
  }


}
