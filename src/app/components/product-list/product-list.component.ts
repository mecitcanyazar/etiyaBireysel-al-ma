import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/models/products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  page:number = 1;
  pageSize:number = 9

  productCardClass: string = 'card col-3 ms-3 mb-3';

  //: ! Şuan undefined olduğu için kızma, daha sonra seni atacağım şeklinde söz vermiş oluyoruz.
  //: ? Bu özellik undefined olabilir demek.
  //: null için ? kullanamıyoruz, | null diye belirtmemiz gerekiyor.
  products!: Products[];
  selectedProductCategoryId: number | null = null;
  searchProductNameInput: string | null = null;
  get filteredProducts(): Products[] {
    let filteredProducts = this.products;
    if (!filteredProducts) return [];

      if (this.selectedProductCategoryId)
        filteredProducts = filteredProducts.filter(
          (p) => p.categoryId === this.selectedProductCategoryId)


      if (this.searchProductNameInput)
        filteredProducts = filteredProducts.filter((p) =>
          p.name.toLowerCase().includes(
            // this.searchProductNameInput!.toLowerCase()
            // Non-null assertion opeartor: Sol tarafın null veya undefined olmadığını garanti ediyoruz.
         // searchProductName? dediğimizde hata veriyordu searchProductName! diyerek bunu aştık.Çünkü daha sonra oluşturacağım seni dedik (! ile)
         this.searchProductNameInput !== null
                ? this.searchProductNameInput.toLowerCase()
                : ''
            ));

        return filteredProducts;
  }

  isLoading:number = 0 // true/false yerine sayaç methodu kullandık.Benzer işler ama bu iki veya daha fazla async işlem için daha geçerli.
  errorAlertMessage: string | null = null;


  //: ActivatedRoute mevcut route bilgisini almak için kullanılır.
  //: Router yeni route bilgisi oluşturmak için kullanılır.
  constructor(
    private activatedRoute: ActivatedRoute,
     private router: Router,
     private productService:ProductsService ) {}

  ngOnInit(): void {

    this.getProductsList();

    this.getCategoryIdFromRoute();
    this.getSearchProductNameFromRoute();
  }
  getProductsList() {
    this.isLoading = this.isLoading + 1;
    // Subject: Observable'ın bir alt sınıfıdır. Subject'lerin bir özelliği ise, bir Subject üzerinden subscribe olunan herhangi bir yerden next() metodu çağrıldığında, o Subject üzerinden subscribe olan her yerde bu değişiklik görülebilir.
    this.productService.getProducts().subscribe({
      next: (response) => {
        setTimeout(() => {
        this.products = response;
        this.isLoading = this.isLoading - 1;
        }, 3000);
      },
      error: () => {
        setTimeout(() => {
        this.errorAlertMessage = "Server Error. Couldn't get products list.";
        this.isLoading = this.isLoading - 1;
      }, 3000);
      },
      complete: () => {
        console.log('completed');
      },
    });
  }


  getCategoryIdFromRoute(): void {
    //: route params'ları almak adına activatedRoute.params kullanılır.
    this.activatedRoute.params.subscribe((params) => {
      // console.log(params)
      if (params['categoryId'])
        this.selectedProductCategoryId = parseInt(params['categoryId']);
      else this.selectedProductCategoryId = null;
      // "10.123" // float/double
      // "10" // int
    });
  }

  getSearchProductNameFromRoute(): void {
    //: query params'ları almak adına activatedRoute.queryParams kullanılır.
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      // && this.searchProductNameInput == null
      if (
        queryParams['searchProductName'] &&
        queryParams['searchProductName'] !== this.searchProductNameInput
      )
        this.searchProductNameInput = queryParams['searchProductName'];
      //# Defensive Programming
      if (
        !queryParams['searchProductName'] &&
        this.searchProductNameInput !== null
      )
        this.searchProductNameInput = null;
    });
  }

  isProductCardShow(product: any): boolean {
    return product.discontinued == false;
  }

  onSearchProductNameChange(event: any): void {
    // this.searchProductNameInput = event.target.value; //: ngModel'imiz kendisi bu işlemi zaten gerçekleştiriyor.

    const queryParams: any = {};
    if (this.searchProductNameInput !== '')
      queryParams['searchProductName'] = this.searchProductNameInput;
    this.router.navigate([], {
      queryParams: queryParams,
    });
  }

  onPageDataChange(event:any){
    this.page = event
  }

}

