import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CartItem } from 'src/app/models/cartItem';
import { Products } from 'src/app/models/products';

import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit  {
  cartItems:Products[] = []



  constructor(private cartService:CartService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCart()
  }

  getCart() {
    this.cartService.getList().subscribe((response)=>{
      this.cartItems = response
      console.log(this.cartItems)
    })
  }

  // addToCart(product:Products){
  //   this.cartService.add(product).subscribe((response)=>{
  //     // this.cartItems.push(response)

  //   })
  // }

  deleteToCart(productId:number){

    this.cartService.delete(productId).subscribe((response) =>{
      this.cartItems = response

     })
     this.toastrService.error("Product Deleted")

     this.getCart()

  }

}
