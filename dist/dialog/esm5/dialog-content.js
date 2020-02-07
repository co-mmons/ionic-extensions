import { __decorate, __values } from "tslib";
import { Component, ComponentFactoryResolver, ComponentRef, Injector, Input, Type, ViewChild, ViewContainerRef } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
/**
 * Komponent, który strukturyzuje widok dialogu.
 */
var DialogContent = /** @class */ (function () {
    function DialogContent(sanitizer, resolver, injector) {
        this.sanitizer = sanitizer;
        this.resolver = resolver;
        this.injector = injector;
    }
    Object.defineProperty(DialogContent.prototype, "message", {
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
                var type = void 0;
                var params = void 0;
                if (Array.isArray(message)) {
                    type = message.length >= 1 ? message[0] : undefined;
                    params = message.length >= 2 ? message[1] : undefined;
                }
                else {
                    type = message;
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
                this.messageComponent = componentRef;
                this.messageComponentContainer.insert(this.messageComponent.hostView);
            }
        },
        enumerable: true,
        configurable: true
    });
    DialogContent.prototype.ngOnDestroy = function () {
        if (this.messageComponent) {
            this.messageComponent.destroy();
        }
    };
    DialogContent.ctorParameters = function () { return [
        { type: DomSanitizer },
        { type: ComponentFactoryResolver },
        { type: Injector }
    ]; };
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
    return DialogContent;
}());
export { DialogContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9kaWFsb2cvIiwic291cmNlcyI6WyJkaWFsb2ctY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BJLE9BQU8sRUFBQyxZQUFZLEVBQUUsUUFBUSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFHakU7O0dBRUc7QUFNSDtJQUVJLHVCQUFvQixTQUF1QixFQUFVLFFBQWtDLEVBQVUsUUFBa0I7UUFBL0YsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUFVLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUNuSCxDQUFDO0lBY0Qsc0JBQUksa0NBQU87YUFBWCxVQUFZLE9BQStDOztZQUV2RCxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUVuRSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUNuQztnQkFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO2FBRXJDO2lCQUFNLElBQUksT0FBTyxFQUFFO2dCQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztnQkFFN0IsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUV2QyxJQUFJLElBQUksU0FBVyxDQUFDO2dCQUNwQixJQUFJLE1BQU0sU0FBd0IsQ0FBQztnQkFFbkMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUN4QixJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO29CQUNwRCxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2lCQUN6RDtxQkFBTTtvQkFDSCxJQUFJLEdBQUcsT0FBTyxDQUFDO2lCQUNsQjtnQkFFRCxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXZGLElBQUksTUFBTSxFQUFFOzt3QkFDUixLQUFvQixJQUFBLEtBQUEsU0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBLGdCQUFBLDRCQUFFOzRCQUFwQyxJQUFNLEtBQUssV0FBQTs0QkFDWixZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDaEQ7Ozs7Ozs7OztpQkFDSjtnQkFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsWUFBWSxDQUFDO2dCQUNyQyxJQUFJLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN6RTtRQUVMLENBQUM7OztPQUFBO0lBRUQsbUNBQVcsR0FBWDtRQUVJLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNuQztJQUNMLENBQUM7O2dCQTVEOEIsWUFBWTtnQkFBb0Isd0JBQXdCO2dCQUFvQixRQUFROztJQUtuSDtRQURDLEtBQUssRUFBRTtpREFDTztJQU9mO1FBREMsU0FBUyxDQUFDLDJCQUEyQixFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQztvRUFDM0I7SUFHcEQ7UUFEQyxLQUFLLEVBQUU7Z0RBdUNQO0lBdkRRLGFBQWE7UUFMekIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHFCQUFxQjtZQUUvQiw0U0FBa0M7O1NBQ3JDLENBQUM7T0FDVyxhQUFhLENBK0R6QjtJQUFELG9CQUFDO0NBQUEsQUEvREQsSUErREM7U0EvRFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgSW5qZWN0b3IsIElucHV0LCBUeXBlLCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZUh0bWx9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XG5pbXBvcnQge1R5cGVBbmRQcm9wc30gZnJvbSBcIi4vdHlwZS1hbmQtcHJvcHNcIjtcblxuLyoqXG4gKiBLb21wb25lbnQsIGt0w7NyeSBzdHJ1a3R1cnl6dWplIHdpZG9rIGRpYWxvZ3UuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtZGlhbG9nLWNvbnRlbnRcIixcbiAgICBzdHlsZVVybHM6IFtcImRpYWxvZy1jb250ZW50LnNjc3NcIl0sXG4gICAgdGVtcGxhdGVVcmw6IFwiZGlhbG9nLWNvbnRlbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ0NvbnRlbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplciwgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIH1cblxuXG4gICAgQElucHV0KClcbiAgICBoZWFkZXI6IHN0cmluZztcblxuICAgIG1lc3NhZ2VUZXh0OiBTYWZlSHRtbDtcblxuICAgIG1lc3NhZ2VDb21wb25lbnQ6IENvbXBvbmVudFJlZjxhbnk+O1xuXG4gICAgQFZpZXdDaGlsZChcIm1lc3NhZ2VDb21wb25lbnRDb250YWluZXJcIiwge3JlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZX0pXG4gICAgcHJpdmF0ZSBtZXNzYWdlQ29tcG9uZW50Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgbWVzc2FnZShtZXNzYWdlOiBzdHJpbmcgfCBUeXBlPGFueT4gfCBUeXBlQW5kUHJvcHM8YW55Pikge1xuXG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlVGV4dCA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tZXNzYWdlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlVGV4dCA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50Q29udGFpbmVyLmNsZWFyKCk7XG5cbiAgICAgICAgICAgIGxldCB0eXBlOiBUeXBlPGFueT47XG4gICAgICAgICAgICBsZXQgcGFyYW1zOiB7W3BhcmFtOiBzdHJpbmddOiBhbnl9O1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtZXNzYWdlKSkge1xuICAgICAgICAgICAgICAgIHR5cGUgPSBtZXNzYWdlLmxlbmd0aCA+PSAxID8gbWVzc2FnZVswXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBtZXNzYWdlLmxlbmd0aCA+PSAyID8gbWVzc2FnZVsxXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdHlwZSA9IG1lc3NhZ2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodHlwZSkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuXG4gICAgICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiBPYmplY3Qua2V5cyhwYXJhbXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVtwYXJhbV0gPSBwYXJhbXNbcGFyYW1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50ID0gY29tcG9uZW50UmVmO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ29tcG9uZW50Q29udGFpbmVyLmluc2VydCh0aGlzLm1lc3NhZ2VDb21wb25lbnQuaG9zdFZpZXcpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcblxuICAgICAgICBpZiAodGhpcy5tZXNzYWdlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VDb21wb25lbnQuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19