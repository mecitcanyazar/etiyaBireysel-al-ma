import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,  Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  title: string = 'Category List';
  //: ! Şuan undefined olduğu için kızma, daha sonra seni atacağım şeklinde söz vermiş oluyoruz.
  //: ? Bu özellik undefined olabilir demek.
  //: null için ? kullanamıyoruz, | null diye belirtmemiz gerekiyor.
  categories!: Category[];

  //# Encapsulation
  private _categoriesListItems: any[] = [{ label: 'All', value: null }];
  //# Getter
    // Getter ile private içinde gizlediğim değişkene ulaşabiliyorum.
    // get kullanarak return ettiğim categoriesListItems()'ı category-listcomponent.html sayfasında ilgili değişkenin adını yazarak ulaşıyorum ve sadece bu durumda bu kod bloğu çalışıyor.
  get categoriesListItems(): any[] {
    if(!this.categories) return this._categoriesListItems // categories'i başta tanımladığımız için api'den veriyi henüz çekmemişken burası map methoduna ulaşamıyor ve hata veriyordu.
     // property
    // get yazınca method olarak değil de property olarak davranıyor.(Yukarıdaki categories gibi.)

    // Yukarıda categoriesListItems'ı array olarak tanımladığım için spread operatör kullanıp array'in içindeki objeleri aldım.
    // Yine aynı şekilde categories'dekileri de spread operaör kullanarak aldım.
    // Yukarıda private içinde _categoriesListItems array tipinde olduğundann burda da array return edip bunları parametre olarak gönderdik.


    return [
      ...this._categoriesListItems,
      ...this.categories.map((c) => {
        return { label: c.name, value: c.id };
      }),
    ];
  }
  //# Setter
  set categoriesListItems(value: any[]) {
    this._categoriesListItems = value;
  }
  // console.log(this.categoriesListItems); // Get
  // this.categoriesListItems = []; // Set

  //: private, public, protected
  //: private: sadece class içerisinde kullanılabilir.
  //: public: her yerden kullanılabilir.
  //: Default olarak herşey public'tir.
  //: protected: sadece class içerisinde ve class'ın inherit edildiği yerlerde kullanılabilir.
  public selectedCategoryId: number | null = null;

  // private activatedRoute: ActivatedRoute;
  //: IoC (Inversion of Control), referansların tutulduğu bir container'dır.
  //: Dependency Injection, IoC container'ın içerisindeki referansları kullanmamızı sağlayan bir mekanizmadır.
  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private categoriesService: CategoriesService
  ) {
    //: constructor class oluşturulduğu an çalışır.
    // this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
    //: ngOnInit() methodu component'in yerleştirildiği an çalışır.
    this.getSelectedCategoryIdFromRoute();
    this.getListCategories();
  }

  getListCategories() {
    this.categoriesService.getList().subscribe((response) => {
        this.categories = response;
    });
  }

  getSelectedCategoryIdFromRoute() {
    //* Observer Design Pattern
    this.activatedRoute.params.subscribe((params) => {
      // console.log(params) // çıktısı {categoryId: '1'}

        // All'dan ilk categoriye tıkladığımda category/categoryId pathindeki categoryId değişmesine rağmen routeparams değeri null olarak göründüğü (selectedCategoryId == null çünkü.) için değişmiyor.
        // Bu yüzden ordaki categoryId değerini gözlemlemem lazım.Observer (Gözlemlenen) bu yüzden o değere subscribe oluyorum.
        // Eğer bu değer domain'in arkasından gelen (/) params değil de queryParams olsaydı(?frfj) o zaman değerim de queryParams olarak değişecekti.
      if (params['categoryId'] !== undefined)
        this.selectedCategoryId = Number(params['categoryId']);
    }); //* Callback
  }

  onSelectedCategory(categoryId: number | null): void {
    // if (category === null) this.selectedCategoryId = null;
    // else this.selectedCategoryId = category.id;

    // # Debugging
    // debugger; // breakpoint. Uygulama çalışma anında bu satıra geldiğinde uygulama durucak ve adım adım takip edebileceğimiz bir panel açılacak.

    // # ternary operator
    // this.selectedCategoryId = category === null ? null : category.id;

    // # optional chaining operator
    // : object?.id dediğimiz zaman, object null değilse ve id'e ulaşabiliyorsa id'sini alır, null ise null döner.

    // # nullish coalescing operator
    // : ?? operatörü ile sol taraf false (null, undefined, 0, "") ise sağ tarafı atar.
    // this.selectedCategoryId = categoryId ?? null; //: getSelectedCategoryIdFromRoute() methodu ile aynı işi yapıyor.

    // let routeByUrl = '/'
    // if(this.selectedCategoryId !==null) routeByUrl += 'categoris/' + this.selectedCategoryId
    // this.router.navigateByUrl(routeByUrl, {queryParams:})

    // navigate array halinde navigateByUrl string halinde syntax olarak. Yukarıdaki yorum satırı aşağıdakinin string formatı aynı işlem.

        // !! NOT BAŞLANGIÇ
    //: Herhangi bir kategoride aradığmız değerin filtrelendikten sonra click ile kategori değiştirdiğimizde de default olarak orda arama yapması için aşağıdaki işlemleri yaptık.
        // Html tarafında routerLink ile routing yapmıştık onu yoruma alıp bu şekilde ilerledik.

    let route = ['/'];

    if(categoryId !== null) {
      route.push('category', categoryId!.toString());
    }
      this.activatedRoute.queryParams.subscribe((queryParams)=> {
      this.router.navigate(route, {queryParams });
        // {queryParams:queryParams} kısayolu {queryParams} key ile parametre aynı ise bu şekilde yazabilirim.
    })

      // !! NOT SONU
  }


  isSelectedCategory(categoryId: number | null): boolean {
    return categoryId === this.selectedCategoryId;
      // Burda da karşılaştırma yaptırıyorum ve categoryId ile ilgili methoddan dönen değer eşitse return et.

  }
}
