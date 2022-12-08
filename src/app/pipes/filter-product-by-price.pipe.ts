import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../models/products';

@Pipe({
  name: 'filterProductByPrice'
})
export class FilterProductByPricePipe implements PipeTransform {

  transform(products: Products[], price:number,operator:'gt' | 'lt'| 'gte' | 'lte' | 'eq' = 'eq' ): Products[]  {
    // let filterProductByPrice!:Products[]
    // if(operator === 'gt')
    //  filterProductByPrice =  products.filter((p)=>p.unitPrice > (price))

    //  if(operator === 'lt')
    //   filterProductByPrice =  products.filter((p)=>p.unitPrice < (price))

    // if(operator === 'gte')
    //   filterProductByPrice =  products.filter((p)=>p.unitPrice >= (price))

    // if(operator === 'lte')
    //   filterProductByPrice =  products.filter((p)=>p.unitPrice <= (price))

    // if (operator === 'eq')
    //   filterProductByPrice =  products.filter((p)=>p.unitPrice = (price))

    // return filterProductByPrice()

    if (price <= 0) return products;
    let filteredProducts: Products[] = products;

    switch (operator) {
      case 'eq':
        filteredProducts = products.filter((p) => p.unitPrice == price);
        break;
        case 'lte':
        filteredProducts = products.filter((p) => p.unitPrice <= price);
        break;
      case 'gte':
        filteredProducts = products.filter((p) => p.unitPrice >= price);
        break;
        case 'gt':
        filteredProducts = products.filter((p) => p.unitPrice > price);
        break;
      case 'lt':
        filteredProducts = products.filter((p) => p.unitPrice < price);
        break;
    }

    return filteredProducts;
  }

}

// ! ÖDEV

// Ürünler sayfasının üzerine mümkün olan tüm alanlar için filtreleme yapacak tasarımı tasarlayınız.
// Filtereleme için genel bir pipe ve model oluşturunuz.
// Filterelerinizi bu model objesinde tutarak pipe'a aktarınız ve pipe yardımıyla bu filtreleri ürünlere uygulayınız




