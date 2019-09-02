import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Dialog } from "./dialog";
let DialogController = class DialogController {
    constructor(modalController) {
        this.modalController = modalController;
    }
    create(options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.modalController.create(Object.assign({}, options, {
                component: Dialog,
                componentProps: {
                    header: options.header,
                    message: options.message,
                    buttons: options.buttons
                }
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
DialogController = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [ModalController])
], DialogController);
export { DialogController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9kaWFsb2cvIiwic291cmNlcyI6WyJkaWFsb2ctY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUloQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUV6QixZQUFzQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFDdEQsQ0FBQztJQUVLLE1BQU0sQ0FBQyxPQUFzQjs7WUFFL0IsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUU7Z0JBQzFELFNBQVMsRUFBRSxNQUFNO2dCQUNqQixjQUFjLEVBQUU7b0JBQ1osTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO29CQUN0QixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87b0JBQ3hCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztpQkFDM0I7YUFDSixDQUFDLENBQUMsQ0FBQztRQUNSLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0gsT0FBTyxDQUFDLElBQVUsRUFBRSxJQUFhLEVBQUUsRUFBVztRQUMxQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUVKLENBQUE7QUF4QlksZ0JBQWdCO0lBRDVCLFVBQVUsRUFBRTs2Q0FHOEIsZUFBZTtHQUY3QyxnQkFBZ0IsQ0F3QjVCO1NBeEJZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7TW9kYWxDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7RGlhbG9nfSBmcm9tIFwiLi9kaWFsb2dcIjtcbmltcG9ydCB7RGlhbG9nT3B0aW9uc30gZnJvbSBcIi4vZGlhbG9nLW9wdGlvbnNcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERpYWxvZ0NvbnRyb2xsZXIge1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyKSB7XG4gICAgfVxuXG4gICAgYXN5bmMgY3JlYXRlKG9wdGlvbnM6IERpYWxvZ09wdGlvbnMpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbENvbnRyb2xsZXIuY3JlYXRlKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHtcbiAgICAgICAgICAgIGNvbXBvbmVudDogRGlhbG9nLFxuICAgICAgICAgICAgY29tcG9uZW50UHJvcHM6IHtcbiAgICAgICAgICAgICAgICBoZWFkZXI6IG9wdGlvbnMuaGVhZGVyLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG9wdGlvbnMubWVzc2FnZSxcbiAgICAgICAgICAgICAgICBidXR0b25zOiBvcHRpb25zLmJ1dHRvbnNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gYGlkYCBpcyBub3QgcHJvdmlkZWQsIGl0IGRpc21pc3NlcyB0aGUgdG9wIG92ZXJsYXkuXG4gICAgICovXG4gICAgZGlzbWlzcyhkYXRhPzogYW55LCByb2xlPzogc3RyaW5nLCBpZD86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyhkYXRhLCByb2xlLCBpZCk7XG4gICAgfVxuXG59XG5cblxuIl19