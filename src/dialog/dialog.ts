import {
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    EventEmitter,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    Type,
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import {DialogButton} from "./dialog-button";
import {DialogOptions} from "./dialog-options";

@Component({
    selector: "ionx-dialog",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "dialog.html",
    styleUrls: ["dialog.scss"]
})
export class Dialog implements OnInit, OnDestroy, DialogOptions {

    constructor(
        public elementRef: ElementRef<HTMLElement>,
        protected resolver: ComponentFactoryResolver,
        protected injector: Injector
    ) {}

    readonly didLoad: EventEmitter<any> = new EventEmitter();

    value: () => any;

    @Input()
    message: string | Type<any> | [Type<any>, {[param: string]: any}];

    @Input()
    header: string;

    @Input()
    buttons: DialogButton[];

    @ViewChild("bodyContainer", {read: ViewContainerRef, static: true})
    private bodyContainer: ViewContainerRef;

    bodyComponent: ComponentRef<any>;

    @Input()
    set body(body: Type<any> | [Type<any>, {[param: string]: any}]) {

        if (body) {

            this.bodyContainer.clear();

            let type: Type<any>;
            let params: {[param: string]: any};

            if (Array.isArray(body)) {
                type = body.length >= 1 ? body[0] : undefined;
                params = body.length >= 2 ? body[1] : undefined;
            } else {
                type = body;
            }

            const componentRef = this.resolver.resolveComponentFactory(type).create(this.injector);

            if (params) {
                for (const param of Object.keys(params)) {
                    componentRef.instance[param] = params[param];
                }
            }

            this.bodyComponent = componentRef;
            this.bodyContainer.insert(this.bodyComponent.hostView);
        }

    }

    ngOnInit(): void {
        const modal = this.elementRef.nativeElement.closest("ion-modal");

        modal.style.setProperty("--width", "300px");
        modal.style.setProperty("--height", "auto");
        modal.style.setProperty("--max-width", "90%");
        modal.style.setProperty("--max-height", "90%");

        if (document.querySelector("html.ios")) {
            modal.style.setProperty("--border-radius", "10px");
        } else {
            modal.style.setProperty("--border-radius", "4px");
            modal.style.setProperty("--box-shadow", "0 28px 48px rgba(0,0,0,0.4)");
        }
    }

    ngOnDestroy() {

        if (this.bodyComponent) {
            // this.bodyComponent.instance[dialogInstance] = undefined;
            this.bodyComponent.destroy();
        }

        this.value = undefined;
    }

    ionViewDidEnter() {
        const input = this.elementRef.nativeElement.querySelector("input");
        if (input) {
            input.focus();
        }
    }
}
