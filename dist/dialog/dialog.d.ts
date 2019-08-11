import { ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Injector, OnDestroy, OnInit, Type } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ModalController } from "@ionic/angular";
import { DialogButton } from "./dialog-button";
import { DialogOptions } from "./dialog-options";
export declare class Dialog implements OnInit, OnDestroy, DialogOptions {
    private injector;
    private sanitizer;
    elementRef: ElementRef<HTMLElement>;
    private modalController;
    protected resolver: ComponentFactoryResolver;
    private changeDetectorRef;
    constructor(injector: Injector, sanitizer: DomSanitizer, elementRef: ElementRef<HTMLElement>, modalController: ModalController, resolver: ComponentFactoryResolver, changeDetectorRef: ChangeDetectorRef);
    messageText: SafeHtml;
    messageComponent: ComponentRef<any>;
    private messageComponentContainer;
    header: string;
    _buttons: DialogButton[];
    buttons: DialogButton[];
    readonly didLoad: EventEmitter<any>;
    message: string | ComponentRef<any> | Type<any> | [Type<any>, {
        [param: string]: any;
    }];
    buttonClicked(button: DialogButton): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    ionViewDidEnter(): void;
}
