import { __awaiter } from "tslib";
import { Injectable } from "@angular/core";
import { waitTill } from "@co.mmons/js-utils/core";
import { PopoverController } from "@ionic/angular";
import { Loader } from "./loader";
export class LoaderController {
    constructor(popoverController) {
        this.popoverController = popoverController;
    }
    present(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let loader;
            const loaderInstance = (instance) => loader = instance;
            const popover = yield this.popoverController.create({
                animated: false,
                cssClass: "ionx-popover-flex",
                backdropDismiss: false,
                keyboardClose: false,
                component: Loader,
                componentProps: Object.assign({ mode: "spinner" }, options, {
                    instanceCallback: (loader) => loaderInstance(loader)
                })
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
}
LoaderController.decorators = [
    { type: Injectable }
];
LoaderController.ctorParameters = () => [
    { type: PopoverController }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbG9hZGVyL2xvYWRlci1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBSWhDLE1BQU0sT0FBTyxnQkFBZ0I7SUFFekIsWUFBc0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFDMUQsQ0FBQztJQUVLLE9BQU8sQ0FBQyxPQUFzQjs7WUFFaEMsSUFBSSxNQUFjLENBQUM7WUFFbkIsTUFBTSxjQUFjLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUUsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1lBRS9ELE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztnQkFDaEQsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsZUFBZSxFQUFFLEtBQUs7Z0JBQ3RCLGFBQWEsRUFBRSxLQUFLO2dCQUNwQixTQUFTLEVBQUUsTUFBTTtnQkFDakIsY0FBYyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUUsT0FBTyxFQUFFO29CQUN0RCxnQkFBZ0IsRUFBRSxDQUFDLE1BQWMsRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztpQkFDL0QsQ0FBQzthQUNMLENBQUMsQ0FBQztZQUVILGdEQUFnRDtZQUNoRCxvREFBb0Q7WUFFcEQsNEVBQTRFO1lBQzVFLDRDQUE0QztZQUM1QyxzQ0FBc0M7WUFDdEMseUNBQXlDO1lBQ3pDLHdDQUF3QztZQUN4QyxpQ0FBaUM7WUFDakMsZ0NBQWdDO1lBQ2hDLG1DQUFtQztZQUNuQyxvQ0FBb0M7WUFDcEMsb0NBQW9DO1lBRXBDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUVsQixNQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFL0IsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztLQUFBOzs7WUExQ0osVUFBVTs7O1lBSkgsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHt3YWl0VGlsbH0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5pbXBvcnQge1BvcG92ZXJDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7TG9hZGVyfSBmcm9tIFwiLi9sb2FkZXJcIjtcbmltcG9ydCB7TG9hZGVyT3B0aW9uc30gZnJvbSBcIi4vbG9hZGVyLW9wdGlvbnNcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvYWRlckNvbnRyb2xsZXIge1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIHBvcG92ZXJDb250cm9sbGVyOiBQb3BvdmVyQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIGFzeW5jIHByZXNlbnQob3B0aW9uczogTG9hZGVyT3B0aW9ucykge1xuXG4gICAgICAgIGxldCBsb2FkZXI6IExvYWRlcjtcblxuICAgICAgICBjb25zdCBsb2FkZXJJbnN0YW5jZSA9IChpbnN0YW5jZTogTG9hZGVyKSA9PiBsb2FkZXIgPSBpbnN0YW5jZTtcblxuICAgICAgICBjb25zdCBwb3BvdmVyID0gYXdhaXQgdGhpcy5wb3BvdmVyQ29udHJvbGxlci5jcmVhdGUoe1xuICAgICAgICAgICAgYW5pbWF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgY3NzQ2xhc3M6IFwiaW9ueC1wb3BvdmVyLWZsZXhcIixcbiAgICAgICAgICAgIGJhY2tkcm9wRGlzbWlzczogZmFsc2UsXG4gICAgICAgICAgICBrZXlib2FyZENsb3NlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbXBvbmVudDogTG9hZGVyLFxuICAgICAgICAgICAgY29tcG9uZW50UHJvcHM6IE9iamVjdC5hc3NpZ24oe21vZGU6IFwic3Bpbm5lclwifSwgb3B0aW9ucywge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlQ2FsbGJhY2s6IChsb2FkZXI6IExvYWRlcikgPT4gbG9hZGVySW5zdGFuY2UobG9hZGVyKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcG9wb3Zlci5zdHlsZS5zZXRQcm9wZXJ0eShcIi0td2lkdGhcIiwgXCIxMDAlXCIpO1xuICAgICAgICAvLyBwb3BvdmVyLnN0eWxlLnNldFByb3BlcnR5KFwiLS1tYXhIZWlnaHRcIiwgXCIxMDAlXCIpO1xuXG4gICAgICAgIC8vIGNvbnN0IGNvbnRlbnQgPSBwb3BvdmVyLnF1ZXJ5U2VsZWN0b3IoXCIucG9wb3Zlci1jb250ZW50XCIpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLmJhY2tncm91bmQgPSBcInRyYW5zcGFyZW50XCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCIwcHhcIjtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS5sZWZ0ID0gXCIwcHggIWltcG9ydGFudFwiO1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLnRvcCA9IFwiMHB4ICFpbXBvcnRhbnRcIjtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLm1heFdpZHRoID0gXCJub25lXCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gXCJub25lXCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUuYm94U2hhZG93ID0gXCJub25lXCI7XG5cbiAgICAgICAgcG9wb3Zlci5wcmVzZW50KCk7XG5cbiAgICAgICAgYXdhaXQgd2FpdFRpbGwoKCkgPT4gISFsb2FkZXIpO1xuXG4gICAgICAgIHJldHVybiBsb2FkZXI7XG4gICAgfVxuXG59XG5cblxuIl19