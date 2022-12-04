import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators,} from '@angular/forms';

import { Products } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  productToUpdate:Products | null = null

  // Getter
  get isEditting():boolean {
    return this.productToUpdate !== null
  }


  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {
    // FormGroup içindekileri aşağıdaki gibi new'lemek yerine FromBuilder ile alabildiğim bir servisim var.
    // this.productForm = new FormGroup({
    //   name:new FormControl(''),
    // })
  }
  ngOnInit(): void {
    this.createProductForm()
    this.getProductIdFromRoute()
  }

  createProductForm() {
    this.productForm = this.formBuilder.group({
      supplierId: [0, Validators.min(1)],
      // array,from control'ün parametreleri. 1.eleman (parametre) default değer , 2.eleman (parametre)  validator
      // Birden fazla validasyon geçmek için array haline getirebiliriz.
      categoryId: [0, Validators.min(1)],
      quantityPerUnit: ['', Validators.required],
      unitPrice: [0, Validators.min(0)],
      unitsInStock: [0, Validators.min(0)],
      unitsOnOrder: ['', Validators.min(0)],
      reorderLevel: ['', Validators.min(0)],
      discontinued: [false],
      name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  getProductIdFromRoute() {
    this.activatedRoute.params.subscribe((params)=>{
      if(params['productId']) this.getProductsById(params['productId'])
    })
  }

  getProductsById(productId: number) {
    this.productService.getById(productId).subscribe({
      next:(response)=>{
        this.productToUpdate = response
        this.productForm.patchValue(this.productToUpdate)
        // parchValue: Verdiğimiz objeyi (this.productToUpdate) mevcuttaki form değerlerine (product.value) dağıtıyor.Güncellemek için.
      },
      error:() => {
        this.toastrService.error('Product not found');
        this.router.navigate(['/dashboard', 'products']);
      },
    })

  }


  onProductFormSubmit(): void {
    if (this.productForm.invalid) {
      // productForm invalid mi ?

      // !! Alert yerine uyarıların daha şık durması için toastr kullandık.Döküman sayfasından adım adım ilerleyerek ekledik.
      // window.alert('Form is invalid');
      this.toastrService.error('Please fill in the form correctly')

      return; //invalid'se durduracak.
    }

    if(this.isEditting) this.update()
    // isEditting'i getter içinde yazdığım için burda property gibi davranabiliyor.
    else this.add();
  }

  onDeleteProduct(): void {
    if (confirm('Are you sure you want to delete this product?') === false)
      return;

    this.delete();
  }

  add() {
    // TODO:productServie yardımıyla ekleme işlemini yapacağız.
    const request:Products = {
      //: Backend'in product add endpointine gönderilecek olan request modeli.(Şu an kullandığımız backend'de product gönderiyoruz.)
      ...this.productForm.value,
        name:this.productForm.value.name.trim() //: this.productForm.value ile gelen name değerinin üzerine tekrar yazıyoruz.
    }

    this.productService.add(request).subscribe((response)=>{
      // window.alert("Product added")
      this.toastrService.success('Product added succesfully')
      this.router.navigate(['/dashboard', 'products', 'edit', response.id]);
    })
  }

  update():void {
    const request: Products = {
      id: this.productToUpdate!.id, // null olmayacağına dair söz veriyoruz.
      categoryId: Number.parseInt(this.productForm.value.categoryId),
      supplierId: Number.parseInt(this.productForm.value.supplierId),
      quantityPerUnit: this.productForm.value.quantityPerUnit,
      unitPrice: Number.parseFloat(this.productForm.value.unitPrice),
      unitsInStock: Number.parseInt(this.productForm.value.unitsInStock),
      unitsOnOrder: Number.parseInt(this.productForm.value.unitsOnOrder),
      reorderLevel: Number.parseInt(this.productForm.value.reorderLevel),
      discontinued: this.productForm.value.discontinued,
      name: this.productForm.value.name.trim(),
    }

    this.productService.update(request).subscribe((response)=>{
      this.productToUpdate = response
      this.toastrService.success('Product updated succesfully')
    })
  }

  delete(): void {
    this.productService.delete(this.productToUpdate!.id).subscribe(() => {
      this.toastrService.success('Product deleted successfully');
      this.router.navigate(['/dashboard', 'products']);
    });
  }
}
