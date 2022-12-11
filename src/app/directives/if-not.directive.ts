import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngIfNot]',
})
export class IfNotDirective implements OnInit {
  private condition = false;


  private hasView = false
  // ViewContainerRef => direktifin uygulandığı elementin kendisi (parent)
  // TemplateRef => direktifin uygulandığı elementin altındaki elementler (childlar)
  constructor(
    private _viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  @Input()
  set ngIfNot(condition: boolean) {
    // this.condition = condition
    this.displayTemplate()
    // => gelen condition (boolean) false ise elemenları göster
    if (condition === false && !this.hasView)  {
      this._viewContainer.clear();
      this._viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }
    else if (condition === true && this.hasView){
      this._viewContainer.clear();
      this.hasView = false;
    }

  }

  @Input() ngIfNotElse?: TemplateRef<unknown>;


  ngOnInit(): void {
    this.displayTemplate();
  }

  private displayTemplate() {
    this._viewContainer.clear();
    if (this.condition) {
      this._viewContainer.createEmbeddedView(this.templateRef);
    }
    else if (this.ngIfNotElse) {
      this._viewContainer.createEmbeddedView(this.ngIfNotElse);
    }
  }
}





