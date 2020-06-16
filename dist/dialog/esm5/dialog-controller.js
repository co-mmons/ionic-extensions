import { __awaiter, __decorate, __generator } from "tslib";
import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { createAnimation } from "@ionic/core/";
import { Dialog } from "./dialog";
/**
 * Md Modal Leave Animation
 */
function leaveAnimation(baseEl) {
    var baseAnimation = createAnimation();
    var backdropAnimation = createAnimation();
    var wrapperAnimation = createAnimation();
    var wrapperEl = baseEl.querySelector('.modal-wrapper');
    backdropAnimation
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', 'var(--backdrop-opacity)', 0.0);
    wrapperAnimation
        .addElement(wrapperEl)
        .keyframes([
        { offset: 0, opacity: 0.99, transform: 'translateY(0px)' },
        { offset: 1, opacity: 0, transform: 'translateY(40px)' }
    ]);
    return baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.47,0,0.745,0.715)')
        .duration(200)
        .addAnimation([backdropAnimation, wrapperAnimation]);
}
;
var DialogController = /** @class */ (function () {
    function DialogController(modalController) {
        this.modalController = modalController;
    }
    DialogController.prototype.create = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.modalController.create(Object.assign({}, options, {
                        component: Dialog,
                        componentProps: {
                            component: options.component,
                            header: options.header,
                            message: options.message,
                            buttons: options.buttons,
                            width: options.width
                        },
                        leaveAnimation: leaveAnimation
                    }))];
            });
        });
    };
    /**
     * When `id` is not provided, it dismisses the top overlay.
     */
    DialogController.prototype.dismiss = function (data, role, id) {
        return this.modalController.dismiss(data, role, id);
    };
    DialogController.ctorParameters = function () { return [
        { type: ModalController }
    ]; };
    DialogController = __decorate([
        Injectable()
    ], DialogController);
    return DialogController;
}());
export { DialogController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9kaWFsb2cvIiwic291cmNlcyI6WyJkaWFsb2ctY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUM3QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBR2hDOztHQUVHO0FBQ0gsU0FBUyxjQUFjLENBQUUsTUFBbUI7SUFDeEMsSUFBTSxhQUFhLEdBQUcsZUFBZSxFQUFFLENBQUM7SUFDeEMsSUFBTSxpQkFBaUIsR0FBRyxlQUFlLEVBQUUsQ0FBQztJQUM1QyxJQUFNLGdCQUFnQixHQUFHLGVBQWUsRUFBRSxDQUFDO0lBQzNDLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUUsQ0FBQztJQUUxRCxpQkFBaUI7U0FDWixVQUFVLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUUsQ0FBQztTQUNqRCxNQUFNLENBQUMsU0FBUyxFQUFFLHlCQUF5QixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRXZELGdCQUFnQjtTQUNYLFVBQVUsQ0FBQyxTQUFTLENBQUM7U0FDckIsU0FBUyxDQUFDO1FBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFO1FBQzFELEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRTtLQUMzRCxDQUFDLENBQUM7SUFFUCxPQUFPLGFBQWE7U0FDZixVQUFVLENBQUMsTUFBTSxDQUFDO1NBQ2xCLE1BQU0sQ0FBQyxrQ0FBa0MsQ0FBQztTQUMxQyxRQUFRLENBQUMsR0FBRyxDQUFDO1NBQ2IsWUFBWSxDQUFDLENBQUMsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0FBQzdELENBQUM7QUFBQSxDQUFDO0FBR0Y7SUFFSSwwQkFBc0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQ3RELENBQUM7SUFFSyxpQ0FBTSxHQUFaLFVBQWEsT0FBc0I7OztnQkFFL0Isc0JBQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFO3dCQUMxRCxTQUFTLEVBQUUsTUFBTTt3QkFDakIsY0FBYyxFQUFFOzRCQUNaLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUzs0QkFDNUIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNOzRCQUN0QixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87NEJBQ3hCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTzs0QkFDeEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO3lCQUN2Qjt3QkFDRCxjQUFjLGdCQUFBO3FCQUNqQixDQUFDLENBQUMsRUFBQzs7O0tBQ1A7SUFFRDs7T0FFRztJQUNILGtDQUFPLEdBQVAsVUFBUSxJQUFVLEVBQUUsSUFBYSxFQUFFLEVBQVc7UUFDMUMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELENBQUM7O2dCQXZCc0MsZUFBZTs7SUFGN0MsZ0JBQWdCO1FBRDVCLFVBQVUsRUFBRTtPQUNBLGdCQUFnQixDQTJCNUI7SUFBRCx1QkFBQztDQUFBLEFBM0JELElBMkJDO1NBM0JZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7TW9kYWxDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7Y3JlYXRlQW5pbWF0aW9ufSBmcm9tIFwiQGlvbmljL2NvcmUvXCI7XG5pbXBvcnQge0RpYWxvZ30gZnJvbSBcIi4vZGlhbG9nXCI7XG5pbXBvcnQge0RpYWxvZ09wdGlvbnN9IGZyb20gXCIuL2RpYWxvZy1vcHRpb25zXCI7XG5cbi8qKlxuICogTWQgTW9kYWwgTGVhdmUgQW5pbWF0aW9uXG4gKi9cbmZ1bmN0aW9uIGxlYXZlQW5pbWF0aW9uIChiYXNlRWw6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgYmFzZUFuaW1hdGlvbiA9IGNyZWF0ZUFuaW1hdGlvbigpO1xuICAgIGNvbnN0IGJhY2tkcm9wQW5pbWF0aW9uID0gY3JlYXRlQW5pbWF0aW9uKCk7XG4gICAgY29uc3Qgd3JhcHBlckFuaW1hdGlvbiA9IGNyZWF0ZUFuaW1hdGlvbigpO1xuICAgIGNvbnN0IHdyYXBwZXJFbCA9IGJhc2VFbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtd3JhcHBlcicpITtcblxuICAgIGJhY2tkcm9wQW5pbWF0aW9uXG4gICAgICAgIC5hZGRFbGVtZW50KGJhc2VFbC5xdWVyeVNlbGVjdG9yKCdpb24tYmFja2Ryb3AnKSEpXG4gICAgICAgIC5mcm9tVG8oJ29wYWNpdHknLCAndmFyKC0tYmFja2Ryb3Atb3BhY2l0eSknLCAwLjApO1xuXG4gICAgd3JhcHBlckFuaW1hdGlvblxuICAgICAgICAuYWRkRWxlbWVudCh3cmFwcGVyRWwpXG4gICAgICAgIC5rZXlmcmFtZXMoW1xuICAgICAgICAgICAgeyBvZmZzZXQ6IDAsIG9wYWNpdHk6IDAuOTksIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMHB4KScgfSxcbiAgICAgICAgICAgIHsgb2Zmc2V0OiAxLCBvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDQwcHgpJyB9XG4gICAgICAgIF0pO1xuXG4gICAgcmV0dXJuIGJhc2VBbmltYXRpb25cbiAgICAgICAgLmFkZEVsZW1lbnQoYmFzZUVsKVxuICAgICAgICAuZWFzaW5nKCdjdWJpYy1iZXppZXIoMC40NywwLDAuNzQ1LDAuNzE1KScpXG4gICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgIC5hZGRBbmltYXRpb24oW2JhY2tkcm9wQW5pbWF0aW9uLCB3cmFwcGVyQW5pbWF0aW9uXSk7XG59O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGlhbG9nQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIpIHtcbiAgICB9XG5cbiAgICBhc3luYyBjcmVhdGUob3B0aW9uczogRGlhbG9nT3B0aW9ucykge1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsQ29udHJvbGxlci5jcmVhdGUoT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge1xuICAgICAgICAgICAgY29tcG9uZW50OiBEaWFsb2csXG4gICAgICAgICAgICBjb21wb25lbnRQcm9wczoge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogb3B0aW9ucy5jb21wb25lbnQsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBvcHRpb25zLmhlYWRlcixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBvcHRpb25zLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgYnV0dG9uczogb3B0aW9ucy5idXR0b25zLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBvcHRpb25zLndpZHRoXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVhdmVBbmltYXRpb25cbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gYGlkYCBpcyBub3QgcHJvdmlkZWQsIGl0IGRpc21pc3NlcyB0aGUgdG9wIG92ZXJsYXkuXG4gICAgICovXG4gICAgZGlzbWlzcyhkYXRhPzogYW55LCByb2xlPzogc3RyaW5nLCBpZD86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyhkYXRhLCByb2xlLCBpZCk7XG4gICAgfVxuXG59XG5cblxuIl19