import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CartItem } from 'src/app/features/carts/models/cartItem';
import { Products } from 'src/app/features/products/models/products';

import { CartService } from 'src/app/features/carts/services/cart.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit  {
  cartItems:CartItem[] = []



  constructor(private cartService:CartService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCart()

  }

  getCart() {
    this.cartService.getList().subscribe((response)=>{
      console.log(response)
      this.cartItems = response
    })
  }

  deleteToCart(productId:number){

    this.cartService.delete(productId).subscribe((response) =>{
      this.cartItems = response
      this.toastrService.error("Product Deleted")
      this.getCart()

     })

  }


}
