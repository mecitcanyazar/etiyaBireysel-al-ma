import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/cartItem';
import { Products } from '../models/products';


@Injectable({
  providedIn: 'root'
})
export class CartService {


  controllerUrl:string = `${environment.apiUrl}/carts`


  constructor(private httpClient:HttpClient) { }

  getList(){
    return this.httpClient.get<Products[]>(this.controllerUrl)
  }

  add(product:Products):Observable<Products[]>{

    return this.httpClient.post<Products[]>(this.controllerUrl,product)
  }

  delete(productId:number):Observable<Products[]>{
    return this.httpClient.delete<Products[]>( `${this.controllerUrl}/${productId}`);

  }


}
