import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Subject, concatMap, debounceTime, fromEvent, of, switchMap, throttleTime } from 'rxjs';

@Directive({
  selector: '[appInfinityScroll]',
  // outputs:['onScrollDown'],
  standalone: true
})
export class GeraInfinityScrollDirective implements OnInit {

  constructor(/* private readonly element: ElementRef */) { }

  @Output('onScrollDown') onScrollDown: EventEmitter<any> = new EventEmitter();
  @Input('execEvent') execEvent: boolean = false;
  private lastScrollTop = 0; // Variable para guardar la última posición de scroll


  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {

    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop; // Posición actual del scroll vertical
    const scrollHeight = target.scrollHeight; // Altura total del contenido del elemento
    const clientHeight = target.clientHeight; // Altura visible del elemento
    let currentScroll = scrollTop; // Obtiene la posición actual de scroll

    if (currentScroll < this.lastScrollTop) {
      this.lastScrollTop = currentScroll; // Actualiza la última posición de scroll
      return
    }

    this.lastScrollTop = currentScroll; // Actualiza la última posición de scroll

    // Verificar que ya se ha llegado al final del elemento y no hay mas 
    if (target.scrollTop + target.clientHeight > target.scrollHeight - 20) {
      this.onScrollDown.emit();
      console.log('emit')

      // if (!this.hasReachedBottom(target)){
      //   this.onScrollDown.emit();
      // }
    }

  }

  private hasReachedBottom(target: HTMLElement): boolean {
    const distanceFromBottom = target.scrollHeight - target.scrollTop - target.clientHeight;

    return distanceFromBottom <= 20 ? false : true;
  }

  ngOnInit(): void { }

}
