import { __awaiter, __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { waitTill } from "@co.mmons/js-utils/core";
import { PopoverController } from "@ionic/angular";
import { Loader } from "./loader";
let LoaderController = class LoaderController {
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
};
LoaderController.ctorParameters = () => [
    { type: PopoverController }
];
LoaderController = __decorate([
    Injectable()
], LoaderController);
export { LoaderController };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9sb2FkZXIvIiwic291cmNlcyI6WyJsb2FkZXItY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUloQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUV6QixZQUFzQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUMxRCxDQUFDO0lBRUssT0FBTyxDQUFDLE9BQXNCOztZQUVoQyxJQUFJLE1BQWMsQ0FBQztZQUVuQixNQUFNLGNBQWMsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFFL0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDO2dCQUNoRCxRQUFRLEVBQUUsS0FBSztnQkFDZixRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixlQUFlLEVBQUUsS0FBSztnQkFDdEIsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLFNBQVMsRUFBRSxNQUFNO2dCQUNqQixjQUFjLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUMsRUFBRSxPQUFPLEVBQUU7b0JBQ3RELGdCQUFnQixFQUFFLENBQUMsTUFBYyxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO2lCQUMvRCxDQUFDO2FBQ0wsQ0FBQyxDQUFDO1lBRUgsZ0RBQWdEO1lBQ2hELG9EQUFvRDtZQUVwRCw0RUFBNEU7WUFDNUUsNENBQTRDO1lBQzVDLHNDQUFzQztZQUN0Qyx5Q0FBeUM7WUFDekMsd0NBQXdDO1lBQ3hDLGlDQUFpQztZQUNqQyxnQ0FBZ0M7WUFDaEMsbUNBQW1DO1lBQ25DLG9DQUFvQztZQUNwQyxvQ0FBb0M7WUFFcEMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRWxCLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUvQixPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO0tBQUE7Q0FFSixDQUFBOztZQXpDNEMsaUJBQWlCOztBQUZqRCxnQkFBZ0I7SUFENUIsVUFBVSxFQUFFO0dBQ0EsZ0JBQWdCLENBMkM1QjtTQTNDWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge3dhaXRUaWxsfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7UG9wb3ZlckNvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtMb2FkZXJ9IGZyb20gXCIuL2xvYWRlclwiO1xuaW1wb3J0IHtMb2FkZXJPcHRpb25zfSBmcm9tIFwiLi9sb2FkZXItb3B0aW9uc1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9hZGVyQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcG9wb3ZlckNvbnRyb2xsZXI6IFBvcG92ZXJDb250cm9sbGVyKSB7XG4gICAgfVxuXG4gICAgYXN5bmMgcHJlc2VudChvcHRpb25zOiBMb2FkZXJPcHRpb25zKSB7XG5cbiAgICAgICAgbGV0IGxvYWRlcjogTG9hZGVyO1xuXG4gICAgICAgIGNvbnN0IGxvYWRlckluc3RhbmNlID0gKGluc3RhbmNlOiBMb2FkZXIpID0+IGxvYWRlciA9IGluc3RhbmNlO1xuXG4gICAgICAgIGNvbnN0IHBvcG92ZXIgPSBhd2FpdCB0aGlzLnBvcG92ZXJDb250cm9sbGVyLmNyZWF0ZSh7XG4gICAgICAgICAgICBhbmltYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBjc3NDbGFzczogXCJpb254LXBvcG92ZXItZmxleFwiLFxuICAgICAgICAgICAgYmFja2Ryb3BEaXNtaXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGtleWJvYXJkQ2xvc2U6IGZhbHNlLFxuICAgICAgICAgICAgY29tcG9uZW50OiBMb2FkZXIsXG4gICAgICAgICAgICBjb21wb25lbnRQcm9wczogT2JqZWN0LmFzc2lnbih7bW9kZTogXCJzcGlubmVyXCJ9LCBvcHRpb25zLCB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VDYWxsYmFjazogKGxvYWRlcjogTG9hZGVyKSA9PiBsb2FkZXJJbnN0YW5jZShsb2FkZXIpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBwb3BvdmVyLnN0eWxlLnNldFByb3BlcnR5KFwiLS13aWR0aFwiLCBcIjEwMCVcIik7XG4gICAgICAgIC8vIHBvcG92ZXIuc3R5bGUuc2V0UHJvcGVydHkoXCItLW1heEhlaWdodFwiLCBcIjEwMCVcIik7XG5cbiAgICAgICAgLy8gY29uc3QgY29udGVudCA9IHBvcG92ZXIucXVlcnlTZWxlY3RvcihcIi5wb3BvdmVyLWNvbnRlbnRcIikgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZCA9IFwidHJhbnNwYXJlbnRcIjtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjBweFwiO1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLmxlZnQgPSBcIjBweCAhaW1wb3J0YW50XCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUudG9wID0gXCIwcHggIWltcG9ydGFudFwiO1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuICAgICAgICAvLyBjb250ZW50LnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIC8vIGNvbnRlbnQuc3R5bGUubWF4V2lkdGggPSBcIm5vbmVcIjtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBcIm5vbmVcIjtcbiAgICAgICAgLy8gY29udGVudC5zdHlsZS5ib3hTaGFkb3cgPSBcIm5vbmVcIjtcblxuICAgICAgICBwb3BvdmVyLnByZXNlbnQoKTtcblxuICAgICAgICBhd2FpdCB3YWl0VGlsbCgoKSA9PiAhIWxvYWRlcik7XG5cbiAgICAgICAgcmV0dXJuIGxvYWRlcjtcbiAgICB9XG5cbn1cblxuXG4iXX0=