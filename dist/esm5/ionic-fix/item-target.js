import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from "@angular/core";
import { sleep } from "@co.mmons/js-utils/core";
var IonicItemTargetFix = /** @class */ (function () {
    function IonicItemTargetFix(element) {
        this.element = element;
    }
    IonicItemTargetFix.prototype.ngAfterViewInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var i, a;
            return tslib_1.__generator(this, function (_a) {
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
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], IonicItemTargetFix.prototype, "target", void 0);
    IonicItemTargetFix = tslib_1.__decorate([
        Directive({
            selector: "ion-item[target]"
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], IonicItemTargetFix);
    return IonicItemTargetFix;
}());
export { IonicItemTargetFix };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS10YXJnZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy8iLCJzb3VyY2VzIjpbImlvbmljLWZpeC9pdGVtLXRhcmdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUs5QztJQUVJLDRCQUFvQixPQUFnQztRQUFoQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtJQUNwRCxDQUFDO0lBS0ssNENBQWUsR0FBckI7Ozs7Ozs2QkFFUSxJQUFJLENBQUMsTUFBTSxFQUFYLHdCQUFXO3dCQUVGLENBQUMsR0FBRyxDQUFDOzs7NkJBQUUsQ0FBQSxDQUFDLEdBQUcsRUFBRSxDQUFBO3dCQUVaLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDOzZCQUVsSSxDQUFDLENBQUMsRUFBRix3QkFBRTt3QkFDRixxQkFBTSxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFBOzt3QkFBcEIsU0FBb0IsQ0FBQzs7O3dCQUVyQixDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozt3QkFQdEIsQ0FBQyxFQUFFLENBQUE7Ozs7OztLQVdsQztJQWpCRDtRQURDLEtBQUssRUFBRTs7c0RBQ087SUFOTixrQkFBa0I7UUFIOUIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGtCQUFrQjtTQUMvQixDQUFDO2lEQUcrQixVQUFVO09BRjlCLGtCQUFrQixDQXdCOUI7SUFBRCx5QkFBQztDQUFBLEFBeEJELElBd0JDO1NBeEJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7c2xlZXB9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJpb24taXRlbVt0YXJnZXRdXCJcbn0pXG5leHBvcnQgY2xhc3MgSW9uaWNJdGVtVGFyZ2V0Rml4IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHRhcmdldDogc3RyaW5nO1xuXG4gICAgYXN5bmMgbmdBZnRlclZpZXdJbml0KCkge1xuXG4gICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDIwOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGEgPSAodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2hhZG93Um9vdCAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIuaXRlbS1uYXRpdmVcIikpIHx8IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgIGlmICghYSkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBzbGVlcChpICogMTAwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhLnNldEF0dHJpYnV0ZShcInRhcmdldFwiLCB0aGlzLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19