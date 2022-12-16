import { Pipe, PipeTransform } from '@angular/core';
import { FilterProducts } from '../models/filterProducts';
import { Products } from '../models/products';

@Pipe({
  name: 'allFiltersToProducts'
})
export class AllFiltersToProductsPipe implements PipeTransform {

  transform(products: FilterProducts[],name:string,price:number,operator:'gt' | 'lt'| 'gte' | 'lte' | 'eq' = 'eq',categoryId: number,discontinued:boolean ): FilterProducts[] {
    let filteredProducts: FilterProducts[] = products;


    if(price >=0 )  {

      // Name
      filteredProducts = filteredProducts.filter((p)=>p.name.toLowerCase().includes(name.toLowerCase()))

      // Price
      if(price > 0)
        switch (operator) {
          case 'eq':
            filteredProducts = filteredProducts.filter((p) => p.unitPrice == price);
            break;
            case 'lte':
            filteredProducts = filteredProducts.filter((p) => p.unitPrice <= price);
            break;
          case 'gte':
            filteredProducts = filteredProducts.filter((p) => p.unitPrice >= price);
            break;
            case 'gt':
            filteredProducts = filteredProducts.filter((p) => p.unitPrice > price);
            break;
          case 'lt':
            filteredProducts = filteredProducts.filter((p) => p.unitPrice < price);
            break;
          }

    // CategoryId

     if(!categoryId) filteredProducts
     else {
       filteredProducts = filteredProducts.filter((p)=>p.categoryId === categoryId)
     }

      // Discontinued
      filteredProducts = filteredProducts.filter((p) => p.discontinued === discontinued)

    }

    return filteredProducts;
  }

}






