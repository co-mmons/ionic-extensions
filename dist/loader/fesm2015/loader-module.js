import { __decorate, __awaiter } from 'tslib';
import { CommonModule } from '@angular/common';
import { ElementRef, Input, Component, Injectable, NgModule } from '@angular/core';
import { IntlModule } from '@co.mmons/angular-intl';
import { PopoverController, IonicModule } from '@ionic/angular';
import { waitTill } from '@co.mmons/js-utils/core';

let Loader = class Loader {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.progressType = "determinate";
        this.progressValue = 0;
        this.progressBuffer = 0;
    }
    get progressPercentVisible() {
        return typeof this.progressPercent === "number";
    }
    get spinnerMode() {
        return this.mode === "spinner";
    }
    get progressMode() {
        return this.mode === "progress";
    }
    dismiss() {
        return this.popover.dismiss();
    }
    ngOnInit() {
        this.popover = this.elementRef.nativeElement.closest("ion-popover");
        if (this.instanceCallback) {
            this.instanceCallback(this);
        }
    }
    ngOnDestroy() {
        this.popover = undefined;
        this.instanceCallback = undefined;
    }
};
Loader.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], Loader.prototype, "instanceCallback", void 0);
__decorate([
    Input()
], Loader.prototype, "header", void 0);
__decorate([
    Input()
], Loader.prototype, "message", void 0);
__decorate([
    Input()
], Loader.prototype, "mode", void 0);
__decorate([
    Input()
], Loader.prototype, "progressMessage", void 0);
__decorate([
    Input()
], Loader.prototype, "progressType", void 0);
__decorate([
    Input()
], Loader.prototype, "progressValue", void 0);
__decorate([
    Input()
], Loader.prototype, "progressBuffer", void 0);
__decorate([
    Input()
], Loader.prototype, "progressPercent", void 0);
Loader = __decorate([
    Component({
        selector: "ionx-loader",
        template: "<div style=\"display: flex; align-items: center\">\n\n    <div *ngIf=\"spinnerMode\" style=\"padding: 16px; padding-right: 0px;\">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <div style=\"padding: 16px; flex: 1; display: flex; flex-direction: column; justify-items: center;\">\n        <h5 style=\"margin: 0px\" *ngIf=\"header\">{{header}}</h5>\n        <ion-text [innerHTML]=\"message\" *ngIf=\"!!message\"></ion-text>\n    </div>\n\n</div>\n\n<ion-progress-bar style=\"margin: 8px 0px 16px 0px\" [value]=\"progressValue\" [type]=\"progressType\" [buffer]=\"progressBuffer\" *ngIf=\"progressMode\"></ion-progress-bar>\n\n<div style=\"display: flex; margin: 0px 16px 16px 16px\" *ngIf=\"!!progressMessage || progressPercentVisible\">\n    <ion-text [innerHTML]=\"progressMessage\" style=\"flex: 1\"></ion-text>\n    <span style=\"width: 60px; text-align: right\" *ngIf=\"progressPercentVisible\">{{(progressPercent | intlPercentFormat: {maximumFractionDigits: 0})}}</span>\n</div>\n",
        styles: [`:host { display: block }`]
    })
], Loader);

let LoaderController = class LoaderController {
    constructor(popoverController) {
        this.popoverController = popoverController;
    }
    present(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let loader;
            const loaderInstance = (instance) => loader = instance;
            const popover = yield this.popoverController.create({
                animated: false,
                cssClass: "ionx-popover-flex",
                backdropDismiss: false,
                keyboardClose: false,
                component: Loader,
                componentProps: Object.assign({ mode: "spinner" }, options, {
                    instanceCallback: (loader) => loaderInstance(loader)
                })
            });
            // popover.style.setProperty("--width", "100%");
            // popover.style.setProperty("--maxHeight", "100%");
            // const content = popover.querySelector(".popover-content") as HTMLElement;
            // content.style.background = "transparent";
            // content.style.borderRadius = "0px";
            // content.style.left = "0px !important";
            // content.style.top = "0px !important";
            // content.style.height = "100%";
            // content.style.width = "100%";
            // content.style.maxWidth = "none";
            // content.style.maxHeight = "none";
            // content.style.boxShadow = "none";
            popover.present();
            yield waitTill(() => !!loader);
            return loader;
        });
    }
};
LoaderController.ctorParameters = () => [
    { type: PopoverController }
];
LoaderController = __decorate([
    Injectable()
], LoaderController);

let LoaderModule = class LoaderModule {
};
LoaderModule = __decorate([
    NgModule({
        declarations: [Loader],
        imports: [IntlModule, IonicModule, CommonModule],
        exports: [Loader],
        entryComponents: [Loader],
        providers: [LoaderController]
    })
], LoaderModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Loader, LoaderController, LoaderModule };
//# sourceMappingURL=loader-module.js.map
