import { __decorate, __awaiter } from 'tslib';
import { CommonModule } from '@angular/common';
import { EventEmitter, ElementRef, ComponentFactoryResolver, Injector, Input, ViewChild, ViewContainerRef, Component, ChangeDetectionStrategy, Injectable, NgModule } from '@angular/core';
import { IntlModule } from '@co.mmons/angular-intl';
import { ButtonsModule } from '@co.mmons/ionic-extensions/buttons';
import { ModalController, IonicModule } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { createAnimation } from '@ionic/core/';

let Dialog = class Dialog {
    constructor(elementRef, resolver, injector) {
        this.elementRef = elementRef;
        this.resolver = resolver;
        this.injector = injector;
        this.didLoad = new EventEmitter();
    }
    set component(component) {
        if (component) {
            this.componentContainer.clear();
            let type;
            let params;
            if (Array.isArray(component)) {
                type = component.length >= 1 ? component[0] : undefined;
                params = component.length >= 2 ? component[1] : undefined;
            }
            else {
                type = component;
            }
            const componentRef = this.resolver.resolveComponentFactory(type).create(this.injector);
            if (params) {
                for (const param of Object.keys(params)) {
                    componentRef.instance[param] = params[param];
                }
            }
            this.componentRef = componentRef;
            this.componentContainer.insert(this.componentRef.hostView);
        }
    }
    ngOnInit() {
        const modal = this.elementRef.nativeElement.closest("ion-modal");
        modal.style.setProperty("--width", this.width || "300px");
        modal.style.setProperty("--height", "auto");
        modal.style.setProperty("--max-width", "90%");
        modal.style.setProperty("--max-height", "90%");
        if (document.querySelector("html.ios")) {
            modal.style.setProperty("--border-radius", "10px");
        }
        else {
            modal.style.setProperty("--border-radius", "4px");
            modal.style.setProperty("--box-shadow", "0 28px 48px rgba(0,0,0,0.4)");
        }
    }
    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
        this.value = undefined;
    }
    ionViewDidEnter() {
        const input = this.elementRef.nativeElement.querySelector("input");
        if (input) {
            input.focus();
        }
    }
};
Dialog.ctorParameters = () => [
    { type: ElementRef },
    { type: ComponentFactoryResolver },
    { type: Injector }
];
__decorate([
    Input()
], Dialog.prototype, "message", void 0);
__decorate([
    Input()
], Dialog.prototype, "header", void 0);
__decorate([
    Input()
], Dialog.prototype, "buttons", void 0);
__decorate([
    Input()
], Dialog.prototype, "width", void 0);
__decorate([
    ViewChild("componentContainer", { read: ViewContainerRef, static: true })
], Dialog.prototype, "componentContainer", void 0);
__decorate([
    Input()
], Dialog.prototype, "component", null);
Dialog = __decorate([
    Component({
        selector: "ionx-dialog",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-container *ngIf=\"!componentRef\">\n\n    <ionx-dialog-content [header]=\"header\" [message]=\"message\"></ionx-dialog-content>\n\n    <ionx-dialog-buttons [buttons]=\"buttons\"></ionx-dialog-buttons>\n\n</ng-container>\n\n<ng-template #componentContainer></ng-template>\n",
        styles: [":host{--dialog--background-color:var(--background-color, var(--ion-background-color, #ffffff));--dialog--foreground-color:var(--foreground-color, var(--ion-text-color));--dialog--border-color:var(--border-color, var(--ion-border-color));display:-webkit-box;display:flex;contain:content;position:relative;color:var(--dialog--foreground-color)}:host-context(.md){--dialog--message-font-size:16px;--dialog--header-font-size:20px;--dialog--text-align:left}:host-context(.ios){--dialog--message-font-size:15px;--dialog--header-font-size:18px;--dialog--text-align:left;--dialog--buttons-align:center;--dialog--header-font-weight:500}"]
    })
], Dialog);

/**
 * Komponent, który strukturyzuje widok dialogu.
 */
let DialogButtons = class DialogButtons {
    constructor(injector, modalController) {
        this.injector = injector;
        this.modalController = modalController;
    }
    /*private*/ buttonClicked(button) {
        const dialog = this.injector.get(Dialog);
        const value = dialog && dialog.value && dialog.value();
        if (button.handler) {
            const res = button.handler(value);
            if ((typeof res === "boolean" && res) || typeof res !== "boolean") {
                this.modalController.dismiss(value, button.role);
            }
            return;
        }
        else {
            this.modalController.dismiss(button.role !== "cancel" ? value : undefined, button.role);
        }
    }
};
DialogButtons.ctorParameters = () => [
    { type: Injector },
    { type: ModalController }
];
__decorate([
    Input()
], DialogButtons.prototype, "buttons", void 0);
DialogButtons = __decorate([
    Component({
        selector: "ionx-dialog-buttons",
        template: "<ion-footer *ngIf=\"buttons && buttons.length > 0\">\n    <ion-toolbar>\n        <ionx-buttons>\n\n            <ion-button fill=\"clear\" [style.flex]=\"button.flex || 1\" [color]=\"button.color || 'primary'\" [size]=\"button.size\" (click)=\"buttonClicked(button)\" *ngFor=\"let button of buttons\">\n                <span *ngIf=\"!!button.text\">{{button.text}}</span>\n                <ion-icon [icon]=\"button.icon\" [slot]=\"button.text ? 'start' : 'icon-only'\" *ngIf=\"button.icon\"></ion-icon>\n            </ion-button>\n\n        </ionx-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
        styles: [":host{display:block}:host ion-footer{--border-color:var(--dialog--border-color)}:host ion-footer ion-toolbar{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--min-height:none;--ion-safe-area-bottom:0px;--ion-safe-area-top:0px;--ion-safe-area-start:0px;--ion-safe-area-end:0px;--ion-toolbar-background:var(--dialog--background-color, #ffffff);--ion-toolbar-background-color:var(--dialog--background-color, #000000);--ion-toolbar-color:var(--dialog--foreground-color, #000000)}:host ion-footer ionx-buttons{-webkit-box-pack:var(--dialog--buttons-align,flex-end);justify-content:var(--dialog--buttons-align,flex-end)}:host ion-footer ion-button{min-height:44px}:host ion-footer ion-button:not(:last-child){font-weight:400}:host ion-footer ion-button:last-child{font-weight:500}:host-context(.md) ion-footer ion-toolbar{--padding-bottom:8px}:host-context(.md) ion-footer::before{display:none}:host-context(.md) ion-footer ion-button{-webkit-box-flex:0!important;flex:none!important}:host-context(.ios) ion-footer ion-button{-webkit-box-flex:1;flex:1}:host-context(.ios) ion-footer ion-button:not(:first-child){border-left:.55px solid var(--dialog--border-color)}"]
    })
], DialogButtons);

/**
 * Komponent, który strukturyzuje widok dialogu.
 */
let DialogContent = class DialogContent {
    constructor(sanitizer, resolver, injector) {
        this.sanitizer = sanitizer;
        this.resolver = resolver;
        this.injector = injector;
    }
    set message(message) {
        if (typeof message === "string") {
            this.messageText = this.sanitizer.bypassSecurityTrustHtml(message);
            if (this.messageComponent) {
                this.messageComponent.destroy();
            }
            this.messageComponent = undefined;
        }
        else if (message) {
            this.messageText = undefined;
            this.messageComponentContainer.clear();
            let type;
            let params;
            if (Array.isArray(message)) {
                type = message.length >= 1 ? message[0] : undefined;
                params = message.length >= 2 ? message[1] : undefined;
            }
            else {
                type = message;
            }
            const componentRef = this.resolver.resolveComponentFactory(type).create(this.injector);
            if (params) {
                for (const param of Object.keys(params)) {
                    componentRef.instance[param] = params[param];
                }
            }
            this.messageComponent = componentRef;
            this.messageComponentContainer.insert(this.messageComponent.hostView);
        }
    }
    ngOnDestroy() {
        if (this.messageComponent) {
            this.messageComponent.destroy();
        }
    }
};
DialogContent.ctorParameters = () => [
    { type: DomSanitizer },
    { type: ComponentFactoryResolver },
    { type: Injector }
];
__decorate([
    Input()
], DialogContent.prototype, "header", void 0);
__decorate([
    ViewChild("messageComponentContainer", { read: ViewContainerRef, static: true })
], DialogContent.prototype, "messageComponentContainer", void 0);
__decorate([
    Input()
], DialogContent.prototype, "message", null);
DialogContent = __decorate([
    Component({
        selector: "ionx-dialog-content",
        template: "<div ionx--header *ngIf=\"!!header\">{{header}}</div>\n\n<div ionx--message>\n\n    <div [innerHTML]=\"messageText\" *ngIf=\"!!messageText\"></div>\n\n    <ng-template #messageComponentContainer></ng-template>\n\n    <ng-content content=\"[ionx-dialog-message]\"></ng-content>\n\n</div>\n",
        styles: [":host{background:var(--dialog--background-color,#fff);color:var(--dialog--foreground-color);display:block}:host [ionx--message]{font-size:var(--dialog--message-font-size);text-align:var(--dialog--text-align);margin:16px 16px 24px}:host [ionx--header]{font-size:var(--dialog--header-font-size);font-weight:var(--dialog--header-font-weight,500);margin:16px;text-align:var(--dialog--text-align)}"]
    })
], DialogContent);

/**
 * Md Modal Leave Animation
 */
function leaveAnimation(baseEl) {
    const baseAnimation = createAnimation();
    const backdropAnimation = createAnimation();
    const wrapperAnimation = createAnimation();
    const wrapperEl = baseEl.querySelector('.modal-wrapper');
    backdropAnimation
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', 'var(--backdrop-opacity)', 0.0);
    wrapperAnimation
        .addElement(wrapperEl)
        .keyframes([
        { offset: 0, opacity: 0.99, transform: 'translateY(0px)' },
        { offset: 1, opacity: 0, transform: 'translateY(40px)' }
    ]);
    return baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.47,0,0.745,0.715)')
        .duration(200)
        .addAnimation([backdropAnimation, wrapperAnimation]);
}
;
let DialogController = class DialogController {
    constructor(modalController) {
        this.modalController = modalController;
    }
    create(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.modalController.create(Object.assign({}, options, {
                component: Dialog,
                componentProps: {
                    component: options.component,
                    header: options.header,
                    message: options.message,
                    buttons: options.buttons,
                    width: options.width
                },
                leaveAnimation
            }));
        });
    }
    /**
     * When `id` is not provided, it dismisses the top overlay.
     */
    dismiss(data, role, id) {
        return this.modalController.dismiss(data, role, id);
    }
};
DialogController.ctorParameters = () => [
    { type: ModalController }
];
DialogController = __decorate([
    Injectable()
], DialogController);

let DialogModule = class DialogModule {
};
DialogModule = __decorate([
    NgModule({
        declarations: [Dialog, DialogContent, DialogButtons],
        imports: [IntlModule, IonicModule, CommonModule, ButtonsModule],
        exports: [DialogContent, DialogButtons],
        entryComponents: [Dialog],
        providers: [DialogController]
    })
], DialogModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Dialog, DialogButtons, DialogContent, DialogController, DialogModule };
//# sourceMappingURL=dialog-module.js.map
