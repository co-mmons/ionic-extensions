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
        styles: [":host{--background-color:var(--ion-background-color, #ffffff);--foreground-color:var(--ion-text-color);--border-color:var(--ion-border-color);display:-webkit-box;display:flex;contain:content;position:relative;color:var(--foreground-color)}:host [ionx--content]{background:var(--background-color,#fff);color:var(--foreground-color)}:host [ionx--message]{font-size:var(--ionx--message-font-size);text-align:var(--ionx--text-align);margin:16px 16px 24px}:host [ionx--header]{font-size:var(--ionx--header-font-size);font-weight:var(--ionx--header-font-weight,500);margin:16px;text-align:var(--ionx--text-align)}:host ion-footer ion-toolbar{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--min-height:none;--ion-safe-area-bottom:0px;--ion-safe-area-top:0px;--ion-safe-area-start:0px;--ion-safe-area-end:0px;--ion-toolbar-background:var(--background-color, #ffffff);--ion-toolbar-background-color:var(--background-color, #000000);--ion-toolbar-color:var(--foreground-color, #000000)}:host ion-footer ionx-buttons{-webkit-box-pack:var(--ionx--buttons-align,flex-end);justify-content:var(--ionx--buttons-align,flex-end)}:host ion-footer ion-button{min-height:44px}:host ion-footer ion-button:not(:last-child){font-weight:400}:host ion-footer ion-button:last-child{font-weight:500}:host-context(.md){--ionx--message-font-size:16px;--ionx--header-font-size:20px;--ionx--text-align:left}:host-context(.md) ion-footer ion-toolbar{--padding-bottom:8px}:host-context(.md) ion-footer::before{display:none}:host-context(.ios){--ionx--message-font-size:15px;--ionx--header-font-size:18px;--ionx--text-align:center;--ionx--buttons-align:center;--ionx--header-font-weight:500}:host-context(.ios) ion-footer ion-button{-webkit-box-flex:1;flex:1}:host-context(.ios) ion-footer ion-button:not(:first-child){border-left:.55px solid var(--border-color)}"]
    })
], Dialog);
export { Dialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZGlhbG9nLyIsInNvdXJjZXMiOlsiZGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQzFDLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osUUFBUSxFQUNSLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLElBQUksRUFDSixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUUsUUFBUSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRS9DLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFVeEQsSUFBYSxNQUFNLEdBQW5CLE1BQWEsTUFBTTtJQUVmLFlBQ1ksUUFBa0IsRUFDbEIsU0FBdUIsRUFDeEIsVUFBbUMsRUFDbEMsZUFBZ0MsRUFDOUIsUUFBa0MsRUFDcEMsaUJBQW9DO1FBTHBDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUN4QixlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDOUIsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQXlCdkMsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBeEJ0RCxDQUFDO0lBZUosSUFBSSxPQUFPLENBQUMsT0FBdUI7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFD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SUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25FLElBQUksS0FBSyxFQUFFO1lBQ1AsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztDQUNKLENBQUE7O1lBOUh5QixRQUFRO1lBQ1AsWUFBWTtZQUNaLFVBQVU7WUFDSixlQUFlO1lBQ3BCLHdCQUF3QjtZQUNqQixpQkFBaUI7O0FBUWhEO0lBREMsU0FBUyxDQUFDLDJCQUEyQixFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQzt5REFDM0I7QUFHcEQ7SUFEQyxLQUFLLEVBQUU7c0NBQ087QUFLZjtJQURDLEtBQUssRUFBRTtxQ0FJUDtBQVNEO0lBREMsS0FBSyxFQUFFO3FDQTRDUDtBQS9FUSxNQUFNO0lBTmxCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1FBQy9DLHNyQkFBMEI7O0tBRTdCLENBQUM7R0FDVyxNQUFNLENBaUlsQjtTQWpJWSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBDb21wb25lbnRSZWYsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0b3IsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBUeXBlLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZUh0bWx9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XG5pbXBvcnQge01vZGFsQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge0RpYWxvZ0J1dHRvbn0gZnJvbSBcIi4vZGlhbG9nLWJ1dHRvblwiO1xuaW1wb3J0IHtkaWFsb2dEYXRhfSBmcm9tIFwiLi9kaWFsb2ctZGF0YS1zeW1ib2xcIjtcbmltcG9ydCB7ZGlhbG9nSW5zdGFuY2V9IGZyb20gXCIuL2RpYWxvZy1pbnN0YW5jZS1zeW1ib2xcIjtcbmltcG9ydCB7RGlhbG9nTWVzc2FnZUNvbXBvbmVudH0gZnJvbSBcIi4vZGlhbG9nLW1lc3NhZ2UtY29tcG9uZW50XCI7XG5pbXBvcnQge0RpYWxvZ09wdGlvbnN9IGZyb20gXCIuL2RpYWxvZy1vcHRpb25zXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtZGlhbG9nXCIsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgdGVtcGxhdGVVcmw6IFwiZGlhbG9nLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcImRpYWxvZy5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZyBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBEaWFsb2dPcHRpb25zIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHt9XG5cbiAgICBtZXNzYWdlVGV4dDogU2FmZUh0bWw7XG5cbiAgICBtZXNzYWdlQ29tcG9uZW50OiBDb21wb25lbnRSZWY8YW55PjtcblxuICAgIEBWaWV3Q2hpbGQoXCJtZXNzYWdlQ29tcG9uZW50Q29udGFpbmVyXCIsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWV9KVxuICAgIHByaXZhdGUgbWVzc2FnZUNvbXBvbmVudENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICAgIEBJbnB1dCgpXG4gICAgaGVhZGVyOiBzdHJpbmc7XG5cbiAgICBfYnV0dG9uczogRGlhbG9nQnV0dG9uW107XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBidXR0b25zKGJ1dHRvbnM6IERpYWxvZ0J1dHRvbltdKSB7XG4gICAgICAgIHRoaXMuX2J1dHRvbnMgPSBidXR0b25zO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBnZXQgYnV0dG9ucygpOiBEaWFsb2dCdXR0b25bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9idXR0b25zO1xuICAgIH1cblxuICAgIHJlYWRvbmx5IGRpZExvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgbWVzc2FnZShtZXNzYWdlOiBzdHJpbmcgfCBDb21wb25lbnRSZWY8YW55PiB8IFR5cGU8YW55PiB8IFtUeXBlPGFueT4sIHtbcGFyYW06IHN0cmluZ106IGFueX1dKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VUZXh0ID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwobWVzc2FnZSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1lc3NhZ2VDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb25lbnQuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb25lbnQgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgfSBlbHNlIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VUZXh0ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb25lbnRDb250YWluZXIuY2xlYXIoKTtcblxuICAgICAgICAgICAgaWYgKCEobWVzc2FnZSBpbnN0YW5jZW9mIENvbXBvbmVudFJlZikpIHtcblxuICAgICAgICAgICAgICAgIGxldCB0eXBlOiBUeXBlPGFueT47XG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtczoge1twYXJhbTogc3RyaW5nXTogYW55fTtcblxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBtZXNzYWdlLmxlbmd0aCA+PSAxID8gbWVzc2FnZVswXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0gbWVzc2FnZS5sZW5ndGggPj0gMiA/IG1lc3NhZ2VbMV0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IG1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodHlwZSkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIE9iamVjdC5rZXlzKHBhcmFtcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuaW5zdGFuY2VbcGFyYW1dID0gcGFyYW1zW3BhcmFtXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50ID0gbWVzc2FnZTtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudC5pbnN0YW5jZVtkaWFsb2dJbnN0YW5jZV0gPSB0aGlzO1xuXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb25lbnRDb250YWluZXIuaW5zZXJ0KHRoaXMubWVzc2FnZUNvbXBvbmVudC5ob3N0Vmlldyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qcHJpdmF0ZSovIGJ1dHRvbkNsaWNrZWQoYnV0dG9uOiBEaWFsb2dCdXR0b24pIHtcblxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMubWVzc2FnZUNvbXBvbmVudCAmJiB0aGlzLm1lc3NhZ2VDb21wb25lbnQuaW5zdGFuY2VbZGlhbG9nRGF0YV0gPyAoPERpYWxvZ01lc3NhZ2VDb21wb25lbnQ+dGhpcy5tZXNzYWdlQ29tcG9uZW50Lmluc3RhbmNlKVtkaWFsb2dEYXRhXSgpIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmIChidXR0b24uaGFuZGxlcikge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYnV0dG9uLmhhbmRsZXIodmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAoKHR5cGVvZiByZXMgPT09IFwiYm9vbGVhblwiICYmIHJlcykgfHwgdHlwZW9mIHJlcyAhPT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKHZhbHVlLCBidXR0b24ucm9sZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyhidXR0b24ucm9sZSAhPT0gXCJjYW5jZWxcIiA/IHZhbHVlIDogdW5kZWZpbmVkLCBidXR0b24ucm9sZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcblxuICAgICAgICBpZiAodGhpcy5tZXNzYWdlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb25lbnQuaW5zdGFuY2VbZGlhbG9nSW5zdGFuY2VdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50LmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBtb2RhbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoXCJpb24tbW9kYWxcIik7XG5cbiAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLXdpZHRoXCIsIFwiMzAwcHhcIik7XG4gICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1oZWlnaHRcIiwgXCJhdXRvXCIpO1xuICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tbWF4LXdpZHRoXCIsIFwiOTAlXCIpO1xuICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tbWF4LWhlaWdodFwiLCBcIjkwJVwiKTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWwuaW9zXCIpKSB7XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tYm9yZGVyLXJhZGl1c1wiLCBcIjEwcHhcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tYm9yZGVyLXJhZGl1c1wiLCBcIjRweFwiKTtcbiAgICAgICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1ib3gtc2hhZG93XCIsIFwiMCAyOHB4IDQ4cHggcmdiYSgwLDAsMCwwLjQpXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW9uVmlld0RpZEVudGVyKCkge1xuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgICAgICBpbnB1dC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19