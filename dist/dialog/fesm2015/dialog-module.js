import { __decorate, __awaiter } from 'tslib';
import { CommonModule } from '@angular/common';
import { EventEmitter, ComponentRef, Injector, ElementRef, ComponentFactoryResolver, ChangeDetectorRef, ViewChild, ViewContainerRef, Input, Component, ChangeDetectionStrategy, Injectable, NgModule } from '@angular/core';
import { IntlModule } from '@co.mmons/angular-intl';
import { ModalController, IonicModule } from '@ionic/angular';
import { ButtonsModule } from '@co.mmons/ionic-extensions/buttons';
import { DomSanitizer } from '@angular/platform-browser';

const dialogData = Symbol();

const dialogInstance = Symbol();

let Dialog = class Dialog {
    constructor(injector, sanitizer, elementRef, modalController, resolver, changeDetectorRef) {
        this.injector = injector;
        this.sanitizer = sanitizer;
        this.elementRef = elementRef;
        this.modalController = modalController;
        this.resolver = resolver;
        this.changeDetectorRef = changeDetectorRef;
        this.didLoad = new EventEmitter();
    }
    set buttons(buttons) {
        this._buttons = buttons;
        this.changeDetectorRef.detectChanges();
    }
    get buttons() {
        return this._buttons;
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
            if (!(message instanceof ComponentRef)) {
                let type;
                let params;
                if (Array.isArray(message)) {
                    type = message.length >= 1 ? message[0] : undefined;
                    params = message.length >= 2 ? message[1] : undefined;
                }
                else {
                    type = message;
                }
                message = this.resolver.resolveComponentFactory(type).create(this.injector);
                if (params) {
                    for (const param of Object.keys(params)) {
                        message.instance[param] = params[param];
                    }
                }
            }
            this.messageComponent = message;
            this.messageComponent.instance[dialogInstance] = this;
            this.messageComponentContainer.insert(this.messageComponent.hostView);
        }
    }
    /*private*/ buttonClicked(button) {
        const value = this.messageComponent && this.messageComponent.instance[dialogData] ? this.messageComponent.instance[dialogData]() : undefined;
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
    ngOnDestroy() {
        if (this.messageComponent) {
            this.messageComponent.instance[dialogInstance] = undefined;
            this.messageComponent.destroy();
        }
    }
    ngOnInit() {
        const modal = this.elementRef.nativeElement.closest("ion-modal");
        modal.style.setProperty("--width", "300px");
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
    ionViewDidEnter() {
        const input = this.elementRef.nativeElement.querySelector("input");
        if (input) {
            input.focus();
        }
    }
};
Dialog.ctorParameters = () => [
    { type: Injector },
    { type: DomSanitizer },
    { type: ElementRef },
    { type: ModalController },
    { type: ComponentFactoryResolver },
    { type: ChangeDetectorRef }
];
__decorate([
    ViewChild("messageComponentContainer", { read: ViewContainerRef, static: true })
], Dialog.prototype, "messageComponentContainer", void 0);
__decorate([
    Input()
], Dialog.prototype, "header", void 0);
__decorate([
    Input()
], Dialog.prototype, "buttons", null);
__decorate([
    Input()
], Dialog.prototype, "message", null);
Dialog = __decorate([
    Component({
        selector: "ionx-dialog",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<div ionx--content>\n\n    <div ionx--header *ngIf=\"!!header\">{{header}}</div>\n\n    <div ionx--message>\n\n        <div [innerHTML]=\"messageText\" *ngIf=\"!!messageText\"></div>\n\n        <ng-template #messageComponentContainer></ng-template>\n\n    </div>\n\n</div>\n\n<ion-footer *ngIf=\"_buttons && _buttons.length > 0\">\n    <ion-toolbar>\n        <ionx-buttons>\n\n            <ion-button fill=\"clear\" [color]=\"button.color || 'primary'\" [size]=\"button.size\" (click)=\"buttonClicked(button)\" *ngFor=\"let button of _buttons\">\n                <span>{{button.text}}</span>\n            </ion-button>\n\n        </ionx-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
        styles: [":host-context(.md){--ionx--message-font-size:16px;--ionx--header-font-size:20px;--ionx--text-align:left}:host-context(.ios){--ionx--message-font-size:15px;--ionx--header-font-size:18px;--ionx--text-align:center;--ionx--buttons-align:center;--ionx--header-font-weight:500}:host{display:-webkit-box;display:flex;contain:content;position:relative}:host [ionx--message]{font-size:var(--ionx--message-font-size);text-align:var(--ionx--text-align);margin:16px 16px 24px}:host [ionx--header]{font-size:var(--ionx--header-font-size);font-weight:var(--ionx--header-font-weight,500);margin:16px;text-align:var(--ionx--text-align)}:host ion-footer ion-toolbar{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--min-height:none;--ion-safe-area-bottom:0px;--ion-safe-area-top:0px;--ion-safe-area-start:0px;--ion-safe-area-end:0px;--ion-toolbar-background:#ffffff;--ion-toolbar-background-color:#ffffff}:host ion-footer ionx-buttons{-webkit-box-pack:var(--ionx--buttons-align,flex-end);justify-content:var(--ionx--buttons-align,flex-end)}:host ion-footer ion-button{min-height:44px}:host ion-footer ion-button:not(:last-child){font-weight:400}:host ion-footer ion-button:last-child{font-weight:500}:host-context(.md) ion-footer ion-toolbar{--padding-bottom:8px}:host-context(.md) ion-footer::before{display:none}:host-context(.ios) ion-footer ion-button{-webkit-box-flex:1;flex:1}:host-context(.ios) ion-footer ion-button:not(:first-child){border-left:.55px solid var(--ion-toolbar-border-color,var(--ion-border-color,var(--ion-color-step-150,rgba(0,0,0,.2))))}"]
    })
], Dialog);

let DialogController = class DialogController {
    constructor(modalController) {
        this.modalController = modalController;
    }
    create(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.modalController.create(Object.assign({}, options, {
                component: Dialog,
                componentProps: {
                    header: options.header,
                    message: options.message,
                    buttons: options.buttons
                }
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
        declarations: [Dialog],
        imports: [IntlModule, IonicModule, CommonModule, ButtonsModule],
        entryComponents: [Dialog],
        providers: [DialogController]
    })
], DialogModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Dialog, DialogController, DialogModule, dialogData, dialogInstance };
//# sourceMappingURL=dialog-module.js.map
