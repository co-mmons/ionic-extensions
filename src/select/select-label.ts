import {Directive, TemplateRef, ViewContainerRef, Input} from "@angular/core";

@Directive({
    selector: "[ionxSelectLabel]"
})
export class SelectLabel {

    constructor(public readonly templateRef: TemplateRef<any>, public readonly viewContainer: ViewContainerRef) {
    }

    @Input()
    separator: string = ", ";
}