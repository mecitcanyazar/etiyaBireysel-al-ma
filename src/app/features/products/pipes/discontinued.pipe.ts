import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../models/products';

@Pipe({
  name: 'discontinued'
})
export class DiscontinuedPipe implements PipeTransform {

  transform(products: Products[], discontinued:boolean): Products[] {
    let filteredProducts: Products[] = products;
    filteredProducts = products.filter((p) => p.discontinued === discontinued)

    return filteredProducts ;
  }

}
