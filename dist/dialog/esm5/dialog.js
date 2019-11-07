import * as tslib_1 from "tslib";
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
            this.changeDetectorRef.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
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
                            for (var _b = tslib_1.__values(Object.keys(params)), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    tslib_1.__decorate([
        ViewChild("messageComponentContainer", { read: ViewContainerRef, static: true })
    ], Dialog.prototype, "messageComponentContainer", void 0);
    tslib_1.__decorate([
        Input()
    ], Dialog.prototype, "header", void 0);
    tslib_1.__decorate([
        Input()
    ], Dialog.prototype, "buttons", null);
    tslib_1.__decorate([
        Input()
    ], Dialog.prototype, "message", null);
    Dialog = tslib_1.__decorate([
        Component({
            selector: "ionx-dialog",
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: "<div ionx--content>\n\n    <div ionx--header *ngIf=\"!!header\">{{header}}</div>\n\n    <div ionx--message>\n\n        <div [innerHTML]=\"messageText\" *ngIf=\"!!messageText\"></div>\n\n        <ng-template #messageComponentContainer></ng-template>\n\n    </div>\n\n</div>\n\n<ion-footer *ngIf=\"_buttons && _buttons.length > 0\">\n    <ion-toolbar>\n        <ionx-buttons>\n\n            <ion-button fill=\"clear\" [color]=\"button.color || 'primary'\" [size]=\"button.size\" (click)=\"buttonClicked(button)\" *ngFor=\"let button of _buttons\">\n                <span>{{button.text}}</span>\n            </ion-button>\n\n        </ionx-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
            styles: [":host-context(.md){--ionx--message-font-size:16px;--ionx--header-font-size:20px;--ionx--text-align:left}:host-context(.ios){--ionx--message-font-size:15px;--ionx--header-font-size:18px;--ionx--text-align:center;--ionx--buttons-align:center;--ionx--header-font-weight:600}:host{display:-webkit-box;display:flex;contain:content;position:relative}:host [ionx--message]{font-size:var(--ionx--message-font-size);text-align:var(--ionx--text-align);margin:16px 16px 24px}:host [ionx--header]{font-size:var(--ionx--header-font-size);font-weight:var(--ionx--header-font-weight,500);margin:16px;text-align:var(--ionx--text-align)}:host ion-footer ion-toolbar{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--min-height:none;--ion-safe-area-bottom:0px;--ion-safe-area-top:0px;--ion-safe-area-start:0px;--ion-safe-area-end:0px;--ion-toolbar-background:#ffffff;--ion-toolbar-background-color:#ffffff}:host ion-footer ionx-buttons{-webkit-box-pack:var(--ionx--buttons-align,flex-end);justify-content:var(--ionx--buttons-align,flex-end)}:host ion-footer ion-button{min-height:44px}:host ion-footer ion-button:not(:last-child){font-weight:400}:host ion-footer ion-button:last-child{font-weight:600}:host-context(.md) ion-footer ion-toolbar{--padding-bottom:8px}:host-context(.md) ion-footer::before{display:none}:host-context(.ios) ion-footer ion-button{-webkit-box-flex:1;flex:1}:host-context(.ios) ion-footer ion-button:not(:first-child){border-left:.55px solid var(--ion-toolbar-border-color,var(--ion-border-color,var(--ion-color-step-150,rgba(0,0,0,.2))))}"]
        })
    ], Dialog);
    return Dialog;
}());
export { Dialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZGlhbG9nLyIsInNvdXJjZXMiOlsiZGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQzFDLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osUUFBUSxFQUNSLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLElBQUksRUFDSixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUUsUUFBUSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRS9DLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFVeEQ7SUFFSSxnQkFDWSxRQUFrQixFQUNsQixTQUF1QixFQUN4QixVQUFtQyxFQUNsQyxlQUFnQyxFQUM5QixRQUFrQyxFQUNwQyxpQkFBb0M7UUFMcEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBQ3hCLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBeUJ2QyxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUF4QnRELENBQUM7SUFlSixzQkFBSSwyQkFBTzthQUtYO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7YUFQRCxVQUFZLE9BQXVCO1lBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQyxDQUFDOzs7T0FBQTtJQVNELHNCQUFJLDJCQUFPO2FBQVgsVUFBWSxPQUFxRjs7WUFFN0YsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFbkUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDbkM7Z0JBRUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQzthQUVyQztpQkFBTSxJQUFJLE9BQU8sRUFBRTtnQkFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7Z0JBRTdCLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFFdkMsSUFBSSxDQUFDLENBQUMsT0FBTyxZQUFZLFlBQVksQ0FBQyxFQUFFO29CQUVwQyxJQUFJLElBQUksU0FBVyxDQUFDO29CQUNwQixJQUFJLE1BQU0sU0FBd0IsQ0FBQztvQkFFbkMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUN4QixJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO3dCQUNwRCxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO3FCQUN6RDt5QkFBTTt3QkFDSCxJQUFJLEdBQUcsT0FBTyxDQUFDO3FCQUNsQjtvQkFFRCxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUU1RSxJQUFJLE1BQU0sRUFBRTs7NEJBQ1IsS0FBb0IsSUFBQSxLQUFBLGlCQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUEsZ0JBQUEsNEJBQUU7Z0NBQXBDLElBQU0sS0FBSyxXQUFBO2dDQUNaLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDOzZCQUMzQzs7Ozs7Ozs7O3FCQUNKO2lCQUNKO2dCQUVELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUV0RCxJQUFJLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN6RTtRQUVMLENBQUM7OztPQUFBO0lBRUQsV0FBVyxDQUFDLDhCQUFhLEdBQWIsVUFBYyxNQUFvQjtRQUUxQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQTBCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBRXZLLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWxDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLEtBQUssU0FBUyxFQUFFO2dCQUMvRCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3BEO1lBRUQsT0FBTztTQUVWO2FBQU07WUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNGO0lBQ0wsQ0FBQztJQUVELDRCQUFXLEdBQVg7UUFFSSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUMzRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBRUQseUJBQVEsR0FBUjtRQUNJLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVqRSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDNUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5QyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFL0MsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3BDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3REO2FBQU07WUFDSCxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRCxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztTQUMxRTtJQUNMLENBQUM7SUFFRCxnQ0FBZSxHQUFmO1FBQ0ksSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25FLElBQUksS0FBSyxFQUFFO1lBQ1AsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQzs7Z0JBN0hxQixRQUFRO2dCQUNQLFlBQVk7Z0JBQ1osVUFBVTtnQkFDSixlQUFlO2dCQUNwQix3QkFBd0I7Z0JBQ2pCLGlCQUFpQjs7SUFRaEQ7UUFEQyxTQUFTLENBQUMsMkJBQTJCLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDOzZEQUMzQjtJQUdwRDtRQURDLEtBQUssRUFBRTswQ0FDTztJQUtmO1FBREMsS0FBSyxFQUFFO3lDQUlQO0lBU0Q7UUFEQyxLQUFLLEVBQUU7eUNBNENQO0lBL0VRLE1BQU07UUFObEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07WUFDL0Msc3JCQUEwQjs7U0FFN0IsQ0FBQztPQUNXLE1BQU0sQ0FpSWxCO0lBQUQsYUFBQztDQUFBLEFBaklELElBaUlDO1NBaklZLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3RvcixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFR5cGUsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlSHRtbH0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcbmltcG9ydCB7TW9kYWxDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7RGlhbG9nQnV0dG9ufSBmcm9tIFwiLi9kaWFsb2ctYnV0dG9uXCI7XG5pbXBvcnQge2RpYWxvZ0RhdGF9IGZyb20gXCIuL2RpYWxvZy1kYXRhLXN5bWJvbFwiO1xuaW1wb3J0IHtkaWFsb2dJbnN0YW5jZX0gZnJvbSBcIi4vZGlhbG9nLWluc3RhbmNlLXN5bWJvbFwiO1xuaW1wb3J0IHtEaWFsb2dNZXNzYWdlQ29tcG9uZW50fSBmcm9tIFwiLi9kaWFsb2ctbWVzc2FnZS1jb21wb25lbnRcIjtcbmltcG9ydCB7RGlhbG9nT3B0aW9uc30gZnJvbSBcIi4vZGlhbG9nLW9wdGlvbnNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1kaWFsb2dcIixcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICB0ZW1wbGF0ZVVybDogXCJkaWFsb2cuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiZGlhbG9nLnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIERpYWxvZ09wdGlvbnMge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXG4gICAgICAgIHByb3RlY3RlZCByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge31cblxuICAgIG1lc3NhZ2VUZXh0OiBTYWZlSHRtbDtcblxuICAgIG1lc3NhZ2VDb21wb25lbnQ6IENvbXBvbmVudFJlZjxhbnk+O1xuXG4gICAgQFZpZXdDaGlsZChcIm1lc3NhZ2VDb21wb25lbnRDb250YWluZXJcIiwge3JlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZX0pXG4gICAgcHJpdmF0ZSBtZXNzYWdlQ29tcG9uZW50Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgQElucHV0KClcbiAgICBoZWFkZXI6IHN0cmluZztcblxuICAgIF9idXR0b25zOiBEaWFsb2dCdXR0b25bXTtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGJ1dHRvbnMoYnV0dG9uczogRGlhbG9nQnV0dG9uW10pIHtcbiAgICAgICAgdGhpcy5fYnV0dG9ucyA9IGJ1dHRvbnM7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIGdldCBidXR0b25zKCk6IERpYWxvZ0J1dHRvbltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1dHRvbnM7XG4gICAgfVxuXG4gICAgcmVhZG9ubHkgZGlkTG9hZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBtZXNzYWdlKG1lc3NhZ2U6IHN0cmluZyB8IENvbXBvbmVudFJlZjxhbnk+IHwgVHlwZTxhbnk+IHwgW1R5cGU8YW55Piwge1twYXJhbTogc3RyaW5nXTogYW55fV0pIHtcblxuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVRleHQgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChtZXNzYWdlKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMubWVzc2FnZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudC5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudCA9IHVuZGVmaW5lZDtcblxuICAgICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVRleHQgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudENvbnRhaW5lci5jbGVhcigpO1xuXG4gICAgICAgICAgICBpZiAoIShtZXNzYWdlIGluc3RhbmNlb2YgQ29tcG9uZW50UmVmKSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IHR5cGU6IFR5cGU8YW55PjtcbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1zOiB7W3BhcmFtOiBzdHJpbmddOiBhbnl9O1xuXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWVzc2FnZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IG1lc3NhZ2UubGVuZ3RoID49IDEgPyBtZXNzYWdlWzBdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMgPSBtZXNzYWdlLmxlbmd0aCA+PSAyID8gbWVzc2FnZVsxXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0eXBlID0gbWVzc2FnZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0eXBlKS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG5cbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcGFyYW0gb2YgT2JqZWN0LmtleXMocGFyYW1zKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5pbnN0YW5jZVtwYXJhbV0gPSBwYXJhbXNbcGFyYW1dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb25lbnQgPSBtZXNzYWdlO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50Lmluc3RhbmNlW2RpYWxvZ0luc3RhbmNlXSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudENvbnRhaW5lci5pbnNlcnQodGhpcy5tZXNzYWdlQ29tcG9uZW50Lmhvc3RWaWV3KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLypwcml2YXRlKi8gYnV0dG9uQ2xpY2tlZChidXR0b246IERpYWxvZ0J1dHRvbikge1xuXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5tZXNzYWdlQ29tcG9uZW50ICYmIHRoaXMubWVzc2FnZUNvbXBvbmVudC5pbnN0YW5jZVtkaWFsb2dEYXRhXSA/ICg8RGlhbG9nTWVzc2FnZUNvbXBvbmVudD50aGlzLm1lc3NhZ2VDb21wb25lbnQuaW5zdGFuY2UpW2RpYWxvZ0RhdGFdKCkgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKGJ1dHRvbi5oYW5kbGVyKSB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBidXR0b24uaGFuZGxlcih2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICgodHlwZW9mIHJlcyA9PT0gXCJib29sZWFuXCIgJiYgcmVzKSB8fCB0eXBlb2YgcmVzICE9PSBcImJvb2xlYW5cIikge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3ModmFsdWUsIGJ1dHRvbi5yb2xlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKGJ1dHRvbi5yb2xlICE9PSBcImNhbmNlbFwiID8gdmFsdWUgOiB1bmRlZmluZWQsIGJ1dHRvbi5yb2xlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuXG4gICAgICAgIGlmICh0aGlzLm1lc3NhZ2VDb21wb25lbnQpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudC5pbnN0YW5jZVtkaWFsb2dJbnN0YW5jZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb25lbnQuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG1vZGFsID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xvc2VzdChcImlvbi1tb2RhbFwiKTtcblxuICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0td2lkdGhcIiwgXCIzMDBweFwiKTtcbiAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLWhlaWdodFwiLCBcImF1dG9cIik7XG4gICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1tYXgtd2lkdGhcIiwgXCI5MCVcIik7XG4gICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1tYXgtaGVpZ2h0XCIsIFwiOTAlXCIpO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaHRtbC5pb3NcIikpIHtcbiAgICAgICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1ib3JkZXItcmFkaXVzXCIsIFwiMTBweFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1ib3JkZXItcmFkaXVzXCIsIFwiNHB4XCIpO1xuICAgICAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLWJveC1zaGFkb3dcIiwgXCIwIDI4cHggNDhweCByZ2JhKDAsMCwwLDAuNClcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpb25WaWV3RGlkRW50ZXIoKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICAgICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=