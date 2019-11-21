import {Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {FormHelper} from "@co.mmons/ionic-extensions/form-helper";
import {sleep, waitTill} from "@co.mmons/js-utils/core";
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
    templateUrl: "link-modal.html",
    styles: [
        `:host ion-item:not(.ion-dirty) { --highlight-height: 0px; }`
    ]
})
export class LinkModal implements OnDestroy, OnInit {

    static async present(modalController: ModalController, editor: HtmlEditor) {

        const modal = await modalController.create({component: LinkModal, componentProps: {editor: editor}});
        modal.present();
    }

    constructor(private modalController: ModalController) {
    }

    @Input()
    private editor: HtmlEditor;

    existing: boolean;

    private existingType: LinkType;

    private existingLink: string;

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

        if (this.formHelper) {
            this.formHelper.focus("link", false);
        }
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

        this.types = [DefaultLinkType.www, DefaultLinkType.email, DefaultLinkType.tel, DefaultLinkType.sms, DefaultLinkType.other];

        this.form = new FormGroup({
            type: new FormControl(this.existingType || DefaultLinkType.www),
            link: new FormControl(this.existingLink)
        });

        this.form.controls.link.setValidators(control => this.linkValidator(control));

        this.typeChangesSubscription = this.form.controls["type"].valueChanges.subscribe(() => this.typeChanged());
        this.typeChanged();

        await waitTill(() => !!this.formHelper);

        this.formHelper.focus("link", false);
    }

    async ionViewWillLeave() {
        this.editor.focus();
    }

    ngOnInit() {

        MARKS: for (const mark of findMarksInSelection(this.editor.state, schema.marks.link)) {
            const parsed = this.parseLink(mark.attrs.href);
            if (parsed) {
                this.existingType = parsed.type;
                this.existingLink = parsed.link;
                this.existing = true;
                break MARKS;
            }
        }
    }

    private typeChangesSubscription: Subscription;

    ngOnDestroy() {
        unsubscribe(this.typeChangesSubscription);
    }

}
