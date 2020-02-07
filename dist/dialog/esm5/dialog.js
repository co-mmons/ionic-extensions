import { __decorate, __values } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Injector, Input, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
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
            this.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    Dialog.prototype.detectChanges = function () {
        if (this.messageComponent) {
            this.messageComponent.changeDetectorRef.detach();
        }
        this.changeDetectorRef.detectChanges();
        if (this.messageComponent) {
            this.messageComponent.changeDetectorRef.reattach();
        }
    };
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
            styles: [":host{--dialog--background-color:var(--background-color, var(--ion-background-color, #ffffff));--dialog--foreground-color:var(--foreground-color, var(--ion-text-color));--dialog--border-color:var(--border-color, var(--ion-border-color));display:-webkit-box;display:flex;contain:content;position:relative;color:var(--dialog--foreground-color)}:host [ionx--content]{background:var(--dialog--background-color,#fff);color:var(--dialog--foreground-color)}:host [ionx--message]{font-size:var(--dialog--message-font-size);text-align:var(--dialog--text-align);margin:16px 16px 24px}:host [ionx--header]{font-size:var(--dialog--header-font-size);font-weight:var(--dialog--header-font-weight,500);margin:16px;text-align:var(--dialog--text-align)}:host ion-footer{--border-color:var(--dialog--border-color)}:host ion-footer ion-toolbar{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--min-height:none;--ion-safe-area-bottom:0px;--ion-safe-area-top:0px;--ion-safe-area-start:0px;--ion-safe-area-end:0px;--ion-toolbar-background:var(--dialog--background-color, #ffffff);--ion-toolbar-background-color:var(--dialog--background-color, #000000);--ion-toolbar-color:var(--dialog--foreground-color, #000000)}:host ion-footer ionx-buttons{-webkit-box-pack:var(--dialog--buttons-align,flex-end);justify-content:var(--dialog--buttons-align,flex-end)}:host ion-footer ion-button{min-height:44px}:host ion-footer ion-button:not(:last-child){font-weight:400}:host ion-footer ion-button:last-child{font-weight:500}:host-context(.md){--dialog--message-font-size:16px;--dialog--header-font-size:20px;--dialog--text-align:left}:host-context(.md) ion-footer ion-toolbar{--padding-bottom:8px}:host-context(.md) ion-footer::before{display:none}:host-context(.ios){--dialog--message-font-size:15px;--dialog--header-font-size:18px;--dialog--text-align:center;--dialog--buttons-align:center;--dialog--header-font-weight:500}:host-context(.ios) ion-footer ion-button{-webkit-box-flex:1;flex:1}:host-context(.ios) ion-footer ion-button:not(:first-child){border-left:.55px solid var(--dialog--border-color)}"]
        })
    ], Dialog);
    return Dialog;
}());
export { Dialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZGlhbG9nLyIsInNvdXJjZXMiOlsiZGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQzFDLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osUUFBUSxFQUNSLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLElBQUksRUFDSixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUUsUUFBUSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRS9DLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFVeEQ7SUFFSSxnQkFDWSxRQUFrQixFQUNsQixTQUF1QixFQUN4QixVQUFtQyxFQUNsQyxlQUFnQyxFQUM5QixRQUFrQyxFQUNwQyxpQkFBb0M7UUFMcEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBQ3hCLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBc0N2QyxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFyQ3RELENBQUM7SUFlSixzQkFBSSwyQkFBTzthQUtYO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7YUFQRCxVQUFZLE9BQXVCO1lBQy9CLElBQUksQ0FBQyxRQUFRLEdB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dGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3RvcixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFR5cGUsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlSHRtbH0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcbmltcG9ydCB7TW9kYWxDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7RGlhbG9nQnV0dG9ufSBmcm9tIFwiLi9kaWFsb2ctYnV0dG9uXCI7XG5pbXBvcnQge2RpYWxvZ0RhdGF9IGZyb20gXCIuL2RpYWxvZy1kYXRhLXN5bWJvbFwiO1xuaW1wb3J0IHtkaWFsb2dJbnN0YW5jZX0gZnJvbSBcIi4vZGlhbG9nLWluc3RhbmNlLXN5bWJvbFwiO1xuaW1wb3J0IHtEaWFsb2dNZXNzYWdlQ29tcG9uZW50fSBmcm9tIFwiLi9kaWFsb2ctbWVzc2FnZS1jb21wb25lbnRcIjtcbmltcG9ydCB7RGlhbG9nT3B0aW9uc30gZnJvbSBcIi4vZGlhbG9nLW9wdGlvbnNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1kaWFsb2dcIixcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICB0ZW1wbGF0ZVVybDogXCJkaWFsb2cuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiZGlhbG9nLnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIERpYWxvZ09wdGlvbnMge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXG4gICAgICAgIHByb3RlY3RlZCByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge31cblxuICAgIG1lc3NhZ2VUZXh0OiBTYWZlSHRtbDtcblxuICAgIG1lc3NhZ2VDb21wb25lbnQ6IENvbXBvbmVudFJlZjxhbnk+O1xuXG4gICAgQFZpZXdDaGlsZChcIm1lc3NhZ2VDb21wb25lbnRDb250YWluZXJcIiwge3JlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZX0pXG4gICAgcHJpdmF0ZSBtZXNzYWdlQ29tcG9uZW50Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgQElucHV0KClcbiAgICBoZWFkZXI6IHN0cmluZztcblxuICAgIF9idXR0b25zOiBEaWFsb2dCdXR0b25bXTtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGJ1dHRvbnMoYnV0dG9uczogRGlhbG9nQnV0dG9uW10pIHtcbiAgICAgICAgdGhpcy5fYnV0dG9ucyA9IGJ1dHRvbnM7XG4gICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIGdldCBidXR0b25zKCk6IERpYWxvZ0J1dHRvbltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1dHRvbnM7XG4gICAgfVxuXG4gICAgZGV0ZWN0Q2hhbmdlcygpIHtcblxuICAgICAgICBpZiAodGhpcy5tZXNzYWdlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0YWNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcblxuICAgICAgICBpZiAodGhpcy5tZXNzYWdlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYucmVhdHRhY2goKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlYWRvbmx5IGRpZExvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgbWVzc2FnZShtZXNzYWdlOiBzdHJpbmcgfCBDb21wb25lbnRSZWY8YW55PiB8IFR5cGU8YW55PiB8IFtUeXBlPGFueT4sIHtbcGFyYW06IHN0cmluZ106IGFueX1dKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VUZXh0ID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwobWVzc2FnZSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1lc3NhZ2VDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb25lbnQuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb25lbnQgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgfSBlbHNlIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VUZXh0ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb25lbnRDb250YWluZXIuY2xlYXIoKTtcblxuICAgICAgICAgICAgaWYgKCEobWVzc2FnZSBpbnN0YW5jZW9mIENvbXBvbmVudFJlZikpIHtcblxuICAgICAgICAgICAgICAgIGxldCB0eXBlOiBUeXBlPGFueT47XG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtczoge1twYXJhbTogc3RyaW5nXTogYW55fTtcblxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBtZXNzYWdlLmxlbmd0aCA+PSAxID8gbWVzc2FnZVswXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0gbWVzc2FnZS5sZW5ndGggPj0gMiA/IG1lc3NhZ2VbMV0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IG1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodHlwZSkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIE9iamVjdC5rZXlzKHBhcmFtcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuaW5zdGFuY2VbcGFyYW1dID0gcGFyYW1zW3BhcmFtXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50ID0gbWVzc2FnZTtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudC5pbnN0YW5jZVtkaWFsb2dJbnN0YW5jZV0gPSB0aGlzO1xuXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb25lbnRDb250YWluZXIuaW5zZXJ0KHRoaXMubWVzc2FnZUNvbXBvbmVudC5ob3N0Vmlldyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qcHJpdmF0ZSovIGJ1dHRvbkNsaWNrZWQoYnV0dG9uOiBEaWFsb2dCdXR0b24pIHtcblxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMubWVzc2FnZUNvbXBvbmVudCAmJiB0aGlzLm1lc3NhZ2VDb21wb25lbnQuaW5zdGFuY2VbZGlhbG9nRGF0YV0gPyAoPERpYWxvZ01lc3NhZ2VDb21wb25lbnQ+dGhpcy5tZXNzYWdlQ29tcG9uZW50Lmluc3RhbmNlKVtkaWFsb2dEYXRhXSgpIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmIChidXR0b24uaGFuZGxlcikge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYnV0dG9uLmhhbmRsZXIodmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAoKHR5cGVvZiByZXMgPT09IFwiYm9vbGVhblwiICYmIHJlcykgfHwgdHlwZW9mIHJlcyAhPT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKHZhbHVlLCBidXR0b24ucm9sZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyhidXR0b24ucm9sZSAhPT0gXCJjYW5jZWxcIiA/IHZhbHVlIDogdW5kZWZpbmVkLCBidXR0b24ucm9sZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcblxuICAgICAgICBpZiAodGhpcy5tZXNzYWdlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb25lbnQuaW5zdGFuY2VbZGlhbG9nSW5zdGFuY2VdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50LmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBtb2RhbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoXCJpb24tbW9kYWxcIik7XG5cbiAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLXdpZHRoXCIsIFwiMzAwcHhcIik7XG4gICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1oZWlnaHRcIiwgXCJhdXRvXCIpO1xuICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tbWF4LXdpZHRoXCIsIFwiOTAlXCIpO1xuICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tbWF4LWhlaWdodFwiLCBcIjkwJVwiKTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWwuaW9zXCIpKSB7XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tYm9yZGVyLXJhZGl1c1wiLCBcIjEwcHhcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tYm9yZGVyLXJhZGl1c1wiLCBcIjRweFwiKTtcbiAgICAgICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1ib3gtc2hhZG93XCIsIFwiMCAyOHB4IDQ4cHggcmdiYSgwLDAsMCwwLjQpXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW9uVmlld0RpZEVudGVyKCkge1xuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgICAgICBpbnB1dC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19