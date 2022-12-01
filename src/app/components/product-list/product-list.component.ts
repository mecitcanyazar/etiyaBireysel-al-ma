import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/models/products';
import { GetListOptionsType } from 'src/app/models/get-list-options';
import { Pagination } from 'src/app/models/pagination';
import { filter } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  productCardClass: string = 'card col-3 ms-3 mb-3';

  //: ! Şuan undefined olduğu için kızma, daha sonra seni atacağım şeklinde söz vermiş oluyoruz.
  //: ? Bu özellik undefined olabilir demek.
  //: null için ? kullanamıyoruz, | null diye belirtmemiz gerekiyor.
  products!: Products[];
  // selectedProductCategoryId: number | null = null;
  // searchProductNameInput: string | null = null;

  pagination:Pagination = {
    page:1,
    pageSize:9
  }

  lastPage!: number;
  filters:any = {}



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
     private productService:ProductsService ) {}

  ngOnInit(): void {

    // this.getProductsList({pagination : {page:1,pageSize:9} });

    this.getCategoryIdFromRoute();
    this.getSearchProductNameFromRoute();
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
          if (response.length === 0)
            this.pagination.page = this.pagination.page - 1; //1.sayfada hiç ürün olmayıp 2.sayfada olması durumu gibi.
            this.lastPage = this.pagination.page;
            this.products = response;
        }
        if (response.length > 0) this.products = response;
        this.isLoading = this.isLoading - 1;
      },
      error: () => {
        // setTimeout(() => {
          this.errorAlertMessage = "Server Error. Couldn't get products list.";
          this.isLoading = this.isLoading - 1;
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
      this.pagination.page = 1;
      if (params['categoryId']) {
        // this.selectedProductCategoryId = parseInt(params['categoryId']);
        this.filters['categoryId'] = parseInt(params['categoryId']);

      } else {
        // this.selectedProductCategoryId = null;
        // filters = { categoryId: 1 }
        if(this.filters['categoryId']) delete this.filters['categoryId'] //: delete , categoryId'yi objeden silecek ve orası yine undefined olacak.
        // filters = {categoryId : 1} mesela 1'di şimdi filters= {} oldu.
      }


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

      if(queryParams['name_like']){
        this.filters['name_like'] = queryParams['name_like']
      }
      else {
        if(this.filters['name_like']) delete this.filters['name_like']
      }

      // if (
      //   queryParams['searchProductName'] &&
      //   queryParams['searchProductName'] !== this.searchProductNameInput
      // )
      //   this.searchProductNameInput = queryParams['searchProductName'];
      // // # Defensive Programming
      // if (
      //   !queryParams['searchProductName'] &&
      //   this.searchProductNameInput !== null
      // )
      //   this.searchProductNameInput = null;



      this.getProductsList({ // category değiştiğinde yeni sayfanın da 1'den başlaması için pagination:this.pagination yaptık
        pagination:this.pagination,
        filters:this.filters
      });
    });
    this.pagination.page = 1
  }


  isProductCardShow(product: any): boolean {
    return product.discontinued == false;
  }

  onSearchProductNameChange(event: any): void {
    // this.searchProductNameInput = event.target.value; //: ngModel'imiz kendisi bu işlemi zaten gerçekleştiriyor.

    let queryParams: any = {};
    // if (this.searchProductNameInput !== '')
    //   queryParams['searchProductName'] = this.filters['searchProductName'];
    console.log(this.filters)
    if(this.filters['name_like'] !== "")
      queryParams['name_like'] = this.filters['name_like']

    this.router.navigate([], {
      queryParams: queryParams,
    });
  }

  changePage(page:number):void{
    this.pagination.page = page;
    // Sayfayı güncelledikten sonra ikinci sayfayı göstermesi için tekrar istekte bulunuyoruz
    this.getProductsList({pagination : this.pagination,filters : this.filters})
  }
}

