import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../../features/carts/models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
// isLoading:boolean = false
// Bu loading'i app componentte yakalamak için Subject konusu ortaya çıkıyor.Subject bu değişkeni dinleyen tüm dinleyicileri uyarıyor.Artık isLoading'e gerek yok,sildik.
// Subject ile Behavior Subject arasındaki fark behavior subject başlangıç değeri ister.

isLoadingSubject:Subject<boolean> = new Subject<boolean>()

text:BehaviorSubject<string> = new BehaviorSubject<string>("Text")


  constructor() { }

  startLoading() {
    // this.isLoading  = true
    this.isLoadingSubject.next(true)
    this.text.next("Yükleniyor...")

  }
  stopLoading() {
    // this.isLoading  = false
    // setTimeout(() => {
      this.isLoadingSubject.next(false)
    // }, 3000);

  }
}
