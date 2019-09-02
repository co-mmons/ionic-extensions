import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { waitTill } from "@co.mmons/js-utils/core";
import { PopoverController } from "@ionic/angular";
import { Loader } from "./loader";
var LoaderController = /** @class */ (function () {
    function LoaderController(popoverController) {
        this.popoverController = popoverController;
    }
    LoaderController.prototype.present = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loader, loaderInstance, popover;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loaderInstance = function (instance) { return loader = instance; };
                        return [4 /*yield*/, this.popoverController.create({
                                animated: false,
                                cssClass: "ionx-popover-flex",
                                backdropDismiss: false,
                                keyboardClose: false,
                                component: Loader,
                                componentProps: {
                                    instanceCallback: function (loader) { return loaderInstance(loader); },
                                    header: options.header,
                                    message: options.message,
                                    mode: options.mode || "spinner"
                                }
                            })];
                    case 1:
                        popover = _a.sent();
                        // popover.style.setProperty("--width", "100%");
                        // popover.style.setProperty("--maxHeight", "100%");
                        // const content = popover.querySelector(".popover-content") as HTMLElement;
                        // content.style.background = "transparent";
                        // content.style.borderRadius = "0px";
                        // content.style.left = "0px !important";
                        // content.style.top = "0px !important";
                        // content.style.height = "100%";
                        // content.style.width = "100%";
                        // content.style.maxWidth = "none";
                        // content.style.maxHeight = "none";
                        // content.style.boxShadow = "none";
                        popover.present();
                        return [4 /*yield*/, waitTill(function () { return !!loader; })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, loader];
                }
            });
        });
    };
    LoaderController = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [PopoverController])
    ], LoaderController);
    return LoaderController;
}());
export { LoaderController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy8iLCJzb3VyY2VzIjpbImxvYWRlci9sb2FkZXItY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUloQztJQUVJLDBCQUFzQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUMxRCxDQUFDO0lBRUssa0NBQU8sR0FBYixVQUFjLE9BQXNCOzs7Ozs7d0JBSTFCLGNBQWMsR0FBRyxVQUFDLFFBQWdCLElBQUssT0FBQSxNQUFNLEdBQUcsUUFBUSxFQUFqQixDQUFpQixDQUFDO3dCQUUvQyxxQkFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDO2dDQUNoRCxRQUFRLEVBQUUsS0FBSztnQ0FDZixRQUFRLEVBQUUsbUJBQW1CO2dDQUM3QixlQUFlLEVBQUUsS0FBSztnQ0FDdEIsYUFBYSxFQUFFLEtBQUs7Z0NBQ3BCLFNBQVMsRUFBRSxNQUFNO2dDQUNqQixjQUFjLEVBQUU7b0NBQ1osZ0JBQWdCLEVBQUUsVUFBQyxNQUFjLElBQUssT0FBQSxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQXRCLENBQXNCO29DQUM1RCxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07b0NBQ3RCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztvQ0FDeEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLElBQUksU0FBUztpQ0FDbEM7NkJBQ0osQ0FBQyxFQUFBOzt3QkFaSSxPQUFPLEdBQUcsU0FZZDt3QkFFRixnREFBZ0Q7d0JBQ2hELG9EQUFvRDt3QkFFcEQsNEVBQTRFO3dCQUM1RSw0Q0FBNEM7d0JBQzVDLHNDQUFzQzt3QkFDdEMseUNBQXlDO3dCQUN6Qyx3Q0FBd0M7d0JBQ3hDLGlDQUFpQzt3QkFDakMsZ0NBQWdDO3dCQUNoQyxtQ0FBbUM7d0JBQ25DLG9DQUFvQzt3QkFDcEMsb0NBQW9DO3dCQUVwQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBRWxCLHFCQUFNLFFBQVEsQ0FBQyxjQUFNLE9BQUEsQ0FBQyxDQUFDLE1BQU0sRUFBUixDQUFRLENBQUMsRUFBQTs7d0JBQTlCLFNBQThCLENBQUM7d0JBRS9CLHNCQUFPLE1BQU0sRUFBQzs7OztLQUNqQjtJQTVDUSxnQkFBZ0I7UUFENUIsVUFBVSxFQUFFO2lEQUdnQyxpQkFBaUI7T0FGakQsZ0JBQWdCLENBOEM1QjtJQUFELHVCQUFDO0NBQUEsQUE5Q0QsSUE4Q0M7U0E5Q1ksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHt3YWl0VGlsbH0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5pbXBvcnQge1BvcG92ZXJDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7TG9hZGVyfSBmcm9tIFwiLi9sb2FkZXJcIjtcbmltcG9ydCB7TG9hZGVyT3B0aW9uc30gZnJvbSBcIi4vbG9hZGVyLW9wdGlvbnNcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvYWRlckNvbnRyb2xsZXIge1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIHBvcG92ZXJDb250cm9sbGVyOiBQb3BvdmVyQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIGFzeW5jIHByZXNlbnQob3B0aW9uczogTG9hZGVyT3B0aW9ucykge1xuXG4gICAgICAgIGxldCBsb2FkZXI6IExvYWRlcjtcblxuICAgICAgICBjb25zdCBsb2FkZXJJbnN0YW5jZSA9IChpbnN0YW5jZTogTG9hZGVyKSA9PiBsb2FkZXIgPSBpbnN0YW5jZTtcblxuICAgICAgICBjb25zdCBwb3BvdmVyID0gYXdhaXQgdGhpcy5wb3BvdmVyQ29udHJvbGxlci5jcmVhdGUoe1xuICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY3NzQ2xhc3M6IFwiaW9ueC1wb3BvdmVyLWZsZXhcIixcbiAgICAgICAgICAgIGJhY2tkcm9wRGlzbWlzczogZmFsc2UsXG4gICAgICAgICAgICBrZXlib2FyZENsb3NlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbXBvbmVudDogTG9hZGVyLFxuICAgICAgICAgICAgY29tcG9uZW50UHJvcHM6IHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUNhbGxiYWNrOiAobG9hZGVyOiBMb2FkZXIpID0+IGxvYWRlckluc3RhbmNlKGxvYWRlciksXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBvcHRpb25zLmhlYWRlcixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBvcHRpb25zLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgbW9kZTogb3B0aW9ucy5tb2RlIHx8IFwic3Bpbm5lclwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHBvcG92ZXIuc3R5bGUuc2V0UHJvcGVydHkoXCItLXdpZHRoXCIsIFwiMTAwJVwiKTtcbiAgICAgICAgLy8gcG9wb3Zlci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tbWF4SGVpZ2h0XCIsIFwiMTAwJVwiKTtcblxuICAgICAgICAvLyBjb25zdCBjb250ZW50ID0gcG9wb3Zlci5xdWVyeVNlbGVjdG9yKFwiLnBvcG92ZXItY29udGVudFwiKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiMHB4XCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUubGVmdCA9IFwiMHB4ICFpbXBvcnRhbnRcIjtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS50b3AgPSBcIjBweCAhaW1wb3J0YW50XCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS5tYXhXaWR0aCA9IFwibm9uZVwiO1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IFwibm9uZVwiO1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLmJveFNoYWRvdyA9IFwibm9uZVwiO1xuXG4gICAgICAgIHBvcG92ZXIucHJlc2VudCgpO1xuXG4gICAgICAgIGF3YWl0IHdhaXRUaWxsKCgpID0+ICEhbG9hZGVyKTtcblxuICAgICAgICByZXR1cm4gbG9hZGVyO1xuICAgIH1cblxufVxuXG5cbiJdfQ==