import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'category/:categoryId', component: HomePageComponent }, // Route parametrelerimi : ile yazacağım. Değişiklik gösteren yerler  (domain'den sonraki yerler) için  : kullanıyoruz.id numarası gibi.




 //İlgili categorideki elemanlara tıkladığımda productList'e göndermesini istiyorum. homepage'e yönlendirdik çünkü productList'imiz orada.
  // pathMatch :full=> path'imiz sadece '' içermeli diyoruz./customer dediğimizde bu component görüntülenmeyecek.Aksi halde görüntülenir.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


