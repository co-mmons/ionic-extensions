import { __awaiter, __decorate, __generator } from "tslib";
import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Dialog } from "./dialog";
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
                            body: options.body,
                            header: options.header,
                            message: options.message,
                            buttons: options.buttons
                        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9kaWFsb2cvIiwic291cmNlcyI6WyJkaWFsb2ctY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUloQztJQUVJLDBCQUFzQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFDdEQsQ0FBQztJQUVLLGlDQUFNLEdBQVosVUFBYSxPQUFzQjs7O2dCQUUvQixzQkFBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUU7d0JBQzFELFNBQVMsRUFBRSxNQUFNO3dCQUNqQixjQUFjLEVBQUU7NEJBQ1osSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJOzRCQUNsQixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07NEJBQ3RCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTzs0QkFDeEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO3lCQUMzQjtxQkFDSixDQUFDLENBQUMsRUFBQzs7O0tBQ1A7SUFFRDs7T0FFRztJQUNILGtDQUFPLEdBQVAsVUFBUSxJQUFVLEVBQUUsSUFBYSxFQUFFLEVBQVc7UUFDMUMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELENBQUM7O2dCQXJCc0MsZUFBZTs7SUFGN0MsZ0JBQWdCO1FBRDVCLFVBQVUsRUFBRTtPQUNBLGdCQUFnQixDQXlCNUI7SUFBRCx1QkFBQztDQUFBLEFBekJELElBeUJDO1NBekJZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7TW9kYWxDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7RGlhbG9nfSBmcm9tIFwiLi9kaWFsb2dcIjtcbmltcG9ydCB7RGlhbG9nT3B0aW9uc30gZnJvbSBcIi4vZGlhbG9nLW9wdGlvbnNcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERpYWxvZ0NvbnRyb2xsZXIge1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyKSB7XG4gICAgfVxuXG4gICAgYXN5bmMgY3JlYXRlKG9wdGlvbnM6IERpYWxvZ09wdGlvbnMpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbENvbnRyb2xsZXIuY3JlYXRlKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHtcbiAgICAgICAgICAgIGNvbXBvbmVudDogRGlhbG9nLFxuICAgICAgICAgICAgY29tcG9uZW50UHJvcHM6IHtcbiAgICAgICAgICAgICAgICBib2R5OiBvcHRpb25zLmJvZHksXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBvcHRpb25zLmhlYWRlcixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBvcHRpb25zLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgYnV0dG9uczogb3B0aW9ucy5idXR0b25zXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGBpZGAgaXMgbm90IHByb3ZpZGVkLCBpdCBkaXNtaXNzZXMgdGhlIHRvcCBvdmVybGF5LlxuICAgICAqL1xuICAgIGRpc21pc3MoZGF0YT86IGFueSwgcm9sZT86IHN0cmluZywgaWQ/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoZGF0YSwgcm9sZSwgaWQpO1xuICAgIH1cblxufVxuXG5cbiJdfQ==