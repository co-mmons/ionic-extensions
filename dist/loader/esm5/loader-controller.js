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
                                componentProps: Object.assign({}, options, {
                                    instanceCallback: function (loader) { return loaderInstance(loader); }
                                })
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
    LoaderController.ctorParameters = function () { return [
        { type: PopoverController }
    ]; };
    LoaderController = tslib_1.__decorate([
        Injectable()
    ], LoaderController);
    return LoaderController;
}());
export { LoaderController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9sb2FkZXIvIiwic291cmNlcyI6WyJsb2FkZXItY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUloQztJQUVJLDBCQUFzQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUMxRCxDQUFDO0lBRUssa0NBQU8sR0FBYixVQUFjLE9BQXNCOzs7Ozs7d0JBSTFCLGNBQWMsR0FBRyxVQUFDLFFBQWdCLElBQUssT0FBQSxNQUFNLEdBQUcsUUFBUSxFQUFqQixDQUFpQixDQUFDO3dCQUUvQyxxQkFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDO2dDQUNoRCxRQUFRLEVBQUUsS0FBSztnQ0FDZixRQUFRLEVBQUUsbUJBQW1CO2dDQUM3QixlQUFlLEVBQUUsS0FBSztnQ0FDdEIsYUFBYSxFQUFFLEtBQUs7Z0NBQ3BCLFNBQVMsRUFBRSxNQUFNO2dDQUNqQixjQUFjLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFO29DQUN2QyxnQkFBZ0IsRUFBRSxVQUFDLE1BQWMsSUFBSyxPQUFBLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBdEIsQ0FBc0I7aUNBQy9ELENBQUM7NkJBQ0wsQ0FBQyxFQUFBOzt3QkFUSSxPQUFPLEdBQUcsU0FTZDt3QkFFRixnREFBZ0Q7d0JBQ2hELG9EQUFvRDt3QkFFcEQsNEVBQTRFO3dCQUM1RSw0Q0FBNEM7d0JBQzVDLHNDQUFzQzt3QkFDdEMseUNBQXlDO3dCQUN6Qyx3Q0FBd0M7d0JBQ3hDLGlDQUFpQzt3QkFDakMsZ0NBQWdDO3dCQUNoQyxtQ0FBbUM7d0JBQ25DLG9DQUFvQzt3QkFDcEMsb0NBQW9DO3dCQUVwQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBRWxCLHFCQUFNLFFBQVEsQ0FBQyxjQUFNLE9BQUEsQ0FBQyxDQUFDLE1BQU0sRUFBUixDQUFRLENBQUMsRUFBQTs7d0JBQTlCLFNBQThCLENBQUM7d0JBRS9CLHNCQUFPLE1BQU0sRUFBQzs7OztLQUNqQjs7Z0JBdkN3QyxpQkFBaUI7O0lBRmpELGdCQUFnQjtRQUQ1QixVQUFVLEVBQUU7T0FDQSxnQkFBZ0IsQ0EyQzVCO0lBQUQsdUJBQUM7Q0FBQSxBQTNDRCxJQTJDQztTQTNDWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge3dhaXRUaWxsfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7UG9wb3ZlckNvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtMb2FkZXJ9IGZyb20gXCIuL2xvYWRlclwiO1xuaW1wb3J0IHtMb2FkZXJPcHRpb25zfSBmcm9tIFwiLi9sb2FkZXItb3B0aW9uc1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9hZGVyQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcG9wb3ZlckNvbnRyb2xsZXI6IFBvcG92ZXJDb250cm9sbGVyKSB7XG4gICAgfVxuXG4gICAgYXN5bmMgcHJlc2VudChvcHRpb25zOiBMb2FkZXJPcHRpb25zKSB7XG5cbiAgICAgICAgbGV0IGxvYWRlcjogTG9hZGVyO1xuXG4gICAgICAgIGNvbnN0IGxvYWRlckluc3RhbmNlID0gKGluc3RhbmNlOiBMb2FkZXIpID0+IGxvYWRlciA9IGluc3RhbmNlO1xuXG4gICAgICAgIGNvbnN0IHBvcG92ZXIgPSBhd2FpdCB0aGlzLnBvcG92ZXJDb250cm9sbGVyLmNyZWF0ZSh7XG4gICAgICAgICAgICBhbmltYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBjc3NDbGFzczogXCJpb254LXBvcG92ZXItZmxleFwiLFxuICAgICAgICAgICAgYmFja2Ryb3BEaXNtaXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGtleWJvYXJkQ2xvc2U6IGZhbHNlLFxuICAgICAgICAgICAgY29tcG9uZW50OiBMb2FkZXIsXG4gICAgICAgICAgICBjb21wb25lbnRQcm9wczogT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlQ2FsbGJhY2s6IChsb2FkZXI6IExvYWRlcikgPT4gbG9hZGVySW5zdGFuY2UobG9hZGVyKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcG9wb3Zlci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0td2lkdGhcIiwgXCIxMDAlXCIpO1xuICAgICAgICAvLyBwb3BvdmVyLnN0eWxlLnNldFByb3BlcnR5KFwiLS1tYXhIZWlnaHRcIiwgXCIxMDAlXCIpO1xuXG4gICAgICAgIC8vIGNvbnN0IGNvbnRlbnQgPSBwb3BvdmVyLnF1ZXJ5U2VsZWN0b3IoXCIucG9wb3Zlci1jb250ZW50XCIpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLmJhY2tncm91bmQgPSBcInRyYW5zcGFyZW50XCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCIwcHhcIjtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS5sZWZ0ID0gXCIwcHggIWltcG9ydGFudFwiO1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLnRvcCA9IFwiMHB4ICFpbXBvcnRhbnRcIjtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLm1heFdpZHRoID0gXCJub25lXCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gXCJub25lXCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUuYm94U2hhZG93ID0gXCJub25lXCI7XG5cbiAgICAgICAgcG9wb3Zlci5wcmVzZW50KCk7XG5cbiAgICAgICAgYXdhaXQgd2FpdFRpbGwoKCkgPT4gISFsb2FkZXIpO1xuXG4gICAgICAgIHJldHVybiBsb2FkZXI7XG4gICAgfVxuXG59XG5cblxuIl19