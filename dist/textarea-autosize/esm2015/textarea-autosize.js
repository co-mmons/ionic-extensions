import { __awaiter, __decorate } from "tslib";
import { ElementRef, HostListener, Directive, OnInit } from "@angular/core";
import { waitTill } from "@co.mmons/js-utils/core";
let TextareaAutosize = class TextareaAutosize {
    constructor(element) {
        this.element = element;
    }
    onChange() {
        this.adjust();
    }
    get textarea() {
        return this.element.nativeElement.querySelector("textarea");
    }
    adjust() {
        let input = this.textarea;
        if (input) {
            input.style.overflow = "hidden";
            input.style.height = "auto";
            input.style.height = input.scrollHeight + "px";
        }
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitTill(() => !!this.textarea);
            this.adjust();
        });
    }
};
TextareaAutosize.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    HostListener("ionChange")
], TextareaAutosize.prototype, "onChange", null);
TextareaAutosize = __decorate([
    Directive({
        selector: "ion-textarea[ionx-autosize]"
    })
], TextareaAutosize);
export { TextareaAutosize };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEtYXV0b3NpemUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy90ZXh0YXJlYS1hdXRvc2l6ZS8iLCJzb3VyY2VzIjpbInRleHRhcmVhLWF1dG9zaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQU1qRCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUV6QixZQUFtQixPQUEyQztRQUEzQyxZQUFPLEdBQVAsT0FBTyxDQUFvQztJQUM5RCxDQUFDO0lBR1MsUUFBUTtRQUNkLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBWSxRQUFRO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFTyxNQUFNO1FBQ1YsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMxQixJQUFJLEtBQUssRUFBRTtZQUNQLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUNoQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDNUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDbEQ7SUFDTCxDQUFDO0lBRUssUUFBUTs7WUFDVixNQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO0tBQUE7Q0FDSixDQUFBOztZQXpCK0IsVUFBVTs7QUFJdEM7SUFEQyxZQUFZLENBQUMsV0FBVyxDQUFDO2dEQUd6QjtBQVJRLGdCQUFnQjtJQUo1QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsNkJBQTZCO0tBQzFDLENBQUM7R0FFVyxnQkFBZ0IsQ0EyQjVCO1NBM0JZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBEaXJlY3RpdmUsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7d2FpdFRpbGx9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJpb24tdGV4dGFyZWFbaW9ueC1hdXRvc2l6ZV1cIlxufSlcblxuZXhwb3J0IGNsYXNzIFRleHRhcmVhQXV0b3NpemUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTElvblRleHRhcmVhRWxlbWVudD4pIHtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiaW9uQ2hhbmdlXCIpXG4gICAgcHJvdGVjdGVkIG9uQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFkanVzdCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IHRleHRhcmVhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcInRleHRhcmVhXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRqdXN0KCk6IHZvaWQge1xuICAgICAgICBsZXQgaW5wdXQgPSB0aGlzLnRleHRhcmVhO1xuICAgICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgICAgIGlucHV0LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgIGlucHV0LnN0eWxlLmhlaWdodCA9IFwiYXV0b1wiO1xuICAgICAgICAgICAgaW5wdXQuc3R5bGUuaGVpZ2h0ID0gaW5wdXQuc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgbmdPbkluaXQoKSB7XG4gICAgICAgIGF3YWl0IHdhaXRUaWxsKCgpID0+ICEhdGhpcy50ZXh0YXJlYSk7XG4gICAgICAgIHRoaXMuYWRqdXN0KCk7XG4gICAgfVxufVxuIl19