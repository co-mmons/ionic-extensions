import { __decorate, __values } from "tslib";
import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Injector, Input, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from "@angular/core";
var Dialog = /** @class */ (function () {
    function Dialog(elementRef, resolver, injector) {
        this.elementRef = elementRef;
        this.resolver = resolver;
        this.injector = injector;
        this.didLoad = new EventEmitter();
    }
    Object.defineProperty(Dialog.prototype, "component", {
        set: function (component) {
            var e_1, _a;
            if (component) {
                this.componentContainer.clear();
                var type = void 0;
                var params = void 0;
                if (Array.isArray(component)) {
                    type = component.length >= 1 ? component[0] : undefined;
                    params = component.length >= 2 ? component[1] : undefined;
                }
                else {
                    type = component;
                }
                var componentRef = this.resolver.resolveComponentFactory(type).create(this.injector);
                if (params) {
                    try {
                        for (var _b = __values(Object.keys(params)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var param = _c.value;
                            componentRef.instance[param] = params[param];
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
                this.componentRef = componentRef;
                this.componentContainer.insert(this.componentRef.hostView);
            }
        },
        enumerable: true,
        configurable: true
    });
    Dialog.prototype.ngOnInit = function () {
        var modal = this.elementRef.nativeElement.closest("ion-modal");
        modal.style.setProperty("--width", this.width || "300px");
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
    Dialog.prototype.ngOnDestroy = function () {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
        this.value = undefined;
    };
    Dialog.prototype.ionViewDidEnter = function () {
        var input = this.elementRef.nativeElement.querySelector("input");
        if (input) {
            input.focus();
        }
    };
    Dialog.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ComponentFactoryResolver },
        { type: Injector }
    ]; };
    __decorate([
        Input()
    ], Dialog.prototype, "message", void 0);
    __decorate([
        Input()
    ], Dialog.prototype, "header", void 0);
    __decorate([
        Input()
    ], Dialog.prototype, "buttons", void 0);
    __decorate([
        Input()
    ], Dialog.prototype, "width", void 0);
    __decorate([
        ViewChild("componentContainer", { read: ViewContainerRef, static: true })
    ], Dialog.prototype, "componentContainer", void 0);
    __decorate([
        Input()
    ], Dialog.prototype, "component", null);
    Dialog = __decorate([
        Component({
            selector: "ionx-dialog",
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: "<ng-container *ngIf=\"!componentRef\">\n\n    <ionx-dialog-content [header]=\"header\" [message]=\"message\"></ionx-dialog-content>\n\n    <ionx-dialog-buttons [buttons]=\"buttons\"></ionx-dialog-buttons>\n\n</ng-container>\n\n<ng-template #componentContainer></ng-template>\n",
            styles: [":host{--dialog--background-color:var(--background-color, var(--ion-background-color, #ffffff));--dialog--foreground-color:var(--foreground-color, var(--ion-text-color));--dialog--border-color:var(--border-color, var(--ion-border-color));display:-webkit-box;display:flex;contain:content;position:relative;color:var(--dialog--foreground-color)}:host-context(.md){--dialog--message-font-size:16px;--dialog--header-font-size:20px;--dialog--text-align:left}:host-context(.ios){--dialog--message-font-size:15px;--dialog--header-font-size:18px;--dialog--text-align:left;--dialog--buttons-align:center;--dialog--header-font-weight:500}"]
        })
    ], Dialog);
    return Dialog;
}());
export { Dialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZGlhbG9nLyIsInNvdXJjZXMiOlsiZGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osUUFBUSxFQUNSLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLElBQUksRUFDSixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBVXZCO0lBRUksZ0JBQ1csVUFBbUMsRUFDaEMsUUFBa0MsRUFDbEMsUUFBa0I7UUFGckIsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDaEMsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUd2QixZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFGdEQsQ0FBQztJQXdCSixzQkFBSSw2QkFBUzthQUFiLFVBQWMsU0FBMEQ7O1lBRXBFLElBQUksU0FBUyxFQUFFO2dCQUVYLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFFaEMsSUFBSSxJQUFJLFNBQVcsQ0FBQztnQkFDcEIsSUFBSSxNQUFNLFNBQXdCLENBQUM7Z0JBRW5DLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDMUIsSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztvQkFDeEQsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztpQkFDN0Q7cUJBQU07b0JB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QztTQTNGWSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3RvcixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFR5cGUsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7RGlhbG9nQnV0dG9ufSBmcm9tIFwiLi9kaWFsb2ctYnV0dG9uXCI7XG5pbXBvcnQge1R5cGVBbmRQcm9wc30gZnJvbSBcIi4vdHlwZS1hbmQtcHJvcHNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1kaWFsb2dcIixcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICB0ZW1wbGF0ZVVybDogXCJkaWFsb2cuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiZGlhbG9nLnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJvdGVjdGVkIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3JcbiAgICApIHt9XG5cbiAgICByZWFkb25seSBkaWRMb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHZhbHVlOiAoKSA9PiBhbnk7XG5cbiAgICBASW5wdXQoKVxuICAgIG1lc3NhZ2U6IHN0cmluZyB8IFR5cGU8YW55PiB8IFR5cGVBbmRQcm9wczxhbnk+O1xuXG4gICAgQElucHV0KClcbiAgICBoZWFkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgYnV0dG9uczogRGlhbG9nQnV0dG9uW107XG5cbiAgICBASW5wdXQoKVxuICAgIHdpZHRoOiBzdHJpbmc7XG5cbiAgICBAVmlld0NoaWxkKFwiY29tcG9uZW50Q29udGFpbmVyXCIsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWV9KVxuICAgIHByaXZhdGUgY29tcG9uZW50Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgLyogcHJpdmF0ZSAqLyBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+O1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgY29tcG9uZW50KGNvbXBvbmVudDogVHlwZTxhbnk+IHwgW1R5cGU8YW55Piwge1twYXJhbTogc3RyaW5nXTogYW55fV0pIHtcblxuICAgICAgICBpZiAoY29tcG9uZW50KSB7XG5cbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50Q29udGFpbmVyLmNsZWFyKCk7XG5cbiAgICAgICAgICAgIGxldCB0eXBlOiBUeXBlPGFueT47XG4gICAgICAgICAgICBsZXQgcGFyYW1zOiB7W3BhcmFtOiBzdHJpbmddOiBhbnl9O1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb21wb25lbnQpKSB7XG4gICAgICAgICAgICAgICAgdHlwZSA9IGNvbXBvbmVudC5sZW5ndGggPj0gMSA/IGNvbXBvbmVudFswXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBjb21wb25lbnQubGVuZ3RoID49IDIgPyBjb21wb25lbnRbMV0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHR5cGUgPSBjb21wb25lbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodHlwZSkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuXG4gICAgICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiBPYmplY3Qua2V5cyhwYXJhbXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVtwYXJhbV0gPSBwYXJhbXNbcGFyYW1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWYgPSBjb21wb25lbnRSZWY7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudENvbnRhaW5lci5pbnNlcnQodGhpcy5jb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbW9kYWwgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbG9zZXN0KFwiaW9uLW1vZGFsXCIpO1xuXG4gICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS13aWR0aFwiLCB0aGlzLndpZHRoIHx8IFwiMzAwcHhcIik7XG4gICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1oZWlnaHRcIiwgXCJhdXRvXCIpO1xuICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tbWF4LXdpZHRoXCIsIFwiOTAlXCIpO1xuICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tbWF4LWhlaWdodFwiLCBcIjkwJVwiKTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWwuaW9zXCIpKSB7XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tYm9yZGVyLXJhZGl1c1wiLCBcIjEwcHhcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tYm9yZGVyLXJhZGl1c1wiLCBcIjRweFwiKTtcbiAgICAgICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1ib3gtc2hhZG93XCIsIFwiMCAyOHB4IDQ4cHggcmdiYSgwLDAsMCwwLjQpXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50UmVmKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlvblZpZXdEaWRFbnRlcigpIHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gICAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==