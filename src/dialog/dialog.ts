import {
    ChangeDetectionStrategy, ChangeDetectorRef,
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
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {ModalController} from "@ionic/angular";
import {DialogButton} from "./dialog-button";
import {dialogData} from "./dialog-data-symbol";
import {dialogInstance} from "./dialog-instance-symbol";
import {DialogMessageComponent} from "./dialog-message-component";
import {DialogOptions} from "./dialog-options";

@Component({
    selector: "ionx-dialog",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "dialog.html",
    styleUrls: ["dialog.scss"]
})
export class Dialog implements OnInit, OnDestroy, DialogOptions {

    constructor(
        private injector: Injector,
        private sanitizer: DomSanitizer,
        public elementRef: ElementRef<HTMLElement>,
        private modalController: ModalController,
        protected resolver: ComponentFactoryResolver,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    messageText: SafeHtml;

    messageComponent: ComponentRef<any>;

    @ViewChild("messageComponentContainer", {read: ViewContainerRef, static: true})
    private messageComponentContainer: ViewContainerRef;

    @Input()
    header: string;

    _buttons: DialogButton[];

    @Input()
    set buttons(buttons: DialogButton[]) {
        this._buttons = buttons;
        this.changeDetectorRef.detectChanges();
    }

    get buttons(): DialogButton[] {
        return this._buttons;
    }

    readonly didLoad: EventEmitter<any> = new EventEmitter();

    @Input()
    set message(message: string | ComponentRef<any> | Type<any> | [Type<any>, {[param: string]: any}]) {

        if (typeof message === "string") {
            this.messageText = this.sanitizer.bypassSecurityTrustHtml(message);

            if (this.messageComponent) {
                this.messageComponent.destroy();
            }

            this.messageComponent = undefined;

        } else if (message) {
            this.messageText = undefined;

            this.messageComponentContainer.clear();

            if (!(message instanceof ComponentRef)) {

                let type: Type<any>;
                let params: {[param: string]: any};

                if (Array.isArray(message)) {
                    type = message.length >= 1 ? message[0] : undefined;
                    params = message.length >= 2 ? message[1] : undefined;
                } else {
                    type = message;
                }

                message = this.resolver.resolveComponentFactory(type).create(this.injector);

                if (params) {
                    for (const param of Object.keys(params)) {
                        message.instance[param] = params[param];
                    }
                }
            }

            this.messageComponent = message;
            this.messageComponent.instance[dialogInstance] = this;

            this.messageComponentContainer.insert(this.messageComponent.hostView);
        }

    }

    /*private*/ buttonClicked(button: DialogButton) {

        const value = this.messageComponent && this.messageComponent.instance[dialogData] ? (<DialogMessageComponent>this.messageComponent.instance)[dialogData]() : undefined;

        if (button.handler) {
            const res = button.handler(value);

            if ((typeof res === "boolean" && res) || typeof res !== "boolean") {
                this.modalController.dismiss(value, button.role);
            }

            return;

        } else {
            this.modalController.dismiss(button.role !== "cancel" ? value : undefined, button.role);
        }
    }

    ngOnDestroy(): void {

        if (this.messageComponent) {
            this.messageComponent.instance[dialogInstance] = undefined;
            this.messageComponent.destroy();
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

    ionViewDidEnter() {
        const input = this.elementRef.nativeElement.querySelector("input");
        if (input) {
            input.focus();
        }
    }
}
