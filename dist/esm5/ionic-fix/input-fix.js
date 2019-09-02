import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from "@angular/core";
import { waitTill } from "@co.mmons/js-utils/core";
var IonicInputFix = /** @class */ (function () {
    function IonicInputFix(element) {
        this.element = element;
    }
    IonicInputFix.prototype.ngAfterViewInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var realInput;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
    tslib_1.__decorate([
        Input("tabIndex"),
        tslib_1.__metadata("design:type", String)
    ], IonicInputFix.prototype, "tabIndex", void 0);
    IonicInputFix = tslib_1.__decorate([
        Directive({
            selector: "ion-input[ionfix-input]"
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], IonicInputFix);
    return IonicInputFix;
}());
export { IonicInputFix };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZml4LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvIiwic291cmNlcyI6WyJpb25pYy1maXgvaW5wdXQtZml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBS2pEO0lBRUksdUJBQW9CLE9BQXdDO1FBQXhDLFlBQU8sR0FBUCxPQUFPLENBQWlDO0lBQzVELENBQUM7SUFLSyx1Q0FBZSxHQUFyQjs7Ozs7Ozs2QkFFUSxJQUFJLENBQUMsUUFBUSxFQUFiLHdCQUFhO3dCQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFFdkQscUJBQU0sUUFBUSxDQUFDLGNBQU0sT0FBQSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxFQUFqSCxDQUFpSCxDQUFDLEVBQUE7O3dCQUF2SSxTQUF1SSxDQUFDO3dCQUVwSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDckYsU0FBUyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7S0FFekQ7SUFaRDtRQURDLEtBQUssQ0FBQyxVQUFVLENBQUM7O21EQUNEO0lBTlIsYUFBYTtRQUh6QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUseUJBQXlCO1NBQ3RDLENBQUM7aURBRytCLFVBQVU7T0FGOUIsYUFBYSxDQW1CekI7SUFBRCxvQkFBQztDQUFBLEFBbkJELElBbUJDO1NBbkJZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge3dhaXRUaWxsfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiaW9uLWlucHV0W2lvbmZpeC1pbnB1dF1cIlxufSlcbmV4cG9ydCBjbGFzcyBJb25pY0lucHV0Rml4IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MSW9uSW5wdXRFbGVtZW50Pikge1xuICAgIH1cblxuICAgIEBJbnB1dChcInRhYkluZGV4XCIpXG4gICAgdGFiSW5kZXg6IHN0cmluZztcblxuICAgIGFzeW5jIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblxuICAgICAgICBpZiAodGhpcy50YWJJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwidGFiSW5kZXhcIik7XG5cbiAgICAgICAgICAgIGF3YWl0IHdhaXRUaWxsKCgpID0+ICEhdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2hhZG93Um9vdCAmJiAhIXRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIi5uYXRpdmUtaW5wdXRcIikpO1xuXG4gICAgICAgICAgICBsZXQgcmVhbElucHV0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiLm5hdGl2ZS1pbnB1dFwiKTtcbiAgICAgICAgICAgIHJlYWxJbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0YWJJbmRleFwiLCB0aGlzLnRhYkluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=