import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Injector, Input, ViewChild, ViewContainerRef } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
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
        template: "<div ionx--content>\n\n    <div ionx--header *ngIf=\"!!header\">{{header}}</div>\n\n    <div ionx--message>\n\n        <div [innerHTML]=\"messageText\" *ngIf=\"!!messageText\"></div>\n\n        <ng-template #messageComponentContainer></ng-template>\n\n    </div>\n\n</div>\n\n<ion-footer *ngIf=\"_buttons && _buttons.length > 0\">\n    <ion-toolbar>\n        <ionx-buttons>\n\n            <ion-button fill=\"clear\" [color]=\"button.color || 'primary'\" [size]=\"button.size\" (click)=\"buttonClicked(button)\" *ngFor=\"let button of _buttons\">\n                <span>{{button.text}}</span>\n            </ion-button>\n\n        </ionx-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
        styles: [":host-context(.md){--ionx--message-font-size:16px;--ionx--header-font-size:20px;--ionx--text-align:left}:host-context(.ios){--ionx--message-font-size:15px;--ionx--header-font-size:18px;--ionx--text-align:center;--ionx--buttons-align:center;--ionx--header-font-weight:600}:host{display:flex;contain:content;position:relative}:host [ionx--message]{font-size:var(--ionx--message-font-size);text-align:var(--ionx--text-align);margin:16px 16px 24px}:host [ionx--header]{font-size:var(--ionx--header-font-size);font-weight:var(--ionx--header-font-weight,500);margin:16px;text-align:var(--ionx--text-align)}:host ion-footer ion-toolbar{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--min-height:none;--ion-safe-area-bottom:0px;--ion-safe-area-top:0px;--ion-safe-area-start:0px;--ion-safe-area-end:0px;--ion-toolbar-background:#ffffff;--ion-toolbar-background-color:#ffffff}:host ion-footer ionx-buttons{justify-content:var(--ionx--buttons-align,flex-end)}:host ion-footer ion-button{min-height:44px}:host ion-footer ion-button:not(:last-child){font-weight:400}:host ion-footer ion-button:last-child{font-weight:600}:host-context(.md) ion-footer ion-toolbar{--padding-bottom:8px}:host-context(.md) ion-footer::before{display:none}:host-context(.ios) ion-footer ion-button{flex:1}:host-context(.ios) ion-footer ion-button:not(:first-child){border-left:.55px solid var(--ion-toolbar-border-color,var(--ion-border-color,var(--ion-color-step-150,rgba(0,0,0,.2))))}"]
    }),
    tslib_1.__metadata("design:paramtypes", [Injector,
        DomSanitizer,
        ElementRef,
        ModalController,
        ComponentFactoryResolver,
        ChangeDetectorRef])
], Dialog);
export { Dialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZGlhbG9nLyIsInNvdXJjZXMiOlsiZGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQzFDLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osUUFBUSxFQUNSLEtBQUssRUFJTCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQVcsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQVV4RCxJQUFhLE1BQU0sR0FBbkIsTUFBYSxNQUFNO0lBRWYsWUFDWSxRQUFrQixFQUNsQixTQUF1QixFQUN4QixVQUFtQyxFQUNsQyxlQUFnQyxFQUM5QixRQUFrQyxFQUNwQyxpQkFBb0M7UUFMcEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBQ3hCLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBeUJ2QyxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUF4QnRELENBQUM7SUFlSixJQUFJLE9BQU8sQ0FBQyxPQUF1QjtRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJ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T0FBTyxDQUFDLENBQUM7UUFDbkUsSUFBSSxLQUFLLEVBQUU7WUFDUCxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDakI7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQWpIRztJQURDLFNBQVMsQ0FBQywyQkFBMkIsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7c0NBQzVDLGdCQUFnQjt5REFBQztBQUdwRDtJQURDLEtBQUssRUFBRTs7c0NBQ087QUFLZjtJQURDLEtBQUssRUFBRTs7O3FDQUlQO0FBU0Q7SUFEQyxLQUFLLEVBQUU7OztxQ0E0Q1A7QUEvRVEsTUFBTTtJQU5sQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsYUFBYTtRQUN2QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxzckJBQTBCOztLQUU3QixDQUFDOzZDQUl3QixRQUFRO1FBQ1AsWUFBWTtRQUNaLFVBQVU7UUFDSixlQUFlO1FBQ3BCLHdCQUF3QjtRQUNqQixpQkFBaUI7R0FSdkMsTUFBTSxDQWlJbEI7U0FqSVksTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQ29tcG9uZW50UmVmLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdG9yLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgVHlwZSxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVIdG1sfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtEaWFsb2dCdXR0b259IGZyb20gXCIuL2RpYWxvZy1idXR0b25cIjtcbmltcG9ydCB7ZGlhbG9nRGF0YX0gZnJvbSBcIi4vZGlhbG9nLWRhdGEtc3ltYm9sXCI7XG5pbXBvcnQge2RpYWxvZ0luc3RhbmNlfSBmcm9tIFwiLi9kaWFsb2ctaW5zdGFuY2Utc3ltYm9sXCI7XG5pbXBvcnQge0RpYWxvZ01lc3NhZ2VDb21wb25lbnR9IGZyb20gXCIuL2RpYWxvZy1tZXNzYWdlLWNvbXBvbmVudFwiO1xuaW1wb3J0IHtEaWFsb2dPcHRpb25zfSBmcm9tIFwiLi9kaWFsb2ctb3B0aW9uc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWRpYWxvZ1wiLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHRlbXBsYXRlVXJsOiBcImRpYWxvZy5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJkaWFsb2cuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2cgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgRGlhbG9nT3B0aW9ucyB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcixcbiAgICAgICAgcHJvdGVjdGVkIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7fVxuXG4gICAgbWVzc2FnZVRleHQ6IFNhZmVIdG1sO1xuXG4gICAgbWVzc2FnZUNvbXBvbmVudDogQ29tcG9uZW50UmVmPGFueT47XG5cbiAgICBAVmlld0NoaWxkKFwibWVzc2FnZUNvbXBvbmVudENvbnRhaW5lclwiLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlfSlcbiAgICBwcml2YXRlIG1lc3NhZ2VDb21wb25lbnRDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgICBASW5wdXQoKVxuICAgIGhlYWRlcjogc3RyaW5nO1xuXG4gICAgX2J1dHRvbnM6IERpYWxvZ0J1dHRvbltdO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgYnV0dG9ucyhidXR0b25zOiBEaWFsb2dCdXR0b25bXSkge1xuICAgICAgICB0aGlzLl9idXR0b25zID0gYnV0dG9ucztcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgZ2V0IGJ1dHRvbnMoKTogRGlhbG9nQnV0dG9uW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYnV0dG9ucztcbiAgICB9XG5cbiAgICByZWFkb25seSBkaWRMb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IG1lc3NhZ2UobWVzc2FnZTogc3RyaW5nIHwgQ29tcG9uZW50UmVmPGFueT4gfCBUeXBlPGFueT4gfCBbVHlwZTxhbnk+LCB7W3BhcmFtOiBzdHJpbmddOiBhbnl9XSkge1xuXG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlVGV4dCA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tZXNzYWdlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlVGV4dCA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50Q29udGFpbmVyLmNsZWFyKCk7XG5cbiAgICAgICAgICAgIGlmICghKG1lc3NhZ2UgaW5zdGFuY2VvZiBDb21wb25lbnRSZWYpKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgdHlwZTogVHlwZTxhbnk+O1xuICAgICAgICAgICAgICAgIGxldCBwYXJhbXM6IHtbcGFyYW06IHN0cmluZ106IGFueX07XG5cbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtZXNzYWdlKSkge1xuICAgICAgICAgICAgICAgICAgICB0eXBlID0gbWVzc2FnZS5sZW5ndGggPj0gMSA/IG1lc3NhZ2VbMF0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcyA9IG1lc3NhZ2UubGVuZ3RoID49IDIgPyBtZXNzYWdlWzFdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBtZXNzYWdlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHR5cGUpLmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcblxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiBPYmplY3Qua2V5cyhwYXJhbXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmluc3RhbmNlW3BhcmFtXSA9IHBhcmFtc1twYXJhbV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudCA9IG1lc3NhZ2U7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb25lbnQuaW5zdGFuY2VbZGlhbG9nSW5zdGFuY2VdID0gdGhpcztcblxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50Q29udGFpbmVyLmluc2VydCh0aGlzLm1lc3NhZ2VDb21wb25lbnQuaG9zdFZpZXcpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKnByaXZhdGUqLyBidXR0b25DbGlja2VkKGJ1dHRvbjogRGlhbG9nQnV0dG9uKSB7XG5cbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLm1lc3NhZ2VDb21wb25lbnQgJiYgdGhpcy5tZXNzYWdlQ29tcG9uZW50Lmluc3RhbmNlW2RpYWxvZ0RhdGFdID8gKDxEaWFsb2dNZXNzYWdlQ29tcG9uZW50PnRoaXMubWVzc2FnZUNvbXBvbmVudC5pbnN0YW5jZSlbZGlhbG9nRGF0YV0oKSA6IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoYnV0dG9uLmhhbmRsZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGJ1dHRvbi5oYW5kbGVyKHZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKCh0eXBlb2YgcmVzID09PSBcImJvb2xlYW5cIiAmJiByZXMpIHx8IHR5cGVvZiByZXMgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyh2YWx1ZSwgYnV0dG9uLnJvbGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoYnV0dG9uLnJvbGUgIT09IFwiY2FuY2VsXCIgPyB2YWx1ZSA6IHVuZGVmaW5lZCwgYnV0dG9uLnJvbGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKHRoaXMubWVzc2FnZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50Lmluc3RhbmNlW2RpYWxvZ0luc3RhbmNlXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudC5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbW9kYWwgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbG9zZXN0KFwiaW9uLW1vZGFsXCIpO1xuXG4gICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS13aWR0aFwiLCBcIjMwMHB4XCIpO1xuICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0taGVpZ2h0XCIsIFwiYXV0b1wiKTtcbiAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLW1heC13aWR0aFwiLCBcIjkwJVwiKTtcbiAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLW1heC1oZWlnaHRcIiwgXCI5MCVcIik7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJodG1sLmlvc1wiKSkge1xuICAgICAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLWJvcmRlci1yYWRpdXNcIiwgXCIxMHB4XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLWJvcmRlci1yYWRpdXNcIiwgXCI0cHhcIik7XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tYm94LXNoYWRvd1wiLCBcIjAgMjhweCA0OHB4IHJnYmEoMCwwLDAsMC40KVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlvblZpZXdEaWRFbnRlcigpIHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gICAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==