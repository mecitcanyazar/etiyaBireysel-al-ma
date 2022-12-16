import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  controllerUrl: string = `${environment.apiUrl}/suppliers`;

  constructor(private httpClient: HttpClient ) { }

  getList(): Observable<Supplier[]> {
    return this.httpClient.get<Supplier[]>(this.controllerUrl);
  }
}
