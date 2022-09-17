import { Directive, ElementRef, Input } from "@angular/core";
export class BackButton {
    // template: `<ion-back-button [style.display]="modal ? 'inline-block' : null" [disabled]="disabled" [defaultHref]="defaultHref" [icon]="icon ? icon : (modal && ('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back')"></ion-back-button>`
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        if (!!this.elementRef.nativeElement.closest("ion-modal")) {
            this.elementRef.nativeElement.style.setProperty("display", "inline-block");
        }
    }
}
BackButton.decorators = [
    { type: Directive, args: [{
                selector: "ion-back-button[ionx-back-button]",
            },] }
];
BackButton.ctorParameters = () => [
    { type: ElementRef }
];
BackButton.propDecorators = {
    icon: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFjay1idXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmFjay1idXR0b24vYmFjay1idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBS25FLE1BQU0sT0FBTyxVQUFVO0lBQ25CLDhPQUE4TztJQUU5TyxZQUFvQixVQUFnRDtRQUFoRCxlQUFVLEdBQVYsVUFBVSxDQUFzQztJQUNwRSxDQUFDO0lBS0QsUUFBUTtRQUVKLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztTQUM5RTtJQUNMLENBQUM7OztZQWpCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1DQUFtQzthQUNoRDs7O1lBSmtCLFVBQVU7OzttQkFXeEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJpb24tYmFjay1idXR0b25baW9ueC1iYWNrLWJ1dHRvbl1cIixcbn0pXG5leHBvcnQgY2xhc3MgQmFja0J1dHRvbiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgLy8gdGVtcGxhdGU6IGA8aW9uLWJhY2stYnV0dG9uIFtzdHlsZS5kaXNwbGF5XT1cIm1vZGFsID8gJ2lubGluZS1ibG9jaycgOiBudWxsXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2RlZmF1bHRIcmVmXT1cImRlZmF1bHRIcmVmXCIgW2ljb25dPVwiaWNvbiA/IGljb24gOiAobW9kYWwgJiYgKCd0YWJsZXQnIHwgbWF0Y2hHcmVhdGVyV2lkdGgpID8gJ2Nsb3NlJyA6ICdhcnJvdy1iYWNrJylcIj48L2lvbi1iYWNrLWJ1dHRvbj5gXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElvbkJhY2tCdXR0b25FbGVtZW50Pikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgaWNvbjogc3RyaW5nO1xuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgaWYgKCEhdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xvc2VzdChcImlvbi1tb2RhbFwiKSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCJkaXNwbGF5XCIsIFwiaW5saW5lLWJsb2NrXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=