import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/features/products/models/products';
import { ProductsService } from 'src/app/features/products/services/products.service';

@Component({
  selector: 'app-dashboard-product-list',
  templateUrl: './dashboard-product-list.component.html',
  styleUrls: ['./dashboard-product-list.component.scss'],
})
export class DashboardProductListComponent implements OnInit {
  products!: Products[];
  productForm!: FormGroup;
  productToUpdate:Products | null = null

  constructor(
    private productService: ProductsService,
    private toastrService: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: () => {
        this.toastrService.error('Product not found');
      },
      complete: () => {
        console.log('completed');
      },
    });
  }

  showUpdate(productId:number) {
      this.router.navigate([`/dashboard/products/edit/${productId}`])
  }
}
