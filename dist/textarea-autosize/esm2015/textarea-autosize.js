import * as tslib_1 from "tslib";
import { ElementRef, HostListener, Directive } from "@angular/core";
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield waitTill(() => !!this.textarea);
            this.adjust();
        });
    }
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
export { TextareaAutosize };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEtYXV0b3NpemUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy90ZXh0YXJlYS1hdXRvc2l6ZS8iLCJzb3VyY2VzIjpbInRleHRhcmVhLWF1dG9zaXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBTWpELElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBRXpCLFlBQW1CLE9BQTJDO1FBQTNDLFlBQU8sR0FBUCxPQUFPLENBQW9DO0lBQzlELENBQUM7SUFHUyxRQUFRO1FBQ2QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxJQUFZLFFBQVE7UUFDaEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVPLE1BQU07UUFDVixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzFCLElBQUksS0FBSyxFQUFFO1lBQ1AsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ2hDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUM1QixLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUNsRDtJQUNMLENBQUM7SUFFSyxRQUFROztZQUNWLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtDQUNKLENBQUE7QUFyQkc7SUFEQyxZQUFZLENBQUMsV0FBVyxDQUFDOzs7O2dEQUd6QjtBQVJRLGdCQUFnQjtJQUo1QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsNkJBQTZCO0tBQzFDLENBQUM7NkNBSThCLFVBQVU7R0FGN0IsZ0JBQWdCLENBMkI1QjtTQTNCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0VsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgRGlyZWN0aXZlLCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge3dhaXRUaWxsfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiaW9uLXRleHRhcmVhW2lvbngtYXV0b3NpemVdXCJcbn0pXG5cbmV4cG9ydCBjbGFzcyBUZXh0YXJlYUF1dG9zaXplIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxJb25UZXh0YXJlYUVsZW1lbnQ+KSB7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImlvbkNoYW5nZVwiKVxuICAgIHByb3RlY3RlZCBvbkNoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGp1c3QoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCB0ZXh0YXJlYSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0ZXh0YXJlYVwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkanVzdCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGlucHV0ID0gdGhpcy50ZXh0YXJlYTtcbiAgICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgICAgICBpbnB1dC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgICAgICAgICBpbnB1dC5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcbiAgICAgICAgICAgIGlucHV0LnN0eWxlLmhlaWdodCA9IGlucHV0LnNjcm9sbEhlaWdodCArIFwicHhcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIG5nT25Jbml0KCkge1xuICAgICAgICBhd2FpdCB3YWl0VGlsbCgoKSA9PiAhIXRoaXMudGV4dGFyZWEpO1xuICAgICAgICB0aGlzLmFkanVzdCgpO1xuICAgIH1cbn1cbiJdfQ==