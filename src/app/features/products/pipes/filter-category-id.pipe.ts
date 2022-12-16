import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../models/products';

@Pipe({
  name: 'filterCategoryId'
})
export class FilterCategoryIdPipe implements PipeTransform {

  transform(products: Products[], categoryId: number): Products[] {
    let filterCategoryId:Products[] = products
    if(categoryId === 0) return filterCategoryId
    else {
      filterCategoryId = products.filter((p)=>p.categoryId === categoryId)
    }
    return filterCategoryId ;
  }

}
