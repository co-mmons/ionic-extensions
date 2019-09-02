import * as tslib_1 from "tslib";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Component, ElementRef, HostListener, Input, Optional, ViewChild } from "@angular/core";
import { IntlService } from "@co.mmons/angular-intl";
import { waitTill } from "@co.mmons/js-utils/core";
import { ModalController, PopoverController } from "@ionic/angular";
import { SelectLabel } from "./select-label";
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
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], SelectOverlayContent.prototype, "overlay", void 0);
tslib_1.__decorate([
    ViewChild(CdkVirtualScrollViewport, { static: false }),
    tslib_1.__metadata("design:type", CdkVirtualScrollViewport)
], SelectOverlayContent.prototype, "scroll", void 0);
tslib_1.__decorate([
    ViewChild("content", { read: ElementRef, static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], SelectOverlayContent.prototype, "content", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], SelectOverlayContent.prototype, "multiple", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], SelectOverlayContent.prototype, "orderable", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Function)
], SelectOverlayContent.prototype, "updateValues", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SelectOverlayContent.prototype, "title", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Function)
], SelectOverlayContent.prototype, "searchHandler", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Function)
], SelectOverlayContent.prototype, "valueValidator", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Function)
], SelectOverlayContent.prototype, "valueComparator", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", SelectLabel)
], SelectOverlayContent.prototype, "label", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], SelectOverlayContent.prototype, "options", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], SelectOverlayContent.prototype, "empty", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], SelectOverlayContent.prototype, "whiteSpace", void 0);
tslib_1.__decorate([
    ViewChild("searchbar", { read: ElementRef, static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], SelectOverlayContent.prototype, "searchbar", void 0);
tslib_1.__decorate([
    HostListener("window:resize"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SelectOverlayContent.prototype, "resetScrollHeight", null);
SelectOverlayContent = tslib_1.__decorate([
    Component({
        selector: "ionx-select-overlay",
        template: "<ion-header *ngIf=\"modalOverlay\">\n    <ion-toolbar>\n        <ion-title style=\"padding: 0px\">{{title}}</ion-title>\n\n        <ionx-buttons slot=\"start\">\n            <ion-button fill=\"clear\" color=\"primary\" (click)=\"cancelClicked()\">\n                <ion-icon name=\"close\" slot=\"icon-only\"></ion-icon>\n            </ion-button>\n        </ionx-buttons>\n\n        <ionx-buttons slot=\"end\">\n            <ion-button fill=\"clear\" color=\"primary\" (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n        </ionx-buttons>\n\n    </ion-toolbar>\n    <ion-toolbar>\n        <ion-searchbar #searchbar cancelButtonText=\"{{'@co.mmons/js-intl#Cancel' | intlMessage}}\" placeholder=\"{{'@co.mmons/js-intl#Search' | intlMessage}}\"\n                       (ionInput)=\"search($event)\"></ion-searchbar>\n    </ion-toolbar>\n</ion-header>\n<ion-content [scrollY]=\"false\" [scrollX]=\"false\" #content>\n\n    <div class=\"ionx-select-overlay-spinner\" slot=\"fixed\" *ngIf=\"!checkedOptions\">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <ng-template [ngIf]=\"!!visibleOptions\">\n        <div>\n\n            <cdk-virtual-scroll-viewport [itemSize]=\"itemHeight\" [style.height.px]=\"scrollHeight\" *ngIf=\"modalOverlay\">\n\n                <ion-list lines=\"full\">\n\n                    <ion-item detail=\"false\" [button]=\"!option.divider\" [style.fontWeight]=\"option.divider ? 500 : null\" #listItem *cdkVirtualFor=\"let option of visibleOptions\">\n                        <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionBeforeChange(option)\" (ionChange)=\"optionChanged(option)\" (click)=\"optionClicked(option, $event)\" slot=\"start\"\n                                      *ngIf=\"!option.divider\"></ion-checkbox>\n                        <ion-label>\n                            <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                            <ng-template #customLabel>\n                                <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                            </ng-template>\n                        </ion-label>\n                    </ion-item>\n                </ion-list>\n\n            </cdk-virtual-scroll-viewport>\n\n            <ion-list lines=\"full\" *ngIf=\"popoverOverlay\">\n\n                <ng-template ngFor [ngForOf]=\"visibleOptions\" let-option>\n\n                    <ion-item-divider *ngIf=\"option.divider; else basicOption\">\n                        <ion-label>{{option.label}}</ion-label>\n                    </ion-item-divider>\n\n                    <ng-template #basicOption>\n\n                        <ion-item detail=\"false\" button=\"true\" #listItem>\n                            <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionBeforeChange(option)\" (ionChange)=\"optionChanged(option)\" (click)=\"optionClicked(option, $event)\"></ion-checkbox>\n                            <ion-label [style.whiteSpace]=\"whiteSpace\">\n                                <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                                <ng-template #customLabel>\n                                    <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                                </ng-template>\n                            </ion-label>\n                        </ion-item>\n\n                    </ng-template>\n\n                </ng-template>\n            </ion-list>\n        </div>\n    </ng-template>\n\n</ion-content>\n\n<ion-footer *ngIf=\"multiple && popoverOverlay\" style=\"position: sticky; bottom: 0px\">\n    <ion-toolbar>\n        <ion-buttons slot=\"end\">\n\n            <ion-button size=\"small\" (click)=\"cancelClicked()\">{{\"@co.mmons/js-intl#Cancel\" | intlMessage}}</ion-button>\n\n            <ion-button size=\"small\" (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Ok\" | intlMessage}}</ion-button>\n\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
        styles: ["@media (min-width:768px){::ng-deep .ionx-select-overlay-width .popover-content{--width:300px;--max-width:90%}}@media (max-width:767px){::ng-deep .ionx-select-overlay-width .popover-content{left:calc(16px + var(--ion-safe-area-left,0px))!important;width:calc(100% - (32px + var(--ion-safe-area-right,0px) + var(--ion-safe-area-left,0px)))}}:host .ionx-select-overlay-spinner{position:absolute;width:100%;height:100%;left:0;top:0}:host .ionx-select-overlay-spinner ion-spinner{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}:host ion-checkbox{margin-right:16px;margin-top:8px;margin-bottom:8px}:host ion-list{margin:4px 0;padding:0}:host ::ng-deep .cdk-virtual-scroll-content-wrapper{max-width:100%}:host ::ng-deep .hydrated{visibility:visible}:host-context(ion-popover) ion-content{--overflow:initial!important}:host-context(ion-popover) ion-content ion-item ion-label{white-space:normal}:host-context(ion-popover) ion-content ion-item.item:last-child{--border-width:0px}:host-context(.ios) ion-item-divider{--background:transparent;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:500}"]
    }),
    tslib_1.__param(2, Optional()),
    tslib_1.__param(3, Optional()),
    tslib_1.__metadata("design:paramtypes", [ElementRef,
        IntlService,
        PopoverController,
        ModalController])
], SelectOverlayContent);
export { SelectOverlayContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LW92ZXJsYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy8iLCJzb3VyY2VzIjpbInNlbGVjdC9zZWxlY3Qtb3ZlcmxheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDaEUsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFDLGVBQWUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRWxFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQVEzQyxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQUU3QixZQUNXLE9BQWdDLEVBQzdCLElBQWlCLEVBQ1AsaUJBQW9DLEVBQ3BDLGVBQWdDO1FBSDdDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQzdCLFNBQUksR0FBSixJQUFJLENBQWE7UUFDUCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQTBCeEQsYUFBUSxHQUFZLEtBQUssQ0FBQztRQThCMUIsZUFBVSxHQUFXLFFBQVEsQ0FBQztJQXREOUIsQ0FBQztJQUtELElBQUksY0FBYztRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUM7SUFDckMsQ0FBQztJQUVELElBQUksWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUM7SUFDbkMsQ0FBQztJQW1ERCxhQUFhLENBQUMsTUFBMkIsRUFBRSxLQUFh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LEVBQUU7O21EQUNPO0FBR2Y7SUFEQyxLQUFLLEVBQUU7O3dEQUNzQjtBQTRNOUI7SUFEQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUM7c0NBQ3ZDLFVBQVU7dURBQTBCO0FBcUMzQztJQURYLFlBQVksQ0FBQyxlQUFlLENBQUM7Ozs7NkRBa0I3QjtBQWhVUSxvQkFBb0I7SUFMaEMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQiwyaUlBQWtDOztLQUVyQyxDQUFDO0lBTU8sbUJBQUEsUUFBUSxFQUFFLENBQUE7SUFDVixtQkFBQSxRQUFRLEVBQUUsQ0FBQTs2Q0FISyxVQUFVO1FBQ1YsV0FBVztRQUNZLGlCQUFpQjtRQUNuQixlQUFlO0dBTi9DLG9CQUFvQixDQWlWaEM7U0FqVlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnR9IGZyb20gXCJAYW5ndWxhci9jZGsvc2Nyb2xsaW5nXCI7XG5pbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3B0aW9uYWwsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SW50bFNlcnZpY2V9IGZyb20gXCJAY28ubW1vbnMvYW5ndWxhci1pbnRsXCI7XG5pbXBvcnQge3dhaXRUaWxsfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7TW9kYWxDb250cm9sbGVyLCBQb3BvdmVyQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge0NvbXBvbmVudHN9IGZyb20gXCJAaW9uaWMvY29yZVwiO1xuaW1wb3J0IHtTZWxlY3RMYWJlbH0gZnJvbSBcIi4vc2VsZWN0LWxhYmVsXCI7XG5pbXBvcnQge1NlbGVjdE92ZXJsYXlPcHRpb259IGZyb20gXCIuL3NlbGVjdC1vdmVybGF5LW9wdGlvblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LXNlbGVjdC1vdmVybGF5XCIsXG4gICAgdGVtcGxhdGVVcmw6IFwic2VsZWN0LW92ZXJsYXkuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wic2VsZWN0LW92ZXJsYXkuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RPdmVybGF5Q29udGVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwcm90ZWN0ZWQgaW50bDogSW50bFNlcnZpY2UsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcG9wb3ZlckNvbnRyb2xsZXI6IFBvcG92ZXJDb250cm9sbGVyLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyXG4gICAgKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIG92ZXJsYXk6IHN0cmluZztcblxuICAgIGdldCBwb3BvdmVyT3ZlcmxheSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheSA9PSBcInBvcG92ZXJcIjtcbiAgICB9XG5cbiAgICBnZXQgbW9kYWxPdmVybGF5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5ID09IFwibW9kYWxcIjtcbiAgICB9XG5cbiAgICBAVmlld0NoaWxkKENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCwge3N0YXRpYzogZmFsc2V9KVxuICAgIHNjcm9sbDogQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0O1xuXG4gICAgc2Nyb2xsSGVpZ2h0OiBudW1iZXI7XG5cbiAgICBpdGVtSGVpZ2h0OiBudW1iZXI7XG5cbiAgICBAVmlld0NoaWxkKFwiY29udGVudFwiLCB7cmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiBmYWxzZX0pXG4gICAgY29udGVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudCAmIENvbXBvbmVudHMuSW9uQ29udGVudD47XG5cbiAgICBASW5wdXQoKVxuICAgIG11bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIG9yZGVyYWJsZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgdXBkYXRlVmFsdWVzOiAodmFsdWVzOiBhbnlbXSkgPT4gdm9pZDtcblxuICAgIEBJbnB1dCgpXG4gICAgdGl0bGU6IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgc2VhcmNoSGFuZGxlcjogKHF1ZXJ5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGxhYmVsOiBzdHJpbmcpID0+IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHZhbHVlVmFsaWRhdG9yOiAodmFsdWU6IGFueSwgY2hlY2tlZDogYm9vbGVhbiwgb3RoZXJWYWx1ZXM6IGFueVtdKSA9PiBhbnlbXTtcblxuICAgIEBJbnB1dCgpXG4gICAgdmFsdWVDb21wYXJhdG9yOiAoYTogYW55LCBiOiBhbnkpID0+IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIGxhYmVsOiBTZWxlY3RMYWJlbDtcblxuICAgIEBJbnB1dCgpXG4gICAgb3B0aW9uczogU2VsZWN0T3ZlcmxheU9wdGlvbltdO1xuXG4gICAgQElucHV0KClcbiAgICBlbXB0eTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgd2hpdGVTcGFjZTogc3RyaW5nID0gXCJub3dyYXBcIjtcblxuICAgIHZpc2libGVPcHRpb25zOiBTZWxlY3RPdmVybGF5T3B0aW9uW107XG5cbiAgICBjaGVja2VkT3B0aW9uczogU2VsZWN0T3ZlcmxheU9wdGlvbltdO1xuXG4gICAgcHJpdmF0ZSBsYXN0Q2xpY2tlZE9wdGlvbjogU2VsZWN0T3ZlcmxheU9wdGlvbjtcblxuICAgIG9wdGlvbkRpdmlkZXIob3B0aW9uOiBTZWxlY3RPdmVybGF5T3B0aW9uLCBpbmRleDogbnVtYmVyLCBvcHRpb25zOiBTZWxlY3RPdmVybGF5T3B0aW9uW10pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNbaV0gPT09IG9wdGlvbiAmJiBpID4gMCAmJiB0aGlzLm9wdGlvbnNbaSAtIDFdLmRpdmlkZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zW2kgLSAxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wdGlvbkNsaWNrZWQob3B0aW9uOiBTZWxlY3RPdmVybGF5T3B0aW9uLCBldjogRXZlbnQpIHtcblxuICAgICAgICBpZiAob3B0aW9uLmNoZWNrZWQgJiYgIXRoaXMuZW1wdHkgJiYgdGhpcy5jaGVja2VkT3B0aW9ucy5sZW5ndGggPT09IDEgJiYgdGhpcy5jaGVja2VkT3B0aW9uc1swXSA9PT0gb3B0aW9uKSB7XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldi5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgb3B0aW9uQmVmb3JlQ2hhbmdlKG9wdGlvbjogU2VsZWN0T3ZlcmxheU9wdGlvbikge1xuICAgICAgICB0aGlzLmxhc3RDbGlja2VkT3B0aW9uID0gb3B0aW9uO1xuICAgICAgICBvcHRpb24uY2hlY2tlZFRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgb3B0aW9uQ2hhbmdlZChvcHRpb246IFNlbGVjdE92ZXJsYXlPcHRpb24pIHtcblxuICAgICAgICBpZiAoIXRoaXMubGFzdENsaWNrZWRPcHRpb24gfHwgb3B0aW9uICE9PSB0aGlzLmxhc3RDbGlja2VkT3B0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLnZhbHVlVmFsaWRhdG9yKSB7XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZXM6IGFueVtdID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBvIG9mIHRoaXMuY2hlY2tlZE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAobyAhPT0gb3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKG8udmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG9wdGlvbldhc0NoZWNrZWQgPSBvcHRpb24uY2hlY2tlZDtcblxuICAgICAgICAgICAgZm9yIChsZXQgbyBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBvLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jaGVja2VkT3B0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICBWQUxVRVM6IGZvciAobGV0IHYgb2YgdGhpcy52YWx1ZVZhbGlkYXRvcihvcHRpb24udmFsdWUsIG9wdGlvbldhc0NoZWNrZWQsIHZhbHVlcykgfHwgW10pIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBvIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZUNvbXBhcmF0b3Ioby52YWx1ZSwgdikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWRPcHRpb25zLnB1c2gobyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBWQUxVRVM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKCFvcHRpb24uY2hlY2tlZCkge1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoZWNrZWRPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrZWRPcHRpb25zW2ldID09PSBvcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZE9wdGlvbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBvIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8uY2hlY2tlZCAmJiBvICE9PSBvcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZE9wdGlvbnMgPSBbb3B0aW9uXTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZE9wdGlvbnMucHVzaChvcHRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5va0NsaWNrZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGFzdENsaWNrZWRPcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZFZpc2libGVPcHRpb25zKCkge1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNbaV0uZGl2aWRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1tpXS5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGVuZ3RoIC0gMSA+IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaWkgPSBpICsgMTsgaWkgPCB0aGlzLm9wdGlvbnMubGVuZ3RoOyBpaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNbaWldLmRpdmlkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNbaWldLmhpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1tpXS5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmlzaWJsZU9wdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgb3B0aW9uIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKCFvcHRpb24uaGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9ucy5wdXNoKG9wdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGluaXRPcHRpb25zKCkge1xuXG4gICAgICAgIHRoaXMuY2hlY2tlZE9wdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgb3B0aW9uIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkT3B0aW9ucy5wdXNoKG9wdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vcmRlcmFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZE9wdGlvbnMuc29ydCgoYSwgYikgPT4gYS5jaGVja2VkVGltZXN0YW1wIC0gYi5jaGVja2VkVGltZXN0YW1wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYnVpbGRWaXNpYmxlT3B0aW9ucygpO1xuXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWRPcHRpb25zLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMubW9kYWxPdmVybGF5KSB7XG5cbiAgICAgICAgICAgICAgICBhd2FpdCB3YWl0VGlsbCgoKSA9PiAhIXRoaXMuc2Nyb2xsKTtcblxuICAgICAgICAgICAgICAgIGxldCBpbmRleFRvU2Nyb2xsOiBudW1iZXIgPSAtMTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52aXNpYmxlT3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlT3B0aW9uc1tpXS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleFRvU2Nyb2xsID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGwuc2Nyb2xsVG9JbmRleChpbmRleFRvU2Nyb2xsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9rQ2xpY2tlZCgpIHtcblxuICAgICAgICBsZXQgdmFsdWVzID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMub3JkZXJhYmxlKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBvIG9mIHRoaXMuY2hlY2tlZE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChvLnZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBPUFRJT05TOiBmb3IgKGxldCBvcHRpb24gb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY2hlY2tlZCBvZiB0aGlzLmNoZWNrZWRPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24gPT09IGNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKGNoZWNrZWQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWUgT1BUSU9OUztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWVzKHZhbHVlcyk7XG5cbiAgICAgICAgaWYgKHRoaXMucG9wb3ZlckNvbnRyb2xsZXIgJiYgdGhpcy5wb3BvdmVyT3ZlcmxheSkge1xuICAgICAgICAgICAgdGhpcy5wb3BvdmVyQ29udHJvbGxlci5kaXNtaXNzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2RhbENvbnRyb2xsZXIgJiYgdGhpcy5tb2RhbE92ZXJsYXkpIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbmNlbENsaWNrZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXJDb250cm9sbGVyICYmIHRoaXMucG9wb3Zlck92ZXJsYXkpIHtcbiAgICAgICAgICAgIHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kYWxDb250cm9sbGVyICYmIHRoaXMubW9kYWxPdmVybGF5KSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAVmlld0NoaWxkKFwic2VhcmNoYmFyXCIsIHtyZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IGZhbHNlfSlcbiAgICBwcml2YXRlIHNlYXJjaGJhcjogRWxlbWVudFJlZjxIVE1MSW9uU2VhcmNoYmFyRWxlbWVudD47XG5cbiAgICBzZWFyY2goZXY6IGFueSkge1xuXG4gICAgICAgIGxldCBxdWVyeSA9IHRoaXMuc2VhcmNoYmFyLm5hdGl2ZUVsZW1lbnQudmFsdWUgPyB0aGlzLnNlYXJjaGJhci5uYXRpdmVFbGVtZW50LnZhbHVlLnRvU3RyaW5nKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChxdWVyeSkge1xuICAgICAgICAgICAgcXVlcnkgPSBxdWVyeS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IG8gb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgby5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgby5oaWRkZW4gPSB0aGlzLnNlYXJjaEhhbmRsZXIgPyAhdGhpcy5zZWFyY2hIYW5kbGVyKHF1ZXJ5LCBvLnZhbHVlLCBvLmxhYmVsKSA6IChvLmxhYmVsIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihxdWVyeSkgPCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5idWlsZFZpc2libGVPcHRpb25zKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMucG9wb3Zlck92ZXJsYXkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdE9wdGlvbnMoKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgY29uc3QgbW9kYWwgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbG9zZXN0KFwiaW9uLW1vZGFsXCIpO1xuXG4gICAgICAgICAgICBpZiAobW9kYWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWwtaW9zXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtSGVpZ2h0ID0gNDQuNTU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbUhlaWdodCA9IDQ5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcIndpbmRvdzpyZXNpemVcIilcbiAgICAvKnByaXZhdGUqLyBhc3luYyByZXNldFNjcm9sbEhlaWdodCgpIHtcblxuICAgICAgICBjb25zdCBvbGRIZWlnaHQgPSB0aGlzLnNjcm9sbEhlaWdodDtcbiAgICAgICAgbGV0IG5ld0hlaWdodCA9IHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcblxuICAgICAgICBpZiAobmV3SGVpZ2h0ID09IG9sZEhlaWdodCkge1xuICAgICAgICAgICAgYXdhaXQgd2FpdFRpbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG5ld0hlaWdodCA9IHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3SGVpZ2h0ICE9PSBvbGRIZWlnaHQ7XG4gICAgICAgICAgICB9LCB1bmRlZmluZWQsIDIwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxIZWlnaHQgPSBuZXdIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvbGRIZWlnaHQgIT09IFwibnVtYmVyXCIgJiYgdGhpcy5zY3JvbGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsLmNoZWNrVmlld3BvcnRTaXplKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBpb25WaWV3RGlkRW50ZXIoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kYWxPdmVybGF5KSB7XG5cbiAgICAgICAgICAgIHRoaXMucmVzZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgICAgICAgICAgaWYgKCF3aW5kb3dbXCJjb3Jkb3ZhXCJdIHx8IHdpbmRvd1tcImNvcmRvdmFcIl0ucGxhdGZvcm1JZCA9PT0gXCJicm93c2VyXCIpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB3YWl0VGlsbCgoKSA9PiAhIXRoaXMuc2VhcmNoYmFyICYmICEhdGhpcy5zZWFyY2hiYXIubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIikpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoYmFyLm5hdGl2ZUVsZW1lbnQuc2V0Rm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5pbml0T3B0aW9ucygpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=