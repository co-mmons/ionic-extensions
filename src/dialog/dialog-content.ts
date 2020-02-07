import {Component, ComponentFactoryResolver, ComponentRef, Injector, Input, Type, ViewChild, ViewContainerRef} from "@angular/core";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {TypeAndProps} from "./type-and-props";

/**
 * Komponent, który strukturyzuje widok dialogu.
 */
@Component({
    selector: "ionx-dialog-content",
    styleUrls: ["dialog-content.scss"],
    templateUrl: "dialog-content.html"
})
export class DialogContent {

    constructor(private sanitizer: DomSanitizer, private resolver: ComponentFactoryResolver, private injector: Injector) {
    }


    @Input()
    header: string;

    messageText: SafeHtml;

    messageComponent: ComponentRef<any>;

    @ViewChild("messageComponentContainer", {read: ViewContainerRef, static: true})
    private messageComponentContainer: ViewContainerRef;

    @Input()
    set message(message: string | Type<any> | TypeAndProps<any>) {

        if (typeof message === "string") {
            this.messageText = this.sanitizer.bypassSecurityTrustHtml(message);

            if (this.messageComponent) {
                this.messageComponent.destroy();
            }

            this.messageComponent = undefined;

        } else if (message) {
            this.messageText = undefined;

            this.messageComponentContainer.clear();

            let type: Type<any>;
            let params: {[param: string]: any};

            if (Array.isArray(message)) {
                type = message.length >= 1 ? message[0] : undefined;
                params = message.length >= 2 ? message[1] : undefined;
            } else {
                type = message;
            }

            const componentRef = this.resolver.resolveComponentFactory(type).create(this.injector);

            if (params) {
                for (const param of Object.keys(params)) {
                    componentRef.instance[param] = params[param];
                }
            }

            this.messageComponent = componentRef;
            this.messageComponentContainer.insert(this.messageComponent.hostView);
        }

    }

    ngOnDestroy(): void {

        if (this.messageComponent) {
            this.messageComponent.destroy();
        }
    }
}
