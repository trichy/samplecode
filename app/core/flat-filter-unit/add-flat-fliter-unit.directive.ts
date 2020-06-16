import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[add-flat-fliter-unit]',
})
export class AddFlatFilterDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}


