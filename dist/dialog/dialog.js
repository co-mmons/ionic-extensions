import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Injector, Input, ViewChild, ViewContainerRef } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ModalController } from "@ionic/angular";
import { dialogData } from "./dialog-data-symbol";
import { dialogInstance } from "./dialog-instance-symbol";
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
                        for (var _i = 0, _a = Object.keys(params); _i < _a.length; _i++) {
                            var param = _a[_i];
                            message.instance[param] = params[param];
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
    tslib_1.__decorate([
        ViewChild("messageComponentContainer", { read: ViewContainerRef, static: true }),
        tslib_1.__metadata("design:type", ViewContainerRef)
    ], Dialog.prototype, "messageComponentContainer", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], Dialog.prototype, "header", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array),
        tslib_1.__metadata("design:paramtypes", [Array])
    ], Dialog.prototype, "buttons", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], Dialog.prototype, "message", null);
    Dialog = tslib_1.__decorate([
        Component({
            selector: "ionx-dialog",
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: "\n        <div ionx--content>\n            \n            <div ionx--header *ngIf=\"!!header\">{{header}}</div>\n            \n            <div ionx--message>\n                \n                <div [innerHTML]=\"messageText\" *ngIf=\"!!messageText\"></div>\n                \n                <ng-template #messageComponentContainer></ng-template>\n                \n            </div>\n            \n        </div>\n        \n        <ion-footer *ngIf=\"_buttons && _buttons.length > 0\">\n            <ion-toolbar>\n                <ionx-buttons>\n                    \n                    <ion-button fill=\"clear\" [color]=\"button.color || 'primary'\" [size]=\"button.size\" (click)=\"buttonClicked(button)\" *ngFor=\"let button of _buttons\">\n                        <span>{{button.text}}</span>\n                    </ion-button>\n                    \n                </ionx-buttons>\n            </ion-toolbar>\n        </ion-footer>\n    ",
            styles: [
                "\n            :host-context(.md) {\n                --ionx--message-font-size: 16px;\n                --ionx--header-font-size: 20px;\n                --ionx--text-align: left;\n            }\n\n            :host-context(.ios) {\n                --ionx--message-font-size: 15px;\n                --ionx--header-font-size: 18px;\n                --ionx--text-align: center;\n                --ionx--buttons-align: center;\n                --ionx--header-font-weight: 600;\n            }\n            \n            :host {\n                display: flex; \n                contain: content;\n                position: relative; \n            }\n            \n            :host [ionx--message] { \n                font-size: var(--ionx--message-font-size);\n                text-align: var(--ionx--text-align);\n                margin: 16px 16px 24px 16px;\n            }\n            \n            :host [ionx--header] {\n                font-size: var(--ionx--header-font-size);\n                font-weight: var(--ionx--header-font-weight, 500);\n                margin: 16px;\n                text-align: var(--ionx--text-align);\n            }\n            \n            :host ion-footer ion-toolbar {\n                --padding-start: 0px;\n                --padding-end: 0px;\n                --padding-top: 0px;\n                --padding-bottom: 0px;\n                --min-height: none;\n            }\n\n            :host-context(.md) ion-footer ion-toolbar {\n                --padding-bottom: 8px;\n            }\n            \n            :host-context(.md) ion-footer::before {\n                display: none;\n            }\n\n            :host ion-footer ionx-buttons {\n                justify-content: var(--ionx--buttons-align, flex-end);\n            }\n            \n            :host ion-footer ion-button {\n                min-height: 44px;\n            }\n            \n            :host-context(.ios) ion-footer ion-button {\n                flex: 1;\n            }\n\n            :host-context(.ios) ion-footer ion-button:not(:first-child) {\n                border-left: 0.55px solid var(--ion-toolbar-border-color,var(--ion-border-color,var(--ion-color-step-150,rgba(0,0,0,0.2))));;\n            }\n\n            :host-context ion-footer ion-button:not(:last-child) {\n                font-weight: 400;\n            }\n            \n            :host-context ion-footer ion-button:last-child {\n                font-weight: 600;\n            }\n        "
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [Injector,
            DomSanitizer,
            ElementRef,
            ModalController,
            ComponentFactoryResolver,
            ChangeDetectorRef])
    ], Dialog);
    return Dialog;
}());
export { Dialog };
//# sourceMappingURL=dialog.js.map