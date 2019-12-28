import { __awaiter, __decorate, __generator } from "tslib";
import { Injectable } from "@angular/core";
import { waitTill } from "@co.mmons/js-utils/core";
import { PopoverController } from "@ionic/angular";
import { Loader } from "./loader";
var LoaderController = /** @class */ (function () {
    function LoaderController(popoverController) {
        this.popoverController = popoverController;
    }
    LoaderController.prototype.present = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var loader, loaderInstance, popover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loaderInstance = function (instance) { return loader = instance; };
                        return [4 /*yield*/, this.popoverController.create({
                                animated: false,
                                cssClass: "ionx-popover-flex",
                                backdropDismiss: false,
                                keyboardClose: false,
                                component: Loader,
                                componentProps: Object.assign({ mode: "spinner" }, options, {
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
    LoaderController = __decorate([
        Injectable()
    ], LoaderController);
    return LoaderController;
}());
export { LoaderController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9sb2FkZXIvIiwic291cmNlcyI6WyJsb2FkZXItY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUloQztJQUVJLDBCQUFzQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUMxRCxDQUFDO0lBRUssa0NBQU8sR0FBYixVQUFjLE9BQXNCOzs7Ozs7d0JBSTFCLGNBQWMsR0FBRyxVQUFDLFFBQWdCLElBQUssT0FBQSxNQUFNLEdBQUcsUUFBUSxFQUFqQixDQUFpQixDQUFDO3dCQUUvQyxxQkFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDO2dDQUNoRCxRQUFRLEVBQUUsS0FBSztnQ0FDZixRQUFRLEVBQUUsbUJBQW1CO2dDQUM3QixlQUFlLEVBQUUsS0FBSztnQ0FDdEIsYUFBYSxFQUFFLEtBQUs7Z0NBQ3BCLFNBQVMsRUFBRSxNQUFNO2dDQUNqQixjQUFjLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBRSxPQUFPLEVBQUU7b0NBQ3RELGdCQUFnQixFQUFFLFVBQUMsTUFBYyxJQUFLLE9BQUEsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUF0QixDQUFzQjtpQ0FDL0QsQ0FBQzs2QkFDTCxDQUFDLEVBQUE7O3dCQVRJLE9BQU8sR0FBRyxTQVNkO3dCQUVGLGdEQUFnRDt3QkFDaEQsb0RBQW9EO3dCQUVwRCw0RUFBNEU7d0JBQzVFLDRDQUE0Qzt3QkFDNUMsc0NBQXNDO3dCQUN0Qyx5Q0FBeUM7d0JBQ3pDLHdDQUF3Qzt3QkFDeEMsaUNBQWlDO3dCQUNqQyxnQ0FBZ0M7d0JBQ2hDLG1DQUFtQzt3QkFDbkMsb0NBQW9DO3dCQUNwQyxvQ0FBb0M7d0JBRXBDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFFbEIscUJBQU0sUUFBUSxDQUFDLGNBQU0sT0FBQSxDQUFDLENBQUMsTUFBTSxFQUFSLENBQVEsQ0FBQyxFQUFBOzt3QkFBOUIsU0FBOEIsQ0FBQzt3QkFFL0Isc0JBQU8sTUFBTSxFQUFDOzs7O0tBQ2pCOztnQkF2Q3dDLGlCQUFpQjs7SUFGakQsZ0JBQWdCO1FBRDVCLFVBQVUsRUFBRTtPQUNBLGdCQUFnQixDQTJDNUI7SUFBRCx1QkFBQztDQUFBLEFBM0NELElBMkNDO1NBM0NZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7d2FpdFRpbGx9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtQb3BvdmVyQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge0xvYWRlcn0gZnJvbSBcIi4vbG9hZGVyXCI7XG5pbXBvcnQge0xvYWRlck9wdGlvbnN9IGZyb20gXCIuL2xvYWRlci1vcHRpb25zXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2FkZXJDb250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBwb3BvdmVyQ29udHJvbGxlcjogUG9wb3ZlckNvbnRyb2xsZXIpIHtcbiAgICB9XG5cbiAgICBhc3luYyBwcmVzZW50KG9wdGlvbnM6IExvYWRlck9wdGlvbnMpIHtcblxuICAgICAgICBsZXQgbG9hZGVyOiBMb2FkZXI7XG5cbiAgICAgICAgY29uc3QgbG9hZGVySW5zdGFuY2UgPSAoaW5zdGFuY2U6IExvYWRlcikgPT4gbG9hZGVyID0gaW5zdGFuY2U7XG5cbiAgICAgICAgY29uc3QgcG9wb3ZlciA9IGF3YWl0IHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuY3JlYXRlKHtcbiAgICAgICAgICAgIGFuaW1hdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNzc0NsYXNzOiBcImlvbngtcG9wb3Zlci1mbGV4XCIsXG4gICAgICAgICAgICBiYWNrZHJvcERpc21pc3M6IGZhbHNlLFxuICAgICAgICAgICAga2V5Ym9hcmRDbG9zZTogZmFsc2UsXG4gICAgICAgICAgICBjb21wb25lbnQ6IExvYWRlcixcbiAgICAgICAgICAgIGNvbXBvbmVudFByb3BzOiBPYmplY3QuYXNzaWduKHttb2RlOiBcInNwaW5uZXJcIn0sIG9wdGlvbnMsIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUNhbGxiYWNrOiAobG9hZGVyOiBMb2FkZXIpID0+IGxvYWRlckluc3RhbmNlKGxvYWRlcilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHBvcG92ZXIuc3R5bGUuc2V0UHJvcGVydHkoXCItLXdpZHRoXCIsIFwiMTAwJVwiKTtcbiAgICAgICAgLy8gcG9wb3Zlci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tbWF4SGVpZ2h0XCIsIFwiMTAwJVwiKTtcblxuICAgICAgICAvLyBjb25zdCBjb250ZW50ID0gcG9wb3Zlci5xdWVyeVNlbGVjdG9yKFwiLnBvcG92ZXItY29udGVudFwiKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiMHB4XCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUubGVmdCA9IFwiMHB4ICFpbXBvcnRhbnRcIjtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS50b3AgPSBcIjBweCAhaW1wb3J0YW50XCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS5tYXhXaWR0aCA9IFwibm9uZVwiO1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IFwibm9uZVwiO1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLmJveFNoYWRvdyA9IFwibm9uZVwiO1xuXG4gICAgICAgIHBvcG92ZXIucHJlc2VudCgpO1xuXG4gICAgICAgIGF3YWl0IHdhaXRUaWxsKCgpID0+ICEhbG9hZGVyKTtcblxuICAgICAgICByZXR1cm4gbG9hZGVyO1xuICAgIH1cblxufVxuXG5cbiJdfQ==