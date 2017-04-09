import { ViewController, App, NavOptions } from "ionic-angular";
import { DateTimeOverlay } from "./overlay";
import { DateTimePickerOptions } from "./datetime-options";

export class DateTimeOverlayViewController extends ViewController {
    private _app: App;

    constructor(app: App, opts: DateTimePickerOptions) {

        opts = Object.assign({enableBackdropDismiss: true}, opts);

        super(DateTimeOverlay, opts, null);
        this._app = app;
        this.isOverlay = true;
    }

    /**
     * Present the action sheet instance.
     *
     * @param {NavOptions} [opts={}] Nav options to go with this transition.
     * @returns {Promise} Returns a promise which is resolved when the transition has completed.
     */
    present(navOptions: NavOptions = {}): Promise<any> {
        navOptions.minClickBlockDuration = navOptions.minClickBlockDuration || 400;
        return this._app.present(this, navOptions);
    }

}