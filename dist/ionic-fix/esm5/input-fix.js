import { __awaiter, __decorate, __generator } from "tslib";
import { Directive, ElementRef, Input } from "@angular/core";
import { waitTill } from "@co.mmons/js-utils/core";
var IonicInputFix = /** @class */ (function () {
    function IonicInputFix(element) {
        this.element = element;
    }
    IonicInputFix.prototype.ngAfterViewInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var realInput;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.tabIndex) return [3 /*break*/, 2];
                        this.element.nativeElement.removeAttribute("tabIndex");
                        return [4 /*yield*/, waitTill(function () { return !!_this.element.nativeElement.shadowRoot && !!_this.element.nativeElement.shadowRoot.querySelector(".native-input"); })];
                    case 1:
                        _a.sent();
                        realInput = this.element.nativeElement.shadowRoot.querySelector(".native-input");
                        realInput.setAttribute("tabIndex", this.tabIndex);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    IonicInputFix.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input("tabIndex")
    ], IonicInputFix.prototype, "tabIndex", void 0);
    IonicInputFix = __decorate([
        Directive({
            selector: "ion-input[ionfix-input]"
        })
    ], IonicInputFix);
    return IonicInputFix;
}());
export { IonicInputFix };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZml4LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaW9uaWMtZml4LyIsInNvdXJjZXMiOlsiaW5wdXQtZml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBS2pEO0lBRUksdUJBQW9CLE9BQXdDO1FBQXhDLFlBQU8sR0FBUCxPQUFPLENBQWlDO0lBQzVELENBQUM7SUFLSyx1Q0FBZSxHQUFyQjs7Ozs7Ozs2QkFFUSxJQUFJLENBQUMsUUFBUSxFQUFiLHdCQUFhO3dCQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFFdkQscUJBQU0sUUFBUSxDQUFDLGNBQU0sT0FBQSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxFQUFqSCxDQUFpSCxDQUFDLEVBQUE7O3dCQUF2SSxTQUF1SSxDQUFDO3dCQUVwSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDckYsU0FBUyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7S0FFekQ7O2dCQWhCNEIsVUFBVTs7SUFJdkM7UUFEQyxLQUFLLENBQUMsVUFBVSxDQUFDO21EQUNEO0lBTlIsYUFBYTtRQUh6QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUseUJBQXlCO1NBQ3RDLENBQUM7T0FDVyxhQUFhLENBbUJ6QjtJQUFELG9CQUFDO0NBQUEsQUFuQkQsSUFtQkM7U0FuQlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7d2FpdFRpbGx9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJpb24taW5wdXRbaW9uZml4LWlucHV0XVwiXG59KVxuZXhwb3J0IGNsYXNzIElvbmljSW5wdXRGaXgge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxJb25JbnB1dEVsZW1lbnQ+KSB7XG4gICAgfVxuXG4gICAgQElucHV0KFwidGFiSW5kZXhcIilcbiAgICB0YWJJbmRleDogc3RyaW5nO1xuXG4gICAgYXN5bmMgbmdBZnRlclZpZXdJbml0KCkge1xuXG4gICAgICAgIGlmICh0aGlzLnRhYkluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJJbmRleFwiKTtcblxuICAgICAgICAgICAgYXdhaXQgd2FpdFRpbGwoKCkgPT4gISF0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zaGFkb3dSb290ICYmICEhdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiLm5hdGl2ZS1pbnB1dFwiKSk7XG5cbiAgICAgICAgICAgIGxldCByZWFsSW5wdXQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIubmF0aXZlLWlucHV0XCIpO1xuICAgICAgICAgICAgcmVhbElucHV0LnNldEF0dHJpYnV0ZShcInRhYkluZGV4XCIsIHRoaXMudGFiSW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==