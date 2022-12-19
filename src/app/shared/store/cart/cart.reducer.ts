// Actions'da tanımlanmış fonksiyonların içerisinin doldurulduğu kısım.

import { createReducer, on } from '@ngrx/store';
import { addItemToCart, removeItemFromCart } from './cart.actions';
import { CartItem } from 'src/app/features/carts/models/cartItem';
import { state } from '@angular/animations';

// ilk parametre => initial state => Aksiyon hiç çağırılmadan,hiç bir işlem yapılmadığında store'daki değerin başlangıç değeri.
const initialState: CartItem[] = [];

export const cartReducer = createReducer(
  initialState,
  on(addItemToCart, (state:CartItem[], action:CartItem) => {
    // store'daki addItemToCart çağrıldığında ne istersen yap...(aksiyonları manipüle et değiştir ve geriye klonlanmış state'i döndür.)
    console.log(state,action)
    // state'e yeni gelen action'ı ekle ve yeni state'i dön...
    // eğer state'de aynı id'li ürün varsa quantity dön...
    let sameProduct = state.find((p) => p.product.id == action.product.id);
    if (sameProduct) {
      return [
        ...state.filter((c) => c.id != sameProduct?.id),
        { ...sameProduct, quantity: sameProduct.quantity + action.quantity },
      ];
    }
    // READ-ONLY
    return [...state, { id: Math.floor(Math.random() * 9999999), ...action }];
  }),
  on(removeItemFromCart, (state, action) => {
    return state.filter((i) => i.id != action.id);
  })
);
