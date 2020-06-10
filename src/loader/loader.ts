import {Component, ElementRef, HostBinding, Input, OnDestroy, OnInit} from "@angular/core";
import {LoaderOptions} from "./loader-options";

@Component({
    selector: "ionx-loader",
    templateUrl: "loader.html",
    styleUrls: ["loader.scss"]
})
export class Loader implements OnInit, OnDestroy, LoaderOptions {

    constructor(private elementRef: ElementRef<HTMLElement>) {
    }

    @Input()
    @HostBinding("class.ionx--filled")
    fill: boolean;

    @Input()
    instanceCallback: (loader: Loader) => void;

    @Input()
    header: string;

    @Input()
    message: string;

    @Input()
    mode: "spinner" | "progress";

    @Input()
    progressMessage: string;

    @Input()
    progressType: "determinate" | "indeterminate" = "determinate";

    @Input()
    progressValue: number = 0;

    @Input()
    progressBuffer: number = 0;

    @Input()
    progressPercent: number;

    get progressPercentVisible() {
        return typeof this.progressPercent === "number";
    }

    get spinnerMode() {
        return this.mode === "spinner";
    }

    get progressMode() {
        return this.mode === "progress";
    }

    dismiss() {
        return this.popover.dismiss();
    }

    private popover: HTMLIonPopoverElement;

    ngOnInit() {
        this.popover = this.elementRef.nativeElement.closest("ion-popover");

        if (this.instanceCallback) {
            this.instanceCallback(this);
        }
    }

    ngOnDestroy() {
        this.popover = undefined;
        this.instanceCallback = undefined;
    }
}
