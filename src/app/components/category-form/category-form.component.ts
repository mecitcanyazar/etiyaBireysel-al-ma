import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  categoryToUpdate: Category | null = null

  // Getter
  get isEditting():boolean {
    return this.categoryToUpdate !== null
  }

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createCategoryForm();
    this.getCategoryIdFromRoute();
  }

  createCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      description: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  getCategoryIdFromRoute() {
    this.activatedRoute.params.subscribe((params)=>{
      if(params['categoryId']) this.getCategoryById(params['categoryId'])
    })
  }

  getCategoryById(categoryId:number) {
    this.categoryService.getById(categoryId).subscribe({
      next:(response)=>{
        this.categoryToUpdate = response
        this.categoryForm.patchValue(this.categoryToUpdate)
      // parchValue: Verdiğimiz objeyi (this.productToUpdate) mevcuttaki form değerlerine (product.value) dağıtıyor.Güncellemek için.
      },
      error:() => {
        this.toastrService.error('Category not found')
        this.router.navigate(['/dashboard','categories'])
      },
    })
  }

  onCategoryFormSubmit() {
    if(this.categoryForm.invalid){

      this.toastrService.error('Please fill in the form correctly')
      return ; //invalid'se durduracak.
    }

    if(this.isEditting) this.update()
      // isEditting'i getter içinde yazdığım için burda property gibi davranabiliyor.
    else this.add()
  }

  onDeleteCategory(): void {
    if (confirm('Are you sure you want to delete this category?') === false)
      return;

    this.delete();
  }

  add() {
    const request: Category = {
      ...this.categoryForm.value,
      name:this.categoryForm.value.name.trim()
    }

    this.categoryService.add(request).subscribe((response)=>{
      this.toastrService.success('Category added succesfully')
      this.router.navigate(['/dashboard', 'categories','edit',response.id])
    })
  }

  update():void {
    const request: Category = {
      id:this.categoryToUpdate!.id,  // null olmayacağına dair söz veriyoruz.
      description:this.categoryForm.value.description,
      name:this.categoryForm.value.name.trim()
    }

    this.categoryService.update(request).subscribe((response)=>{
      this.categoryToUpdate = response
      this.toastrService.success('Category added succesfully')
    })
  }

  delete() {
    this.categoryService.delete(this.categoryToUpdate!.id).subscribe(()=>{
      this.toastrService.success("Category deleted succesfully");
      this.router.navigate(['/dashboard','categories']);
    })
  }
}
