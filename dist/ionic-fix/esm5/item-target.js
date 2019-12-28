import { __awaiter, __decorate, __generator } from "tslib";
import { Directive, ElementRef, Input } from "@angular/core";
import { sleep } from "@co.mmons/js-utils/core";
var IonicItemTargetFix = /** @class */ (function () {
    function IonicItemTargetFix(element) {
        this.element = element;
    }
    IonicItemTargetFix.prototype.ngAfterViewInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.target) return [3 /*break*/, 5];
                        i = 1;
                        _a.label = 1;
                    case 1:
                        if (!(i < 20)) return [3 /*break*/, 5];
                        a = (this.element.nativeElement.shadowRoot && this.element.nativeElement.shadowRoot.querySelector(".item-native")) || undefined;
                        if (!!a) return [3 /*break*/, 3];
                        return [4 /*yield*/, sleep(i * 100)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        a.setAttribute("target", this.target);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    IonicItemTargetFix.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], IonicItemTargetFix.prototype, "target", void 0);
    IonicItemTargetFix = __decorate([
        Directive({
            selector: "ion-item[target]"
        })
    ], IonicItemTargetFix);
    return IonicItemTargetFix;
}());
export { IonicItemTargetFix };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS10YXJnZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9pb25pYy1maXgvIiwic291cmNlcyI6WyJpdGVtLXRhcmdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUs5QztJQUVJLDRCQUFvQixPQUFnQztRQUFoQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtJQUNwRCxDQUFDO0lBS0ssNENBQWUsR0FBckI7Ozs7Ozs2QkFFUSxJQUFJLENBQUMsTUFBTSxFQUFYLHdCQUFXO3dCQUVGLENBQUMsR0FBRyxDQUFDOzs7NkJBQUUsQ0FBQSxDQUFDLEdBQUcsRUFBRSxDQUFBO3dCQUVaLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDOzZCQUVsSSxDQUFDLENBQUMsRUFBRix3QkFBRTt3QkFDRixxQkFBTSxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFBOzt3QkFBcEIsU0FBb0IsQ0FBQzs7O3dCQUVyQixDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozt3QkFQdEIsQ0FBQyxFQUFFLENBQUE7Ozs7OztLQVdsQzs7Z0JBckI0QixVQUFVOztJQUl2QztRQURDLEtBQUssRUFBRTtzREFDTztJQU5OLGtCQUFrQjtRQUg5QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1NBQy9CLENBQUM7T0FDVyxrQkFBa0IsQ0F3QjlCO0lBQUQseUJBQUM7Q0FBQSxBQXhCRCxJQXdCQztTQXhCWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge3NsZWVwfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiaW9uLWl0ZW1bdGFyZ2V0XVwiXG59KVxuZXhwb3J0IGNsYXNzIElvbmljSXRlbVRhcmdldEZpeCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICB0YXJnZXQ6IHN0cmluZztcblxuICAgIGFzeW5jIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblxuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAyMDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBhID0gKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNoYWRvd1Jvb3QgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiLml0ZW0tbmF0aXZlXCIpKSB8fCB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWEpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgc2xlZXAoaSAqIDEwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYS5zZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIiwgdGhpcy50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==