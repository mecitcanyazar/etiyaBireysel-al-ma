import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterProducts } from 'src/app/models/filterProducts';
import { Products } from 'src/app/models/products';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  dateNow: Date = new Date();
  @Input() product!:any
  text:string = "Button clicked"
  // @Input() product!:Products
  // Parent'ından bir veri almak için @Input kullanıyoruz.(Burda productCard'ın parent'ı productList)

  @Output() onAddToCardClick = new EventEmitter<Products> ();
  // EventEmitter Kullanıcının belli başlı aksiyonlar aldığında mesela click,submit bu aksiyonu yaptığını bize bildirir ve bu aksiyonu çalıştırır.
  // Sepete ekleme butonuna hangi ürün için tıklandığını görmek için Products generic yapısını yazıyoruz.

  @Output() showText = new EventEmitter<string> ();


  addToCardClick() {
    // Parent componenti uyar !!
    // Event emitter'ı triggerla
    // emit et
    this.onAddToCardClick.emit(this.product)
    // HTML'deki click butonuna tıklandığında seçilen ürünü emit ettiğim fonksiyonun parametresine ekle diyorum.
  }

  showAlert() {
    this.showText.emit(this.text)
  }

}
