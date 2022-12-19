import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cartItem';
import { Store } from '@ngrx/store';
import { SharedState } from 'src/app/shared/store/shared.reducers';
import { addItemToCart, removeItemFromCart } from 'src/app/shared/store/cart/cart.actions';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemModel$: Observable<CartItem[]> = this.store.select((state)=>state.cart) // Sepet ile store'u bağladık.


  cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  constructor(private store:Store<SharedState>) {}

  add(cartItem: CartItem) {
    // Sepeti kontrol et, aynı üründen varsa adeti gelen adet kadar arttır.
    // Aynı üründen yoksa direkt ekle.
    // id atama işlemi
    let sameProduct = this.cartItems.value.find(
      (i) => i.product.id == cartItem.product.id
    );
    if (sameProduct) {
      sameProduct.quantity += cartItem.quantity;
      // yeni değerler ile cartItems'i değiştir..
      this.cartItems.next([
        ...this.cartItems.value.filter(
          (i) => i.product.id != cartItem.product.id
        ),
        sameProduct,
      ]);
      return;
    }
    // Gelen yeni ürünü direkt sepete ekle..
    this.cartItems.next([...this.cartItems.value, cartItem]);
  }
  remove(id: number) {
    // Gelen id değeri ile cartItem ara, bulursan sil..
    this.cartItems.next(this.cartItems.value.filter((i) => i.id != id));
  }

  addState(cartItem:CartItem) {

    // action'ı çağırmak için => dispatch
    this.store.dispatch(addItemToCart(cartItem)) // burda obje gönderirsem tanımladığım actions'da da obje değişken gibi gönderirsem orda da öyle.
  }

  removeState(id:number){
    // state'i çağır
    this.store.dispatch(removeItemFromCart({id}))

  }
}
