import { Products } from "../../products/models/products"

export interface CartItem {
  id?: number;
  product: Products;
  quantity: number;


}
