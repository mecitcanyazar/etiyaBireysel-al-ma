import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AlertComponent } from './components/alert/alert.component';
import { LoadingInterceptor } from '../interceptors/loading.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IfNotDirective } from '../core/directives/if-not.directive';


@NgModule({
  declarations: [AlertComponent,NavbarComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ],
  exports:[AlertComponent,NavbarComponent],
  providers:[
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
  ]
})
export class SharedModule { }
