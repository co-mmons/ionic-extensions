import { TemplateRef, ViewContainerRef } from "@angular/core";
export declare class SelectLabel {
    readonly templateRef: TemplateRef<any>;
    readonly viewContainer: ViewContainerRef;
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef);
    separator: string;
}
