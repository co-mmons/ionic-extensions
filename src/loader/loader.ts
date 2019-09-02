import {Component, ElementRef, Input, OnDestroy, OnInit} from "@angular/core";
import {LoaderOptions} from "./loader-options";

@Component({
    selector: "ionx-loader",
    templateUrl: "loader.html",
    styles: [
        `:host { display: block }`
    ]
})
export class Loader implements OnInit, OnDestroy, LoaderOptions {

    constructor(private elementRef: ElementRef<HTMLElement>) {
    }

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
