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
import {TypeAndProps} from "./type-and-props";

@Component({
    selector: "ionx-dialog",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "dialog.html",
    styleUrls: ["dialog.scss"]
})
export class Dialog implements OnInit, OnDestroy {

    constructor(
        public elementRef: ElementRef<HTMLElement>,
        protected resolver: ComponentFactoryResolver,
        protected injector: Injector
    ) {}

    readonly didLoad: EventEmitter<any> = new EventEmitter();

    value: () => any;

    @Input()
    message: string | Type<any> | TypeAndProps<any>;

    @Input()
    header: string;

    @Input()
    buttons: DialogButton[];

    @Input()
    width: string = "300px";

    @ViewChild("componentContainer", {read: ViewContainerRef, static: true})
    private componentContainer: ViewContainerRef;

    /* private */ componentRef: ComponentRef<any>;

    @Input()
    set component(component: Type<any> | [Type<any>, {[param: string]: any}]) {

        if (component) {

            this.componentContainer.clear();

            let type: Type<any>;
            let params: {[param: string]: any};

            if (Array.isArray(component)) {
                type = component.length >= 1 ? component[0] : undefined;
                params = component.length >= 2 ? component[1] : undefined;
            } else {
                type = component;
            }

            const componentRef = this.resolver.resolveComponentFactory(type).create(this.injector);

            if (params) {
                for (const param of Object.keys(params)) {
                    componentRef.instance[param] = params[param];
                }
            }

            this.componentRef = componentRef;
            this.componentContainer.insert(this.componentRef.hostView);
        }

    }

    ngOnInit(): void {
        const modal = this.elementRef.nativeElement.closest("ion-modal");

        modal.style.setProperty("--width", this.width || "auto");
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

        if (this.componentRef) {
            this.componentRef.destroy();
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
