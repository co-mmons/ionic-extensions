import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from "@angular/core";
import { waitTill } from "@co.mmons/js-utils/core";
let IonicInputFix = class IonicInputFix {
    constructor(element) {
        this.element = element;
    }
    ngAfterViewInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.tabIndex) {
                this.element.nativeElement.removeAttribute("tabIndex");
                yield waitTill(() => !!this.element.nativeElement.shadowRoot && !!this.element.nativeElement.shadowRoot.querySelector(".native-input"));
                let realInput = this.element.nativeElement.shadowRoot.querySelector(".native-input");
                realInput.setAttribute("tabIndex", this.tabIndex);
            }
        });
    }
};
IonicInputFix.ctorParameters = () => [
    { type: ElementRef }
];
tslib_1.__decorate([
    Input("tabIndex")
], IonicInputFix.prototype, "tabIndex", void 0);
IonicInputFix = tslib_1.__decorate([
    Directive({
        selector: "ion-input[ionfix-input]"
    })
], IonicInputFix);
export { IonicInputFix };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZml4LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaW9uaWMtZml4LyIsInNvdXJjZXMiOlsiaW5wdXQtZml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBS2pELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFFdEIsWUFBb0IsT0FBd0M7UUFBeEMsWUFBTyxHQUFQLE9BQU8sQ0FBaUM7SUFDNUQsQ0FBQztJQUtLLGVBQWU7O1lBRWpCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRXZELE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFFeEksSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDckYsU0FBUyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3JEO1FBQ0wsQ0FBQztLQUFBO0NBQ0osQ0FBQTs7WUFqQmdDLFVBQVU7O0FBSXZDO0lBREMsS0FBSyxDQUFDLFVBQVUsQ0FBQzsrQ0FDRDtBQU5SLGFBQWE7SUFIekIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLHlCQUF5QjtLQUN0QyxDQUFDO0dBQ1csYUFBYSxDQW1CekI7U0FuQlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7d2FpdFRpbGx9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJpb24taW5wdXRbaW9uZml4LWlucHV0XVwiXG59KVxuZXhwb3J0IGNsYXNzIElvbmljSW5wdXRGaXgge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxJb25JbnB1dEVsZW1lbnQ+KSB7XG4gICAgfVxuXG4gICAgQElucHV0KFwidGFiSW5kZXhcIilcbiAgICB0YWJJbmRleDogc3RyaW5nO1xuXG4gICAgYXN5bmMgbmdBZnRlclZpZXdJbml0KCkge1xuXG4gICAgICAgIGlmICh0aGlzLnRhYkluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJJbmRleFwiKTtcblxuICAgICAgICAgICAgYXdhaXQgd2FpdFRpbGwoKCkgPT4gISF0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zaGFkb3dSb290ICYmICEhdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiLm5hdGl2ZS1pbnB1dFwiKSk7XG5cbiAgICAgICAgICAgIGxldCByZWFsSW5wdXQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIubmF0aXZlLWlucHV0XCIpO1xuICAgICAgICAgICAgcmVhbElucHV0LnNldEF0dHJpYnV0ZShcInRhYkluZGV4XCIsIHRoaXMudGFiSW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==