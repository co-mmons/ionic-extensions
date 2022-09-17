import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Injector, Input, ViewChild, ViewContainerRef } from "@angular/core";
export class Dialog {
    constructor(elementRef, resolver, injector) {
        this.elementRef = elementRef;
        this.resolver = resolver;
        this.injector = injector;
        this.didLoad = new EventEmitter();
    }
    set component(component) {
        if (component) {
            this.componentContainer.clear();
            let type;
            let params;
            if (Array.isArray(component)) {
                type = component.length >= 1 ? component[0] : undefined;
                params = component.length >= 2 ? component[1] : undefined;
            }
            else {
                type = component;
            }
            const componentRef = this.resolver.resolveComponentFactory(type).create(this.injector);
            if (params) {
                for (const param of Object.keys(params)) {
                    componentRef.instance[param] = params[param];
                }
            }
            this.componentRef = componentRef;
            this.componentContainer.insert(this.componentRef.hostView);
        }
    }
    ngOnInit() {
        const modal = this.elementRef.nativeElement.closest("ion-modal");
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
    }
    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
        this.value = undefined;
    }
    ionViewDidEnter() {
        var _a, _b;
        const input = this.elementRef.nativeElement.querySelector("input");
        if (input) {
            input.focus();
        }
        if (typeof ((_b = (_a = this.componentRef) === null || _a === void 0 ? void 0 : _a.instance) === null || _b === void 0 ? void 0 : _b.ionViewDidEnter) === "function") {
            this.componentRef.instance.ionViewDidEnter();
        }
    }
    ionViewDidLeave() {
        var _a, _b;
        if (typeof ((_b = (_a = this.componentRef) === null || _a === void 0 ? void 0 : _a.instance) === null || _b === void 0 ? void 0 : _b.ionViewDidLeave) === "function") {
            this.componentRef.instance.ionViewDidLeave();
        }
    }
    ionViewWillEnter() {
        var _a, _b;
        if (typeof ((_b = (_a = this.componentRef) === null || _a === void 0 ? void 0 : _a.instance) === null || _b === void 0 ? void 0 : _b.ionViewWillEnter) === "function") {
            this.componentRef.instance.ionViewWillEnter();
        }
    }
    ionViewWillLeave() {
        var _a, _b;
        if (typeof ((_b = (_a = this.componentRef) === null || _a === void 0 ? void 0 : _a.instance) === null || _b === void 0 ? void 0 : _b.ionViewWillLeave) === "function") {
            this.componentRef.instance.ionViewWillLeave();
        }
    }
}
Dialog.decorators = [
    { type: Component, args: [{
                selector: "ionx-dialog",
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: "<ng-container *ngIf=\"!componentRef\">\n\n    <ionx-dialog-content [header]=\"header\" [message]=\"message\"></ionx-dialog-content>\n\n    <ionx-dialog-buttons [buttons]=\"buttons\"></ionx-dialog-buttons>\n\n</ng-container>\n\n<ng-template #componentContainer></ng-template>\n",
                styles: [":host{--dialog--background-color: var(--background-color, var(--ion-background-color, #ffffff));--dialog--foreground-color: var(--foreground-color, var(--ion-text-color));--dialog--border-color: var(--border-color, var(--ion-border-color));display:flex;contain:content;position:relative;color:var(--dialog--foreground-color)}:host-context(.md){--dialog--message-font-size: 16px;--dialog--header-font-size: 20px;--dialog--text-align: left}:host-context(.ios){--dialog--message-font-size: 15px;--dialog--header-font-size: 18px;--dialog--text-align: left;--dialog--buttons-align: center;--dialog--header-font-weight: 500}\n"]
            },] }
];
Dialog.ctorParameters = () => [
    { type: ElementRef },
    { type: ComponentFactoryResolver },
    { type: Injector }
];
Dialog.propDecorators = {
    message: [{ type: Input }],
    header: [{ type: Input }],
    buttons: [{ type: Input }],
    width: [{ type: Input }],
    componentContainer: [{ type: ViewChild, args: ["componentContainer", { read: ViewContainerRef, static: true },] }],
    component: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RpYWxvZy9kaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1Qsd0JBQXdCLEVBRXhCLFVBQVUsRUFDVixZQUFZLEVBQ1osUUFBUSxFQUNSLEtBQUssRUFJTCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBVXZCLE1BQU0sT0FBTyxNQUFNO0lBRWYsWUFDVyxVQUFtQyxFQUNoQyxRQUFrQyxFQUNsQyxRQUFrQjtRQUZyQixlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNoQyxhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBR3ZCLFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUZ0RCxDQUFDO0lBdUJKLElBQ0ksU0FBUyxDQUFDLFNBQTBEO1FBRXBFLElBQUksU0FBUyxFQUFFO1lBRVgsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxDQUFDO1lBRWhDLElBQUksSUFBZSxDQUFDO1lBQ3BCLElBQUksTUFBOEIsQ0FBQztZQUVuQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzFCLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ3hELE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7YUFDN0Q7aUJBQU07Z0JBQ0gsSUFBSSxHQUFHLFNBQVMsQ0FBQzthQUNwQjtZQUVELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMs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QUFnQixDQUFBLEtBQUssVUFBVSxFQUFFO1lBQ3JFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDakQ7SUFDTCxDQUFDOzs7WUF0SEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsZ1NBQTBCOzthQUU3Qjs7O1lBbEJHLFVBQVU7WUFGVix3QkFBd0I7WUFJeEIsUUFBUTs7O3NCQTZCUCxLQUFLO3FCQUdMLEtBQUs7c0JBR0wsS0FBSztvQkFHTCxLQUFLO2lDQUdMLFNBQVMsU0FBQyxvQkFBb0IsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDO3dCQUt0RSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3RvcixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFR5cGUsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7RGlhbG9nQnV0dG9ufSBmcm9tIFwiLi9kaWFsb2ctYnV0dG9uXCI7XG5pbXBvcnQge1R5cGVBbmRQcm9wc30gZnJvbSBcIi4vdHlwZS1hbmQtcHJvcHNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1kaWFsb2dcIixcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICB0ZW1wbGF0ZVVybDogXCJkaWFsb2cuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiZGlhbG9nLnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJvdGVjdGVkIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3JcbiAgICApIHt9XG5cbiAgICByZWFkb25seSBkaWRMb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHZhbHVlOiAoKSA9PiBhbnk7XG5cbiAgICBASW5wdXQoKVxuICAgIG1lc3NhZ2U6IHN0cmluZyB8IFR5cGU8YW55PiB8IFR5cGVBbmRQcm9wczxhbnk+O1xuXG4gICAgQElucHV0KClcbiAgICBoZWFkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgYnV0dG9uczogRGlhbG9nQnV0dG9uW107XG5cbiAgICBASW5wdXQoKVxuICAgIHdpZHRoOiBzdHJpbmc7XG5cbiAgICBAVmlld0NoaWxkKFwiY29tcG9uZW50Q29udGFpbmVyXCIsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWV9KVxuICAgIHByaXZhdGUgY29tcG9uZW50Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgLyogcHJpdmF0ZSAqLyBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+O1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgY29tcG9uZW50KGNvbXBvbmVudDogVHlwZTxhbnk+IHwgW1R5cGU8YW55Piwge1twYXJhbTogc3RyaW5nXTogYW55fV0pIHtcblxuICAgICAgICBpZiAoY29tcG9uZW50KSB7XG5cbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50Q29udGFpbmVyLmNsZWFyKCk7XG5cbiAgICAgICAgICAgIGxldCB0eXBlOiBUeXBlPGFueT47XG4gICAgICAgICAgICBsZXQgcGFyYW1zOiB7W3BhcmFtOiBzdHJpbmddOiBhbnl9O1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb21wb25lbnQpKSB7XG4gICAgICAgICAgICAgICAgdHlwZSA9IGNvbXBvbmVudC5sZW5ndGggPj0gMSA/IGNvbXBvbmVudFswXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBjb21wb25lbnQubGVuZ3RoID49IDIgPyBjb21wb25lbnRbMV0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHR5cGUgPSBjb21wb25lbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodHlwZSkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuXG4gICAgICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiBPYmplY3Qua2V5cyhwYXJhbXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVtwYXJhbV0gPSBwYXJhbXNbcGFyYW1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWYgPSBjb21wb25lbnRSZWY7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudENvbnRhaW5lci5pbnNlcnQodGhpcy5jb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbW9kYWwgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbG9zZXN0KFwiaW9uLW1vZGFsXCIpO1xuXG4gICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS13aWR0aFwiLCB0aGlzLndpZHRoIHx8IFwiMzAwcHhcIik7XG4gICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1oZWlnaHRcIiwgXCJhdXRvXCIpO1xuICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tbWF4LXdpZHRoXCIsIFwiOTAlXCIpO1xuICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tbWF4LWhlaWdodFwiLCBcIjkwJVwiKTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImh0bWwuaW9zXCIpKSB7XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tYm9yZGVyLXJhZGl1c1wiLCBcIjEwcHhcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tYm9yZGVyLXJhZGl1c1wiLCBcIjRweFwiKTtcbiAgICAgICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1ib3gtc2hhZG93XCIsIFwiMCAyOHB4IDQ4cHggcmdiYSgwLDAsMCwwLjQpXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50UmVmKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlvblZpZXdEaWRFbnRlcigpIHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gICAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb21wb25lbnRSZWY/Lmluc3RhbmNlPy5pb25WaWV3RGlkRW50ZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuaW9uVmlld0RpZEVudGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpb25WaWV3RGlkTGVhdmUoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb21wb25lbnRSZWY/Lmluc3RhbmNlPy5pb25WaWV3RGlkTGVhdmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UuaW9uVmlld0RpZExlYXZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpb25WaWV3V2lsbEVudGVyKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29tcG9uZW50UmVmPy5pbnN0YW5jZT8uaW9uVmlld1dpbGxFbnRlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5pb25WaWV3V2lsbEVudGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpb25WaWV3V2lsbExlYXZlKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29tcG9uZW50UmVmPy5pbnN0YW5jZT8uaW9uVmlld1dpbGxMZWF2ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZS5pb25WaWV3V2lsbExlYXZlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=