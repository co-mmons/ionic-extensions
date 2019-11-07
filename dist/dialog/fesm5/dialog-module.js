import { __values, __decorate, __awaiter, __generator } from 'tslib';
import { CommonModule } from '@angular/common';
import { EventEmitter, ComponentRef, Injector, ElementRef, ComponentFactoryResolver, ChangeDetectorRef, ViewChild, ViewContainerRef, Input, Component, ChangeDetectionStrategy, Injectable, NgModule } from '@angular/core';
import { IntlModule } from '@co.mmons/angular-intl';
import { ModalController, IonicModule } from '@ionic/angular';
import { ButtonsModule } from '@co.mmons/ionic-extensions/buttons';
import { DomSanitizer } from '@angular/platform-browser';

var dialogData = Symbol();

var dialogInstance = Symbol();

var Dialog = /** @class */ (function () {
    function Dialog(injector, sanitizer, elementRef, modalController, resolver, changeDetectorRef) {
        this.injector = injector;
        this.sanitizer = sanitizer;
        this.elementRef = elementRef;
        this.modalController = modalController;
        this.resolver = resolver;
        this.changeDetectorRef = changeDetectorRef;
        this.didLoad = new EventEmitter();
    }
    Object.defineProperty(Dialog.prototype, "buttons", {
        get: function () {
            return this._buttons;
        },
        set: function (buttons) {
            this._buttons = buttons;
            this.changeDetectorRef.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dialog.prototype, "message", {
        set: function (message) {
            var e_1, _a;
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
                    var type = void 0;
                    var params = void 0;
                    if (Array.isArray(message)) {
                        type = message.length >= 1 ? message[0] : undefined;
                        params = message.length >= 2 ? message[1] : undefined;
                    }
                    else {
                        type = message;
                    }
                    message = this.resolver.resolveComponentFactory(type).create(this.injector);
                    if (params) {
                        try {
                            for (var _b = __values(Object.keys(params)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var param = _c.value;
                                message.instance[param] = params[param];
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                }
                this.messageComponent = message;
                this.messageComponent.instance[dialogInstance] = this;
                this.messageComponentContainer.insert(this.messageComponent.hostView);
            }
        },
        enumerable: true,
        configurable: true
    });
    /*private*/ Dialog.prototype.buttonClicked = function (button) {
        var value = this.messageComponent && this.messageComponent.instance[dialogData] ? this.messageComponent.instance[dialogData]() : undefined;
        if (button.handler) {
            var res = button.handler(value);
            if ((typeof res === "boolean" && res) || typeof res !== "boolean") {
                this.modalController.dismiss(value, button.role);
            }
            return;
        }
        else {
            this.modalController.dismiss(button.role !== "cancel" ? value : undefined, button.role);
        }
    };
    Dialog.prototype.ngOnDestroy = function () {
        if (this.messageComponent) {
            this.messageComponent.instance[dialogInstance] = undefined;
            this.messageComponent.destroy();
        }
    };
    Dialog.prototype.ngOnInit = function () {
        var modal = this.elementRef.nativeElement.closest("ion-modal");
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
    };
    Dialog.prototype.ionViewDidEnter = function () {
        var input = this.elementRef.nativeElement.querySelector("input");
        if (input) {
            input.focus();
        }
    };
    Dialog.ctorParameters = function () { return [
        { type: Injector },
        { type: DomSanitizer },
        { type: ElementRef },
        { type: ModalController },
        { type: ComponentFactoryResolver },
        { type: ChangeDetectorRef }
    ]; };
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
            styles: [":host-context(.md){--ionx--message-font-size:16px;--ionx--header-font-size:20px;--ionx--text-align:left}:host-context(.ios){--ionx--message-font-size:15px;--ionx--header-font-size:18px;--ionx--text-align:center;--ionx--buttons-align:center;--ionx--header-font-weight:600}:host{display:-webkit-box;display:flex;contain:content;position:relative}:host [ionx--message]{font-size:var(--ionx--message-font-size);text-align:var(--ionx--text-align);margin:16px 16px 24px}:host [ionx--header]{font-size:var(--ionx--header-font-size);font-weight:var(--ionx--header-font-weight,500);margin:16px;text-align:var(--ionx--text-align)}:host ion-footer ion-toolbar{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--min-height:none;--ion-safe-area-bottom:0px;--ion-safe-area-top:0px;--ion-safe-area-start:0px;--ion-safe-area-end:0px;--ion-toolbar-background:#ffffff;--ion-toolbar-background-color:#ffffff}:host ion-footer ionx-buttons{-webkit-box-pack:var(--ionx--buttons-align,flex-end);justify-content:var(--ionx--buttons-align,flex-end)}:host ion-footer ion-button{min-height:44px}:host ion-footer ion-button:not(:last-child){font-weight:400}:host ion-footer ion-button:last-child{font-weight:600}:host-context(.md) ion-footer ion-toolbar{--padding-bottom:8px}:host-context(.md) ion-footer::before{display:none}:host-context(.ios) ion-footer ion-button{-webkit-box-flex:1;flex:1}:host-context(.ios) ion-footer ion-button:not(:first-child){border-left:.55px solid var(--ion-toolbar-border-color,var(--ion-border-color,var(--ion-color-step-150,rgba(0,0,0,.2))))}"]
        })
    ], Dialog);
    return Dialog;
}());

var DialogController = /** @class */ (function () {
    function DialogController(modalController) {
        this.modalController = modalController;
    }
    DialogController.prototype.create = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.modalController.create(Object.assign({}, options, {
                        component: Dialog,
                        componentProps: {
                            header: options.header,
                            message: options.message,
                            buttons: options.buttons
                        }
                    }))];
            });
        });
    };
    /**
     * When `id` is not provided, it dismisses the top overlay.
     */
    DialogController.prototype.dismiss = function (data, role, id) {
        return this.modalController.dismiss(data, role, id);
    };
    DialogController.ctorParameters = function () { return [
        { type: ModalController }
    ]; };
    DialogController = __decorate([
        Injectable()
    ], DialogController);
    return DialogController;
}());

var DialogModule = /** @class */ (function () {
    function DialogModule() {
    }
    DialogModule = __decorate([
        NgModule({
            declarations: [Dialog],
            imports: [IntlModule, IonicModule, CommonModule, ButtonsModule],
            entryComponents: [Dialog],
            providers: [DialogController]
        })
    ], DialogModule);
    return DialogModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Dialog, DialogController, DialogModule, dialogData, dialogInstance };
//# sourceMappingURL=dialog-module.js.map
