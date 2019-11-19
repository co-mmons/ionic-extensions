import {Injectable} from "@angular/core";
import {waitTill} from "@co.mmons/js-utils/core";
import {PopoverController} from "@ionic/angular";
import {Loader} from "./loader";
import {LoaderOptions} from "./loader-options";

@Injectable()
export class LoaderController {

    constructor(protected popoverController: PopoverController) {
    }

    async present(options: LoaderOptions) {

        let loader: Loader;

        const loaderInstance = (instance: Loader) => loader = instance;

        const popover = await this.popoverController.create({
            animated: false,
            cssClass: "ionx-popover-flex",
            backdropDismiss: false,
            keyboardClose: false,
            component: Loader,
            componentProps: Object.assign({}, options, {
                instanceCallback: (loader: Loader) => loaderInstance(loader)
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

        await waitTill(() => !!loader);

        return loader;
    }

}


