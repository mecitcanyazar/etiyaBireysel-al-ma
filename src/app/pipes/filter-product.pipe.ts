import {  Pipe, PipeTransform } from '@angular/core';
import { Products } from '../models/products';

@Pipe({
  name: 'filterProduct' // Html'de bu ismi verdiğimizde aşağıdaki class içindeki pipe çalışacak.
})
export class FilterProductPipe implements PipeTransform {

  transform(products: Products[], name:string): Products[] {
    let filterProduct = products.filter((p)=>p.name.toLowerCase().includes(name.toLowerCase()))
    return filterProduct;
  }

}
