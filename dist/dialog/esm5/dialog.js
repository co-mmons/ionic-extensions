import { __decorate, __values } from "tslib";
import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Injector, Input, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from "@angular/core";
var Dialog = /** @class */ (function () {
    function Dialog(elementRef, resolver, injector) {
        this.elementRef = elementRef;
        this.resolver = resolver;
        this.injector = injector;
        this.didLoad = new EventEmitter();
    }
    Object.defineProperty(Dialog.prototype, "body", {
        set: function (body) {
            var e_1, _a;
            if (body) {
                this.bodyContainer.clear();
                var type = void 0;
                var params = void 0;
                if (Array.isArray(body)) {
                    type = body.length >= 1 ? body[0] : undefined;
                    params = body.length >= 2 ? body[1] : undefined;
                }
                else {
                    type = body;
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
                this.bodyComponent = componentRef;
                this.bodyContainer.insert(this.bodyComponent.hostView);
            }
        },
        enumerable: true,
        configurable: true
    });
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
    Dialog.prototype.ngOnDestroy = function () {
        if (this.bodyComponent) {
            // this.bodyComponent.instance[dialogInstance] = undefined;
            this.bodyComponent.destroy();
        }
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
        ViewChild("bodyContainer", { read: ViewContainerRef, static: true })
    ], Dialog.prototype, "bodyContainer", void 0);
    __decorate([
        Input()
    ], Dialog.prototype, "body", null);
    Dialog = __decorate([
        Component({
            selector: "ionx-dialog",
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: "<ng-container *ngIf=\"!bodyComponent\">\n\n    <ionx-dialog-content [header]=\"header\" [message]=\"message\"></ionx-dialog-content>\n\n    <ionx-dialog-buttons [buttons]=\"buttons\"></ionx-dialog-buttons>\n\n</ng-container>\n\n<ng-template #bodyContainer></ng-template>\n",
            styles: [":host{--dialog--background-color:var(--background-color, var(--ion-background-color, #ffffff));--dialog--foreground-color:var(--foreground-color, var(--ion-text-color));--dialog--border-color:var(--border-color, var(--ion-border-color));display:-webkit-box;display:flex;contain:content;position:relative;color:var(--dialog--foreground-color)}:host-context(.md){--dialog--message-font-size:16px;--dialog--header-font-size:20px;--dialog--text-align:left}:host-context(.ios){--dialog--message-font-size:15px;--dialog--header-font-size:18px;--dialog--text-align:center;--dialog--buttons-align:center;--dialog--header-font-weight:500}"]
        })
    ], Dialog);
    return Dialog;
}());
export { Dialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZGlhbG9nLyIsInNvdXJjZXMiOlsiZGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osUUFBUSxFQUNSLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLElBQUksRUFDSixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBVXZCO0lBRUksZ0JBQ1csVUFBbUMsRUFDaEMsUUFBa0MsRUFDbEMsUUFBa0I7UUFGckIsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDaEMsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUd2QixZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFGdEQsQ0FBQztJQXFCSixzQkFBSSx3QkFBSTthQUFSLFVBQVMsSUFBcUQ7O1lBRTFELElBQUksSUFBSSxFQUFFO2dCQUVOLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBRTNCLElBQUksSUFBSSxTQUFXLENBQUM7Z0JBQ3BCLElBQUksTUFBTSxTQUF3QixDQUFDO2dCQUVuQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3JCLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7b0JBQzlDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7aUJBQ25EO3FCQUFNO29CQUNI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IENvbXBvbmVudCxcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQ29tcG9uZW50UmVmLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdG9yLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgVHlwZSxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtEaWFsb2dCdXR0b259IGZyb20gXCIuL2RpYWxvZy1idXR0b25cIjtcbmltcG9ydCB7RGlhbG9nT3B0aW9uc30gZnJvbSBcIi4vZGlhbG9nLW9wdGlvbnNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1kaWFsb2dcIixcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICB0ZW1wbGF0ZVVybDogXCJkaWFsb2cuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiZGlhbG9nLnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIERpYWxvZ09wdGlvbnMge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJvdGVjdGVkIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3JcbiAgICApIHt9XG5cbiAgICByZWFkb25seSBkaWRMb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHZhbHVlOiAoKSA9PiBhbnk7XG5cbiAgICBASW5wdXQoKVxuICAgIG1lc3NhZ2U6IHN0cmluZyB8IFR5cGU8YW55PiB8IFtUeXBlPGFueT4sIHtbcGFyYW06IHN0cmluZ106IGFueX1dO1xuXG4gICAgQElucHV0KClcbiAgICBoZWFkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgYnV0dG9uczogRGlhbG9nQnV0dG9uW107XG5cbiAgICBAVmlld0NoaWxkKFwiYm9keUNvbnRhaW5lclwiLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlfSlcbiAgICBwcml2YXRlIGJvZHlDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgICBib2R5Q29tcG9uZW50OiBDb21wb25lbnRSZWY8YW55PjtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGJvZHkoYm9keTogVHlwZTxhbnk+IHwgW1R5cGU8YW55Piwge1twYXJhbTogc3RyaW5nXTogYW55fV0pIHtcblxuICAgICAgICBpZiAoYm9keSkge1xuXG4gICAgICAgICAgICB0aGlzLmJvZHlDb250YWluZXIuY2xlYXIoKTtcblxuICAgICAgICAgICAgbGV0IHR5cGU6IFR5cGU8YW55PjtcbiAgICAgICAgICAgIGxldCBwYXJhbXM6IHtbcGFyYW06IHN0cmluZ106IGFueX07XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGJvZHkpKSB7XG4gICAgICAgICAgICAgICAgdHlwZSA9IGJvZHkubGVuZ3RoID49IDEgPyBib2R5WzBdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHBhcmFtcyA9IGJvZHkubGVuZ3RoID49IDIgPyBib2R5WzFdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gYm9keTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0eXBlKS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG5cbiAgICAgICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIE9iamVjdC5rZXlzKHBhcmFtcykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlW3BhcmFtXSA9IHBhcmFtc1twYXJhbV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmJvZHlDb21wb25lbnQgPSBjb21wb25lbnRSZWY7XG4gICAgICAgICAgICB0aGlzLmJvZHlDb250YWluZXIuaW5zZXJ0KHRoaXMuYm9keUNvbXBvbmVudC5ob3N0Vmlldyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBtb2RhbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoXCJpb24tbW9kYWxcIik7XG5cbiAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLXdpZHRoXCIsIFwiMzAwcHhcIik7XG4gICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1oZWlnaHRcIiwgXCJhdXRvXCIpO1xuICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tbWF4LXdpZHRoXCIsIFwiOTAlXCIpO1xuICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tbWF4LWhlaWdodFwiLCBcIjkwJVwiKTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWwuaW9zXCIpKSB7XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tYm9yZGVyLXJhZGl1c1wiLCBcIjEwcHhcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tYm9yZGVyLXJhZGl1c1wiLCBcIjRweFwiKTtcbiAgICAgICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1ib3gtc2hhZG93XCIsIFwiMCAyOHB4IDQ4cHggcmdiYSgwLDAsMCwwLjQpXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuYm9keUNvbXBvbmVudCkge1xuICAgICAgICAgICAgLy8gdGhpcy5ib2R5Q29tcG9uZW50Lmluc3RhbmNlW2RpYWxvZ0luc3RhbmNlXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuYm9keUNvbXBvbmVudC5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpb25WaWV3RGlkRW50ZXIoKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICAgICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=