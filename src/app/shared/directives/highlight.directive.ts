import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input() appHighlight:string = 'red'

  constructor(private el:ElementRef) {
    // çalışacak body
    // ilgili elemente ulaşma (bu direktive'in kullanıldığı element mesela h5 ElementRef ile ulaşıyorum.)
    // HOSTLISTENER ile bu elementin mouse'nin üzerine geldiğinde,tıkladğında gibi event'ler atayabiliyorum.
    this.el.nativeElement.style.color ='red'
  }

  @HostListener('mouseenter') // ilk parametre hangi host eventi ile çalışmasını istiyorsak onu soyluyrouz.(mouseenter burada.)
  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.appHighlight

  }
          // ! HostListener Kaynak
  // https://angular.io/api/core/HostListener
  // https://www.w3.org/TR/DOM-Level-3-Events-key/#named-key-attribute-values   // Klavye tuşları keyleri
  // https://stackoverflow.com/questions/47771120/angular-is-there-list-of-hostlistener-events
  // https://www.w3schools.com/jsref/dom_obj_event.asp

  @HostListener('mouseleave') // ilk parametre hangi host eventi ile çalışmasını istiyorsak onu soyluyrouz.(mouseenter burada.)

  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = ''

  }

}



// buton directive oluştur 3 farklı buton alssın primary,secondary,dark



// Filtreleme alanı ekle bu filtrelerin tümünü oluşturacak bir filter pipe yap ve bunu filters:objesinden alsın.
