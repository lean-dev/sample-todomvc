import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[set-focused]',
})
export class SetFocusedDirective implements OnChanges, OnInit {
  private isFocused = true;

  @Input('set-focused')
  set setFocused(value: boolean | '') {
    this.isFocused = value === '' || value;
  }

  constructor(private elt: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['setFocused'].isFirstChange()) return;

    this.ngOnInit();
  }

  ngOnInit(): void {
    if (this.isFocused) {
      this.elt.nativeElement.focus();
    }
  }
}
