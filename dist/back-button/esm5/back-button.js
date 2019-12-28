import { __decorate } from "tslib";
import { Directive, ElementRef, Input, OnInit } from "@angular/core";
var BackButton = /** @class */ (function () {
    // template: `<ion-back-button [style.display]="modal ? 'inline-block' : null" [disabled]="disabled" [defaultHref]="defaultHref" [icon]="icon ? icon : (modal && ('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back')"></ion-back-button>`
    function BackButton(elementRef) {
        this.elementRef = elementRef;
    }
    BackButton.prototype.ngOnInit = function () {
        if (!!this.elementRef.nativeElement.closest("ion-modal")) {
            this.elementRef.nativeElement.style.setProperty("display", "inline-block");
        }
    };
    BackButton.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], BackButton.prototype, "icon", void 0);
    BackButton = __decorate([
        Directive({
            selector: "ion-back-button[ionx-back-button]",
        })
    ], BackButton);
    return BackButton;
}());
export { BackButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFjay1idXR0b24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9iYWNrLWJ1dHRvbi8iLCJzb3VyY2VzIjpbImJhY2stYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBS25FO0lBQ0ksOE9BQThPO0lBRTlPLG9CQUFvQixVQUFnRDtRQUFoRCxlQUFVLEdBQVYsVUFBVSxDQUFzQztJQUNwRSxDQUFDO0lBS0QsNkJBQVEsR0FBUjtRQUVJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztTQUM5RTtJQUNMLENBQUM7O2dCQVgrQixVQUFVOztJQUkxQztRQURDLEtBQUssRUFBRTs0Q0FDSztJQVBKLFVBQVU7UUFIdEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG1DQUFtQztTQUNoRCxDQUFDO09BQ1csVUFBVSxDQWdCdEI7SUFBRCxpQkFBQztDQUFBLEFBaEJELElBZ0JDO1NBaEJZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiaW9uLWJhY2stYnV0dG9uW2lvbngtYmFjay1idXR0b25dXCIsXG59KVxuZXhwb3J0IGNsYXNzIEJhY2tCdXR0b24gaW1wbGVtZW50cyBPbkluaXQge1xuICAgIC8vIHRlbXBsYXRlOiBgPGlvbi1iYWNrLWJ1dHRvbiBbc3R5bGUuZGlzcGxheV09XCJtb2RhbCA/ICdpbmxpbmUtYmxvY2snIDogbnVsbFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFtkZWZhdWx0SHJlZl09XCJkZWZhdWx0SHJlZlwiIFtpY29uXT1cImljb24gPyBpY29uIDogKG1vZGFsICYmICgndGFibGV0JyB8IG1hdGNoR3JlYXRlcldpZHRoKSA/ICdjbG9zZScgOiAnYXJyb3ctYmFjaycpXCI+PC9pb24tYmFjay1idXR0b24+YFxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxJb25CYWNrQnV0dG9uRWxlbWVudD4pIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGljb246IHN0cmluZztcblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIGlmICghIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoXCJpb24tbW9kYWxcIikpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19