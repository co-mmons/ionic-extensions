import { __decorate, __values } from "tslib";
import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Injector, Input, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from "@angular/core";
var Dialog = /** @class */ (function () {
    function Dialog(elementRef, resolver, injector) {
        this.elementRef = elementRef;
        this.resolver = resolver;
        this.injector = injector;
        this.didLoad = new EventEmitter();
        this.width = "300px";
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
        modal.style.setProperty("--width", this.width || "auto");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZGlhbG9nLyIsInNvdXJjZXMiOlsiZGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osUUFBUSxFQUNSLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLElBQUksRUFDSixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBVXZCO0lBRUksZ0JBQ1csVUFBbUMsRUFDaEMsUUFBa0MsRUFDbEMsUUFBa0I7UUFGckIsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDaEMsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUd2QixZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFjekQsVUFBSyxHQUFXLE9BQU8sQ0FBQztJQWhCckIsQ0FBQztJQXdCSixzQkFBSSw2QkFBUzthQUFiLFVBQWMsU0FBMEQ7O1lBRXBFLElBQUksU0FBUyxFQUFFO2dCQUVYLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFFaEMsSUFBSSxJQUFJLFNBQVcsQ0FBQztnQkFDcEIsSUFBSSxNQUFNLFNBQXdCLENBQUM7Z0JBRW5DLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDMUIsSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztvQkFDeEQsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztpQkFDN0Q7cUJBQU07b0JBQ0gsSUFBSSxHQUFHLFNBQVMsQ0FBQztpQkFDcEI7Z0JBRUQsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUV2RixJQUFJLE1BQU0sRUFBRTs7d0JBQ1IsS0FBb0IsSUFBQSxLQUFBLFNBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTs0QkFBcEMsSUFBTSxLQUFLLFdBQUE7NEJBQ1osWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ2hEOzs7Ozs7Ozs7aUJBQ0o7Z0JBRUQsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5RDtRQUVMLENBQUM7OztPQUFBO0lBRUQseUJBQVEsR0FBUjtRQUNJLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVqRSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQztRQUN6RCxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUUvQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDcEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdEQ7YUFBTTtZQUNILEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xELEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO1NBQzFFO0lBQ0wsQ0FBQztJQUVELDRCQUFXLEdBQVg7UUFFSSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMvQjtRQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0lBQzNCLENBQUM7SUFFRCxnQ0FBZSxHQUFmO1FBQ0ksSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25FLElBQUksS0FBSyxFQUFFO1lBQ1AsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQzs7Z0JBdkZzQixVQUFVO2dCQUNULHdCQUF3QjtnQkFDeEIsUUFBUTs7SUFRaEM7UUFEQyxLQUFLLEVBQUU7MkNBQ3dDO0lBR2hEO1FBREMsS0FBSyxFQUFFOzBDQUNPO0lBR2Y7UUFEQyxLQUFLLEVBQUU7MkNBQ2dCO0lBR3hCO1FBREMsS0FBSyxFQUFFO3lDQUNnQjtJQUd4QjtRQURDLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7c0RBQzNCO0lBSzdDO1FBREMsS0FBSyxFQUFFOzJDQTZCUDtJQTFEUSxNQUFNO1FBTmxCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLGdTQUEwQjs7U0FFN0IsQ0FBQztPQUNXLE1BQU0sQ0EyRmxCO0lBQUQsYUFBQztDQUFBLEFBM0ZELElBMkZDO1NBM0ZZLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQ29tcG9uZW50UmVmLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdG9yLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgVHlwZSxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtEaWFsb2dCdXR0b259IGZyb20gXCIuL2RpYWxvZy1idXR0b25cIjtcbmltcG9ydCB7VHlwZUFuZFByb3BzfSBmcm9tIFwiLi90eXBlLWFuZC1wcm9wc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWRpYWxvZ1wiLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHRlbXBsYXRlVXJsOiBcImRpYWxvZy5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJkaWFsb2cuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2cgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwcm90ZWN0ZWQgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvclxuICAgICkge31cblxuICAgIHJlYWRvbmx5IGRpZExvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgdmFsdWU6ICgpID0+IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgbWVzc2FnZTogc3RyaW5nIHwgVHlwZTxhbnk+IHwgVHlwZUFuZFByb3BzPGFueT47XG5cbiAgICBASW5wdXQoKVxuICAgIGhlYWRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBidXR0b25zOiBEaWFsb2dCdXR0b25bXTtcblxuICAgIEBJbnB1dCgpXG4gICAgd2lkdGg6IHN0cmluZyA9IFwiMzAwcHhcIjtcblxuICAgIEBWaWV3Q2hpbGQoXCJjb21wb25lbnRDb250YWluZXJcIiwge3JlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZX0pXG4gICAgcHJpdmF0ZSBjb21wb25lbnRDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgICAvKiBwcml2YXRlICovIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT47XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBjb21wb25lbnQoY29tcG9uZW50OiBUeXBlPGFueT4gfCBbVHlwZTxhbnk+LCB7W3BhcmFtOiBzdHJpbmddOiBhbnl9XSkge1xuXG4gICAgICAgIGlmIChjb21wb25lbnQpIHtcblxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRDb250YWluZXIuY2xlYXIoKTtcblxuICAgICAgICAgICAgbGV0IHR5cGU6IFR5cGU8YW55PjtcbiAgICAgICAgICAgIGxldCBwYXJhbXM6IHtbcGFyYW06IHN0cmluZ106IGFueX07XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gY29tcG9uZW50Lmxlbmd0aCA+PSAxID8gY29tcG9uZW50WzBdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHBhcmFtcyA9IGNvbXBvbmVudC5sZW5ndGggPj0gMiA/IGNvbXBvbmVudFsxXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdHlwZSA9IGNvbXBvbmVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0eXBlKS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG5cbiAgICAgICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIE9iamVjdC5rZXlzKHBhcmFtcykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlW3BhcmFtXSA9IHBhcmFtc1twYXJhbV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZiA9IGNvbXBvbmVudFJlZjtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50Q29udGFpbmVyLmluc2VydCh0aGlzLmNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBtb2RhbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoXCJpb24tbW9kYWxcIik7XG5cbiAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLXdpZHRoXCIsIHRoaXMud2lkdGggfHwgXCJhdXRvXCIpO1xuICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0taGVpZ2h0XCIsIFwiYXV0b1wiKTtcbiAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLW1heC13aWR0aFwiLCBcIjkwJVwiKTtcbiAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLW1heC1oZWlnaHRcIiwgXCI5MCVcIik7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJodG1sLmlvc1wiKSkge1xuICAgICAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLWJvcmRlci1yYWRpdXNcIiwgXCIxMHB4XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLWJvcmRlci1yYWRpdXNcIiwgXCI0cHhcIik7XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tYm94LXNoYWRvd1wiLCBcIjAgMjhweCA0OHB4IHJnYmEoMCwwLDAsMC40KVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuXG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudFJlZikge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpb25WaWV3RGlkRW50ZXIoKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICAgICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=