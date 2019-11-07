import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Dialog } from "./dialog";
var DialogController = /** @class */ (function () {
    function DialogController(modalController) {
        this.modalController = modalController;
    }
    DialogController.prototype.create = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.modalController.create(Object.assign({}, options, {
                        component: Dialog,
                        componentProps: {
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
    DialogController = tslib_1.__decorate([
        Injectable()
    ], DialogController);
    return DialogController;
}());
export { DialogController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9kaWFsb2cvIiwic291cmNlcyI6WyJkaWFsb2ctY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUloQztJQUVJLDBCQUFzQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFDdEQsQ0FBQztJQUVLLGlDQUFNLEdBQVosVUFBYSxPQUFzQjs7O2dCQUUvQixzQkFBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUU7d0JBQzFELFNBQVMsRUFBRSxNQUFNO3dCQUNqQixjQUFjLEVBQUU7NEJBQ1osTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNOzRCQUN0QixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87NEJBQ3hCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTzt5QkFDM0I7cUJBQ0osQ0FBQyxDQUFDLEVBQUM7OztLQUNQO0lBRUQ7O09BRUc7SUFDSCxrQ0FBTyxHQUFQLFVBQVEsSUFBVSxFQUFFLElBQWEsRUFBRSxFQUFXO1FBQzFDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN4RCxDQUFDOztnQkFwQnNDLGVBQWU7O0lBRjdDLGdCQUFnQjtRQUQ1QixVQUFVLEVBQUU7T0FDQSxnQkFBZ0IsQ0F3QjVCO0lBQUQsdUJBQUM7Q0FBQSxBQXhCRCxJQXdCQztTQXhCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge01vZGFsQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge0RpYWxvZ30gZnJvbSBcIi4vZGlhbG9nXCI7XG5pbXBvcnQge0RpYWxvZ09wdGlvbnN9IGZyb20gXCIuL2RpYWxvZy1vcHRpb25zXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEaWFsb2dDb250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIGFzeW5jIGNyZWF0ZShvcHRpb25zOiBEaWFsb2dPcHRpb25zKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZShPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7XG4gICAgICAgICAgICBjb21wb25lbnQ6IERpYWxvZyxcbiAgICAgICAgICAgIGNvbXBvbmVudFByb3BzOiB7XG4gICAgICAgICAgICAgICAgaGVhZGVyOiBvcHRpb25zLmhlYWRlcixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBvcHRpb25zLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgYnV0dG9uczogb3B0aW9ucy5idXR0b25zXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGBpZGAgaXMgbm90IHByb3ZpZGVkLCBpdCBkaXNtaXNzZXMgdGhlIHRvcCBvdmVybGF5LlxuICAgICAqL1xuICAgIGRpc21pc3MoZGF0YT86IGFueSwgcm9sZT86IHN0cmluZywgaWQ/OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoZGF0YSwgcm9sZSwgaWQpO1xuICAgIH1cblxufVxuXG5cbiJdfQ==