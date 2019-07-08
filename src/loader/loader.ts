import {Component, ElementRef, Input, OnDestroy, OnInit} from "@angular/core";
import {LoaderOptions} from "./loader-options";

@Component({
    selector: "ionx-loader",
    template: `
        <div style="display: flex; align-items: center">
            
            <div *ngIf="spinnerMode" style="padding: 16px; padding-right: 0px;">
                <ion-spinner></ion-spinner>
            </div>
            
            <div style="padding: 16px; flex: 1; display: flex; flex-direction: column; justify-items: center;">
                <h5 style="margin: 0px" *ngIf="header">{{header}}</h5>
                <ion-text [innerHTML]="message" *ngIf="!!message"></ion-text>
            </div>
            
        </div>
        
        <ion-progress-bar style="margin: 16px 0px" [value]="progressValue" [type]="progressType" [buffer]="progressBuffer" *ngIf="progressMode"></ion-progress-bar>
        
        <div style="display: flex; margin: 0px 16px 16px 16px" *ngIf="!!progressMessage || progressPercentVisible">
            <ion-text [innerHTML]="progressMessage" style="flex: 1"></ion-text>
            <span style="width: 60px; text-align: right" *ngIf="progressPercentVisible">{{(progressPercent | intlPercentFormat: {maximumFractionDigits: 0})}}</span>
        </div>
    `,
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
