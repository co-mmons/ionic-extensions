import { __decorate } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Injector, Input, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ModalController } from "@ionic/angular";
import { dialogData } from "./dialog-data-symbol";
import { dialogInstance } from "./dialog-instance-symbol";
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
        this.detectChanges();
    }
    get buttons() {
        return this._buttons;
    }
    detectChanges() {
        if (this.messageComponent) {
            this.messageComponent.changeDetectorRef.detach();
        }
        this.changeDetectorRef.detectChanges();
        if (this.messageComponent) {
            this.messageComponent.changeDetectorRef.reattach();
        }
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
        styles: [":host{--dialog--background-color:var(--background-color, var(--ion-background-color, #ffffff));--dialog--foreground-color:var(--foreground-color, var(--ion-text-color));--dialog--border-color:var(--border-color, var(--ion-border-color));display:-webkit-box;display:flex;contain:content;position:relative;color:var(--dialog--foreground-color)}:host [ionx--content]{background:var(--dialog--background-color,#fff);color:var(--dialog--foreground-color)}:host [ionx--message]{font-size:var(--dialog--message-font-size);text-align:var(--dialog--text-align);margin:16px 16px 24px}:host [ionx--header]{font-size:var(--dialog--header-font-size);font-weight:var(--dialog--header-font-weight,500);margin:16px;text-align:var(--dialog--text-align)}:host ion-footer{--border-color:var(--dialog--border-color)}:host ion-footer ion-toolbar{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--min-height:none;--ion-safe-area-bottom:0px;--ion-safe-area-top:0px;--ion-safe-area-start:0px;--ion-safe-area-end:0px;--ion-toolbar-background:var(--dialog--background-color, #ffffff);--ion-toolbar-background-color:var(--dialog--background-color, #000000);--ion-toolbar-color:var(--dialog--foreground-color, #000000)}:host ion-footer ionx-buttons{-webkit-box-pack:var(--dialog--buttons-align,flex-end);justify-content:var(--dialog--buttons-align,flex-end)}:host ion-footer ion-button{min-height:44px}:host ion-footer ion-button:not(:last-child){font-weight:400}:host ion-footer ion-button:last-child{font-weight:500}:host-context(.md){--dialog--message-font-size:16px;--dialog--header-font-size:20px;--dialog--text-align:left}:host-context(.md) ion-footer ion-toolbar{--padding-bottom:8px}:host-context(.md) ion-footer::before{display:none}:host-context(.ios){--dialog--message-font-size:15px;--dialog--header-font-size:18px;--dialog--text-align:center;--dialog--buttons-align:center;--dialog--header-font-weight:500}:host-context(.ios) ion-footer ion-button{-webkit-box-flex:1;flex:1}:host-context(.ios) ion-footer ion-button:not(:first-child){border-left:.55px solid var(--dialog--border-color)}"]
    })
], Dialog);
export { Dialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZGlhbG9nLyIsInNvdXJjZXMiOlsiZGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQzFDLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osUUFBUSxFQUNSLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLElBQUksRUFDSixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUUsUUFBUSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRS9DLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFVeEQsSUFBYSxNQUFNLEdBQW5CLE1BQWEsTUFBTTtJQUVmLFlBQ1ksUUFBa0IsRUFDbEIsU0FBdUIsRUFDeEIsVUFBbUMsRUFDbEMsZUFBZ0MsRUFDOUIsUUFBa0MsRUFDcEMsaUJBQW9DO1FBTHBDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUN4QixlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDOUIsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQXNDdkMsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBckN0RCxDQUFDO0lBZUosSUFBSSxPQUFPLENBQUMsT0FBdUI7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFD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QUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3REO2FBQU07WUFDSCxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRCxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztTQUMxRTtJQUNMLENBQUM7SUFFRCxlQUFlO1FBQ1gsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25FLElBQUksS0FBSyxFQUFFO1lBQ1AsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztDQUNKLENBQUE7O1lBM0l5QixRQUFRO1lBQ1AsWUFBWTtZQUNaLFVBQVU7WUFDSixlQUFlO1lBQ3BCLHdCQUF3QjtZQUNqQixpQkFBaUI7O0FBUWhEO0lBREMsU0FBUyxDQUFDLDJCQUEyQixFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQzt5REFDM0I7QUFHcEQ7SUFEQyxLQUFLLEVBQUU7c0NBQ087QUFLZjtJQURDLEtBQUssRUFBRTtxQ0FJUDtBQXNCRDtJQURDLEtBQUssRUFBRTtxQ0E0Q1A7QUE1RlEsTUFBTTtJQU5sQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsYUFBYTtRQUN2QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxzckJBQTBCOztLQUU3QixDQUFDO0dBQ1csTUFBTSxDQThJbEI7U0E5SVksTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQ29tcG9uZW50UmVmLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdG9yLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgVHlwZSxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVIdG1sfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtEaWFsb2dCdXR0b259IGZyb20gXCIuL2RpYWxvZy1idXR0b25cIjtcbmltcG9ydCB7ZGlhbG9nRGF0YX0gZnJvbSBcIi4vZGlhbG9nLWRhdGEtc3ltYm9sXCI7XG5pbXBvcnQge2RpYWxvZ0luc3RhbmNlfSBmcm9tIFwiLi9kaWFsb2ctaW5zdGFuY2Utc3ltYm9sXCI7XG5pbXBvcnQge0RpYWxvZ01lc3NhZ2VDb21wb25lbnR9IGZyb20gXCIuL2RpYWxvZy1tZXNzYWdlLWNvbXBvbmVudFwiO1xuaW1wb3J0IHtEaWFsb2dPcHRpb25zfSBmcm9tIFwiLi9kaWFsb2ctb3B0aW9uc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWRpYWxvZ1wiLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHRlbXBsYXRlVXJsOiBcImRpYWxvZy5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJkaWFsb2cuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2cgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgRGlhbG9nT3B0aW9ucyB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcixcbiAgICAgICAgcHJvdGVjdGVkIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7fVxuXG4gICAgbWVzc2FnZVRleHQ6IFNhZmVIdG1sO1xuXG4gICAgbWVzc2FnZUNvbXBvbmVudDogQ29tcG9uZW50UmVmPGFueT47XG5cbiAgICBAVmlld0NoaWxkKFwibWVzc2FnZUNvbXBvbmVudENvbnRhaW5lclwiLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlfSlcbiAgICBwcml2YXRlIG1lc3NhZ2VDb21wb25lbnRDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgICBASW5wdXQoKVxuICAgIGhlYWRlcjogc3RyaW5nO1xuXG4gICAgX2J1dHRvbnM6IERpYWxvZ0J1dHRvbltdO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgYnV0dG9ucyhidXR0b25zOiBEaWFsb2dCdXR0b25bXSkge1xuICAgICAgICB0aGlzLl9idXR0b25zID0gYnV0dG9ucztcbiAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgZ2V0IGJ1dHRvbnMoKTogRGlhbG9nQnV0dG9uW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYnV0dG9ucztcbiAgICB9XG5cbiAgICBkZXRlY3RDaGFuZ2VzKCkge1xuXG4gICAgICAgIGlmICh0aGlzLm1lc3NhZ2VDb21wb25lbnQpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRhY2goKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgICAgIGlmICh0aGlzLm1lc3NhZ2VDb21wb25lbnQpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5yZWF0dGFjaCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVhZG9ubHkgZGlkTG9hZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBtZXNzYWdlKG1lc3NhZ2U6IHN0cmluZyB8IENvbXBvbmVudFJlZjxhbnk+IHwgVHlwZTxhbnk+IHwgW1R5cGU8YW55Piwge1twYXJhbTogc3RyaW5nXTogYW55fV0pIHtcblxuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVRleHQgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChtZXNzYWdlKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMubWVzc2FnZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudC5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudCA9IHVuZGVmaW5lZDtcblxuICAgICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVRleHQgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudENvbnRhaW5lci5jbGVhcigpO1xuXG4gICAgICAgICAgICBpZiAoIShtZXNzYWdlIGluc3RhbmNlb2YgQ29tcG9uZW50UmVmKSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IHR5cGU6IFR5cGU8YW55PjtcbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1zOiB7W3BhcmFtOiBzdHJpbmddOiBhbnl9O1xuXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWVzc2FnZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IG1lc3NhZ2UubGVuZ3RoID49IDEgPyBtZXNzYWdlWzBdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMgPSBtZXNzYWdlLmxlbmd0aCA+PSAyID8gbWVzc2FnZVsxXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0eXBlID0gbWVzc2FnZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0eXBlKS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG5cbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcGFyYW0gb2YgT2JqZWN0LmtleXMocGFyYW1zKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5pbnN0YW5jZVtwYXJhbV0gPSBwYXJhbXNbcGFyYW1dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb25lbnQgPSBtZXNzYWdlO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50Lmluc3RhbmNlW2RpYWxvZ0luc3RhbmNlXSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudENvbnRhaW5lci5pbnNlcnQodGhpcy5tZXNzYWdlQ29tcG9uZW50Lmhvc3RWaWV3KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLypwcml2YXRlKi8gYnV0dG9uQ2xpY2tlZChidXR0b246IERpYWxvZ0J1dHRvbikge1xuXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5tZXNzYWdlQ29tcG9uZW50ICYmIHRoaXMubWVzc2FnZUNvbXBvbmVudC5pbnN0YW5jZVtkaWFsb2dEYXRhXSA/ICg8RGlhbG9nTWVzc2FnZUNvbXBvbmVudD50aGlzLm1lc3NhZ2VDb21wb25lbnQuaW5zdGFuY2UpW2RpYWxvZ0RhdGFdKCkgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKGJ1dHRvbi5oYW5kbGVyKSB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBidXR0b24uaGFuZGxlcih2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICgodHlwZW9mIHJlcyA9PT0gXCJib29sZWFuXCIgJiYgcmVzKSB8fCB0eXBlb2YgcmVzICE9PSBcImJvb2xlYW5cIikge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3ModmFsdWUsIGJ1dHRvbi5yb2xlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKGJ1dHRvbi5yb2xlICE9PSBcImNhbmNlbFwiID8gdmFsdWUgOiB1bmRlZmluZWQsIGJ1dHRvbi5yb2xlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuXG4gICAgICAgIGlmICh0aGlzLm1lc3NhZ2VDb21wb25lbnQpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudC5pbnN0YW5jZVtkaWFsb2dJbnN0YW5jZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb25lbnQuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG1vZGFsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xvc2VzdChcImlvbi1tb2RhbFwiKTtcblxuICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0td2lkdGhcIiwgXCIzMDBweFwiKTtcbiAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLWhlaWdodFwiLCBcImF1dG9cIik7XG4gICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1tYXgtd2lkdGhcIiwgXCI5MCVcIik7XG4gICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1tYXgtaGVpZ2h0XCIsIFwiOTAlXCIpO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaHRtbC5pb3NcIikpIHtcbiAgICAgICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1ib3JkZXItcmFkaXVzXCIsIFwiMTBweFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1ib3JkZXItcmFkaXVzXCIsIFwiNHB4XCIpO1xuICAgICAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLWJveC1zaGFkb3dcIiwgXCIwIDI4cHggNDhweCByZ2JhKDAsMCwwLDAuNClcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpb25WaWV3RGlkRW50ZXIoKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICAgICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=