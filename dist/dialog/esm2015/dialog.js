import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Injector, Input, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from "@angular/core";
let Dialog = class Dialog {
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
    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
        this.value = undefined;
    }
    ionViewDidEnter() {
        const input = this.elementRef.nativeElement.querySelector("input");
        if (input) {
            input.focus();
        }
    }
};
Dialog.ctorParameters = () => [
    { type: ElementRef },
    { type: ComponentFactoryResolver },
    { type: Injector }
];
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
        styles: [":host{--dialog--background-color:var(--background-color, var(--ion-background-color, #ffffff));--dialog--foreground-color:var(--foreground-color, var(--ion-text-color));--dialog--border-color:var(--border-color, var(--ion-border-color));display:-webkit-box;display:flex;contain:content;position:relative;color:var(--dialog--foreground-color)}:host-context(.md){--dialog--message-font-size:16px;--dialog--header-font-size:20px;--dialog--text-align:left}:host-context(.ios){--dialog--message-font-size:15px;--dialog--header-font-size:18px;--dialog--text-align:center;--dialog--buttons-align:center;--dialog--header-font-weight:500}"]
    })
], Dialog);
export { Dialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZGlhbG9nLyIsInNvdXJjZXMiOlsiZGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osUUFBUSxFQUNSLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLElBQUksRUFDSixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBVXZCLElBQWEsTUFBTSxHQUFuQixNQUFhLE1BQU07SUFFZixZQUNXLFVBQW1DLEVBQ2hDLFFBQWtDLEVBQ2xDLFFBQWtCO1FBRnJCLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ2hDLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFHdkIsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRnRELENBQUM7SUFxQkosSUFBSSxTQUFTLENBQUMsU0FBMEQ7UUFFcEUsSUFBSSxTQUFTLEVBQUU7WUFFWCxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFaEMsSUFBSSxJQUFlLENBQUM7WUFDcEIsSUFBSSxNQUE4QixDQUFDO1lBRW5DLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDeEQsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQzthQUM3RDtpQkFBTTtnQkFDSCxJQUFJLEdBQUcsU0FBUyxDQUFDO2FBQ3BCO1lBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXZGLElBQUksTUFBTSxFQUFFO2dCQUNSLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDckMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2hEO2FBQ0o7WUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztZQUNqQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUQ7SUFFTCxDQUFDO0lBRUQsUUFBUTtRQUNKLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVqRSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDNUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5QyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFL0MsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3BDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3REO2FBQU07WUFDSCxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRCxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztTQUMxRTtJQUNMLENBQUM7SUFFRCxXQUFXO1FBRVAsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDL0I7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztJQUMzQixDQUFDO0lBRUQsZUFBZTtRQUNYLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRSxJQUFJLEtBQUssRUFBRTtZQUNQLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNqQjtJQUNMLENBQUM7Q0FDSixDQUFBOztZQXJGMEIsVUFBVTtZQUNULHdCQUF3QjtZQUN4QixRQUFROztBQVFoQztJQURDLEtBQUssRUFBRTt1Q0FDd0M7QUFHaEQ7SUFEQyxLQUFLLEVBQUU7c0NBQ087QUFHZjtJQURDLEtBQUssRUFBRTt1Q0FDZ0I7QUFHeEI7SUFEQyxTQUFTLENBQUMsb0JBQW9CLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO2tEQUMzQjtBQUs3QztJQURDLEtBQUssRUFBRTt1Q0E2QlA7QUF2RFEsTUFBTTtJQU5sQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsYUFBYTtRQUN2QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxnU0FBMEI7O0tBRTdCLENBQUM7R0FDVyxNQUFNLENBd0ZsQjtTQXhGWSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3RvcixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFR5cGUsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7RGlhbG9nQnV0dG9ufSBmcm9tIFwiLi9kaWFsb2ctYnV0dG9uXCI7XG5pbXBvcnQge1R5cGVBbmRQcm9wc30gZnJvbSBcIi4vdHlwZS1hbmQtcHJvcHNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1kaWFsb2dcIixcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICB0ZW1wbGF0ZVVybDogXCJkaWFsb2cuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiZGlhbG9nLnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJvdGVjdGVkIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3JcbiAgICApIHt9XG5cbiAgICByZWFkb25seSBkaWRMb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHZhbHVlOiAoKSA9PiBhbnk7XG5cbiAgICBASW5wdXQoKVxuICAgIG1lc3NhZ2U6IHN0cmluZyB8IFR5cGU8YW55PiB8IFR5cGVBbmRQcm9wczxhbnk+O1xuXG4gICAgQElucHV0KClcbiAgICBoZWFkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgYnV0dG9uczogRGlhbG9nQnV0dG9uW107XG5cbiAgICBAVmlld0NoaWxkKFwiY29tcG9uZW50Q29udGFpbmVyXCIsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWV9KVxuICAgIHByaXZhdGUgY29tcG9uZW50Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgLyogcHJpdmF0ZSAqLyBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+O1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgY29tcG9uZW50KGNvbXBvbmVudDogVHlwZTxhbnk+IHwgW1R5cGU8YW55Piwge1twYXJhbTogc3RyaW5nXTogYW55fV0pIHtcblxuICAgICAgICBpZiAoY29tcG9uZW50KSB7XG5cbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50Q29udGFpbmVyLmNsZWFyKCk7XG5cbiAgICAgICAgICAgIGxldCB0eXBlOiBUeXBlPGFueT47XG4gICAgICAgICAgICBsZXQgcGFyYW1zOiB7W3BhcmFtOiBzdHJpbmddOiBhbnl9O1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb21wb25lbnQpKSB7XG4gICAgICAgICAgICAgICAgdHlwZSA9IGNvbXBvbmVudC5sZW5ndGggPj0gMSA/IGNvbXBvbmVudFswXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBjb21wb25lbnQubGVuZ3RoID49IDIgPyBjb21wb25lbnRbMV0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHR5cGUgPSBjb21wb25lbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodHlwZSkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuXG4gICAgICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiBPYmplY3Qua2V5cyhwYXJhbXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVtwYXJhbV0gPSBwYXJhbXNbcGFyYW1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWYgPSBjb21wb25lbnRSZWY7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudENvbnRhaW5lci5pbnNlcnQodGhpcy5jb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbW9kYWwgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbG9zZXN0KFwiaW9uLW1vZGFsXCIpO1xuXG4gICAgICAgIG1vZGFsLnN0eWxlLnNldFByb3BlcnR5KFwiLS13aWR0aFwiLCBcIjMwMHB4XCIpO1xuICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0taGVpZ2h0XCIsIFwiYXV0b1wiKTtcbiAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLW1heC13aWR0aFwiLCBcIjkwJVwiKTtcbiAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLW1heC1oZWlnaHRcIiwgXCI5MCVcIik7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJodG1sLmlvc1wiKSkge1xuICAgICAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLWJvcmRlci1yYWRpdXNcIiwgXCIxMHB4XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9kYWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLWJvcmRlci1yYWRpdXNcIiwgXCI0cHhcIik7XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tYm94LXNoYWRvd1wiLCBcIjAgMjhweCA0OHB4IHJnYmEoMCwwLDAsMC40KVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuXG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudFJlZikge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpb25WaWV3RGlkRW50ZXIoKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcImlucHV0XCIpO1xuICAgICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=