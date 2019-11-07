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
LoaderController.ctorParameters = () => [
    { type: PopoverController }
];
LoaderController = tslib_1.__decorate([
    Injectable()
], LoaderController);
export { LoaderController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9sb2FkZXIvIiwic291cmNlcyI6WyJsb2FkZXItY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUloQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUV6QixZQUFzQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUMxRCxDQUFDO0lBRUssT0FBTyxDQUFDLE9BQXNCOztZQUVoQyxJQUFJLE1BQWMsQ0FBQztZQUVuQixNQUFNLGNBQWMsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFFL0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDO2dCQUNoRCxRQUFRLEVBQUUsS0FBSztnQkFDZixRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixlQUFlLEVBQUUsS0FBSztnQkFDdEIsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLFNBQVMsRUFBRSxNQUFNO2dCQUNqQixjQUFjLEVBQUU7b0JBQ1osZ0JBQWdCLEVBQUUsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7b0JBQzVELE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtvQkFDdEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO29CQUN4QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksSUFBSSxTQUFTO2lCQUNsQzthQUNKLENBQUMsQ0FBQztZQUVILGdEQUFnRDtZQUNoRCxvREFBb0Q7WUFFcEQsNEVBQTRFO1lBQzVFLDRDQUE0QztZQUM1QyxzQ0FBc0M7WUFDdEMseUNBQXlDO1lBQ3pDLHdDQUF3QztZQUN4QyxpQ0FBaUM7WUFDakMsZ0NBQWdDO1lBQ2hDLG1DQUFtQztZQUNuQyxvQ0FBb0M7WUFDcEMsb0NBQW9DO1lBRXBDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUVsQixNQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFL0IsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztLQUFBO0NBRUosQ0FBQTs7WUE1QzRDLGlCQUFpQjs7QUFGakQsZ0JBQWdCO0lBRDVCLFVBQVUsRUFBRTtHQUNBLGdCQUFnQixDQThDNUI7U0E5Q1ksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHt3YWl0VGlsbH0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5pbXBvcnQge1BvcG92ZXJDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7TG9hZGVyfSBmcm9tIFwiLi9sb2FkZXJcIjtcbmltcG9ydCB7TG9hZGVyT3B0aW9uc30gZnJvbSBcIi4vbG9hZGVyLW9wdGlvbnNcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvYWRlckNvbnRyb2xsZXIge1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIHBvcG92ZXJDb250cm9sbGVyOiBQb3BvdmVyQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIGFzeW5jIHByZXNlbnQob3B0aW9uczogTG9hZGVyT3B0aW9ucykge1xuXG4gICAgICAgIGxldCBsb2FkZXI6IExvYWRlcjtcblxuICAgICAgICBjb25zdCBsb2FkZXJJbnN0YW5jZSA9IChpbnN0YW5jZTogTG9hZGVyKSA9PiBsb2FkZXIgPSBpbnN0YW5jZTtcblxuICAgICAgICBjb25zdCBwb3BvdmVyID0gYXdhaXQgdGhpcy5wb3BvdmVyQ29udHJvbGxlci5jcmVhdGUoe1xuICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY3NzQ2xhc3M6IFwiaW9ueC1wb3BvdmVyLWZsZXhcIixcbiAgICAgICAgICAgIGJhY2tkcm9wRGlzbWlzczogZmFsc2UsXG4gICAgICAgICAgICBrZXlib2FyZENsb3NlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbXBvbmVudDogTG9hZGVyLFxuICAgICAgICAgICAgY29tcG9uZW50UHJvcHM6IHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUNhbGxiYWNrOiAobG9hZGVyOiBMb2FkZXIpID0+IGxvYWRlckluc3RhbmNlKGxvYWRlciksXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBvcHRpb25zLmhlYWRlcixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBvcHRpb25zLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgbW9kZTogb3B0aW9ucy5tb2RlIHx8IFwic3Bpbm5lclwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHBvcG92ZXIuc3R5bGUuc2V0UHJvcGVydHkoXCItLXdpZHRoXCIsIFwiMTAwJVwiKTtcbiAgICAgICAgLy8gcG9wb3Zlci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tbWF4SGVpZ2h0XCIsIFwiMTAwJVwiKTtcblxuICAgICAgICAvLyBjb25zdCBjb250ZW50ID0gcG9wb3Zlci5xdWVyeVNlbGVjdG9yKFwiLnBvcG92ZXItY29udGVudFwiKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiMHB4XCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUubGVmdCA9IFwiMHB4ICFpbXBvcnRhbnRcIjtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS50b3AgPSBcIjBweCAhaW1wb3J0YW50XCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS5tYXhXaWR0aCA9IFwibm9uZVwiO1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IFwibm9uZVwiO1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLmJveFNoYWRvdyA9IFwibm9uZVwiO1xuXG4gICAgICAgIHBvcG92ZXIucHJlc2VudCgpO1xuXG4gICAgICAgIGF3YWl0IHdhaXRUaWxsKCgpID0+ICEhbG9hZGVyKTtcblxuICAgICAgICByZXR1cm4gbG9hZGVyO1xuICAgIH1cblxufVxuXG5cbiJdfQ==