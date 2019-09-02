import * as tslib_1 from "tslib";
import { ElementRef, HostListener, Directive } from "@angular/core";
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
    tslib_1.__decorate([
        HostListener("ionChange"),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TextareaAutosize.prototype, "onChange", null);
    TextareaAutosize = tslib_1.__decorate([
        Directive({
            selector: "ion-textarea[ionx-autosize]"
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], TextareaAutosize);
    return TextareaAutosize;
}());
export { TextareaAutosize };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEtYXV0b3NpemUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy8iLCJzb3VyY2VzIjpbInRleHRhcmVhLWF1dG9zaXplL3RleHRhcmVhLWF1dG9zaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBTWpEO0lBRUksMEJBQW1CLE9BQTJDO1FBQTNDLFlBQU8sR0FBUCxPQUFPLENBQW9DO0lBQzlELENBQUM7SUFHUyxtQ0FBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsc0JBQVksc0NBQVE7YUFBcEI7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRSxDQUFDOzs7T0FBQTtJQUVPLGlDQUFNLEdBQWQ7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzFCLElBQUksS0FBSyxFQUFFO1lBQ1AsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ2hDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUM1QixLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUNsRDtJQUNMLENBQUM7SUFFSyxtQ0FBUSxHQUFkOzs7Ozs0QkFDSSxxQkFBTSxRQUFRLENBQUMsY0FBTSxPQUFBLENBQUMsQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFmLENBQWUsQ0FBQyxFQUFBOzt3QkFBckMsU0FBcUMsQ0FBQzt3QkFDdEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7OztLQUNqQjtJQXBCRDtRQURDLFlBQVksQ0FBQyxXQUFXLENBQUM7Ozs7b0RBR3pCO0lBUlEsZ0JBQWdCO1FBSjVCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSw2QkFBNkI7U0FDMUMsQ0FBQztpREFJOEIsVUFBVTtPQUY3QixnQkFBZ0IsQ0EyQjVCO0lBQUQsdUJBQUM7Q0FBQSxBQTNCRCxJQTJCQztTQTNCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0VsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgRGlyZWN0aXZlLCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge3dhaXRUaWxsfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiaW9uLXRleHRhcmVhW2lvbngtYXV0b3NpemVdXCJcbn0pXG5cbmV4cG9ydCBjbGFzcyBUZXh0YXJlYUF1dG9zaXplIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxJb25UZXh0YXJlYUVsZW1lbnQ+KSB7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImlvbkNoYW5nZVwiKVxuICAgIHByb3RlY3RlZCBvbkNoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGp1c3QoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCB0ZXh0YXJlYSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0ZXh0YXJlYVwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkanVzdCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGlucHV0ID0gdGhpcy50ZXh0YXJlYTtcbiAgICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgICAgICBpbnB1dC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgICAgICAgICBpbnB1dC5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcbiAgICAgICAgICAgIGlucHV0LnN0eWxlLmhlaWdodCA9IGlucHV0LnNjcm9sbEhlaWdodCArIFwicHhcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIG5nT25Jbml0KCkge1xuICAgICAgICBhd2FpdCB3YWl0VGlsbCgoKSA9PiAhIXRoaXMudGV4dGFyZWEpO1xuICAgICAgICB0aGlzLmFkanVzdCgpO1xuICAgIH1cbn1cbiJdfQ==