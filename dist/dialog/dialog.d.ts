import { ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Injector, OnDestroy, OnInit, Type } from "@angular/core";
import { DialogButton } from "./dialog-button";
export declare class Dialog implements OnInit, OnDestroy {
    elementRef: ElementRef<HTMLElement>;
    protected resolver: ComponentFactoryResolver;
    protected injector: Injector;
    constructor(elementRef: ElementRef<HTMLElement>, resolver: ComponentFactoryResolver, injector: Injector);
    readonly didLoad: EventEmitter<any>;
    value: () => any;
    message: string | Type<any> | [Type<any>, {
        [param: string]: any;
    }];
    header: string;
    buttons: DialogButton[];
    private componentContainer;
    componentRef: ComponentRef<any>;
    component: Type<any> | [Type<any>, {
        [param: string]: any;
    }];
    ngOnInit(): void;
    ngOnDestroy(): void;
    ionViewDidEnter(): void;
}
