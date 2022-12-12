import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root', // HTML tarafındaki etiketi tanımlar
  templateUrl: './app.component.html', // Hangi HTML dosyasını kullanacağını belirtir
  styleUrls: ['./app.component.scss'], // Hangi CSS dosyasını/dosyalarını kullanacağını belirtir
})
export class AppComponent implements OnInit { // Interface // Arayüz // Bu class bu implements'in özelliklerini karşılamak zorunda.Bu zorunluluğa uymak için de ngOnInit() eklemek zorundayız.
  // title: string = 'Etiya 5 Frontend Angular'; // Propoerty, State
  // tipi string ya da number olabilir string|number
  // TypeScriptte burada property tanımayabiliyoruz.JS'de constructor içerisinde yapabiliyorduk.

  constructor(private loadingService:LoadingService,private toastrService:ToastrService){}
  isLoading:boolean = false
  text!:string
  // Loading.service'den çekip değerini değiştirmek istiyorum.


  ngOnInit(): void {
    this.subscribeToLoading()
    this.subscribeToText()

  }// Component oluşturulduğunda / yerleştirildiğinde çalışır.
  // this.title = 5 // 5'e eşitlersek Yukarıda string ya da number olabilceğini söylediğimiz için hata vermeyecektir.
  subscribeToLoading() {
    this.loadingService.isLoadingSubject.subscribe((isLoading) =>{
      console.log(isLoading)
      this.isLoading = isLoading
    })
  }
  subscribeToText() {
    this.loadingService.text.subscribe((text)=>{
      // console.log(text)
      this.text = text
    })
  }

}
