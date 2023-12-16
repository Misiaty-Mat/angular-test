import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements OnInit {

  @Input() appHover: string = 'red';

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.element.nativeElement.style.backgroundColor = this.appHover;
    this.renderer.setStyle(this.element.nativeElement, 'color', 'blue');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = 'green';
    this.renderer.setStyle(this.element.nativeElement, 'color', 'blue');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.element.nativeElement.style.backgroundColor = this.appHover;
    this.renderer.setStyle(this.element.nativeElement, 'color', 'blue');
  }
}
