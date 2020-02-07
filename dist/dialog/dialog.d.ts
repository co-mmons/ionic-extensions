import { ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Injector, OnDestroy, OnInit, Type } from "@angular/core";
import { DialogButton } from "./dialog-button";
import { DialogOptions } from "./dialog-options";
export declare class Dialog implements OnInit, OnDestroy, DialogOptions {
    elementRef: ElementRef<HTMLElement>;
    protected resolver: ComponentFactoryResolver;
    protected injector: Injector;
    constructor(elementRef: ElementRef<HTMLElement>, resolver: ComponentFactoryResolver, injector: Injector);
    readonly didLoad: EventEmitter<any>;
    value: any;
    message: string | Type<any> | [Type<any>, {
        [param: string]: any;
    }];
    header: string;
    buttons: DialogButton[];
    private bodyContainer;
    bodyComponent: ComponentRef<any>;
    body: Type<any> | [Type<any>, {
        [param: string]: any;
    }];
    ngOnInit(): void;
    ngOnDestroy(): void;
    ionViewDidEnter(): void;
}
