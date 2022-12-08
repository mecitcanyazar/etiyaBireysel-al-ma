import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appButton]'
})
export class ButtonDirective implements OnInit  {
  @Input() appButton!: "btn-primary" | "btn-secondary"| "btn-dark"

  constructor(private el:ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.classList.add(this.appButton)
  }

   @HostListener('mouseenter') // ilk parametre hangi host eventi ile çalışmasını istiyorsak onu soyluyrouz.(mouseenter burada.)
   onMouseEnter() {
     this.el.nativeElement.classList.toggle('btn-secondary')
    }


   @HostListener('mouseleave') // ilk parametre hangi host eventi ile çalışmasını istiyorsak onu soyluyrouz.(mouseenter burada.)
   onMouseLeave() {
     this.el.nativeElement.classList.toggle('btn-dark')
   }
}
