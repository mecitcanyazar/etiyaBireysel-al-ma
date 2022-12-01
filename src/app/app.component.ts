import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root', // HTML tarafındaki etiketi tanımlar
  templateUrl: './app.component.html', // Hangi HTML dosyasını kullanacağını belirtir
  styleUrls: ['./app.component.scss'], // Hangi CSS dosyasını/dosyalarını kullanacağını belirtir
})
export class AppComponent implements OnInit { // Interface // Arayüz // Bu class bu implements'in özelliklerini karşılamak zorunda.Bu zorunluluğa uymak için de ngOnInit() eklemek zorundayız.
  // title: string = 'Etiya 5 Frontend Angular'; // Propoerty, State
  // tipi string ya da number olabilir string|number
  // TypeScriptte burada property tanımayabiliyoruz.JS'de constructor içerisinde yapabiliyorduk.

  ngOnInit(): void {}// Component oluşturulduğunda / yerleştirildiğinde çalışır.
  // this.title = 5 // 5'e eşitlersek Yukarıda string ya da number olabilceğini söylediğimiz için hata vermeyecektir.
}
