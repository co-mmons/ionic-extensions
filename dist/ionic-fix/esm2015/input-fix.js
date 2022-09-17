import { __awaiter } from "tslib";
import { Directive, ElementRef, Input } from "@angular/core";
import { waitTill } from "@co.mmons/js-utils/core";
export class IonicInputFix {
    constructor(element) {
        this.element = element;
    }
    ngAfterViewInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.tabIndex) {
                this.element.nativeElement.removeAttribute("tabIndex");
                yield waitTill(() => !!this.element.nativeElement.shadowRoot && !!this.element.nativeElement.shadowRoot.querySelector(".native-input"));
                let realInput = this.element.nativeElement.shadowRoot.querySelector(".native-input");
                realInput.setAttribute("tabIndex", this.tabIndex);
            }
        });
    }
}
IonicInputFix.decorators = [
    { type: Directive, args: [{
                selector: "ion-input[ionfix-input]"
            },] }
];
IonicInputFix.ctorParameters = () => [
    { type: ElementRef }
];
IonicInputFix.propDecorators = {
    tabIndex: [{ type: Input, args: ["tabIndex",] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZml4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2lvbmljLWZpeC9pbnB1dC1maXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFLakQsTUFBTSxPQUFPLGFBQWE7SUFFdEIsWUFBb0IsT0FBd0M7UUFBeEMsWUFBTyxHQUFQLE9BQU8sQ0FBaUM7SUFDNUQsQ0FBQztJQUtLLGVBQWU7O1lBRWpCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRXZELE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFFeEksSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDckYsU0FBUyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3JEO1FBQ0wsQ0FBQztLQUFBOzs7WUFyQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx5QkFBeUI7YUFDdEM7OztZQUxrQixVQUFVOzs7dUJBV3hCLEtBQUssU0FBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHt3YWl0VGlsbH0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcImlvbi1pbnB1dFtpb25maXgtaW5wdXRdXCJcbn0pXG5leHBvcnQgY2xhc3MgSW9uaWNJbnB1dEZpeCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTElvbklucHV0RWxlbWVudD4pIHtcbiAgICB9XG5cbiAgICBASW5wdXQoXCJ0YWJJbmRleFwiKVxuICAgIHRhYkluZGV4OiBzdHJpbmc7XG5cbiAgICBhc3luYyBuZ0FmdGVyVmlld0luaXQoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMudGFiSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcInRhYkluZGV4XCIpO1xuXG4gICAgICAgICAgICBhd2FpdCB3YWl0VGlsbCgoKSA9PiAhIXRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNoYWRvd1Jvb3QgJiYgISF0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIubmF0aXZlLWlucHV0XCIpKTtcblxuICAgICAgICAgICAgbGV0IHJlYWxJbnB1dCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIi5uYXRpdmUtaW5wdXRcIik7XG4gICAgICAgICAgICByZWFsSW5wdXQuc2V0QXR0cmlidXRlKFwidGFiSW5kZXhcIiwgdGhpcy50YWJJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG59Il19