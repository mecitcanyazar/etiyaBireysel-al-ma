import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Requesti ve response'u manipüle etme
    // Eğer uygulamada o an bir request gönderilmiş ve cevap bekleniyorsa uygulama loading ekranı göstersin.
    // console.log("Loading started...")
    this.loadingService.startLoading()
    // cevap geldiğinde => loading stopped
    // rxjs
    //! TODO:Add Loading event
    return next.handle(request).pipe(
      finalize(()=>{
        // requestin response döndüğünü ve sonlandığını ele alan fonksiyon
        // console.log('Request bittiğinde çalışacak fonksiyon')
        this.loadingService.stopLoading()
      })
    )
  }
}
