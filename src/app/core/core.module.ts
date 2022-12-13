import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { OverlayLoadingComponent } from './components/overlay-loading/overlay-loading.component';
import { IfNotDirective } from './directives/if-not.directive';

@NgModule({
  declarations: [OverlayLoadingComponent,IfNotDirective],
  imports: [
    CommonModule,
    CoreRoutingModule,

  ],
  exports:[OverlayLoadingComponent,IfNotDirective]
})
export class CoreModule { }
