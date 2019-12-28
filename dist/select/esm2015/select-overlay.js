import { __awaiter, __decorate, __param } from "tslib";
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
};
SelectOverlayContent.ctorParameters = () => [
    { type: ElementRef },
    { type: IntlService },
    { type: PopoverController, decorators: [{ type: Optional }] },
    { type: ModalController, decorators: [{ type: Optional }] }
];
__decorate([
    Input()
], SelectOverlayContent.prototype, "overlay", void 0);
__decorate([
    ViewChild(CdkVirtualScrollViewport, { static: false })
], SelectOverlayContent.prototype, "scroll", void 0);
__decorate([
    ViewChild("content", { read: ElementRef, static: true })
], SelectOverlayContent.prototype, "content", void 0);
__decorate([
    Input()
], SelectOverlayContent.prototype, "multiple", void 0);
__decorate([
    Input()
], SelectOverlayContent.prototype, "orderable", void 0);
__decorate([
    Input()
], SelectOverlayContent.prototype, "updateValues", void 0);
__decorate([
    Input()
], SelectOverlayContent.prototype, "title", void 0);
__decorate([
    Input()
], SelectOverlayContent.prototype, "searchHandler", void 0);
__decorate([
    Input()
], SelectOverlayContent.prototype, "valueValidator", void 0);
__decorate([
    Input()
], SelectOverlayContent.prototype, "valueComparator", void 0);
__decorate([
    Input()
], SelectOverlayContent.prototype, "label", void 0);
__decorate([
    Input()
], SelectOverlayContent.prototype, "options", void 0);
__decorate([
    Input()
], SelectOverlayContent.prototype, "empty", void 0);
__decorate([
    Input()
], SelectOverlayContent.prototype, "whiteSpace", void 0);
__decorate([
    ViewChild("searchbar", { read: ElementRef, static: false })
], SelectOverlayContent.prototype, "searchbar", void 0);
__decorate([
    HostListener("window:resize")
], SelectOverlayContent.prototype, "resetScrollHeight", null);
SelectOverlayContent = __decorate([
    Component({
        selector: "ionx-select-overlay",
        template: "<ion-header *ngIf=\"modalOverlay\">\n    <ion-toolbar>\n        <ion-title style=\"padding: 0px\">{{title}}</ion-title>\n\n        <ionx-buttons slot=\"start\">\n            <ion-back-button style=\"display: inline-block\" [icon]=\"('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back'\" (click)=\"$event.preventDefault(); cancelClicked()\"></ion-back-button>\n        </ionx-buttons>\n\n        <ionx-buttons slot=\"end\">\n            <ion-button fill=\"clear\" (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n        </ionx-buttons>\n\n    </ion-toolbar>\n    <ion-toolbar>\n        <ion-searchbar #searchbar cancelButtonText=\"{{'@co.mmons/js-intl#Cancel' | intlMessage}}\" placeholder=\"{{'@co.mmons/js-intl#Search' | intlMessage}}\"\n                       (ionInput)=\"search($event)\"></ion-searchbar>\n    </ion-toolbar>\n</ion-header>\n<ion-content [scrollY]=\"false\" [scrollX]=\"false\" #content>\n\n    <div class=\"ionx-select-overlay-spinner\" slot=\"fixed\" *ngIf=\"!checkedOptions\">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <ng-template [ngIf]=\"!!visibleOptions\">\n        <div>\n\n            <cdk-virtual-scroll-viewport [itemSize]=\"itemHeight\" [style.height.px]=\"scrollHeight\" *ngIf=\"modalOverlay\">\n\n                <ion-list lines=\"full\">\n\n                    <ion-item detail=\"false\" [button]=\"!option.divider\" [style.fontWeight]=\"option.divider ? 500 : null\" #listItem *cdkVirtualFor=\"let option of visibleOptions\">\n                        <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionBeforeChange(option)\" (ionChange)=\"optionChanged(option)\" (click)=\"optionClicked(option, $event)\" slot=\"start\"\n                                      *ngIf=\"!option.divider\"></ion-checkbox>\n                        <ion-label>\n                            <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                            <ng-template #customLabel>\n                                <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                            </ng-template>\n                        </ion-label>\n                    </ion-item>\n                </ion-list>\n\n            </cdk-virtual-scroll-viewport>\n\n            <ion-list lines=\"full\" *ngIf=\"popoverOverlay\">\n\n                <ng-template ngFor [ngForOf]=\"visibleOptions\" let-option>\n\n                    <ion-item-divider *ngIf=\"option.divider; else basicOption\">\n                        <ion-label>{{option.label}}</ion-label>\n                    </ion-item-divider>\n\n                    <ng-template #basicOption>\n\n                        <ion-item detail=\"false\" button=\"true\" #listItem>\n                            <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionBeforeChange(option)\" (ionChange)=\"optionChanged(option)\" (click)=\"optionClicked(option, $event)\"></ion-checkbox>\n                            <ion-label [style.whiteSpace]=\"whiteSpace\">\n                                <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                                <ng-template #customLabel>\n                                    <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                                </ng-template>\n                            </ion-label>\n                        </ion-item>\n\n                    </ng-template>\n\n                </ng-template>\n            </ion-list>\n        </div>\n    </ng-template>\n\n</ion-content>\n\n<ion-footer *ngIf=\"multiple && popoverOverlay\" style=\"position: sticky; bottom: 0px\">\n    <ion-toolbar>\n        <ion-buttons slot=\"end\">\n\n            <ion-button size=\"small\" (click)=\"cancelClicked()\">{{\"@co.mmons/js-intl#Cancel\" | intlMessage}}</ion-button>\n\n            <ion-button size=\"small\" (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Ok\" | intlMessage}}</ion-button>\n\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
        styles: ["@media (min-width:768px){::ng-deep .ionx-select-overlay-width .popover-content{--width:300px;--max-width:90%}}@media (max-width:767px){::ng-deep .ionx-select-overlay-width .popover-content{left:calc(16px + var(--ion-safe-area-left,0px))!important;width:calc(100% - (32px + var(--ion-safe-area-right,0px) + var(--ion-safe-area-left,0px)))}}:host .ionx-select-overlay-spinner{position:absolute;width:100%;height:100%;left:0;top:0}:host .ionx-select-overlay-spinner ion-spinner{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}:host ion-checkbox{margin-right:16px;margin-top:8px;margin-bottom:8px;-ms-grid-row-align:center;align-self:center}:host ion-list{margin:4px 0;padding:0}:host ::ng-deep .cdk-virtual-scroll-content-wrapper{max-width:100%}:host ::ng-deep .hydrated{visibility:visible}:host-context(ion-popover) ion-content{--overflow:initial!important}:host-context(ion-popover) ion-content ion-item ion-label{white-space:normal}:host-context(ion-popover) ion-content ion-item.item:last-child{--border-width:0px}:host-context(.ios) ion-item-divider{--background:transparent;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:500}"]
    }),
    __param(2, Optional()),
    __param(3, Optional())
], SelectOverlayContent);
export { SelectOverlayContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LW92ZXJsYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9zZWxlY3QvIiwic291cmNlcyI6WyJzZWxlY3Qtb3ZlcmxheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDaEUsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFDLGVBQWUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBVWxFLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBRTdCLFlBQ1csT0FBZ0MsRUFDN0IsSUFBaUIsRUFDUCxpQkFBb0MsRUFDcEMsZUFBZ0M7UUFIN0MsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDN0IsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNQLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBMEJ4RCxhQUFRLEdBQVksS0FBSyxDQUFDO1FBOEIxQixlQUFVLEdBQVcsUUFBUSxDQUFDO0lBdEQ5QixDQUFDO0lBS0QsSUFBSSxjQUFjO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQztJQUNuQyxDQUFDO0lBbURELGFBQWEsQ0FBQyxNQUEyQixFQUFFLEtBQWEsRUFBRSxPQUE4QjtRQUNwRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMs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U0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO3FEQUNFO0FBR3pEO0lBREMsS0FBSyxFQUFFO3NEQUNrQjtBQUcxQjtJQURDLEtBQUssRUFBRTt1REFDVztBQUduQjtJQURDLEtBQUssRUFBRTswREFDOEI7QUFHdEM7SUFEQyxLQUFLLEVBQUU7bURBQ0c7QUFHWDtJQURDLEtBQUssRUFBRTsyREFDNkQ7QUFHckU7SUFEQyxLQUFLLEVBQUU7NERBQ29FO0FBRzVFO0lBREMsS0FBSyxFQUFFOzZEQUNxQztBQUc3QztJQURDLEtBQUssRUFBRTttREFDVztBQUduQjtJQURDLEtBQUssRUFBRTtxREFDdUI7QUFHL0I7SUFEQyxLQUFLLEVBQUU7bURBQ087QUFHZjtJQURDLEtBQUssRUFBRTt3REFDc0I7QUE0TTlCO0lBREMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDO3VEQUNIO0FBc0QzQztJQURYLFlBQVksQ0FBQyxlQUFlLENBQUM7NkRBa0I3QjtBQWpWUSxvQkFBb0I7SUFMaEMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQix1aUlBQWtDOztLQUVyQyxDQUFDO0lBTU8sV0FBQSxRQUFRLEVBQUUsQ0FBQTtJQUNWLFdBQUEsUUFBUSxFQUFFLENBQUE7R0FOTixvQkFBb0IsQ0FrV2hDO1NBbFdZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0fSBmcm9tIFwiQGFuZ3VsYXIvY2RrL3Njcm9sbGluZ1wiO1xuaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9wdGlvbmFsLCBWaWV3Q2hpbGR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0ludGxTZXJ2aWNlfSBmcm9tIFwiQGNvLm1tb25zL2FuZ3VsYXItaW50bFwiO1xuaW1wb3J0IHt3YWl0VGlsbH0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5pbXBvcnQge01vZGFsQ29udHJvbGxlciwgUG9wb3ZlckNvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtDb21wb25lbnRzfSBmcm9tIFwiQGlvbmljL2NvcmVcIjtcbmltcG9ydCB7U2VsZWN0TGFiZWx9IGZyb20gXCIuL3NlbGVjdC1sYWJlbFwiO1xuaW1wb3J0IHtTZWxlY3RPdmVybGF5T3B0aW9ufSBmcm9tIFwiLi9zZWxlY3Qtb3ZlcmxheS1vcHRpb25cIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1zZWxlY3Qtb3ZlcmxheVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcInNlbGVjdC1vdmVybGF5Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcInNlbGVjdC1vdmVybGF5LnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0T3ZlcmxheUNvbnRlbnQge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJvdGVjdGVkIGludGw6IEludGxTZXJ2aWNlLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHBvcG92ZXJDb250cm9sbGVyOiBQb3BvdmVyQ29udHJvbGxlcixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlclxuICAgICkge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBvdmVybGF5OiBzdHJpbmc7XG5cbiAgICBnZXQgcG9wb3Zlck92ZXJsYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXkgPT0gXCJwb3BvdmVyXCI7XG4gICAgfVxuXG4gICAgZ2V0IG1vZGFsT3ZlcmxheSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheSA9PSBcIm1vZGFsXCI7XG4gICAgfVxuXG4gICAgQFZpZXdDaGlsZChDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQsIHtzdGF0aWM6IGZhbHNlfSlcbiAgICBzY3JvbGw6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydDtcblxuICAgIHNjcm9sbEhlaWdodDogbnVtYmVyO1xuXG4gICAgaXRlbUhlaWdodDogbnVtYmVyO1xuXG4gICAgQFZpZXdDaGlsZChcImNvbnRlbnRcIiwge3JlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZX0pXG4gICAgY29udGVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudCAmIENvbXBvbmVudHMuSW9uQ29udGVudD47XG5cbiAgICBASW5wdXQoKVxuICAgIG11bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIG9yZGVyYWJsZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgdXBkYXRlVmFsdWVzOiAodmFsdWVzOiBhbnlbXSkgPT4gdm9pZDtcblxuICAgIEBJbnB1dCgpXG4gICAgdGl0bGU6IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgc2VhcmNoSGFuZGxlcjogKHF1ZXJ5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGxhYmVsOiBzdHJpbmcpID0+IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHZhbHVlVmFsaWRhdG9yOiAodmFsdWU6IGFueSwgY2hlY2tlZDogYm9vbGVhbiwgb3RoZXJWYWx1ZXM6IGFueVtdKSA9PiBhbnlbXTtcblxuICAgIEBJbnB1dCgpXG4gICAgdmFsdWVDb21wYXJhdG9yOiAoYTogYW55LCBiOiBhbnkpID0+IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIGxhYmVsOiBTZWxlY3RMYWJlbDtcblxuICAgIEBJbnB1dCgpXG4gICAgb3B0aW9uczogU2VsZWN0T3ZlcmxheU9wdGlvbltdO1xuXG4gICAgQElucHV0KClcbiAgICBlbXB0eTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgd2hpdGVTcGFjZTogc3RyaW5nID0gXCJub3dyYXBcIjtcblxuICAgIHZpc2libGVPcHRpb25zOiBTZWxlY3RPdmVybGF5T3B0aW9uW107XG5cbiAgICBjaGVja2VkT3B0aW9uczogU2VsZWN0T3ZlcmxheU9wdGlvbltdO1xuXG4gICAgcHJpdmF0ZSBsYXN0Q2xpY2tlZE9wdGlvbjogU2VsZWN0T3ZlcmxheU9wdGlvbjtcblxuICAgIG9wdGlvbkRpdmlkZXIob3B0aW9uOiBTZWxlY3RPdmVybGF5T3B0aW9uLCBpbmRleDogbnVtYmVyLCBvcHRpb25zOiBTZWxlY3RPdmVybGF5T3B0aW9uW10pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNbaV0gPT09IG9wdGlvbiAmJiBpID4gMCAmJiB0aGlzLm9wdGlvbnNbaSAtIDFdLmRpdmlkZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zW2kgLSAxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wdGlvbkNsaWNrZWQob3B0aW9uOiBTZWxlY3RPdmVybGF5T3B0aW9uLCBldjogRXZlbnQpIHtcblxuICAgICAgICBpZiAob3B0aW9uLmNoZWNrZWQgJiYgIXRoaXMuZW1wdHkgJiYgdGhpcy5jaGVja2VkT3B0aW9ucy5sZW5ndGggPT09IDEgJiYgdGhpcy5jaGVja2VkT3B0aW9uc1swXSA9PT0gb3B0aW9uKSB7XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldi5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgb3B0aW9uQmVmb3JlQ2hhbmdlKG9wdGlvbjogU2VsZWN0T3ZlcmxheU9wdGlvbikge1xuICAgICAgICB0aGlzLmxhc3RDbGlja2VkT3B0aW9uID0gb3B0aW9uO1xuICAgICAgICBvcHRpb24uY2hlY2tlZFRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgb3B0aW9uQ2hhbmdlZChvcHRpb246IFNlbGVjdE92ZXJsYXlPcHRpb24pIHtcblxuICAgICAgICBpZiAoIXRoaXMubGFzdENsaWNrZWRPcHRpb24gfHwgb3B0aW9uICE9PSB0aGlzLmxhc3RDbGlja2VkT3B0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLnZhbHVlVmFsaWRhdG9yKSB7XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZXM6IGFueVtdID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBvIG9mIHRoaXMuY2hlY2tlZE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAobyAhPT0gb3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKG8udmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG9wdGlvbldhc0NoZWNrZWQgPSBvcHRpb24uY2hlY2tlZDtcblxuICAgICAgICAgICAgZm9yIChsZXQgbyBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBvLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jaGVja2VkT3B0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICBWQUxVRVM6IGZvciAobGV0IHYgb2YgdGhpcy52YWx1ZVZhbGlkYXRvcihvcHRpb24udmFsdWUsIG9wdGlvbldhc0NoZWNrZWQsIHZhbHVlcykgfHwgW10pIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBvIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZUNvbXBhcmF0b3Ioby52YWx1ZSwgdikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWRPcHRpb25zLnB1c2gobyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBWQUxVRVM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKCFvcHRpb24uY2hlY2tlZCkge1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoZWNrZWRPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrZWRPcHRpb25zW2ldID09PSBvcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZE9wdGlvbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBvIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8uY2hlY2tlZCAmJiBvICE9PSBvcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZE9wdGlvbnMgPSBbb3B0aW9uXTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZE9wdGlvbnMucHVzaChvcHRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5va0NsaWNrZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGFzdENsaWNrZWRPcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZFZpc2libGVPcHRpb25zKCkge1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNbaV0uZGl2aWRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1tpXS5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGVuZ3RoIC0gMSA+IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaWkgPSBpICsgMTsgaWkgPCB0aGlzLm9wdGlvbnMubGVuZ3RoOyBpaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNbaWldLmRpdmlkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNbaWldLmhpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1tpXS5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmlzaWJsZU9wdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgb3B0aW9uIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKCFvcHRpb24uaGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9ucy5wdXNoKG9wdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGluaXRPcHRpb25zKCkge1xuXG4gICAgICAgIHRoaXMuY2hlY2tlZE9wdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgb3B0aW9uIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkT3B0aW9ucy5wdXNoKG9wdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vcmRlcmFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZE9wdGlvbnMuc29ydCgoYSwgYikgPT4gYS5jaGVja2VkVGltZXN0YW1wIC0gYi5jaGVja2VkVGltZXN0YW1wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYnVpbGRWaXNpYmxlT3B0aW9ucygpO1xuXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWRPcHRpb25zLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMubW9kYWxPdmVybGF5KSB7XG5cbiAgICAgICAgICAgICAgICBhd2FpdCB3YWl0VGlsbCgoKSA9PiAhIXRoaXMuc2Nyb2xsKTtcblxuICAgICAgICAgICAgICAgIGxldCBpbmRleFRvU2Nyb2xsOiBudW1iZXIgPSAtMTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52aXNpYmxlT3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlT3B0aW9uc1tpXS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleFRvU2Nyb2xsID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGwuc2Nyb2xsVG9JbmRleChpbmRleFRvU2Nyb2xsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9rQ2xpY2tlZCgpIHtcblxuICAgICAgICBsZXQgdmFsdWVzID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMub3JkZXJhYmxlKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBvIG9mIHRoaXMuY2hlY2tlZE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChvLnZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBPUFRJT05TOiBmb3IgKGxldCBvcHRpb24gb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY2hlY2tlZCBvZiB0aGlzLmNoZWNrZWRPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24gPT09IGNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKGNoZWNrZWQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWUgT1BUSU9OUztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWVzKHZhbHVlcyk7XG5cbiAgICAgICAgaWYgKHRoaXMucG9wb3ZlckNvbnRyb2xsZXIgJiYgdGhpcy5wb3BvdmVyT3ZlcmxheSkge1xuICAgICAgICAgICAgdGhpcy5wb3BvdmVyQ29udHJvbGxlci5kaXNtaXNzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2RhbENvbnRyb2xsZXIgJiYgdGhpcy5tb2RhbE92ZXJsYXkpIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbmNlbENsaWNrZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXJDb250cm9sbGVyICYmIHRoaXMucG9wb3Zlck92ZXJsYXkpIHtcbiAgICAgICAgICAgIHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kYWxDb250cm9sbGVyICYmIHRoaXMubW9kYWxPdmVybGF5KSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAVmlld0NoaWxkKFwic2VhcmNoYmFyXCIsIHtyZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IGZhbHNlfSlcbiAgICBwcml2YXRlIHNlYXJjaGJhcjogRWxlbWVudFJlZjxIVE1MSW9uU2VhcmNoYmFyRWxlbWVudD47XG5cbiAgICBzZWFyY2goZXY6IGFueSkge1xuXG4gICAgICAgIGxldCBxdWVyeSA9IHRoaXMuc2VhcmNoYmFyLm5hdGl2ZUVsZW1lbnQudmFsdWUgPyB0aGlzLnNlYXJjaGJhci5uYXRpdmVFbGVtZW50LnZhbHVlLnRvU3RyaW5nKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChxdWVyeSkge1xuICAgICAgICAgICAgcXVlcnkgPSBxdWVyeS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IG8gb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgby5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgby5oaWRkZW4gPSB0aGlzLnNlYXJjaEhhbmRsZXIgPyAhdGhpcy5zZWFyY2hIYW5kbGVyKHF1ZXJ5LCBvLnZhbHVlLCBvLmxhYmVsKSA6IChvLmxhYmVsIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihxdWVyeSkgPCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5idWlsZFZpc2libGVPcHRpb25zKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBmaXhJb3NDb250ZW50SW5Qb3BvdmVyKCkge1xuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNvbnRlbnQubmF0aXZlRWxlbWVudC5nZXRTY3JvbGxFbGVtZW50KCk7XG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50LnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpKTtcbiAgICAgICAgICAgIHN0eWxlLmlubmVyVGV4dCA9IFwiLnRyYW5zaXRpb24tZWZmZWN0IHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50IH1cIjtcblxuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXJPdmVybGF5KSB7XG4gICAgICAgICAgICB0aGlzLmluaXRPcHRpb25zKCk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGNvbnN0IG1vZGFsID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xvc2VzdChcImlvbi1tb2RhbFwiKTtcblxuICAgICAgICAgICAgaWYgKG1vZGFsLmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsLWlvc1wiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbUhlaWdodCA9IDQ0LjU1O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1IZWlnaHQgPSA0OTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMucG9wb3Zlck92ZXJsYXkpIHtcbiAgICAgICAgICAgIHRoaXMuZml4SW9zQ29udGVudEluUG9wb3ZlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcIndpbmRvdzpyZXNpemVcIilcbiAgICAvKnByaXZhdGUqLyBhc3luYyByZXNldFNjcm9sbEhlaWdodCgpIHtcblxuICAgICAgICBjb25zdCBvbGRIZWlnaHQgPSB0aGlzLnNjcm9sbEhlaWdodDtcbiAgICAgICAgbGV0IG5ld0hlaWdodCA9IHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcblxuICAgICAgICBpZiAobmV3SGVpZ2h0ID09IG9sZEhlaWdodCkge1xuICAgICAgICAgICAgYXdhaXQgd2FpdFRpbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG5ld0hlaWdodCA9IHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3SGVpZ2h0ICE9PSBvbGRIZWlnaHQ7XG4gICAgICAgICAgICB9LCB1bmRlZmluZWQsIDIwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxIZWlnaHQgPSBuZXdIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvbGRIZWlnaHQgIT09IFwibnVtYmVyXCIgJiYgdGhpcy5zY3JvbGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsLmNoZWNrVmlld3BvcnRTaXplKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBpb25WaWV3RGlkRW50ZXIoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kYWxPdmVybGF5KSB7XG5cbiAgICAgICAgICAgIHRoaXMucmVzZXRTY3JvbGxIZWlnaHQoKTtcblxuICAgICAgICAgICAgaWYgKCF3aW5kb3dbXCJjb3Jkb3ZhXCJdIHx8IHdpbmRvd1tcImNvcmRvdmFcIl0ucGxhdGZvcm1JZCA9PT0gXCJicm93c2VyXCIpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB3YWl0VGlsbCgoKSA9PiAhIXRoaXMuc2VhcmNoYmFyICYmICEhdGhpcy5zZWFyY2hiYXIubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIikpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoYmFyLm5hdGl2ZUVsZW1lbnQuc2V0Rm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5pbml0T3B0aW9ucygpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=