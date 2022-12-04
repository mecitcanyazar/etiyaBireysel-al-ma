import { GetListOptionsType } from '../models/get-list-options';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../models/products';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  controllerUrl:string = `${environment.apiUrl}/products`

  constructor(private httpClient:HttpClient) { }

  //: undefined ve null ikilik sistemde karşılıkları 000000 olacak.
  //: undefined ilgili değişkenin henüz tanımlanmadığını belirtir.
  //: null ilgili değişkenin tanımlanmış olduğu fakat null değer geçildiğini söyler.Null değerini programcılar geçer.
  // {pagination} : {pagination ?:Pagination} = {} okuması biraz zor olduğu için tercih etmedik.
  getProducts(options ?: GetListOptionsType ):Observable<Products[]> {
    // ? koymasaydık ts tarafında bu methodu çalıştırdığımızda parametre bekleyecekti.Ama biz ? koyarak undefined da olabilir diye belirttik.
    // ? ile tipi GetListOptionsType veya undefined olabileceğini belirttik.
    // const { pagination } = options ?? {} //Destructure ?? anlamı => options undefined ise {} al (Sol taraf false ise sağ tarafı al.)
    let queryParams:any = {}
    if(options?.pagination) { // options.pagination undefined olmaması durumunda
      queryParams['_page'] = options.pagination.page;
      queryParams['_limit'] = options.pagination.pageSize;
    }
    if(options?.filters){
      queryParams = {...queryParams,...options.filters} // pagination^dan gelenler  + filters'dan gelecekler // rest
    }
    return this.httpClient.get<Products[]>(this.controllerUrl,{
      params:queryParams,
      // observe:'response', //: Http response tipini döndürür.(response.header,response.body,response.status)
      // Sunucudan headers kısmını da almak için ekledik.
    });
    // response.headers.get('Link')
  }

  getById(productId: number): Observable<Products> {
    return this.httpClient.get<Products>(`${this.controllerUrl}/${productId}`);
  }

  add(request: Products): Observable<Products> { // ekleyeceğimiz şey 2.parametre post işleminde.
    return this.httpClient.post<Products>(this.controllerUrl, request);
  }

  update(request: Products): Observable<Products> {
    return this.httpClient.put<Products>(
      `${this.controllerUrl}/${request.id}`,
      request
    );
  }

  delete(productId: number): Observable<Products> {
    return this.httpClient.delete<Products>(
      `${this.controllerUrl}/${productId}`
    );
  }


}

