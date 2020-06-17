import { ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Injector, OnDestroy, OnInit, Type } from "@angular/core";
import { DialogButton } from "./dialog-button";
import { TypeAndProps } from "./type-and-props";
export declare class Dialog implements OnInit, OnDestroy {
    elementRef: ElementRef<HTMLElement>;
    protected resolver: ComponentFactoryResolver;
    protected injector: Injector;
    constructor(elementRef: ElementRef<HTMLElement>, resolver: ComponentFactoryResolver, injector: Injector);
    readonly didLoad: EventEmitter<any>;
    value: () => any;
    message: string | Type<any> | TypeAndProps<any>;
    header: string;
    buttons: DialogButton[];
    width: string;
    private componentContainer;
    componentRef: ComponentRef<any>;
    set component(component: Type<any> | [Type<any>, {
        [param: string]: any;
    }]);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ionViewDidEnter(): void;
    ionViewDidLeave(): void;
    ionViewWillEnter(): void;
    ionViewWillLeave(): void;
}
