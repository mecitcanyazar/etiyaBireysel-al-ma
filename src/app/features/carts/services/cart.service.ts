import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/cartItem';
import { Products } from '../../products/models/products';


@Injectable({
  providedIn: 'root'
})
export class CartService {


  controllerUrl:string = `${environment.apiUrl}/carts`


  constructor(private httpClient:HttpClient) { }

  getList(){
    return this.httpClient.get<CartItem[]>(this.controllerUrl)
  }

  add(product:Products):Observable<CartItem[]>{

    return this.httpClient.post<CartItem[]>(this.controllerUrl,product)
  }

  delete(productId:number):Observable<CartItem[]>{
    return this.httpClient.delete<CartItem[]>( `${this.controllerUrl}/${productId}`);

  }




}
