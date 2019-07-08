import {Component, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Injector, Input, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef} from "@angular/core";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {ModalController} from "@ionic/angular";
import {DialogButton} from "./dialog-button";
import {DialogMessageComponent} from "./dialog-message-component";
import {DialogOptions} from "./dialog-options";

@Component({
    selector: "ionx-dialog",
    template: `
        <div ionx--content>
            
            <div ionx--header *ngIf="!!header">{{header}}</div>
            
            <div ionx--message>
                
                <div [innerHTML]="messageText" *ngIf="!!messageText"></div>
                
                <ng-template #messageComponentContainer></ng-template>
                
            </div>
            
        </div>
        
        <ion-footer *ngIf="buttons && buttons.length > 0">
            <ion-toolbar>
                <ion-buttons>
                    
                    <ion-button fill="clear" [color]="button.color || 'primary'" [size]="button.size" (click)="buttonClicked(button)" *ngFor="let button of buttons">
                        <span>{{button.text}}</span>
                    </ion-button>
                    
                </ion-buttons>
            </ion-toolbar>
        </ion-footer>
    `,
    styles: [
        `
            :host-context(.md) {
                --ionx--message-font-size: 16px;
                --ionx--header-font-size: 20px;
                --ionx--text-align: left;
            }

            :host-context(.ios) {
                --ionx--message-font-size: 15px;
                --ionx--header-font-size: 18px;
                --ionx--text-align: center;
                --ionx--buttons-align: center;
                --ionx--header-font-weight: 600;
            }
            
            :host { 
                display: flex; 
                contain: content;
                position: relative; 
            }
            
            :host [ionx--message] { 
                font-size: var(--ionx--message-font-size);
                text-align: var(--ionx--text-align);
                margin: 16px 16px 24px 16px;
            }
            
            :host [ionx--header] {
                font-size: var(--ionx--header-font-size);
                font-weight: var(--ionx--header-font-weight, 500);
                margin: 16px;
                text-align: var(--ionx--text-align);
            }
            
            :host ion-footer ion-toolbar {
                --padding-start: 0px;
                --padding-end: 0px;
                --padding-top: 0px;
                --padding-bottom: 0px;
                --min-height: none;
            }

            :host-context(.md) ion-footer ion-toolbar {
                --padding-start: 12px;
                --padding-end: 12px;
                --padding-bottom: 4px;
            }
            
            :host-context(.md) ion-footer::before {
                display: none;
            }

            :host ion-footer ion-buttons {
                z-index: 0;
                justify-content: var(--ionx--buttons-align, flex-end);
            }
            
            :host ion-footer ion-button {
                min-height: 44px;
                margin: 0px;
            }
            
            :host-context(.ios) ion-footer ion-button {
                flex: 1;
            }

            :host-context(.ios) ion-footer ion-button:not(:first-child) {
                border-left: 0.55px solid var(--ion-toolbar-border-color,var(--ion-border-color,var(--ion-color-step-150,rgba(0,0,0,0.2))));;
            }

            :host-context ion-footer ion-button:not(:last-child) {
                font-weight: 400;
            }
            
            :host-context ion-footer ion-button:last-child {
                font-weight: 600;
            }
        `
    ]
})
export class Dialog implements OnInit, OnDestroy, DialogOptions {

    constructor(private injector: Injector, private sanitizer: DomSanitizer, public elementRef: ElementRef<HTMLElement>, private modalController: ModalController, protected resolver: ComponentFactoryResolver) {
    }

    messageText: SafeHtml;

    messageComponent: ComponentRef<any>;

    @ViewChild("messageComponentContainer", {read: ViewContainerRef, static: true})
    private messageComponentContainer: ViewContainerRef;

    @Input()
    header: string;

    @Input()
    buttons: DialogButton[];

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
            this.messageComponentContainer.insert(this.messageComponent.hostView);
        }

    }

    /*private*/ buttonClicked(button: DialogButton) {

        const value = this.messageComponent && (<DialogMessageComponent>this.messageComponent.instance).dialogData ? (<DialogMessageComponent>this.messageComponent.instance).dialogData() : undefined;

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
