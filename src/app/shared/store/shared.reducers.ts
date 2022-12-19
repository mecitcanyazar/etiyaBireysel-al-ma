// Store'da değer güncelleyen tüm reducer'ları tanımla...

import { CartItem } from "src/app/features/carts/models/cartItem";
import { cartReducer } from "./cart/cart.reducer";

export const sharedReducers = {
  cart:cartReducer,

}

export interface SharedState {
  cart:CartItem[]
}
