import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {sleep, waitTill} from "@co.mmons/js-utils/core";
import {IonInput, ModalController, PopoverController} from "@ionic/angular";
import {OverlayEventDetail} from "@ionic/core";
import {HtmlEditor} from "./editor";
import {LinkModal} from "./link-modal";

@Component({
    styles: [
        `:host ion-list { margin: 0px; padding: 0px }`,
        `:host ion-item:last-child { --border-width: 0px; }`,
        `:host ion-item { --highlight-height: 0px; }`
    ],
    template: `
        <ion-list lines="full">
            
            <ng-template [ngIf]="!inputView">
                
                <ion-item button="true" detail="false" (click)="insertLink()">
                    <ion-label>{{"@co.mmons/ionic-extensions/html-editor#link/Link" | intlMessage}}</ion-label>
                    <ion-icon name="link" slot="start"></ion-icon>
                </ion-item>
    
                <ion-item button="true" detail="false" (click)="insertYoutube()">
                    <ion-label>{{"@co.mmons/ionic-extensions/html-editor#youtube/YouTube video" | intlMessage}}</ion-label>
                    <ion-icon name="logo-youtube" slot="start"></ion-icon>
                </ion-item>
                
            </ng-template>
            
            <ng-template [ngIf]="inputView == 'youtube'">

                <ion-item>
                    <ion-icon name="logo-youtube" slot="start"></ion-icon>
                    <ion-input #youtubeInput [placeholder]="'@co.mmons/ionic-extensions/html-editor#youtube/Paste YouTube video url' | intlMessage" (keydown.enter)="applyYoutube()"></ion-input>
                </ion-item>
                
                <ion-item>
                    <ionx-buttons slot="end">
                        <ion-button fill="clear" color="dark" (click)="cancel()">
                            <ion-label>{{"@co.mmons/js-intl#Cancel" | intlMessage}}</ion-label>
                        </ion-button>
                        
                        <ion-button fill="clear" color="primary" (click)="applyYoutube()">
                            <ion-label>{{"@co.mmons/js-intl#Ok" | intlMessage}}</ion-label>
                        </ion-button>
                    </ionx-buttons>
                </ion-item>
    
            </ng-template>
            
        </ion-list>
    `
})
export class InsertMenu implements OnInit {

    // @ts-ignore
    constructor(private popoverController: PopoverController, private modalController: ModalController) {
    }

    @Input()
    private editor: HtmlEditor;

    inputView: "youtube";

    // @ts-ignore
    private editorLastSelection: [number, number];


    async insertLink() {

        this.popoverController.dismiss(undefined, "link");

        LinkModal.present(this.modalController, this.editor);
    }

    @ViewChild("youtubeInput", {static: false})
    private youtubeInput: IonInput;

    async insertYoutube() {

        this.inputView = "youtube";

        await waitTill(() => !!this.youtubeInput, undefined, 2000);
        this.youtubeInput.setFocus();
    }

    // @ts-ignore
    private parseYoutube(value: string): {id: string, start?: string} {
        // https://www.youtube.com/watch?v=NqMgaHUNSQc
        // https://youtu.be/NqMgaHUNSQc
        // https://www.youtube.com/embed/NqMgaHUNSQc
        // https://www.youtube-nocookie.com/embed/NqMgaHUNSQc
        // https://youtu.be/NqMgaHUNSQc?t=17

        value = value.replace("-nocookie.com/", ".com/");
        value = value.replace("/embed/", "/");
        value = value.replace("youtu.be/", "youtube.com/");
        value = value.replace("watch?v=", "");
        value = value.replace("?", "&");

        const info = {id: undefined, start: undefined};

        if (value.indexOf("youtube.com/") > -1) {
            value = value.split("youtube.com/").splice(1, 1)[0];

            for (const param of value.split("&")) {
                if (param.indexOf("=") < 0) {
                    info.id = param;
                } else if (param.startsWith("t=")) {
                    info.start = param.substring(2);
                } else if (param.startsWith("start=")) {
                    info.start = param.substring(6);
                }
            }

        } else  {
        }

        if (info.id) {
            return info;
        }
    }


    applyYoutube() {


        const info = this.parseYoutube(this.youtubeInput.value);
        if (info) {
            const tr = this.editor.state.tr.replaceSelectionWith(this.editor.state.schema.nodes.youtube.create({id: info.id, start: info.start || 0}));
            this.editor.view.dispatch(tr);
        }

        this.popoverController.dismiss(undefined, "youtube");
    }

    cancel() {
        this.popoverController.dismiss();
    }

    ngOnInit() {
    }

    async ionViewWillLeave(event: OverlayEventDetail<any>) {

        if (!this.inputView && !event.role) {
            this.editor.focus();
        }
    }

    async ionViewDidLeave(event: OverlayEventDetail<any>) {

        if (this.inputView) {
            await sleep(50);
            this.editor.focus();

        } else if (!event.role) {
            this.editor.focus();
        }
    }
}
