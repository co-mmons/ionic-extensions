import {Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {FormHelper} from "@co.mmons/ionic-extensions/form-helper";
import {sleep} from "@co.mmons/js-utils/core";
import {unsubscribe} from "@co.mmons/rxjs-utils";
import {ModalController} from "@ionic/angular";
import {toggleMark} from "prosemirror-commands";
import {Subscription} from "rxjs";
import {HtmlEditor} from "./editor";
import {DefaultLinkType, LinkType} from "./link-type";
import {schema} from "./prosemirror/schema";
import {findMarksInSelection} from "./prosemirror/utils/find-marks-in-selection";
import {findNodeStartEnd} from "./prosemirror/utils/find-node-start-end";

@Component({
    template: `
        <ion-header>
            
            <ion-toolbar>

                <ionx-buttons slot="start">

                    <ion-button fill="clear" color="primary" (click)="close()">
                        <ion-icon name="close" slot="icon-only"></ion-icon>
                    </ion-button>

                </ionx-buttons>
                
                <ion-title style="margin: 0; padding: 0;">{{"@co.mmons/ionic-extensions/html-editor#link/Link" | intlMessage}}</ion-title>

                <ionx-buttons slot="end">

                    <ion-button fill="clear" color="dark" (click)="unlink()" *ngIf="existing">
                        <ion-icon name="trash" slot="start"></ion-icon>
                        <ion-label>{{"@co.mmons/ionic-extensions/html-editor#link/Unlink" | intlMessage}}</ion-label>
                    </ion-button>

                    <ion-button fill="clear" color="primary" (click)="ok()">
                        <ion-icon name="checkmark" slot="start"></ion-icon>
                        <ion-label>{{"@co.mmons/js-intl#Done" | intlMessage}}</ion-label>
                    </ion-button>
                    
                </ionx-buttons>
                
            </ion-toolbar>
            
        </ion-header>
        <ion-content>
            
            <form ionx-form-helper [formGroup]="form">
                
                <ion-grid>
                    
                    <ion-row>
                        
                        <ion-col [sizeXs]="12">
                            
                            <ionx-form-item>

                                <ion-item>
                                    <ion-label position="stacked">{{"@co.mmons/ionic-extensions/html-editor#link/Link type" | intlMessage}}</ion-label>
                                    <ionx-select required [compareAsString]="true" formControlName="type">
                                        <ionx-select-option *ngFor="let type of types" [value]="type">{{type.label | intlMessage}}</ionx-select-option>
                                    </ionx-select>
                                </ion-item>
    
                            </ionx-form-item>
                            
                        </ion-col>

                        <ion-col [sizeXs]="12">
                            
                            <ionx-form-item>
    
                                <ion-item>
                                    <ion-label position="stacked">{{(form.controls['type'].value.inputLabel || "@co.mmons/ionic-extensions/html-editor#link/Link") | intlMessage}}</ion-label>
                                    <ion-input formControlName="link" type="form.controls['type'].value.inputType"></ion-input>
                                </ion-item>
                                
                                <ionx-form-item-error control="link" markedAs="dirty"></ionx-form-item-error>
                                
                                <ionx-form-item-hint *ngIf="form.controls['type'].value.inputHint">
                                    <span [innerHTML]="form.controls['type'].value.inputHint | intlMessage"></span>
                                </ionx-form-item-hint>

                            </ionx-form-item>

                        </ion-col>
                        
                    </ion-row>
                    
                    
                </ion-grid>
                
            </form>
            
        </ion-content>
    `,
    styles: [
        `:host ion-item:not(.ion-dirty) { --highlight-height: 0px; }`
    ]
})
export class LinkModal implements OnInit, OnDestroy {

    static async present(modalController: ModalController, editor: HtmlEditor) {

        const modal = await modalController.create({component: LinkModal, componentProps: {editor: editor}});
        modal.present();
    }

    constructor(private modalController: ModalController) {
    }

    @Input()
    private editor: HtmlEditor;

    existing: boolean;

    types: LinkType[];

    form: FormGroup;

    @ViewChild(FormHelper, {static: false})
    formHelper: FormHelper;

    async close() {
        await this.modalController.dismiss();
        this.editor.focus();
    }

    async unlink() {

        await this.modalController.dismiss();

        const selection = this.editor.state.selection;

        if (selection.empty) {

            const tr = this.editor.state.tr;

            tr.doc.nodesBetween(selection.from, selection.to, (node, pos) => {

                if (node.isText) {
                    const $pos = tr.doc.resolve(pos);
                    const start = pos - $pos.textOffset;
                    const end = start + $pos.parent.child($pos.index()).nodeSize;

                    tr.removeMark(start, end, schema.marks.link);
                }
            });

            this.editor.view.dispatch(tr);

        } else {
            toggleMark(schema.marks.link)(this.editor.state, tr => this.editor.view.dispatch(tr));
        }
    }

    async ok() {
        this.formHelper.validateAll("dirty");

        if (this.form.valid) {
            await this.modalController.dismiss();

            const linkType = this.form.controls.type.value as LinkType;
            const selection = this.editor.state.selection;

            const tr = this.editor.state.tr;

            if (selection.empty) {

                tr.doc.nodesBetween(selection.from, selection.to, (node, pos) => {

                    if (node.isText) {
                        const {start, end} = findNodeStartEnd(tr.doc, pos);
                        tr.addMark(start, end, schema.mark(schema.marks.link, {href: linkType.uri(this.form.controls.link.value)}));
                    }
                });

            } else {

                // usuwamy poprzedni link
                tr.doc.nodesBetween(selection.from, selection.to, (node, pos) => {

                    if (node.isText) {
                        const {start, end} = findNodeStartEnd(tr.doc, pos);
                        tr.removeMark(start, end, schema.marks.link);
                    }
                });

                tr.addMark(selection.from, selection.to, schema.mark(schema.marks.link, {href: linkType.uri(this.form.controls.link.value)}));
            }

            this.editor.view.dispatch(tr);
        }
    }

    private async typeChanged() {

        if (this.form.controls.link.value) {
            this.form.controls.link.markAsDirty();
            this.form.controls.link.updateValueAndValidity();
        }

        await sleep(50); // we must wait for closing type selector

        this.formHelper.focus("link", false);
    }

    private parseLink(uri: string): {type: LinkType, link: string} {

        const prefixes = {
            "http:": DefaultLinkType.www,
            "https:": DefaultLinkType.www,
            "tel:": DefaultLinkType.tel,
            "sms:": DefaultLinkType.sms,
            "mailto:": DefaultLinkType.email
        };

        const lowerCasedUri = uri.trim().toLowerCase();

        for (const prefix of Object.keys(prefixes)) {
            if (lowerCasedUri.startsWith(prefix)) {

                const link = {type: prefixes[prefix], link: uri.trim()};

                if (prefixes[prefix] !== DefaultLinkType.www) {
                    link.link = uri.substring(prefix.length).trim();
                }

                return link;
            }
        }

        return {type: DefaultLinkType.other, link: uri};
    }

    private linkValidator(control: AbstractControl): ValidationErrors {

        const required = Validators.required(control);
        if (required) {
            return required;
        }

        const type = this.form.controls.type.value as LinkType;
        const validators = type.inputValidators;

        if (validators) {
            for (const validator of validators) {
                const r = validator(control);
                if (r) {
                    return r;
                }
            }
        }
    }

    async ionViewDidEnter() {
        this.formHelper.focus("link", false);
    }

    async ionViewWillLeave() {
        this.editor.focus();
    }

    private typeChangesSubscription: Subscription;

    ngOnInit() {
        this.types = [DefaultLinkType.www, DefaultLinkType.email, DefaultLinkType.tel, DefaultLinkType.sms, DefaultLinkType.other];

        this.form = new FormGroup({
            type: new FormControl(DefaultLinkType.www),
            link: new FormControl()
        });

        this.form.controls.link.setValidators(control => this.linkValidator(control));

        this.typeChangesSubscription = this.form.controls["type"].valueChanges.subscribe(() => this.typeChanged());
        this.typeChanged();

        this.existing = undefined;
        MARKS: for (const mark of findMarksInSelection(this.editor.state, schema.marks.link)) {
            const parsed = this.parseLink(mark.attrs.href);
            if (parsed) {
                this.form.controls["type"].setValue(parsed.type);
                this.form.controls["link"].setValue(parsed.link);
                this.existing = true;
            }
        }
    }

    ngOnDestroy() {
        unsubscribe(this.typeChangesSubscription);
    }

}
