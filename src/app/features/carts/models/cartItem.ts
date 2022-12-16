import { Products } from "../../products/models/products"

export interface CartItem {
  // product: Products[]
  id:number
  name:string
  unitPrice:number
  unitsInStock: number
  quantity: number
  quantityPerUnit:string


}
