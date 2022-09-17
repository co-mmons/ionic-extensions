import { Component, ComponentFactoryResolver, Injector, Input, ViewChild, ViewContainerRef } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
/**
 * Komponent, który strukturyzuje widok dialogu.
 */
export class DialogContent {
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
}
DialogContent.decorators = [
    { type: Component, args: [{
                selector: "ionx-dialog-content",
                template: "<div ionx--header *ngIf=\"!!header\">{{header}}</div>\n\n<div ionx--message>\n\n    <div [innerHTML]=\"messageText\" *ngIf=\"!!messageText\"></div>\n\n    <ng-template #messageComponentContainer></ng-template>\n\n    <ng-content content=\"[ionx-dialog-message]\"></ng-content>\n\n</div>\n",
                styles: [":host{background:var(--dialog--background-color, #ffffff);color:var(--dialog--foreground-color);display:block}:host [ionx--message]{font-size:var(--dialog--message-font-size);text-align:var(--dialog--text-align);margin:16px 16px 24px}:host [ionx--header]{font-size:var(--dialog--header-font-size);font-weight:var(--dialog--header-font-weight, 500);margin:16px;text-align:var(--dialog--text-align)}\n"]
            },] }
];
DialogContent.ctorParameters = () => [
    { type: DomSanitizer },
    { type: ComponentFactoryResolver },
    { type: Injector }
];
DialogContent.propDecorators = {
    header: [{ type: Input }],
    messageComponentContainer: [{ type: ViewChild, args: ["messageComponentContainer", { read: ViewContainerRef, static: true },] }],
    message: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGlhbG9nL2RpYWxvZy1jb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsd0JBQXdCLEVBQWdCLFFBQVEsRUFBRSxLQUFLLEVBQVEsU0FBUyxFQUFFLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BJLE9BQU8sRUFBQyxZQUFZLEVBQVcsTUFBTSwyQkFBMkIsQ0FBQztBQUdqRTs7R0FFRztBQU1ILE1BQU0sT0FBTyxhQUFhO0lBRXRCLFlBQW9CLFNBQXVCLEVBQVUsUUFBa0MsRUFBVSxRQUFrQjtRQUEvRixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQ25ILENBQUM7SUFhRCxJQUNJLE9BQU8sQ0FBQyxPQUErQztRQUV2RCxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFbkUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNuQztZQUVELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7U0FFckM7YUFBTSxJQUFJLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztZQUU3QixJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFdkMsSUFBSSxJQUFlLENBQUM7WUFDcEIsSUFBSSxNQUE4QixDQUFDO1lBRW5DLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDcEQsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQzthQUN6RDtpQkFBTTtnQkFDSCxJQUFJLEdBQUcsT0FBTyxDQUFDO2FBQ2xCO1lBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXZGLElBQUksTUFBTSxFQUFFO2dCQUNSLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDckMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2hEO2FBQ0o7WUFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsWUFBWSxDQUFDO1lBQ3JDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3pFO0lBRUwsQ0FBQztJQUVELFdBQVc7UUFFUCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbkM7SUFDTCxDQUFDOzs7WUFuRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBRS9CLDRTQUFrQzs7YUFDckM7OztZQVZPLFlBQVk7WUFERCx3QkFBd0I7WUFBZ0IsUUFBUTs7O3FCQWtCOUQsS0FBSzt3Q0FPTCxTQUFTLFNBQUMsMkJBQTJCLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQztzQkFHN0UsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgSW5qZWN0b3IsIElucHV0LCBUeXBlLCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZUh0bWx9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XG5pbXBvcnQge1R5cGVBbmRQcm9wc30gZnJvbSBcIi4vdHlwZS1hbmQtcHJvcHNcIjtcblxuLyoqXG4gKiBLb21wb25lbnQsIGt0w7NyeSBzdHJ1a3R1cnl6dWplIHdpZG9rIGRpYWxvZ3UuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtZGlhbG9nLWNvbnRlbnRcIixcbiAgICBzdHlsZVVybHM6IFtcImRpYWxvZy1jb250ZW50LnNjc3NcIl0sXG4gICAgdGVtcGxhdGVVcmw6IFwiZGlhbG9nLWNvbnRlbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ0NvbnRlbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplciwgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIH1cblxuXG4gICAgQElucHV0KClcbiAgICBoZWFkZXI6IHN0cmluZztcblxuICAgIG1lc3NhZ2VUZXh0OiBTYWZlSHRtbDtcblxuICAgIG1lc3NhZ2VDb21wb25lbnQ6IENvbXBvbmVudFJlZjxhbnk+O1xuXG4gICAgQFZpZXdDaGlsZChcIm1lc3NhZ2VDb21wb25lbnRDb250YWluZXJcIiwge3JlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZX0pXG4gICAgcHJpdmF0ZSBtZXNzYWdlQ29tcG9uZW50Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgbWVzc2FnZShtZXNzYWdlOiBzdHJpbmcgfCBUeXBlPGFueT4gfCBUeXBlQW5kUHJvcHM8YW55Pikge1xuXG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlVGV4dCA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tZXNzYWdlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlVGV4dCA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50Q29udGFpbmVyLmNsZWFyKCk7XG5cbiAgICAgICAgICAgIGxldCB0eXBlOiBUeXBlPGFueT47XG4gICAgICAgICAgICBsZXQgcGFyYW1zOiB7W3BhcmFtOiBzdHJpbmddOiBhbnl9O1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtZXNzYWdlKSkge1xuICAgICAgICAgICAgICAgIHR5cGUgPSBtZXNzYWdlLmxlbmd0aCA+PSAxID8gbWVzc2FnZVswXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBtZXNzYWdlLmxlbmd0aCA+PSAyID8gbWVzc2FnZVsxXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdHlwZSA9IG1lc3NhZ2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodHlwZSkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuXG4gICAgICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiBPYmplY3Qua2V5cyhwYXJhbXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVtwYXJhbV0gPSBwYXJhbXNbcGFyYW1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50ID0gY29tcG9uZW50UmVmO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50Q29udGFpbmVyLmluc2VydCh0aGlzLm1lc3NhZ2VDb21wb25lbnQuaG9zdFZpZXcpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcblxuICAgICAgICBpZiAodGhpcy5tZXNzYWdlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb25lbnQuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19