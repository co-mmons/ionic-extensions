import { ComponentFactoryResolver, ComponentRef, Injector, Type } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { TypeAndProps } from "./type-and-props";
/**
 * Komponent, który strukturyzuje widok dialogu.
 */
export declare class DialogContent {
    private sanitizer;
    private resolver;
    private injector;
    constructor(sanitizer: DomSanitizer, resolver: ComponentFactoryResolver, injector: Injector);
    header: string;
    messageText: SafeHtml;
    messageComponent: ComponentRef<any>;
    private messageComponentContainer;
    message: string | Type<any> | TypeAndProps<any>;
    ngOnDestroy(): void;
}
