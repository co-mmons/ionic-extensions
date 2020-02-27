import { __awaiter, __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Dialog } from "./dialog";
let DialogController = class DialogController {
    constructor(modalController) {
        this.modalController = modalController;
    }
    create(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.modalController.create(Object.assign({}, options, {
                component: Dialog,
                componentProps: {
                    component: options.component,
                    header: options.header,
                    message: options.message,
                    buttons: options.buttons
                },
                leaveAnimation: () => null
            }));
        });
    }
    /**
     * When `id` is not provided, it dismisses the top overlay.
     */
    dismiss(data, role, id) {
        return this.modalController.dismiss(data, role, id);
    }
};
DialogController.ctorParameters = () => [
    { type: ModalController }
];
DialogController = __decorate([
    Injectable()
], DialogController);
export { DialogController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9kaWFsb2cvIiwic291cmNlcyI6WyJkaWFsb2ctY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUloQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUV6QixZQUFzQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFDdEQsQ0FBQztJQUVLLE1BQU0sQ0FBQyxPQUFzQjs7WUFFL0IsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUU7Z0JBQzFELFNBQVMsRUFBRSxNQUFNO2dCQUNqQixjQUFjLEVBQUU7b0JBQ1osU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO29CQUM1QixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07b0JBQ3RCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztvQkFDeEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO2lCQUMzQjtnQkFDRCxjQUFjLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSTthQUM3QixDQUFDLENBQUMsQ0FBQztRQUNSLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0gsT0FBTyxDQUFDLElBQVUsRUFBRSxJQUFhLEVBQUUsRUFBVztRQUMxQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUVKLENBQUE7O1lBeEIwQyxlQUFlOztBQUY3QyxnQkFBZ0I7SUFENUIsVUFBVSxFQUFFO0dBQ0EsZ0JBQWdCLENBMEI1QjtTQTFCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge01vZGFsQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge0RpYWxvZ30gZnJvbSBcIi4vZGlhbG9nXCI7XG5pbXBvcnQge0RpYWxvZ09wdGlvbnN9IGZyb20gXCIuL2RpYWxvZy1vcHRpb25zXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEaWFsb2dDb250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIGFzeW5jIGNyZWF0ZShvcHRpb25zOiBEaWFsb2dPcHRpb25zKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZShPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7XG4gICAgICAgICAgICBjb21wb25lbnQ6IERpYWxvZyxcbiAgICAgICAgICAgIGNvbXBvbmVudFByb3BzOiB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBvcHRpb25zLmNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICBoZWFkZXI6IG9wdGlvbnMuaGVhZGVyLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG9wdGlvbnMubWVzc2FnZSxcbiAgICAgICAgICAgICAgICBidXR0b25zOiBvcHRpb25zLmJ1dHRvbnNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWF2ZUFuaW1hdGlvbjogKCkgPT4gbnVsbFxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiBgaWRgIGlzIG5vdCBwcm92aWRlZCwgaXQgZGlzbWlzc2VzIHRoZSB0b3Agb3ZlcmxheS5cbiAgICAgKi9cbiAgICBkaXNtaXNzKGRhdGE/OiBhbnksIHJvbGU/OiBzdHJpbmcsIGlkPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKGRhdGEsIHJvbGUsIGlkKTtcbiAgICB9XG5cbn1cblxuXG4iXX0=