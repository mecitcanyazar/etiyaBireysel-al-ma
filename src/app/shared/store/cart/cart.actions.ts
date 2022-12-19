// State'i değiştirecek fonksiyonların tanımlandığı nokta...

import { createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/features/carts/models/cartItem';

// export => State'i değiştirecek aksiyonu uygulamanın herhangi bir yerinden çağırabilirim.

// createAction 1.parametre (string) = " [Cart] Add Item to Cart "
// ! unique olmalı !
export const addItemToCart = createAction(
  '[Cart] Add Item to Cart',
  props<CartItem >() // 2.parametre fonksiyonun hangi parametreleri alacağını söyler.
);
/*
addItemToCart(cartItem:CartItem){}
*/

export const removeItemFromCart = createAction(
  '[Cart] Remove Item From Cart',
  props<{ id: number }>()
);
/*
remove(id:number){}
*/
