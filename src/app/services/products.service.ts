import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Products } from '../models/products';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  contollerUrl:string = `${environment.apiUrl}/products`

  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<Products[]> {
    return this.httpClient.get<Products[]>(this.contollerUrl)
  }

}
