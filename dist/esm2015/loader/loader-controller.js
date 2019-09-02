import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { waitTill } from "@co.mmons/js-utils/core";
import { PopoverController } from "@ionic/angular";
import { Loader } from "./loader";
let LoaderController = class LoaderController {
    constructor(popoverController) {
        this.popoverController = popoverController;
    }
    present(options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let loader;
            const loaderInstance = (instance) => loader = instance;
            const popover = yield this.popoverController.create({
                animated: false,
                cssClass: "ionx-popover-flex",
                backdropDismiss: false,
                keyboardClose: false,
                component: Loader,
                componentProps: {
                    instanceCallback: (loader) => loaderInstance(loader),
                    header: options.header,
                    message: options.message,
                    mode: options.mode || "spinner"
                }
            });
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
            yield waitTill(() => !!loader);
            return loader;
        });
    }
};
LoaderController = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [PopoverController])
], LoaderController);
export { LoaderController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy8iLCJzb3VyY2VzIjpbImxvYWRlci9sb2FkZXItY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUloQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUV6QixZQUFzQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUMxRCxDQUFDO0lBRUssT0FBTyxDQUFDLE9BQXNCOztZQUVoQyxJQUFJLE1BQWMsQ0FBQztZQUVuQixNQUFNLGNBQWMsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFFL0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDO2dCQUNoRCxRQUFRLEVBQUUsS0FBSztnQkFDZixRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixlQUFlLEVBQUUsS0FBSztnQkFDdEIsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLFNBQVMsRUFBRSxNQUFNO2dCQUNqQixjQUFjLEVBQUU7b0JBQ1osZ0JBQWdCLEVBQUUsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7b0JBQzVELE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtvQkFDdEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO29CQUN4QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksSUFBSSxTQUFTO2lCQUNsQzthQUNKLENBQUMsQ0FBQztZQUVILGdEQUFnRDtZQUNoRCxvREFBb0Q7WUFFcEQsNEVBQTRFO1lBQzVFLDRDQUE0QztZQUM1QyxzQ0FBc0M7WUFDdEMseUNBQXlDO1lBQ3pDLHdDQUF3QztZQUN4QyxpQ0FBaUM7WUFDakMsZ0NBQWdDO1lBQ2hDLG1DQUFtQztZQUNuQyxvQ0FBb0M7WUFDcEMsb0NBQW9DO1lBRXBDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUVsQixNQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFL0IsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztLQUFBO0NBRUosQ0FBQTtBQTlDWSxnQkFBZ0I7SUFENUIsVUFBVSxFQUFFOzZDQUdnQyxpQkFBaUI7R0FGakQsZ0JBQWdCLENBOEM1QjtTQTlDWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge3dhaXRUaWxsfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7UG9wb3ZlckNvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtMb2FkZXJ9IGZyb20gXCIuL2xvYWRlclwiO1xuaW1wb3J0IHtMb2FkZXJPcHRpb25zfSBmcm9tIFwiLi9sb2FkZXItb3B0aW9uc1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9hZGVyQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcG9wb3ZlckNvbnRyb2xsZXI6IFBvcG92ZXJDb250cm9sbGVyKSB7XG4gICAgfVxuXG4gICAgYXN5bmMgcHJlc2VudChvcHRpb25zOiBMb2FkZXJPcHRpb25zKSB7XG5cbiAgICAgICAgbGV0IGxvYWRlcjogTG9hZGVyO1xuXG4gICAgICAgIGNvbnN0IGxvYWRlckluc3RhbmNlID0gKGluc3RhbmNlOiBMb2FkZXIpID0+IGxvYWRlciA9IGluc3RhbmNlO1xuXG4gICAgICAgIGNvbnN0IHBvcG92ZXIgPSBhd2FpdCB0aGlzLnBvcG92ZXJDb250cm9sbGVyLmNyZWF0ZSh7XG4gICAgICAgICAgICBhbmltYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBjc3NDbGFzczogXCJpb254LXBvcG92ZXItZmxleFwiLFxuICAgICAgICAgICAgYmFja2Ryb3BEaXNtaXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGtleWJvYXJkQ2xvc2U6IGZhbHNlLFxuICAgICAgICAgICAgY29tcG9uZW50OiBMb2FkZXIsXG4gICAgICAgICAgICBjb21wb25lbnRQcm9wczoge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlQ2FsbGJhY2s6IChsb2FkZXI6IExvYWRlcikgPT4gbG9hZGVySW5zdGFuY2UobG9hZGVyKSxcbiAgICAgICAgICAgICAgICBoZWFkZXI6IG9wdGlvbnMuaGVhZGVyLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG9wdGlvbnMubWVzc2FnZSxcbiAgICAgICAgICAgICAgICBtb2RlOiBvcHRpb25zLm1vZGUgfHwgXCJzcGlubmVyXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcG9wb3Zlci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0td2lkdGhcIiwgXCIxMDAlXCIpO1xuICAgICAgICAvLyBwb3BvdmVyLnN0eWxlLnNldFByb3BlcnR5KFwiLS1tYXhIZWlnaHRcIiwgXCIxMDAlXCIpO1xuXG4gICAgICAgIC8vIGNvbnN0IGNvbnRlbnQgPSBwb3BvdmVyLnF1ZXJ5U2VsZWN0b3IoXCIucG9wb3Zlci1jb250ZW50XCIpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLmJhY2tncm91bmQgPSBcInRyYW5zcGFyZW50XCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCIwcHhcIjtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS5sZWZ0ID0gXCIwcHggIWltcG9ydGFudFwiO1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLnRvcCA9IFwiMHB4ICFpbXBvcnRhbnRcIjtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLm1heFdpZHRoID0gXCJub25lXCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gXCJub25lXCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUuYm94U2hhZG93ID0gXCJub25lXCI7XG5cbiAgICAgICAgcG9wb3Zlci5wcmVzZW50KCk7XG5cbiAgICAgICAgYXdhaXQgd2FpdFRpbGwoKCkgPT4gISFsb2FkZXIpO1xuXG4gICAgICAgIHJldHVybiBsb2FkZXI7XG4gICAgfVxuXG59XG5cblxuIl19