import { __awaiter } from "tslib";
import { ElementRef, HostListener, Directive } from "@angular/core";
import { waitTill } from "@co.mmons/js-utils/core";
export class TextareaAutosize {
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
}
TextareaAutosize.decorators = [
    { type: Directive, args: [{
                selector: "ion-textarea[ionx-autosize]"
            },] }
];
TextareaAutosize.ctorParameters = () => [
    { type: ElementRef }
];
TextareaAutosize.propDecorators = {
    onChange: [{ type: HostListener, args: ["ionChange",] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEtYXV0b3NpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGV4dGFyZWEtYXV0b3NpemUvdGV4dGFyZWEtYXV0b3NpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFNakQsTUFBTSxPQUFPLGdCQUFnQjtJQUV6QixZQUFtQixPQUEyQztRQUEzQyxZQUFPLEdBQVAsT0FBTyxDQUFvQztJQUM5RCxDQUFDO0lBR1MsUUFBUTtRQUNkLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBWSxRQUFRO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFTyxNQUFNO1FBQ1YsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMxQixJQUFJLEtBQUssRUFBRTtZQUNQLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUNoQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDNUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDbEQ7SUFDTCxDQUFDO0lBRUssUUFBUTs7WUFDVixNQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDO0tBQUE7OztZQTlCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDZCQUE2QjthQUMxQzs7O1lBTE8sVUFBVTs7O3VCQVliLFlBQVksU0FBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIERpcmVjdGl2ZSwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHt3YWl0VGlsbH0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcImlvbi10ZXh0YXJlYVtpb254LWF1dG9zaXplXVwiXG59KVxuXG5leHBvcnQgY2xhc3MgVGV4dGFyZWFBdXRvc2l6ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MSW9uVGV4dGFyZWFFbGVtZW50Pikge1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJpb25DaGFuZ2VcIilcbiAgICBwcm90ZWN0ZWQgb25DaGFuZ2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWRqdXN0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgdGV4dGFyZWEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwidGV4dGFyZWFcIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGp1c3QoKTogdm9pZCB7XG4gICAgICAgIGxldCBpbnB1dCA9IHRoaXMudGV4dGFyZWE7XG4gICAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICAgICAgaW5wdXQuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgICAgICAgICAgaW5wdXQuc3R5bGUuaGVpZ2h0ID0gXCJhdXRvXCI7XG4gICAgICAgICAgICBpbnB1dC5zdHlsZS5oZWlnaHQgPSBpbnB1dC5zY3JvbGxIZWlnaHQgKyBcInB4XCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgYXdhaXQgd2FpdFRpbGwoKCkgPT4gISF0aGlzLnRleHRhcmVhKTtcbiAgICAgICAgdGhpcy5hZGp1c3QoKTtcbiAgICB9XG59XG4iXX0=