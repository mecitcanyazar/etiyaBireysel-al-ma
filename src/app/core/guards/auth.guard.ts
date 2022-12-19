import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router,private authService:AuthService) {} //False döndüreceksek sayfayı görüntüleyemeyeceğimiz için görüntüleyebildiğimiz bir yere yönlendirmek isteriz bu yüzden router kullanırız
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // eğer false dönersek bu guard'ı uyguladığımız tüm route'lar erişilemez olacak.

    // kullanıcı giriş yapmış mı bak kontrol et ve buna göre true ya da false döndür.
    // JWt - Json Web Token
    // IP Configuration

    // Giriş yap,JWT'yi sakla,JWt var mı  ? JWT'nin süresi geçmiş mi kontrol et
    // Eğer var ve süresi geçmemişse return true
    // Yok veya süresi geçmişse return false

    //localstorage
    if (!this.authService.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return false;
    }
      return true;
  }

}
