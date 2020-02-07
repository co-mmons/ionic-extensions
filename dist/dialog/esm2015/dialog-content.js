import { __decorate } from "tslib";
import { Component, ComponentFactoryResolver, ComponentRef, Injector, Input, Type, ViewChild, ViewContainerRef } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
/**
 * Komponent, który strukturyzuje widok dialogu.
 */
let DialogContent = class DialogContent {
    constructor(sanitizer, resolver, injector) {
        this.sanitizer = sanitizer;
        this.resolver = resolver;
        this.injector = injector;
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
            let type;
            let params;
            if (Array.isArray(message)) {
                type = message.length >= 1 ? message[0] : undefined;
                params = message.length >= 2 ? message[1] : undefined;
            }
            else {
                type = message;
            }
            const componentRef = this.resolver.resolveComponentFactory(type).create(this.injector);
            if (params) {
                for (const param of Object.keys(params)) {
                    componentRef.instance[param] = params[param];
                }
            }
            this.messageComponent = componentRef;
            this.messageComponentContainer.insert(this.messageComponent.hostView);
        }
    }
    ngOnDestroy() {
        if (this.messageComponent) {
            this.messageComponent.destroy();
        }
    }
};
DialogContent.ctorParameters = () => [
    { type: DomSanitizer },
    { type: ComponentFactoryResolver },
    { type: Injector }
];
__decorate([
    Input()
], DialogContent.prototype, "header", void 0);
__decorate([
    ViewChild("messageComponentContainer", { read: ViewContainerRef, static: true })
], DialogContent.prototype, "messageComponentContainer", void 0);
__decorate([
    Input()
], DialogContent.prototype, "message", null);
DialogContent = __decorate([
    Component({
        selector: "ionx-dialog-content",
        template: "<div ionx--header *ngIf=\"!!header\">{{header}}</div>\n\n<div ionx--message>\n\n    <div [innerHTML]=\"messageText\" *ngIf=\"!!messageText\"></div>\n\n    <ng-template #messageComponentContainer></ng-template>\n\n    <ng-content content=\"[ionx-dialog-message]\"></ng-content>\n\n</div>\n",
        styles: [":host{background:var(--dialog--background-color,#fff);color:var(--dialog--foreground-color);display:block}:host [ionx--message]{font-size:var(--dialog--message-font-size);text-align:var(--dialog--text-align);margin:16px 16px 24px}:host [ionx--header]{font-size:var(--dialog--header-font-size);font-weight:var(--dialog--header-font-weight,500);margin:16px;text-align:var(--dialog--text-align)}"]
    })
], DialogContent);
export { DialogContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9kaWFsb2cvIiwic291cmNlcyI6WyJkaWFsb2ctY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BJLE9BQU8sRUFBQyxZQUFZLEVBQUUsUUFBUSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFHakU7O0dBRUc7QUFNSCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBRXRCLFlBQW9CLFNBQXVCLEVBQVUsUUFBa0MsRUFBVSxRQUFrQjtRQUEvRixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQ25ILENBQUM7SUFjRCxJQUFJLE9BQU8sQ0FBQyxPQUErQztRQUV2RCxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFbkUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNuQztZQUVELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7U0FFckM7YUFBTSxJQUFJLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztZQUU3QixJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFdkMsSUFBSSxJQUFlLENBQUM7WUFDcEIsSUFBSSxNQUE4QixDQUFDO1lBRW5DLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDcEQsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQzthQUN6RDtpQkFBTTtnQkFDSCxJQUFJLEdBQUcsT0FBTyxDQUFDO2FBQ2xCO1lBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXZGLElBQUksTUFBTSxFQUFFO2dCQUNSLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDckMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2hEO2FBQ0o7WUFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsWUFBWSxDQUFDO1lBQ3JDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3pFO0lBRUwsQ0FBQztJQUVELFdBQVc7UUFFUCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbkM7SUFDTCxDQUFDO0NBQ0osQ0FBQTs7WUE3RGtDLFlBQVk7WUFBb0Isd0JBQXdCO1lBQW9CLFFBQVE7O0FBS25IO0lBREMsS0FBSyxFQUFFOzZDQUNPO0FBT2Y7SUFEQyxTQUFTLENBQUMsMkJBQTJCLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO2dFQUMzQjtBQUdwRDtJQURDLEtBQUssRUFBRTs0Q0F1Q1A7QUF2RFEsYUFBYTtJQUx6QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUscUJBQXFCO1FBRS9CLDRTQUFrQzs7S0FDckMsQ0FBQztHQUNXLGFBQWEsQ0ErRHpCO1NBL0RZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIEluamVjdG9yLCBJbnB1dCwgVHlwZSwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVIdG1sfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xuaW1wb3J0IHtUeXBlQW5kUHJvcHN9IGZyb20gXCIuL3R5cGUtYW5kLXByb3BzXCI7XG5cbi8qKlxuICogS29tcG9uZW50LCBrdMOzcnkgc3RydWt0dXJ5enVqZSB3aWRvayBkaWFsb2d1LlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWRpYWxvZy1jb250ZW50XCIsXG4gICAgc3R5bGVVcmxzOiBbXCJkaWFsb2ctY29udGVudC5zY3NzXCJdLFxuICAgIHRlbXBsYXRlVXJsOiBcImRpYWxvZy1jb250ZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dDb250ZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICB9XG5cblxuICAgIEBJbnB1dCgpXG4gICAgaGVhZGVyOiBzdHJpbmc7XG5cbiAgICBtZXNzYWdlVGV4dDogU2FmZUh0bWw7XG5cbiAgICBtZXNzYWdlQ29tcG9uZW50OiBDb21wb25lbnRSZWY8YW55PjtcblxuICAgIEBWaWV3Q2hpbGQoXCJtZXNzYWdlQ29tcG9uZW50Q29udGFpbmVyXCIsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWV9KVxuICAgIHByaXZhdGUgbWVzc2FnZUNvbXBvbmVudENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IG1lc3NhZ2UobWVzc2FnZTogc3RyaW5nIHwgVHlwZTxhbnk+IHwgVHlwZUFuZFByb3BzPGFueT4pIHtcblxuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVRleHQgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChtZXNzYWdlKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMubWVzc2FnZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudC5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudCA9IHVuZGVmaW5lZDtcblxuICAgICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVRleHQgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudENvbnRhaW5lci5jbGVhcigpO1xuXG4gICAgICAgICAgICBsZXQgdHlwZTogVHlwZTxhbnk+O1xuICAgICAgICAgICAgbGV0IHBhcmFtczoge1twYXJhbTogc3RyaW5nXTogYW55fTtcblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWVzc2FnZSkpIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gbWVzc2FnZS5sZW5ndGggPj0gMSA/IG1lc3NhZ2VbMF0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcGFyYW1zID0gbWVzc2FnZS5sZW5ndGggPj0gMiA/IG1lc3NhZ2VbMV0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHR5cGUgPSBtZXNzYWdlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHR5cGUpLmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcblxuICAgICAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcGFyYW0gb2YgT2JqZWN0LmtleXMocGFyYW1zKSkge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2VbcGFyYW1dID0gcGFyYW1zW3BhcmFtXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudCA9IGNvbXBvbmVudFJlZjtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNvbXBvbmVudENvbnRhaW5lci5pbnNlcnQodGhpcy5tZXNzYWdlQ29tcG9uZW50Lmhvc3RWaWV3KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKHRoaXMubWVzc2FnZUNvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50LmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==