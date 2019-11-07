import * as tslib_1 from "tslib";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Component, ElementRef, HostListener, Input, Optional, ViewChild } from "@angular/core";
import { IntlService } from "@co.mmons/angular-intl";
import { waitTill } from "@co.mmons/js-utils/core";
import { ModalController, PopoverController } from "@ionic/angular";
let SelectOverlayContent = class SelectOverlayContent {
    constructor(element, intl, popoverController, modalController) {
        this.element = element;
        this.intl = intl;
        this.popoverController = popoverController;
        this.modalController = modalController;
        this.multiple = false;
        this.whiteSpace = "nowrap";
    }
    get popoverOverlay() {
        return this.overlay == "popover";
    }
    get modalOverlay() {
        return this.overlay == "modal";
    }
    optionDivider(option, index, options) {
        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i] === option && i > 0 && this.options[i - 1].divider) {
                return this.options[i - 1];
            }
        }
    }
    optionClicked(option, ev) {
        if (option.checked && !this.empty && this.checkedOptions.length === 1 && this.checkedOptions[0] === option) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.stopImmediatePropagation();
        }
    }
    optionBeforeChange(option) {
        this.lastClickedOption = option;
        option.checkedTimestamp = Date.now();
    }
    optionChanged(option) {
        if (!this.lastClickedOption || option !== this.lastClickedOption) {
            return;
        }
        if (this.multiple && this.valueValidator) {
            let values = [];
            for (let o of this.checkedOptions) {
                if (o !== option) {
                    values.push(o.value);
                }
            }
            let optionWasChecked = option.checked;
            for (let o of this.options) {
                o.checked = false;
            }
            this.checkedOptions = [];
            VALUES: for (let v of this.valueValidator(option.value, optionWasChecked, values) || []) {
                for (let o of this.options) {
                    if (this.valueComparator(o.value, v)) {
                        o.checked = true;
                        this.checkedOptions.push(o);
                        continue VALUES;
                    }
                }
            }
        }
        else {
            if (!option.checked) {
                for (let i = 0; i < this.checkedOptions.length; i++) {
                    if (this.checkedOptions[i] === option) {
                        this.checkedOptions.splice(i, 1);
                        break;
                    }
                }
            }
            else {
                if (!this.multiple) {
                    for (let o of this.options) {
                        if (o.checked && o !== option) {
                            o.checked = false;
                        }
                    }
                    this.checkedOptions = [option];
                }
                else {
                    this.checkedOptions.push(option);
                }
            }
        }
        if (!this.multiple) {
            this.okClicked();
        }
        this.lastClickedOption = undefined;
    }
    buildVisibleOptions() {
        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].divider) {
                this.options[i].hidden = true;
                if (this.options.length - 1 > i) {
                    for (let ii = i + 1; ii < this.options.length; ii++) {
                        if (this.options[ii].divider) {
                            break;
                        }
                        if (!this.options[ii].hidden) {
                            this.options[i].hidden = false;
                            break;
                        }
                    }
                }
            }
        }
        this.visibleOptions = [];
        for (let option of this.options) {
            if (!option.hidden) {
                this.visibleOptions.push(option);
            }
        }
    }
    initOptions() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.checkedOptions = [];
            for (let option of this.options) {
                if (option.checked) {
                    this.checkedOptions.push(option);
                }
            }
            if (this.orderable) {
                this.checkedOptions.sort((a, b) => a.checkedTimestamp - b.checkedTimestamp);
            }
            this.buildVisibleOptions();
            if (this.checkedOptions.length > 0) {
                if (this.modalOverlay) {
                    yield waitTill(() => !!this.scroll);
                    let indexToScroll = -1;
                    for (let i = 0; i < this.visibleOptions.length; i++) {
                        if (this.visibleOptions[i].checked) {
                            indexToScroll = i;
                            break;
                        }
                    }
                    this.scroll.scrollToIndex(indexToScroll);
                }
            }
        });
    }
    okClicked() {
        let values = [];
        if (this.orderable) {
            for (let o of this.checkedOptions) {
                values.push(o.value);
            }
        }
        else {
            OPTIONS: for (let option of this.options) {
                for (let checked of this.checkedOptions) {
                    if (option === checked) {
                        values.push(checked.value);
                        continue OPTIONS;
                    }
                }
            }
        }
        this.updateValues(values);
        if (this.popoverController && this.popoverOverlay) {
            this.popoverController.dismiss();
        }
        else if (this.modalController && this.modalOverlay) {
            this.modalController.dismiss();
        }
    }
    cancelClicked() {
        if (this.popoverController && this.popoverOverlay) {
            this.popoverController.dismiss();
        }
        else if (this.modalController && this.modalOverlay) {
            this.modalController.dismiss();
        }
    }
    search(ev) {
        let query = this.searchbar.nativeElement.value ? this.searchbar.nativeElement.value.toString() : undefined;
        if (query) {
            query = query.trim().toLowerCase();
        }
        for (let o of this.options) {
            if (!query) {
                o.hidden = false;
            }
            else {
                o.hidden = this.searchHandler ? !this.searchHandler(query, o.value, o.label) : (o.label || "").toLowerCase().indexOf(query) < 0;
            }
        }
        this.buildVisibleOptions();
    }
    ngOnInit() {
        if (this.popoverOverlay) {
            this.initOptions();
        }
        else {
            const modal = this.element.nativeElement.closest("ion-modal");
            if (modal.classList.contains("modal-ios")) {
                this.itemHeight = 44.55;
            }
            else {
                this.itemHeight = 49;
            }
        }
    }
    resetScrollHeight() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const oldHeight = this.scrollHeight;
            let newHeight = this.content.nativeElement.offsetHeight;
            if (newHeight == oldHeight) {
                yield waitTill(() => {
                    newHeight = this.content.nativeElement.offsetHeight;
                    return newHeight !== oldHeight;
                }, undefined, 2000);
            }
            this.scrollHeight = newHeight;
            if (typeof oldHeight !== "number" && this.scroll) {
                this.scroll.checkViewportSize();
            }
        });
    }
    ionViewDidEnter() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.modalOverlay) {
                this.resetScrollHeight();
                if (!window["cordova"] || window["cordova"].platformId === "browser") {
                    yield waitTill(() => !!this.searchbar && !!this.searchbar.nativeElement.querySelector("input"));
                    this.searchbar.nativeElement.setFocus();
                }
                this.initOptions();
            }
        });
    }
};
SelectOverlayContent.ctorParameters = () => [
    { type: ElementRef },
    { type: IntlService },
    { type: PopoverController, decorators: [{ type: Optional }] },
    { type: ModalController, decorators: [{ type: Optional }] }
];
tslib_1.__decorate([
    Input()
], SelectOverlayContent.prototype, "overlay", void 0);
tslib_1.__decorate([
    ViewChild(CdkVirtualScrollViewport, { static: false })
], SelectOverlayContent.prototype, "scroll", void 0);
tslib_1.__decorate([
    ViewChild("content", { read: ElementRef, static: false })
], SelectOverlayContent.prototype, "content", void 0);
tslib_1.__decorate([
    Input()
], SelectOverlayContent.prototype, "multiple", void 0);
tslib_1.__decorate([
    Input()
], SelectOverlayContent.prototype, "orderable", void 0);
tslib_1.__decorate([
    Input()
], SelectOverlayContent.prototype, "updateValues", void 0);
tslib_1.__decorate([
    Input()
], SelectOverlayContent.prototype, "title", void 0);
tslib_1.__decorate([
    Input()
], SelectOverlayContent.prototype, "searchHandler", void 0);
tslib_1.__decorate([
    Input()
], SelectOverlayContent.prototype, "valueValidator", void 0);
tslib_1.__decorate([
    Input()
], SelectOverlayContent.prototype, "valueComparator", void 0);
tslib_1.__decorate([
    Input()
], SelectOverlayContent.prototype, "label", void 0);
tslib_1.__decorate([
    Input()
], SelectOverlayContent.prototype, "options", void 0);
tslib_1.__decorate([
    Input()
], SelectOverlayContent.prototype, "empty", void 0);
tslib_1.__decorate([
    Input()
], SelectOverlayContent.prototype, "whiteSpace", void 0);
tslib_1.__decorate([
    ViewChild("searchbar", { read: ElementRef, static: false })
], SelectOverlayContent.prototype, "searchbar", void 0);
tslib_1.__decorate([
    HostListener("window:resize")
], SelectOverlayContent.prototype, "resetScrollHeight", null);
SelectOverlayContent = tslib_1.__decorate([
    Component({
        selector: "ionx-select-overlay",
        template: "<ion-header *ngIf=\"modalOverlay\">\n    <ion-toolbar>\n        <ion-title style=\"padding: 0px\">{{title}}</ion-title>\n\n        <ionx-buttons slot=\"start\">\n            <ion-button fill=\"clear\" (click)=\"cancelClicked()\">\n                <ion-icon name=\"close\" slot=\"icon-only\"></ion-icon>\n            </ion-button>\n        </ionx-buttons>\n\n        <ionx-buttons slot=\"end\">\n            <ion-button fill=\"clear\" (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n        </ionx-buttons>\n\n    </ion-toolbar>\n    <ion-toolbar>\n        <ion-searchbar #searchbar cancelButtonText=\"{{'@co.mmons/js-intl#Cancel' | intlMessage}}\" placeholder=\"{{'@co.mmons/js-intl#Search' | intlMessage}}\"\n                       (ionInput)=\"search($event)\"></ion-searchbar>\n    </ion-toolbar>\n</ion-header>\n<ion-content [scrollY]=\"false\" [scrollX]=\"false\" #content>\n\n    <div class=\"ionx-select-overlay-spinner\" slot=\"fixed\" *ngIf=\"!checkedOptions\">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <ng-template [ngIf]=\"!!visibleOptions\">\n        <div>\n\n            <cdk-virtual-scroll-viewport [itemSize]=\"itemHeight\" [style.height.px]=\"scrollHeight\" *ngIf=\"modalOverlay\">\n\n                <ion-list lines=\"full\">\n\n                    <ion-item detail=\"false\" [button]=\"!option.divider\" [style.fontWeight]=\"option.divider ? 500 : null\" #listItem *cdkVirtualFor=\"let option of visibleOptions\">\n                        <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionBeforeChange(option)\" (ionChange)=\"optionChanged(option)\" (click)=\"optionClicked(option, $event)\" slot=\"start\"\n                                      *ngIf=\"!option.divider\"></ion-checkbox>\n                        <ion-label>\n                            <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                            <ng-template #customLabel>\n                                <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                            </ng-template>\n                        </ion-label>\n                    </ion-item>\n                </ion-list>\n\n            </cdk-virtual-scroll-viewport>\n\n            <ion-list lines=\"full\" *ngIf=\"popoverOverlay\">\n\n                <ng-template ngFor [ngForOf]=\"visibleOptions\" let-option>\n\n                    <ion-item-divider *ngIf=\"option.divider; else basicOption\">\n                        <ion-label>{{option.label}}</ion-label>\n                    </ion-item-divider>\n\n                    <ng-template #basicOption>\n\n                        <ion-item detail=\"false\" button=\"true\" #listItem>\n                            <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionBeforeChange(option)\" (ionChange)=\"optionChanged(option)\" (click)=\"optionClicked(option, $event)\"></ion-checkbox>\n                            <ion-label [style.whiteSpace]=\"whiteSpace\">\n                                <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                                <ng-template #customLabel>\n                                    <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                                </ng-template>\n                            </ion-label>\n                        </ion-item>\n\n                    </ng-template>\n\n                </ng-template>\n            </ion-list>\n        </div>\n    </ng-template>\n\n</ion-content>\n\n<ion-footer *ngIf=\"multiple && popoverOverlay\" style=\"position: sticky; bottom: 0px\">\n    <ion-toolbar>\n        <ion-buttons slot=\"end\">\n\n            <ion-button size=\"small\" (click)=\"cancelClicked()\">{{\"@co.mmons/js-intl#Cancel\" | intlMessage}}</ion-button>\n\n            <ion-button size=\"small\" (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Ok\" | intlMessage}}</ion-button>\n\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
        styles: ["@media (min-width:768px){::ng-deep .ionx-select-overlay-width .popover-content{--width:300px;--max-width:90%}}@media (max-width:767px){::ng-deep .ionx-select-overlay-width .popover-content{left:calc(16px + var(--ion-safe-area-left,0px))!important;width:calc(100% - (32px + var(--ion-safe-area-right,0px) + var(--ion-safe-area-left,0px)))}}:host .ionx-select-overlay-spinner{position:absolute;width:100%;height:100%;left:0;top:0}:host .ionx-select-overlay-spinner ion-spinner{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}:host ion-checkbox{margin-right:16px;margin-top:8px;margin-bottom:8px}:host ion-list{margin:4px 0;padding:0}:host ::ng-deep .cdk-virtual-scroll-content-wrapper{max-width:100%}:host ::ng-deep .hydrated{visibility:visible}:host-context(ion-popover) ion-content{--overflow:initial!important}:host-context(ion-popover) ion-content ion-item ion-label{white-space:normal}:host-context(ion-popover) ion-content ion-item.item:last-child{--border-width:0px}:host-context(.ios) ion-item-divider{--background:transparent;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:500}"]
    }),
    tslib_1.__param(2, Optional()),
    tslib_1.__param(3, Optional())
], SelectOverlayContent);
export { SelectOverlayContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LW92ZXJsYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9zZWxlY3QvIiwic291cmNlcyI6WyJzZWxlY3Qtb3ZlcmxheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDaEUsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFDLGVBQWUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBVWxFLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBRTdCLFlBQ1csT0FBZ0MsRUFDN0IsSUFBaUIsRUFDUCxpQkFBb0MsRUFDcEMsZUFBZ0M7UUFIN0MsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDN0IsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNQLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBMEJ4RCxhQUFRLEdBQVksS0FBSyxDQUFDO1FBOEIxQixlQUFVLEdBQVcsUUFBUSxDQUFDO0lBdEQ5QixDQUFDO0lBS0QsSUFBSSxjQUFjO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQztJQUNuQyxDQUFDO0lBbURELGFBQWEsQ0FBQyxNQUEyQixFQUFFLEtBQWEsRUFBRSxPQUE4QjtRQUNwRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMs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REMsS0FBSyxFQUFFO3dEQUNzQjtBQTRNOUI7SUFEQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUM7dURBQ0g7QUFxQzNDO0lBRFgsWUFBWSxDQUFDLGVBQWUsQ0FBQzs2REFrQjdCO0FBaFVRLG9CQUFvQjtJQUxoQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLHVnSUFBa0M7O0tBRXJDLENBQUM7SUFNTyxtQkFBQSxRQUFRLEVBQUUsQ0FBQTtJQUNWLG1CQUFBLFFBQVEsRUFBRSxDQUFBO0dBTk4sb0JBQW9CLENBaVZoQztTQWpWWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Nka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydH0gZnJvbSBcIkBhbmd1bGFyL2Nkay9zY3JvbGxpbmdcIjtcbmltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPcHRpb25hbCwgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtJbnRsU2VydmljZX0gZnJvbSBcIkBjby5tbW9ucy9hbmd1bGFyLWludGxcIjtcbmltcG9ydCB7d2FpdFRpbGx9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXIsIFBvcG92ZXJDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7Q29tcG9uZW50c30gZnJvbSBcIkBpb25pYy9jb3JlXCI7XG5pbXBvcnQge1NlbGVjdExhYmVsfSBmcm9tIFwiLi9zZWxlY3QtbGFiZWxcIjtcbmltcG9ydCB7U2VsZWN0T3ZlcmxheU9wdGlvbn0gZnJvbSBcIi4vc2VsZWN0LW92ZXJsYXktb3B0aW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtc2VsZWN0LW92ZXJsYXlcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJzZWxlY3Qtb3ZlcmxheS5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJzZWxlY3Qtb3ZlcmxheS5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdE92ZXJsYXlDb250ZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByb3RlY3RlZCBpbnRsOiBJbnRsU2VydmljZSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBwb3BvdmVyQ29udHJvbGxlcjogUG9wb3ZlckNvbnRyb2xsZXIsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXJcbiAgICApIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgb3ZlcmxheTogc3RyaW5nO1xuXG4gICAgZ2V0IHBvcG92ZXJPdmVybGF5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5ID09IFwicG9wb3ZlclwiO1xuICAgIH1cblxuICAgIGdldCBtb2RhbE92ZXJsYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXkgPT0gXCJtb2RhbFwiO1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0LCB7c3RhdGljOiBmYWxzZX0pXG4gICAgc2Nyb2xsOiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQ7XG5cbiAgICBzY3JvbGxIZWlnaHQ6IG51bWJlcjtcblxuICAgIGl0ZW1IZWlnaHQ6IG51bWJlcjtcblxuICAgIEBWaWV3Q2hpbGQoXCJjb250ZW50XCIsIHtyZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IGZhbHNlfSlcbiAgICBjb250ZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50ICYgQ29tcG9uZW50cy5Jb25Db250ZW50PjtcblxuICAgIEBJbnB1dCgpXG4gICAgbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgb3JkZXJhYmxlOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICB1cGRhdGVWYWx1ZXM6ICh2YWx1ZXM6IGFueVtdKSA9PiB2b2lkO1xuXG4gICAgQElucHV0KClcbiAgICB0aXRsZTogYW55O1xuXG4gICAgQElucHV0KClcbiAgICBzZWFyY2hIYW5kbGVyOiAocXVlcnk6IHN0cmluZywgdmFsdWU6IGFueSwgbGFiZWw6IHN0cmluZykgPT4gYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgdmFsdWVWYWxpZGF0b3I6ICh2YWx1ZTogYW55LCBjaGVja2VkOiBib29sZWFuLCBvdGhlclZhbHVlczogYW55W10pID0+IGFueVtdO1xuXG4gICAgQElucHV0KClcbiAgICB2YWx1ZUNvbXBhcmF0b3I6IChhOiBhbnksIGI6IGFueSkgPT4gYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgbGFiZWw6IFNlbGVjdExhYmVsO1xuXG4gICAgQElucHV0KClcbiAgICBvcHRpb25zOiBTZWxlY3RPdmVybGF5T3B0aW9uW107XG5cbiAgICBASW5wdXQoKVxuICAgIGVtcHR5OiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICB3aGl0ZVNwYWNlOiBzdHJpbmcgPSBcIm5vd3JhcFwiO1xuXG4gICAgdmlzaWJsZU9wdGlvbnM6IFNlbGVjdE92ZXJsYXlPcHRpb25bXTtcblxuICAgIGNoZWNrZWRPcHRpb25zOiBTZWxlY3RPdmVybGF5T3B0aW9uW107XG5cbiAgICBwcml2YXRlIGxhc3RDbGlja2VkT3B0aW9uOiBTZWxlY3RPdmVybGF5T3B0aW9uO1xuXG4gICAgb3B0aW9uRGl2aWRlcihvcHRpb246IFNlbGVjdE92ZXJsYXlPcHRpb24sIGluZGV4OiBudW1iZXIsIG9wdGlvbnM6IFNlbGVjdE92ZXJsYXlPcHRpb25bXSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1tpXSA9PT0gb3B0aW9uICYmIGkgPiAwICYmIHRoaXMub3B0aW9uc1tpIC0gMV0uZGl2aWRlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNbaSAtIDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3B0aW9uQ2xpY2tlZChvcHRpb246IFNlbGVjdE92ZXJsYXlPcHRpb24sIGV2OiBFdmVudCkge1xuXG4gICAgICAgIGlmIChvcHRpb24uY2hlY2tlZCAmJiAhdGhpcy5lbXB0eSAmJiB0aGlzLmNoZWNrZWRPcHRpb25zLmxlbmd0aCA9PT0gMSAmJiB0aGlzLmNoZWNrZWRPcHRpb25zWzBdID09PSBvcHRpb24pIHtcbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBvcHRpb25CZWZvcmVDaGFuZ2Uob3B0aW9uOiBTZWxlY3RPdmVybGF5T3B0aW9uKSB7XG4gICAgICAgIHRoaXMubGFzdENsaWNrZWRPcHRpb24gPSBvcHRpb247XG4gICAgICAgIG9wdGlvbi5jaGVja2VkVGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICB9XG5cbiAgICBvcHRpb25DaGFuZ2VkKG9wdGlvbjogU2VsZWN0T3ZlcmxheU9wdGlvbikge1xuXG4gICAgICAgIGlmICghdGhpcy5sYXN0Q2xpY2tlZE9wdGlvbiB8fCBvcHRpb24gIT09IHRoaXMubGFzdENsaWNrZWRPcHRpb24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMudmFsdWVWYWxpZGF0b3IpIHtcblxuICAgICAgICAgICAgbGV0IHZhbHVlczogYW55W10gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IG8gb2YgdGhpcy5jaGVja2VkT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChvICE9PSBvcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goby52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgb3B0aW9uV2FzQ2hlY2tlZCA9IG9wdGlvbi5jaGVja2VkO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBvIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIG8uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRPcHRpb25zID0gW107XG5cbiAgICAgICAgICAgIFZBTFVFUzogZm9yIChsZXQgdiBvZiB0aGlzLnZhbHVlVmFsaWRhdG9yKG9wdGlvbi52YWx1ZSwgb3B0aW9uV2FzQ2hlY2tlZCwgdmFsdWVzKSB8fCBbXSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IG8gb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlQ29tcGFyYXRvcihvLnZhbHVlLCB2KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgby5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZE9wdGlvbnMucHVzaChvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIFZBTFVFUztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAoIW9wdGlvbi5jaGVja2VkKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hlY2tlZE9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tlZE9wdGlvbnNbaV0gPT09IG9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkT3B0aW9ucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG8gb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5jaGVja2VkICYmIG8gIT09IG9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkT3B0aW9ucyA9IFtvcHRpb25dO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkT3B0aW9ucy5wdXNoKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLm9rQ2xpY2tlZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXN0Q2xpY2tlZE9wdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJ1aWxkVmlzaWJsZU9wdGlvbnMoKSB7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1tpXS5kaXZpZGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zW2ldLmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5sZW5ndGggLSAxID4gaSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpaSA9IGkgKyAxOyBpaSA8IHRoaXMub3B0aW9ucy5sZW5ndGg7IGlpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1tpaV0uZGl2aWRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1tpaV0uaGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zW2ldLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBvcHRpb24gb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbi5oaWRkZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2libGVPcHRpb25zLnB1c2gob3B0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgaW5pdE9wdGlvbnMoKSB7XG5cbiAgICAgICAgdGhpcy5jaGVja2VkT3B0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBvcHRpb24gb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWRPcHRpb25zLnB1c2gob3B0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9yZGVyYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkT3B0aW9ucy5zb3J0KChhLCBiKSA9PiBhLmNoZWNrZWRUaW1lc3RhbXAgLSBiLmNoZWNrZWRUaW1lc3RhbXApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5idWlsZFZpc2libGVPcHRpb25zKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZE9wdGlvbnMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tb2RhbE92ZXJsYXkpIHtcblxuICAgICAgICAgICAgICAgIGF3YWl0IHdhaXRUaWxsKCgpID0+ICEhdGhpcy5zY3JvbGwpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4VG9TY3JvbGw6IG51bWJlciA9IC0xO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZpc2libGVPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpc2libGVPcHRpb25zW2ldLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4VG9TY3JvbGwgPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbC5zY3JvbGxUb0luZGV4KGluZGV4VG9TY3JvbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb2tDbGlja2VkKCkge1xuXG4gICAgICAgIGxldCB2YWx1ZXMgPSBbXTtcblxuICAgICAgICBpZiAodGhpcy5vcmRlcmFibGUpIHtcbiAgICAgICAgICAgIGZvciAobGV0IG8gb2YgdGhpcy5jaGVja2VkT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKG8udmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIE9QVElPTlM6IGZvciAobGV0IG9wdGlvbiBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGVja2VkIG9mIHRoaXMuY2hlY2tlZE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbiA9PT0gY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goY2hlY2tlZC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBPUFRJT05TO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZXModmFsdWVzKTtcblxuICAgICAgICBpZiAodGhpcy5wb3BvdmVyQ29udHJvbGxlciAmJiB0aGlzLnBvcG92ZXJPdmVybGF5KSB7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXJDb250cm9sbGVyLmRpc21pc3MoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZGFsQ29udHJvbGxlciAmJiB0aGlzLm1vZGFsT3ZlcmxheSkge1xuICAgICAgICAgICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuY2VsQ2xpY2tlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMucG9wb3ZlckNvbnRyb2xsZXIgJiYgdGhpcy5wb3BvdmVyT3ZlcmxheSkge1xuICAgICAgICAgICAgdGhpcy5wb3BvdmVyQ29udHJvbGxlci5kaXNtaXNzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2RhbENvbnRyb2xsZXIgJiYgdGhpcy5tb2RhbE92ZXJsYXkpIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoXCJzZWFyY2hiYXJcIiwge3JlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogZmFsc2V9KVxuICAgIHByaXZhdGUgc2VhcmNoYmFyOiBFbGVtZW50UmVmPEhUTUxJb25TZWFyY2hiYXJFbGVtZW50PjtcblxuICAgIHNlYXJjaChldjogYW55KSB7XG5cbiAgICAgICAgbGV0IHF1ZXJ5ID0gdGhpcy5zZWFyY2hiYXIubmF0aXZlRWxlbWVudC52YWx1ZSA/IHRoaXMuc2VhcmNoYmFyLm5hdGl2ZUVsZW1lbnQudmFsdWUudG9TdHJpbmcoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHF1ZXJ5KSB7XG4gICAgICAgICAgICBxdWVyeSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgbyBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICghcXVlcnkpIHtcbiAgICAgICAgICAgICAgICBvLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvLmhpZGRlbiA9IHRoaXMuc2VhcmNoSGFuZGxlciA/ICF0aGlzLnNlYXJjaEhhbmRsZXIocXVlcnksIG8udmFsdWUsIG8ubGFiZWwpIDogKG8ubGFiZWwgfHwgXCJcIikudG9Mb3dlckNhc2UoKS5pbmRleE9mKHF1ZXJ5KSA8IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJ1aWxkVmlzaWJsZU9wdGlvbnMoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICBpZiAodGhpcy5wb3BvdmVyT3ZlcmxheSkge1xuICAgICAgICAgICAgdGhpcy5pbml0T3B0aW9ucygpO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBjb25zdCBtb2RhbCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoXCJpb24tbW9kYWxcIik7XG5cbiAgICAgICAgICAgIGlmIChtb2RhbC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbC1pb3NcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1IZWlnaHQgPSA0NC41NTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtSGVpZ2h0ID0gNDk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwid2luZG93OnJlc2l6ZVwiKVxuICAgIC8qcHJpdmF0ZSovIGFzeW5jIHJlc2V0U2Nyb2xsSGVpZ2h0KCkge1xuXG4gICAgICAgIGNvbnN0IG9sZEhlaWdodCA9IHRoaXMuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICBsZXQgbmV3SGVpZ2h0ID0gdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIGlmIChuZXdIZWlnaHQgPT0gb2xkSGVpZ2h0KSB7XG4gICAgICAgICAgICBhd2FpdCB3YWl0VGlsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3SGVpZ2h0ID0gdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdIZWlnaHQgIT09IG9sZEhlaWdodDtcbiAgICAgICAgICAgIH0sIHVuZGVmaW5lZCwgMjAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbEhlaWdodCA9IG5ld0hlaWdodDtcblxuICAgICAgICBpZiAodHlwZW9mIG9sZEhlaWdodCAhPT0gXCJudW1iZXJcIiAmJiB0aGlzLnNjcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGwuY2hlY2tWaWV3cG9ydFNpemUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGlvblZpZXdEaWRFbnRlcigpIHtcblxuICAgICAgICBpZiAodGhpcy5tb2RhbE92ZXJsYXkpIHtcblxuICAgICAgICAgICAgdGhpcy5yZXNldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgICAgICAgICBpZiAoIXdpbmRvd1tcImNvcmRvdmFcIl0gfHwgd2luZG93W1wiY29yZG92YVwiXS5wbGF0Zm9ybUlkID09PSBcImJyb3dzZXJcIikge1xuICAgICAgICAgICAgICAgIGF3YWl0IHdhaXRUaWxsKCgpID0+ICEhdGhpcy5zZWFyY2hiYXIgJiYgISF0aGlzLnNlYXJjaGJhci5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hiYXIubmF0aXZlRWxlbWVudC5zZXRGb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmluaXRPcHRpb25zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==