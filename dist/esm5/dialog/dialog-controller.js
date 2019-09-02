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
    DialogController = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ModalController])
    ], DialogController);
    return DialogController;
}());
export { DialogController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy8iLCJzb3VyY2VzIjpbImRpYWxvZy9kaWFsb2ctY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUloQztJQUVJLDBCQUFzQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFDdEQsQ0FBQztJQUVLLGlDQUFNLEdBQVosVUFBYSxPQUFzQjs7O2dCQUUvQixzQkFBTyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUU7d0JBQzFELFNBQVMsRUFBRSxNQUFNO3dCQUNqQixjQUFjLEVBQUU7NEJBQ1osTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNOzRCQUN0QixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87NEJBQ3hCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTzt5QkFDM0I7cUJBQ0osQ0FBQyxDQUFDLEVBQUM7OztLQUNQO0lBRUQ7O09BRUc7SUFDSCxrQ0FBTyxHQUFQLFVBQVEsSUFBVSxFQUFFLElBQWEsRUFBRSxFQUFXO1FBQzFDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBdEJRLGdCQUFnQjtRQUQ1QixVQUFVLEVBQUU7aURBRzhCLGVBQWU7T0FGN0MsZ0JBQWdCLENBd0I1QjtJQUFELHVCQUFDO0NBQUEsQUF4QkQsSUF3QkM7U0F4QlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtEaWFsb2d9IGZyb20gXCIuL2RpYWxvZ1wiO1xuaW1wb3J0IHtEaWFsb2dPcHRpb25zfSBmcm9tIFwiLi9kaWFsb2ctb3B0aW9uc1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGlhbG9nQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIpIHtcbiAgICB9XG5cbiAgICBhc3luYyBjcmVhdGUob3B0aW9uczogRGlhbG9nT3B0aW9ucykge1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsQ29udHJvbGxlci5jcmVhdGUoT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge1xuICAgICAgICAgICAgY29tcG9uZW50OiBEaWFsb2csXG4gICAgICAgICAgICBjb21wb25lbnRQcm9wczoge1xuICAgICAgICAgICAgICAgIGhlYWRlcjogb3B0aW9ucy5oZWFkZXIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogb3B0aW9ucy5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IG9wdGlvbnMuYnV0dG9uc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiBgaWRgIGlzIG5vdCBwcm92aWRlZCwgaXQgZGlzbWlzc2VzIHRoZSB0b3Agb3ZlcmxheS5cbiAgICAgKi9cbiAgICBkaXNtaXNzKGRhdGE/OiBhbnksIHJvbGU/OiBzdHJpbmcsIGlkPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKGRhdGEsIHJvbGUsIGlkKTtcbiAgICB9XG5cbn1cblxuXG4iXX0=