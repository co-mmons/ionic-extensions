import * as tslib_1 from "tslib";
import { ElementRef, HostListener, Directive, OnInit } from "@angular/core";
import { waitTill } from "@co.mmons/js-utils/core";
var TextareaAutosize = /** @class */ (function () {
    function TextareaAutosize(element) {
        this.element = element;
    }
    TextareaAutosize.prototype.onChange = function () {
        this.adjust();
    };
    Object.defineProperty(TextareaAutosize.prototype, "textarea", {
        get: function () {
            return this.element.nativeElement.querySelector("textarea");
        },
        enumerable: true,
        configurable: true
    });
    TextareaAutosize.prototype.adjust = function () {
        var input = this.textarea;
        if (input) {
            input.style.overflow = "hidden";
            input.style.height = "auto";
            input.style.height = input.scrollHeight + "px";
        }
    };
    TextareaAutosize.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitTill(function () { return !!_this.textarea; })];
                    case 1:
                        _a.sent();
                        this.adjust();
                        return [2 /*return*/];
                }
            });
        });
    };
    TextareaAutosize.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    tslib_1.__decorate([
        HostListener("ionChange")
    ], TextareaAutosize.prototype, "onChange", null);
    TextareaAutosize = tslib_1.__decorate([
        Directive({
            selector: "ion-textarea[ionx-autosize]"
        })
    ], TextareaAutosize);
    return TextareaAutosize;
}());
export { TextareaAutosize };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEtYXV0b3NpemUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy90ZXh0YXJlYS1hdXRvc2l6ZS8iLCJzb3VyY2VzIjpbInRleHRhcmVhLWF1dG9zaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQU1qRDtJQUVJLDBCQUFtQixPQUEyQztRQUEzQyxZQUFPLEdBQVAsT0FBTyxDQUFvQztJQUM5RCxDQUFDO0lBR1MsbUNBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELHNCQUFZLHNDQUFRO2FBQXBCO1lBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEUsQ0FBQzs7O09BQUE7SUFFTyxpQ0FBTSxHQUFkO1FBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMxQixJQUFJLEtBQUssRUFBRTtZQUNQLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUNoQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDNUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDbEQ7SUFDTCxDQUFDO0lBRUssbUNBQVEsR0FBZDs7Ozs7NEJBQ0kscUJBQU0sUUFBUSxDQUFDLGNBQU0sT0FBQSxDQUFDLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBZixDQUFlLENBQUMsRUFBQTs7d0JBQXJDLFNBQXFDLENBQUM7d0JBQ3RDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7S0FDakI7O2dCQXhCMkIsVUFBVTs7SUFJdEM7UUFEQyxZQUFZLENBQUMsV0FBVyxDQUFDO29EQUd6QjtJQVJRLGdCQUFnQjtRQUo1QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsNkJBQTZCO1NBQzFDLENBQUM7T0FFVyxnQkFBZ0IsQ0EyQjVCO0lBQUQsdUJBQUM7Q0FBQSxBQTNCRCxJQTJCQztTQTNCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0VsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgRGlyZWN0aXZlLCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge3dhaXRUaWxsfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiaW9uLXRleHRhcmVhW2lvbngtYXV0b3NpemVdXCJcbn0pXG5cbmV4cG9ydCBjbGFzcyBUZXh0YXJlYUF1dG9zaXplIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxJb25UZXh0YXJlYUVsZW1lbnQ+KSB7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImlvbkNoYW5nZVwiKVxuICAgIHByb3RlY3RlZCBvbkNoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGp1c3QoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCB0ZXh0YXJlYSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0ZXh0YXJlYVwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkanVzdCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGlucHV0ID0gdGhpcy50ZXh0YXJlYTtcbiAgICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgICAgICBpbnB1dC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgICAgICAgICBpbnB1dC5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcbiAgICAgICAgICAgIGlucHV0LnN0eWxlLmhlaWdodCA9IGlucHV0LnNjcm9sbEhlaWdodCArIFwicHhcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIG5nT25Jbml0KCkge1xuICAgICAgICBhd2FpdCB3YWl0VGlsbCgoKSA9PiAhIXRoaXMudGV4dGFyZWEpO1xuICAgICAgICB0aGlzLmFkanVzdCgpO1xuICAgIH1cbn1cbiJdfQ==