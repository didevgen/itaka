import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[itaPlaceholder]',
})
export class PlaceholderDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
