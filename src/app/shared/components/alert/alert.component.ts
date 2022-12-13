import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  constructor(private categoryService:CategoriesService) {}
  // Servisler ve interceptor'lar injectable olduğu için app modül haricindeki modüllerde de export etmeden kullanılabiliyor.

}
