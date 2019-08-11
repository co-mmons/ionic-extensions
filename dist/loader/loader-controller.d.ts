import { PopoverController } from "@ionic/angular";
import { Loader } from "./loader";
import { LoaderOptions } from "./loader-options";
export declare class LoaderController {
    protected popoverController: PopoverController;
    constructor(popoverController: PopoverController);
    present(options: LoaderOptions): Promise<Loader>;
}
