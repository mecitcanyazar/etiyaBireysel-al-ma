import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/models/products';
import { GetListOptionsType } from 'src/app/models/get-list-options';
import { Pagination } from 'src/app/models/pagination';
import { FormGroup } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  name!: string;

  productCardClass: string = 'card col-3 ms-3 mb-3';

  //: ! Şuan undefined olduğu için kızma, daha sonra seni atacağım şeklinde söz vermiş oluyoruz.
  //: ? Bu özellik undefined olabilir demek.
  //: null için ? kullanamıyoruz, | null diye belirtmemiz gerekiyor.
  products!: Products[];
  // selectedProductCategoryId: number | null = null;
  searchProductNameInput: string | null = null;

  priceFilterType: 'gt' | 'lt' | 'gte' | 'lte' | 'eq' = 'eq';


  filterCategoryIdForm!:FormGroup



  pagination:Pagination = {
    page:1,
    pageSize:9
  }

  lastPage?: number; // ? ile tipi number | undefined da olabilir dedik.
  filters: any = { productFilterPrice: 0,filterByCategoryId:1,filterDiscontinued:false};


  //# Client Side filter
  // get filteredProducts(): Products[] {
  //   let filteredProducts = this.products;
  //   if (!filteredProducts) return [];

  //     if (this.selectedProductCategoryId)
  //       filteredProducts = filteredProducts.filter(
  //         (p) => p.categoryId === this.selectedProductCategoryId)


  //     if (this.searchProductNameInput)
  //       filteredProducts = filteredProducts.filter((p) =>
  //         p.name.toLowerCase().includes(
  //           // this.searchProductNameInput!.toLowerCase()
  //           // Non-null assertion opeartor: Sol tarafın null veya undefined olmadığını garanti ediyoruz.
  //        // searchProductName? dediğimizde hata veriyordu searchProductName! diyerek bunu aştık.Çünkü daha sonra oluşturacağım seni dedik (! ile)
  //        this.searchProductNameInput !== null
  //               ? this.searchProductNameInput.toLowerCase()
  //               : ''
  //           ));

  //       return filteredProducts;
  // }



  isLoading:number = 0 // true/false yerine sayaç methodu kullandık.Benzer işler ama bu iki veya daha fazla async işlem için daha geçerli.
  errorAlertMessage: string | null = null;


  //: ActivatedRoute mevcut route bilgisini almak için kullanılır.
  //: Router yeni route bilgisi oluşturmak için kullanılır.
  constructor(
    private activatedRoute: ActivatedRoute,
     private router: Router,
     private productService:ProductsService,
     private toastrService:ToastrService,
     private cartService:CartService
     ) {}


  ngOnInit(): void {

    // this.getProductsList({pagination : {page:1,pageSize:9} });
    this.isLoading = this.isLoading + 2;

    this.getCategoryIdFromRoute();
    this.getSearchProductNameFromRoute();
  }



  onSearchPriceChange(event: any) {
    if (this.filters.productFilterPrice == null) {
      this.filters.productFilterPrice = 0;
    }
  }


  addToCardClick(product:Products ){
    console.log('ProductListComponentden sepete eklenmesi istenen ürün:',  product)

    this.cartService.add(product).subscribe((response)=>{

      console.log(response)

      this.toastrService.success("Added",product.name  )
    })

  }

  getProductsList(options?:GetListOptionsType):void {
    this.isLoading = this.isLoading + 1;
    //: Subject: Observable'ın bir alt sınıfıdır. Subject'lerin bir özelliği ise, bir Subject üzerinden subscribe olunan herhangi bir yerden next() metodu çağrıldığında, o Subject üzerinden subscribe olan her yerde bu değişiklik görülebilir.
    this.productService.getProducts(options).subscribe({
      next: (response) => {
        //: Etiya projelerinde pagination bilgileri body içerisinde gelmektedir. Direkt atamayı gerçekleştirebiliriz.
        // this.pagination.page = response.page;
        // this.pagination.pageSize = response.pageSize;
        // this.lastPage = response.lastPage;
        //: Json-server projelerinde pagination bilgileri header içerisinde gelmektedir. Header üzerinden atama yapmamız gerekmektedir. Bu yöntem pek kullanılmayacağı için, bu şekilde geçici bir çözüm ekleyebiliriz.
        if (response.length < this.pagination.pageSize) { // filtreleme yapıyoruz.Gelen response mesela 10'dan(pagination.pagesize) küçükse yani 10dan az data varsa
          if (response.length === 0 && this.pagination.page > 1)
            this.pagination.page = this.pagination.page - 1; //1.sayfada hiç ürün olmayıp 2.sayfada olması durumu gibi.
          this.lastPage = this.pagination.page;
        }

        this.products = response;
        if (this.isLoading > 0) this.isLoading = this.isLoading - 1;
      },
      error: () => {
        // setTimeout(() => {
          this.errorAlertMessage = "Server Error. Couldn't get products list.";
          if (this.isLoading > 0) this.isLoading = this.isLoading - 1;
          // }, 3000);
      },
      complete: () => {
        console.log('completed');
      },
    });
  }


  getCategoryIdFromRoute(): void {
    //: route params'ları almak adına activatedRoute.params kullanılır.
    this.activatedRoute.params.subscribe((params) => {

      this.resetPagination()  // refactoring için artık üsttekileri bu method içinde tanımladım.

      if (params['categoryId']) {
        // this.selectedProductCategoryId = parseInt(params['categoryId']);
        this.filters['categoryId'] = parseInt(params['categoryId']);

      } else {
        // this.selectedProductCategoryId = null;
        // filters = { categoryId: 1 }
        if(this.filters['categoryId']) delete this.filters['categoryId'] //: delete , categoryId'yi objeden silecek ve orası yine undefined olacak.
        // filters = {categoryId : 1} mesela 1'di şimdi filters= {} oldu.
      }

      if (this.isLoading > 0) this.isLoading = this.isLoading - 1;
      if (this.isLoading === 0)
      this.getProductsList({ // category değiştiğinde yeni sayfanın da 1'den başlaması için pagination:this.pagination yaptık
        pagination:this.pagination,
        filters:this.filters
      });
    });
  }


  getSearchProductNameFromRoute(): void {
    //: query params'ları almak adına activatedRoute.queryParams kullanılır.
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      // && this.searchProductNameInput == null

      // if(queryParams['name_like']){
      //   this.filters['name_like'] = queryParams['name_like']
      // }
      // else {
      //   if(this.filters['name_like']) delete this.filters['name_like']
      // }

      if (
        queryParams['searchProductName'] &&
        queryParams['searchProductName'] !== this.searchProductNameInput
      ) {
        this.searchProductNameInput = queryParams['searchProductName'];
        this.filters['name_like'] = this.searchProductNameInput;
      }
      //# Defensive Programming
      if (
        queryParams['searchProductName'] === undefined &&
        this.searchProductNameInput !== null
      ) {
        this.searchProductNameInput = null;
        delete this.filters['name_like'];
      }


      if (this.isLoading > 0) this.isLoading = this.isLoading - 1;
      if (this.isLoading === 0)
      this.getProductsList({ // category değiştiğinde yeni sayfanın da 1'den başlaması için pagination:this.pagination yaptık
        pagination:this.pagination,
        filters:this.filters
      });
    });
  }


  isProductCardShow(product: any): boolean {
    return product.discontinued == false;
  }

  onSearchProductNameChange(event: any): void {
    // this.searchProductNameInput = event.target.value; //: ngModel'imiz kendisi bu işlemi zaten gerçekleştiriyor.

    this.filters['name_like'] = this.searchProductNameInput;
    this.resetPagination();

    let queryParams: any = {};
    if (this.searchProductNameInput !== '')
      queryParams['searchProductName'] = this.searchProductNameInput

    this.router.navigate([], {
      // navigate array halinde navigateByUrl string halinde syntax olarak.
      queryParams: queryParams,
    });
  }

  changePage(page:number):void{
    this.pagination.page = page;
    // Sayfayı güncelledikten sonra ikinci sayfayı göstermesi için tekrar istekte bulunuyoruz
    this.getProductsList({pagination : this.pagination,filters : this.filters})
  }

  resetPagination(){ // refactoring yaptık ve productList'i tekrar çağırmadan önce bunları sıfırlayacağımız için bir method içinde tanımladık.
    this.pagination.page = 1;
    this.lastPage = undefined
  }

  filtersCategoryId(event:Event){
    this.filters.filterByCategoryId = Number((event.target as HTMLInputElement).value)
  }

  showAlert(text:string) {
    this.toastrService.info(text)
  }

}

