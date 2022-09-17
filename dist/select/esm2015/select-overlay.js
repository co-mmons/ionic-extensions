import { __awaiter } from "tslib";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Component, ElementRef, HostListener, Input, Optional, ViewChild } from "@angular/core";
import { IntlService } from "@co.mmons/angular-intl";
import { waitTill } from "@co.mmons/js-utils/core";
import { ModalController, PopoverController } from "@ionic/angular";
export class SelectOverlayContent {
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
        return __awaiter(this, void 0, void 0, function* () {
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
    fixIosContentInPopover() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.content.nativeElement.getScrollElement();
                const style = this.content.nativeElement.shadowRoot.appendChild(document.createElement("style"));
                style.innerText = ".transition-effect { display: none !important }";
            }
            catch (_a) {
            }
        });
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
    ngAfterViewInit() {
        if (this.popoverOverlay) {
            this.fixIosContentInPopover();
        }
    }
    resetScrollHeight() {
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
}
SelectOverlayContent.decorators = [
    { type: Component, args: [{
                selector: "ionx-select-overlay",
                template: "<ion-header *ngIf=\"modalOverlay\">\n    <ion-toolbar>\n        <ion-title style=\"padding: 0px\">{{title}}</ion-title>\n\n        <ionx-buttons slot=\"start\">\n            <ion-back-button style=\"display: inline-block\" [icon]=\"('tablet' | matchGreaterWidth) ? 'close' : null\" (click)=\"$event.preventDefault(); cancelClicked()\"></ion-back-button>\n        </ionx-buttons>\n\n        <ionx-buttons slot=\"end\">\n            <ion-button fill=\"clear\" (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n        </ionx-buttons>\n\n    </ion-toolbar>\n    <ion-toolbar>\n        <ion-searchbar #searchbar cancelButtonText=\"{{'@co.mmons/js-intl#Cancel' | intlMessage}}\" placeholder=\"{{'@co.mmons/js-intl#Search' | intlMessage}}\"\n                       (ionInput)=\"search($event)\"></ion-searchbar>\n    </ion-toolbar>\n</ion-header>\n<ion-content [scrollY]=\"false\" [scrollX]=\"false\" #content>\n\n    <div class=\"ionx-select-overlay-spinner\" slot=\"fixed\" *ngIf=\"!checkedOptions\">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <ng-template [ngIf]=\"!!visibleOptions\">\n        <div>\n\n            <cdk-virtual-scroll-viewport [itemSize]=\"itemHeight\" [style.height.px]=\"scrollHeight\" *ngIf=\"modalOverlay\">\n\n                <ion-list lines=\"full\">\n\n                    <ion-item detail=\"false\" button=\"false\" [style.fontWeight]=\"option.divider ? 500 : null\" #listItem *cdkVirtualFor=\"let option of visibleOptions\">\n                        <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionBeforeChange(option)\" (ionChange)=\"optionChanged(option)\" (click)=\"optionClicked(option, $event)\" slot=\"start\"\n                                      *ngIf=\"!option.divider\"></ion-checkbox>\n                        <ion-label>\n                            <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                            <ng-template #customLabel>\n                                <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                            </ng-template>\n                        </ion-label>\n                    </ion-item>\n                </ion-list>\n\n            </cdk-virtual-scroll-viewport>\n\n            <ion-list lines=\"full\" *ngIf=\"popoverOverlay\">\n\n                <ng-template ngFor [ngForOf]=\"visibleOptions\" let-option>\n\n                    <ion-item-divider *ngIf=\"option.divider; else basicOption\">\n                        <ion-label>{{option.label}}</ion-label>\n                    </ion-item-divider>\n\n                    <ng-template #basicOption>\n\n                        <ion-item detail=\"false\" button=\"false\" #listItem>\n                            <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionBeforeChange(option)\" (ionChange)=\"optionChanged(option)\" (click)=\"optionClicked(option, $event)\" slot=\"start\"></ion-checkbox>\n                            <ion-label [style.whiteSpace]=\"whiteSpace\">\n                                <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                                <ng-template #customLabel>\n                                    <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                                </ng-template>\n                            </ion-label>\n                        </ion-item>\n\n                    </ng-template>\n\n                </ng-template>\n            </ion-list>\n        </div>\n    </ng-template>\n\n</ion-content>\n\n<ion-footer *ngIf=\"multiple && popoverOverlay\" style=\"position: sticky; bottom: 0px\">\n    <ion-toolbar>\n        <ion-buttons slot=\"end\">\n\n            <ion-button size=\"small\" (click)=\"cancelClicked()\">{{\"@co.mmons/js-intl#Cancel\" | intlMessage}}</ion-button>\n\n            <ion-button size=\"small\" (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Ok\" | intlMessage}}</ion-button>\n\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
                styles: ["@media (min-width: 768px){::ng-deep .ionx-select-overlay-width .popover-content{--width: 300px;--max-width: 90%}}@media (max-width: 767px){::ng-deep .ionx-select-overlay-width .popover-content{left:calc(16px + var(--ion-safe-area-left, 0px))!important;width:calc(100% - (32px + var(--ion-safe-area-right, 0px) + var(--ion-safe-area-left, 0px)))}}:host .ionx-select-overlay-spinner{position:absolute;width:100%;height:100%;left:0px;top:0px}:host .ionx-select-overlay-spinner ion-spinner{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}:host ion-checkbox{margin-right:16px;margin-top:8px;margin-bottom:8px;align-self:center}:host ion-list{margin:4px 0;padding:0}:host ::ng-deep .cdk-virtual-scroll-content-wrapper{max-width:100%}:host ::ng-deep .hydrated{visibility:visible}:host-context(ion-popover) ion-content{--overflow: initial !important}:host-context(ion-popover) ion-content ion-item ion-label{white-space:normal}:host-context(ion-popover) ion-content ion-item.item:last-child{--border-width: 0px}:host-context(.ios) ion-item-divider{--background: transparent;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:500}\n"]
            },] }
];
SelectOverlayContent.ctorParameters = () => [
    { type: ElementRef },
    { type: IntlService },
    { type: PopoverController, decorators: [{ type: Optional }] },
    { type: ModalController, decorators: [{ type: Optional }] }
];
SelectOverlayContent.propDecorators = {
    overlay: [{ type: Input }],
    scroll: [{ type: ViewChild, args: [CdkVirtualScrollViewport, { static: false },] }],
    content: [{ type: ViewChild, args: ["content", { read: ElementRef, static: true },] }],
    multiple: [{ type: Input }],
    orderable: [{ type: Input }],
    updateValues: [{ type: Input }],
    title: [{ type: Input }],
    searchHandler: [{ type: Input }],
    valueValidator: [{ type: Input }],
    valueComparator: [{ type: Input }],
    label: [{ type: Input }],
    options: [{ type: Input }],
    empty: [{ type: Input }],
    whiteSpace: [{ type: Input }],
    searchbar: [{ type: ViewChild, args: ["searchbar", { read: ElementRef, static: false },] }],
    resetScrollHeight: [{ type: HostListener, args: ["window:resize",] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LW92ZXJsYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VsZWN0L3NlbGVjdC1vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFVbEUsTUFBTSxPQUFPLG9CQUFvQjtJQUU3QixZQUNXLE9BQWdDLEVBQzdCLElBQWlCLEVBQ1AsaUJBQW9DLEVBQ3BDLGVBQWdDO1FBSDdDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQzdCLFNBQUksR0FBSixJQUFJLENBQWE7UUFDUCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQTBCeEQsYUFBUSxHQUFZLEtBQUssQ0FBQztRQThCMUIsZUFBVSxHQUFXLFFBQVEsQ0FBQztJQXREOUIsQ0FBQztJQUtELElBQUksY0FBYztRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUM7SUFDckMsQ0FBQztJQUVELElBQUksWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUM7SUFDbkMsQ0FBQztJQW1ERCxhQUFhLENBQUMsTUFBMkIsRUFBRSxLQUFhLEVBQUUsT0FBOEI7UUFDcEYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENB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RUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQzt1QkFHckQsS0FBSzt3QkFHTCxLQUFLOzJCQUdMLEtBQUs7b0JBR0wsS0FBSzs0QkFHTCxLQUFLOzZCQUdMLEtBQUs7OEJBR0wsS0FBSztvQkFHTCxLQUFLO3NCQUdMLEtBQUs7b0JBR0wsS0FBSzt5QkFHTCxLQUFLO3dCQTRNTCxTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDO2dDQXNEeEQsWUFBWSxTQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Nka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydH0gZnJvbSBcIkBhbmd1bGFyL2Nkay9zY3JvbGxpbmdcIjtcbmltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPcHRpb25hbCwgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtJbnRsU2VydmljZX0gZnJvbSBcIkBjby5tbW9ucy9hbmd1bGFyLWludGxcIjtcbmltcG9ydCB7d2FpdFRpbGx9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXIsIFBvcG92ZXJDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7Q29tcG9uZW50c30gZnJvbSBcIkBpb25pYy9jb3JlXCI7XG5pbXBvcnQge1NlbGVjdExhYmVsfSBmcm9tIFwiLi9zZWxlY3QtbGFiZWxcIjtcbmltcG9ydCB7U2VsZWN0T3ZlcmxheU9wdGlvbn0gZnJvbSBcIi4vc2VsZWN0LW92ZXJsYXktb3B0aW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtc2VsZWN0LW92ZXJsYXlcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJzZWxlY3Qtb3ZlcmxheS5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJzZWxlY3Qtb3ZlcmxheS5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdE92ZXJsYXlDb250ZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByb3RlY3RlZCBpbnRsOiBJbnRsU2VydmljZSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBwb3BvdmVyQ29udHJvbGxlcjogUG9wb3ZlckNvbnRyb2xsZXIsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXJcbiAgICApIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgb3ZlcmxheTogc3RyaW5nO1xuXG4gICAgZ2V0IHBvcG92ZXJPdmVybGF5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5ID09IFwicG9wb3ZlclwiO1xuICAgIH1cblxuICAgIGdldCBtb2RhbE92ZXJsYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXkgPT0gXCJtb2RhbFwiO1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0LCB7c3RhdGljOiBmYWxzZX0pXG4gICAgc2Nyb2xsOiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQ7XG5cbiAgICBzY3JvbGxIZWlnaHQ6IG51bWJlcjtcblxuICAgIGl0ZW1IZWlnaHQ6IG51bWJlcjtcblxuICAgIEBWaWV3Q2hpbGQoXCJjb250ZW50XCIsIHtyZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWV9KVxuICAgIGNvbnRlbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQgJiBDb21wb25lbnRzLklvbkNvbnRlbnQ+O1xuXG4gICAgQElucHV0KClcbiAgICBtdWx0aXBsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBvcmRlcmFibGU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHVwZGF0ZVZhbHVlczogKHZhbHVlczogYW55W10pID0+IHZvaWQ7XG5cbiAgICBASW5wdXQoKVxuICAgIHRpdGxlOiBhbnk7XG5cbiAgICBASW5wdXQoKVxuICAgIHNlYXJjaEhhbmRsZXI6IChxdWVyeTogc3RyaW5nLCB2YWx1ZTogYW55LCBsYWJlbDogc3RyaW5nKSA9PiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICB2YWx1ZVZhbGlkYXRvcjogKHZhbHVlOiBhbnksIGNoZWNrZWQ6IGJvb2xlYW4sIG90aGVyVmFsdWVzOiBhbnlbXSkgPT4gYW55W107XG5cbiAgICBASW5wdXQoKVxuICAgIHZhbHVlQ29tcGFyYXRvcjogKGE6IGFueSwgYjogYW55KSA9PiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBsYWJlbDogU2VsZWN0TGFiZWw7XG5cbiAgICBASW5wdXQoKVxuICAgIG9wdGlvbnM6IFNlbGVjdE92ZXJsYXlPcHRpb25bXTtcblxuICAgIEBJbnB1dCgpXG4gICAgZW1wdHk6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHdoaXRlU3BhY2U6IHN0cmluZyA9IFwibm93cmFwXCI7XG5cbiAgICB2aXNpYmxlT3B0aW9uczogU2VsZWN0T3ZlcmxheU9wdGlvbltdO1xuXG4gICAgY2hlY2tlZE9wdGlvbnM6IFNlbGVjdE92ZXJsYXlPcHRpb25bXTtcblxuICAgIHByaXZhdGUgbGFzdENsaWNrZWRPcHRpb246IFNlbGVjdE92ZXJsYXlPcHRpb247XG5cbiAgICBvcHRpb25EaXZpZGVyKG9wdGlvbjogU2VsZWN0T3ZlcmxheU9wdGlvbiwgaW5kZXg6IG51bWJlciwgb3B0aW9uczogU2VsZWN0T3ZlcmxheU9wdGlvbltdKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zW2ldID09PSBvcHRpb24gJiYgaSA+IDAgJiYgdGhpcy5vcHRpb25zW2kgLSAxXS5kaXZpZGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uc1tpIC0gMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcHRpb25DbGlja2VkKG9wdGlvbjogU2VsZWN0T3ZlcmxheU9wdGlvbiwgZXY6IEV2ZW50KSB7XG5cbiAgICAgICAgaWYgKG9wdGlvbi5jaGVja2VkICYmICF0aGlzLmVtcHR5ICYmIHRoaXMuY2hlY2tlZE9wdGlvbnMubGVuZ3RoID09PSAxICYmIHRoaXMuY2hlY2tlZE9wdGlvbnNbMF0gPT09IG9wdGlvbikge1xuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXYuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG9wdGlvbkJlZm9yZUNoYW5nZShvcHRpb246IFNlbGVjdE92ZXJsYXlPcHRpb24pIHtcbiAgICAgICAgdGhpcy5sYXN0Q2xpY2tlZE9wdGlvbiA9IG9wdGlvbjtcbiAgICAgICAgb3B0aW9uLmNoZWNrZWRUaW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIG9wdGlvbkNoYW5nZWQob3B0aW9uOiBTZWxlY3RPdmVybGF5T3B0aW9uKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmxhc3RDbGlja2VkT3B0aW9uIHx8IG9wdGlvbiAhPT0gdGhpcy5sYXN0Q2xpY2tlZE9wdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgdGhpcy52YWx1ZVZhbGlkYXRvcikge1xuXG4gICAgICAgICAgICBsZXQgdmFsdWVzOiBhbnlbXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgbyBvZiB0aGlzLmNoZWNrZWRPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKG8gIT09IG9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChvLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBvcHRpb25XYXNDaGVja2VkID0gb3B0aW9uLmNoZWNrZWQ7XG5cbiAgICAgICAgICAgIGZvciAobGV0IG8gb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgby5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZE9wdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgVkFMVUVTOiBmb3IgKGxldCB2IG9mIHRoaXMudmFsdWVWYWxpZGF0b3Iob3B0aW9uLnZhbHVlLCBvcHRpb25XYXNDaGVja2VkLCB2YWx1ZXMpIHx8IFtdKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbyBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVDb21wYXJhdG9yKG8udmFsdWUsIHYpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkT3B0aW9ucy5wdXNoKG8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWUgVkFMVUVTO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmICghb3B0aW9uLmNoZWNrZWQpIHtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGVja2VkT3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja2VkT3B0aW9uc1tpXSA9PT0gb3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWRPcHRpb25zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbyBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvLmNoZWNrZWQgJiYgbyAhPT0gb3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgby5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWRPcHRpb25zID0gW29wdGlvbl07XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWRPcHRpb25zLnB1c2gob3B0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMub2tDbGlja2VkKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxhc3RDbGlja2VkT3B0aW9uID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgYnVpbGRWaXNpYmxlT3B0aW9ucygpIHtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zW2ldLmRpdmlkZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNbaV0uaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmxlbmd0aCAtIDEgPiBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlpID0gaSArIDE7IGlpIDwgdGhpcy5vcHRpb25zLmxlbmd0aDsgaWkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zW2lpXS5kaXZpZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zW2lpXS5oaWRkZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNbaV0uaGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZpc2libGVPcHRpb25zID0gW107XG4gICAgICAgIGZvciAobGV0IG9wdGlvbiBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9uLmhpZGRlbikge1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZU9wdGlvbnMucHVzaChvcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBpbml0T3B0aW9ucygpIHtcblxuICAgICAgICB0aGlzLmNoZWNrZWRPcHRpb25zID0gW107XG4gICAgICAgIGZvciAobGV0IG9wdGlvbiBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZE9wdGlvbnMucHVzaChvcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3JkZXJhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRPcHRpb25zLnNvcnQoKGEsIGIpID0+IGEuY2hlY2tlZFRpbWVzdGFtcCAtIGIuY2hlY2tlZFRpbWVzdGFtcCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJ1aWxkVmlzaWJsZU9wdGlvbnMoKTtcblxuICAgICAgICBpZiAodGhpcy5jaGVja2VkT3B0aW9ucy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGFsT3ZlcmxheSkge1xuXG4gICAgICAgICAgICAgICAgYXdhaXQgd2FpdFRpbGwoKCkgPT4gISF0aGlzLnNjcm9sbCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW5kZXhUb1Njcm9sbDogbnVtYmVyID0gLTE7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmlzaWJsZU9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZU9wdGlvbnNbaV0uY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhUb1Njcm9sbCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsLnNjcm9sbFRvSW5kZXgoaW5kZXhUb1Njcm9sbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBva0NsaWNrZWQoKSB7XG5cbiAgICAgICAgbGV0IHZhbHVlcyA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLm9yZGVyYWJsZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgbyBvZiB0aGlzLmNoZWNrZWRPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goby52YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgT1BUSU9OUzogZm9yIChsZXQgb3B0aW9uIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoZWNrZWQgb2YgdGhpcy5jaGVja2VkT3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uID09PSBjaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChjaGVja2VkLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIE9QVElPTlM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlcyh2YWx1ZXMpO1xuXG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXJDb250cm9sbGVyICYmIHRoaXMucG9wb3Zlck92ZXJsYXkpIHtcbiAgICAgICAgICAgIHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kYWxDb250cm9sbGVyICYmIHRoaXMubW9kYWxPdmVybGF5KSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5jZWxDbGlja2VkKCkge1xuICAgICAgICBpZiAodGhpcy5wb3BvdmVyQ29udHJvbGxlciAmJiB0aGlzLnBvcG92ZXJPdmVybGF5KSB7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXJDb250cm9sbGVyLmRpc21pc3MoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZGFsQ29udHJvbGxlciAmJiB0aGlzLm1vZGFsT3ZlcmxheSkge1xuICAgICAgICAgICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQFZpZXdDaGlsZChcInNlYXJjaGJhclwiLCB7cmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiBmYWxzZX0pXG4gICAgcHJpdmF0ZSBzZWFyY2hiYXI6IEVsZW1lbnRSZWY8SFRNTElvblNlYXJjaGJhckVsZW1lbnQ+O1xuXG4gICAgc2VhcmNoKGV2OiBhbnkpIHtcblxuICAgICAgICBsZXQgcXVlcnkgPSB0aGlzLnNlYXJjaGJhci5uYXRpdmVFbGVtZW50LnZhbHVlID8gdGhpcy5zZWFyY2hiYXIubmF0aXZlRWxlbWVudC52YWx1ZS50b1N0cmluZygpIDogdW5kZWZpbmVkO1xuICAgICAgICBpZiAocXVlcnkpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBvIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKCFxdWVyeSkge1xuICAgICAgICAgICAgICAgIG8uaGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG8uaGlkZGVuID0gdGhpcy5zZWFyY2hIYW5kbGVyID8gIXRoaXMuc2VhcmNoSGFuZGxlcihxdWVyeSwgby52YWx1ZSwgby5sYWJlbCkgOiAoby5sYWJlbCB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YocXVlcnkpIDwgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYnVpbGRWaXNpYmxlT3B0aW9ucygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgZml4SW9zQ29udGVudEluUG9wb3ZlcigpIHtcbiAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0U2Nyb2xsRWxlbWVudCgpO1xuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudC5zaGFkb3dSb290LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKSk7XG4gICAgICAgICAgICBzdHlsZS5pbm5lclRleHQgPSBcIi50cmFuc2l0aW9uLWVmZmVjdCB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudCB9XCI7XG5cbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICBpZiAodGhpcy5wb3BvdmVyT3ZlcmxheSkge1xuICAgICAgICAgICAgdGhpcy5pbml0T3B0aW9ucygpO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBjb25zdCBtb2RhbCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoXCJpb24tbW9kYWxcIik7XG5cbiAgICAgICAgICAgIGlmIChtb2RhbC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbC1pb3NcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1IZWlnaHQgPSA0NC41NTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtSGVpZ2h0ID0gNDk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXJPdmVybGF5KSB7XG4gICAgICAgICAgICB0aGlzLmZpeElvc0NvbnRlbnRJblBvcG92ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJ3aW5kb3c6cmVzaXplXCIpXG4gICAgLypwcml2YXRlKi8gYXN5bmMgcmVzZXRTY3JvbGxIZWlnaHQoKSB7XG5cbiAgICAgICAgY29uc3Qgb2xkSGVpZ2h0ID0gdGhpcy5zY3JvbGxIZWlnaHQ7XG4gICAgICAgIGxldCBuZXdIZWlnaHQgPSB0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgaWYgKG5ld0hlaWdodCA9PSBvbGRIZWlnaHQpIHtcbiAgICAgICAgICAgIGF3YWl0IHdhaXRUaWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBuZXdIZWlnaHQgPSB0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld0hlaWdodCAhPT0gb2xkSGVpZ2h0O1xuICAgICAgICAgICAgfSwgdW5kZWZpbmVkLCAyMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsSGVpZ2h0ID0gbmV3SGVpZ2h0O1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb2xkSGVpZ2h0ICE9PSBcIm51bWJlclwiICYmIHRoaXMuc2Nyb2xsKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbC5jaGVja1ZpZXdwb3J0U2l6ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgaW9uVmlld0RpZEVudGVyKCkge1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGFsT3ZlcmxheSkge1xuXG4gICAgICAgICAgICB0aGlzLnJlc2V0U2Nyb2xsSGVpZ2h0KCk7XG5cbiAgICAgICAgICAgIGlmICghd2luZG93W1wiY29yZG92YVwiXSB8fCB3aW5kb3dbXCJjb3Jkb3ZhXCJdLnBsYXRmb3JtSWQgPT09IFwiYnJvd3NlclwiKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgd2FpdFRpbGwoKCkgPT4gISF0aGlzLnNlYXJjaGJhciAmJiAhIXRoaXMuc2VhcmNoYmFyLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0XCIpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaGJhci5uYXRpdmVFbGVtZW50LnNldEZvY3VzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaW5pdE9wdGlvbnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19