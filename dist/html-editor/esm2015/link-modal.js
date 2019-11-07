import * as tslib_1 from "tslib";
var LinkModal_1;
import { Component, Input, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormHelper } from "@co.mmons/ionic-extensions/form-helper";
import { sleep } from "@co.mmons/js-utils/core";
import { unsubscribe } from "@co.mmons/rxjs-utils";
import { ModalController } from "@ionic/angular";
import { toggleMark } from "prosemirror-commands";
import { DefaultLinkType } from "./link-type";
import { schema } from "./prosemirror/schema";
import { findMarksInSelection } from "./prosemirror/utils/find-marks-in-selection";
import { findNodeStartEnd } from "./prosemirror/utils/find-node-start-end";
let LinkModal = LinkModal_1 = class LinkModal {
    constructor(modalController) {
        this.modalController = modalController;
    }
    static present(modalController, editor) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const modal = yield modalController.create({ component: LinkModal_1, componentProps: { editor: editor } });
            modal.present();
        });
    }
    close() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.modalController.dismiss();
            this.editor.focus();
        });
    }
    unlink() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.modalController.dismiss();
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
            }
            else {
                toggleMark(schema.marks.link)(this.editor.state, tr => this.editor.view.dispatch(tr));
            }
        });
    }
    ok() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.formHelper.validateAll("dirty");
            if (this.form.valid) {
                yield this.modalController.dismiss();
                const linkType = this.form.controls.type.value;
                const selection = this.editor.state.selection;
                const tr = this.editor.state.tr;
                if (selection.empty) {
                    tr.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
                        if (node.isText) {
                            const { start, end } = findNodeStartEnd(tr.doc, pos);
                            tr.addMark(start, end, schema.mark(schema.marks.link, { href: linkType.uri(this.form.controls.link.value) }));
                        }
                    });
                }
                else {
                    // usuwamy poprzedni link
                    tr.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
                        if (node.isText) {
                            const { start, end } = findNodeStartEnd(tr.doc, pos);
                            tr.removeMark(start, end, schema.marks.link);
                        }
                    });
                    tr.addMark(selection.from, selection.to, schema.mark(schema.marks.link, { href: linkType.uri(this.form.controls.link.value) }));
                }
                this.editor.view.dispatch(tr);
            }
        });
    }
    typeChanged() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.form.controls.link.value) {
                this.form.controls.link.markAsDirty();
                this.form.controls.link.updateValueAndValidity();
            }
            yield sleep(50); // we must wait for closing type selector
            this.formHelper.focus("link", false);
        });
    }
    parseLink(uri) {
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
                const link = { type: prefixes[prefix], link: uri.trim() };
                if (prefixes[prefix] !== DefaultLinkType.www) {
                    link.link = uri.substring(prefix.length).trim();
                }
                return link;
            }
        }
        return { type: DefaultLinkType.other, link: uri };
    }
    linkValidator(control) {
        const required = Validators.required(control);
        if (required) {
            return required;
        }
        const type = this.form.controls.type.value;
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
    ionViewDidEnter() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.formHelper.focus("link", false);
        });
    }
    ionViewWillLeave() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.editor.focus();
        });
    }
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
};
LinkModal.ctorParameters = () => [
    { type: ModalController }
];
tslib_1.__decorate([
    Input()
], LinkModal.prototype, "editor", void 0);
tslib_1.__decorate([
    ViewChild(FormHelper, { static: false })
], LinkModal.prototype, "formHelper", void 0);
LinkModal = LinkModal_1 = tslib_1.__decorate([
    Component({
        template: `
        <ion-header>
            
            <ion-toolbar>

                <ionx-buttons slot="start">
                    <ion-back-button style="display: inline-block" [icon]="('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back'" (click)="$event.preventDefault(); close()"></ion-back-button>
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
        styles: [`:host ion-item:not(.ion-dirty) { --highlight-height: 0px; }`]
    })
], LinkModal);
export { LinkModal };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1tb2RhbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yLyIsInNvdXJjZXMiOlsibGluay1tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFrQixXQUFXLEVBQUUsU0FBUyxFQUFvQixVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDbEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBR2hELE9BQU8sRUFBQyxlQUFlLEVBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBc0Z6RSxJQUFhLFNBQVMsaUJBQXRCLE1BQWEsU0FBUztJQVFsQixZQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFDcEQsQ0FBQztJQVBELE1BQU0sQ0FBTyxPQUFPLENBQUMsZUFBZ0MsRUFBRSxNQUFrQjs7WUFFckUsTUFBTSxLQUFLLEdBQUcsTUFBTSxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUMsU0FBUyxFQUFFLFdBQVMsRUFBRSxjQUFjLEVBQUUsRUFBQyxNQUFNLEVBQUUsTUFBTSxF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LEVBQUU7eUNBQ21CO0FBUzNCO0lBREMsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQzs2Q0FDaEI7QUFyQmQsU0FBUztJQXBGckIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0E4RVQ7aUJBRUcsNkRBQTZEO0tBRXBFLENBQUM7R0FDVyxTQUFTLENBaU1yQjtTQWpNWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRpb25FcnJvcnMsIFZhbGlkYXRvcnN9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtGb3JtSGVscGVyfSBmcm9tIFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZm9ybS1oZWxwZXJcIjtcbmltcG9ydCB7c2xlZXB9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHt1bnN1YnNjcmliZX0gZnJvbSBcIkBjby5tbW9ucy9yeGpzLXV0aWxzXCI7XG5pbXBvcnQge01vZGFsQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge3RvZ2dsZU1hcmt9IGZyb20gXCJwcm9zZW1pcnJvci1jb21tYW5kc1wiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0h0bWxFZGl0b3J9IGZyb20gXCIuL2VkaXRvclwiO1xuaW1wb3J0IHtEZWZhdWx0TGlua1R5cGUsIExpbmtUeXBlfSBmcm9tIFwiLi9saW5rLXR5cGVcIjtcbmltcG9ydCB7c2NoZW1hfSBmcm9tIFwiLi9wcm9zZW1pcnJvci9zY2hlbWFcIjtcbmltcG9ydCB7ZmluZE1hcmtzSW5TZWxlY3Rpb259IGZyb20gXCIuL3Byb3NlbWlycm9yL3V0aWxzL2ZpbmQtbWFya3MtaW4tc2VsZWN0aW9uXCI7XG5pbXBvcnQge2ZpbmROb2RlU3RhcnRFbmR9IGZyb20gXCIuL3Byb3NlbWlycm9yL3V0aWxzL2ZpbmQtbm9kZS1zdGFydC1lbmRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGlvbi1oZWFkZXI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxpb24tdG9vbGJhcj5cblxuICAgICAgICAgICAgICAgIDxpb254LWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpb24tYmFjay1idXR0b24gc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2tcIiBbaWNvbl09XCIoJ3RhYmxldCcgfCBtYXRjaEdyZWF0ZXJXaWR0aCkgPyAnY2xvc2UnIDogJ2Fycm93LWJhY2snXCIgKGNsaWNrKT1cIiRldmVudC5wcmV2ZW50RGVmYXVsdCgpOyBjbG9zZSgpXCI+PC9pb24tYmFjay1idXR0b24+XG4gICAgICAgICAgICAgICAgPC9pb254LWJ1dHRvbnM+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGlvbi10aXRsZSBzdHlsZT1cIm1hcmdpbjogMDsgcGFkZGluZzogMDtcIj57e1wiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IjbGluay9MaW5rXCIgfCBpbnRsTWVzc2FnZX19PC9pb24tdGl0bGU+XG5cbiAgICAgICAgICAgICAgICA8aW9ueC1idXR0b25zIHNsb3Q9XCJlbmRcIj5cblxuICAgICAgICAgICAgICAgICAgICA8aW9uLWJ1dHRvbiBmaWxsPVwiY2xlYXJcIiBjb2xvcj1cImRhcmtcIiAoY2xpY2spPVwidW5saW5rKClcIiAqbmdJZj1cImV4aXN0aW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW9uLWljb24gbmFtZT1cInRyYXNoXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpb24tbGFiZWw+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI2xpbmsvVW5saW5rXCIgfCBpbnRsTWVzc2FnZX19PC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICA8aW9uLWJ1dHRvbiBmaWxsPVwiY2xlYXJcIiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwib2soKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJjaGVja21hcmtcIiBzbG90PVwic3RhcnRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1sYWJlbD57e1wiQGNvLm1tb25zL2pzLWludGwjRG9uZVwiIHwgaW50bE1lc3NhZ2V9fTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L2lvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDwvaW9ueC1idXR0b25zPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9pb24tdG9vbGJhcj5cbiAgICAgICAgICAgIFxuICAgICAgICA8L2lvbi1oZWFkZXI+XG4gICAgICAgIDxpb24tY29udGVudD5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGZvcm0gaW9ueC1mb3JtLWhlbHBlciBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8aW9uLWdyaWQ+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8aW9uLXJvdz5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1jb2wgW3NpemVYc109XCIxMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpb254LWZvcm0taXRlbT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW9uLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW9uLWxhYmVsIHBvc2l0aW9uPVwic3RhY2tlZFwiPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNsaW5rL0xpbmsgdHlwZVwiIHwgaW50bE1lc3NhZ2V9fTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlvbngtc2VsZWN0IHJlcXVpcmVkIFtjb21wYXJlQXNTdHJpbmddPVwidHJ1ZVwiIGZvcm1Db250cm9sTmFtZT1cInR5cGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW9ueC1zZWxlY3Qtb3B0aW9uICpuZ0Zvcj1cImxldCB0eXBlIG9mIHR5cGVzXCIgW3ZhbHVlXT1cInR5cGVcIj57e3R5cGUubGFiZWwgfCBpbnRsTWVzc2FnZX19PC9pb254LXNlbGVjdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2lvbngtc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2lvbi1pdGVtPlxuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaW9ueC1mb3JtLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2lvbi1jb2w+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpb24tY29sIFtzaXplWHNdPVwiMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW9ueC1mb3JtLWl0ZW0+XG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpb24taXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpb24tbGFiZWwgcG9zaXRpb249XCJzdGFja2VkXCI+e3soZm9ybS5jb250cm9sc1sndHlwZSddLnZhbHVlLmlucHV0TGFiZWwgfHwgXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNsaW5rL0xpbmtcIikgfCBpbnRsTWVzc2FnZX19PC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW9uLWlucHV0IGZvcm1Db250cm9sTmFtZT1cImxpbmtcIiB0eXBlPVwiZm9ybS5jb250cm9sc1sndHlwZSddLnZhbHVlLmlucHV0VHlwZVwiPjwvaW9uLWlucHV0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2lvbi1pdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlvbngtZm9ybS1pdGVtLWVycm9yIGNvbnRyb2w9XCJsaW5rXCIgbWFya2VkQXM9XCJkaXJ0eVwiPjwvaW9ueC1mb3JtLWl0ZW0tZXJyb3I+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW9ueC1mb3JtLWl0ZW0taGludCAqbmdJZj1cImZvcm0uY29udHJvbHNbJ3R5cGUnXS52YWx1ZS5pbnB1dEhpbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwiZm9ybS5jb250cm9sc1sndHlwZSddLnZhbHVlLmlucHV0SGludCB8IGludGxNZXNzYWdlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2lvbngtZm9ybS1pdGVtLWhpbnQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2lvbngtZm9ybS1pdGVtPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2lvbi1jb2w+XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPC9pb24tcm93PlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPC9pb24tZ3JpZD5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIFxuICAgICAgICA8L2lvbi1jb250ZW50PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGA6aG9zdCBpb24taXRlbTpub3QoLmlvbi1kaXJ0eSkgeyAtLWhpZ2hsaWdodC1oZWlnaHQ6IDBweDsgfWBcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIExpbmtNb2RhbCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIHN0YXRpYyBhc3luYyBwcmVzZW50KG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLCBlZGl0b3I6IEh0bWxFZGl0b3IpIHtcblxuICAgICAgICBjb25zdCBtb2RhbCA9IGF3YWl0IG1vZGFsQ29udHJvbGxlci5jcmVhdGUoe2NvbXBvbmVudDogTGlua01vZGFsLCBjb21wb25lbnRQcm9wczoge2VkaXRvcjogZWRpdG9yfX0pO1xuICAgICAgICBtb2RhbC5wcmVzZW50KCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBlZGl0b3I6IEh0bWxFZGl0b3I7XG5cbiAgICBleGlzdGluZzogYm9vbGVhbjtcblxuICAgIHR5cGVzOiBMaW5rVHlwZVtdO1xuXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgQFZpZXdDaGlsZChGb3JtSGVscGVyLCB7c3RhdGljOiBmYWxzZX0pXG4gICAgZm9ybUhlbHBlcjogRm9ybUhlbHBlcjtcblxuICAgIGFzeW5jIGNsb3NlKCkge1xuICAgICAgICBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XG4gICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgdW5saW5rKCkge1xuXG4gICAgICAgIGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcblxuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmVkaXRvci5zdGF0ZS5zZWxlY3Rpb247XG5cbiAgICAgICAgaWYgKHNlbGVjdGlvbi5lbXB0eSkge1xuXG4gICAgICAgICAgICBjb25zdCB0ciA9IHRoaXMuZWRpdG9yLnN0YXRlLnRyO1xuXG4gICAgICAgICAgICB0ci5kb2Mubm9kZXNCZXR3ZWVuKHNlbGVjdGlvbi5mcm9tLCBzZWxlY3Rpb24udG8sIChub2RlLCBwb3MpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChub2RlLmlzVGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCAkcG9zID0gdHIuZG9jLnJlc29sdmUocG9zKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBwb3MgLSAkcG9zLnRleHRPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgJHBvcy5wYXJlbnQuY2hpbGQoJHBvcy5pbmRleCgpKS5ub2RlU2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICB0ci5yZW1vdmVNYXJrKHN0YXJ0LCBlbmQsIHNjaGVtYS5tYXJrcy5saW5rKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5lZGl0b3Iudmlldy5kaXNwYXRjaCh0cik7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvZ2dsZU1hcmsoc2NoZW1hLm1hcmtzLmxpbmspKHRoaXMuZWRpdG9yLnN0YXRlLCB0ciA9PiB0aGlzLmVkaXRvci52aWV3LmRpc3BhdGNoKHRyKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBvaygpIHtcbiAgICAgICAgdGhpcy5mb3JtSGVscGVyLnZhbGlkYXRlQWxsKFwiZGlydHlcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuZm9ybS52YWxpZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xuXG4gICAgICAgICAgICBjb25zdCBsaW5rVHlwZSA9IHRoaXMuZm9ybS5jb250cm9scy50eXBlLnZhbHVlIGFzIExpbmtUeXBlO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5lZGl0b3Iuc3RhdGUuc2VsZWN0aW9uO1xuXG4gICAgICAgICAgICBjb25zdCB0ciA9IHRoaXMuZWRpdG9yLnN0YXRlLnRyO1xuXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmVtcHR5KSB7XG5cbiAgICAgICAgICAgICAgICB0ci5kb2Mubm9kZXNCZXR3ZWVuKHNlbGVjdGlvbi5mcm9tLCBzZWxlY3Rpb24udG8sIChub2RlLCBwb3MpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5pc1RleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtzdGFydCwgZW5kfSA9IGZpbmROb2RlU3RhcnRFbmQodHIuZG9jLCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHIuYWRkTWFyayhzdGFydCwgZW5kLCBzY2hlbWEubWFyayhzY2hlbWEubWFya3MubGluaywge2hyZWY6IGxpbmtUeXBlLnVyaSh0aGlzLmZvcm0uY29udHJvbHMubGluay52YWx1ZSl9KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIC8vIHVzdXdhbXkgcG9wcnplZG5pIGxpbmtcbiAgICAgICAgICAgICAgICB0ci5kb2Mubm9kZXNCZXR3ZWVuKHNlbGVjdGlvbi5mcm9tLCBzZWxlY3Rpb24udG8sIChub2RlLCBwb3MpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5pc1RleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtzdGFydCwgZW5kfSA9IGZpbmROb2RlU3RhcnRFbmQodHIuZG9jLCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHIucmVtb3ZlTWFyayhzdGFydCwgZW5kLCBzY2hlbWEubWFya3MubGluayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRyLmFkZE1hcmsoc2VsZWN0aW9uLmZyb20sIHNlbGVjdGlvbi50bywgc2NoZW1hLm1hcmsoc2NoZW1hLm1hcmtzLmxpbmssIHtocmVmOiBsaW5rVHlwZS51cmkodGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsudmFsdWUpfSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVkaXRvci52aWV3LmRpc3BhdGNoKHRyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgdHlwZUNoYW5nZWQoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZm9ybS5jb250cm9scy5saW5rLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHMubGluay5tYXJrQXNEaXJ0eSgpO1xuICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgc2xlZXAoNTApOyAvLyB3ZSBtdXN0IHdhaXQgZm9yIGNsb3NpbmcgdHlwZSBzZWxlY3RvclxuXG4gICAgICAgIHRoaXMuZm9ybUhlbHBlci5mb2N1cyhcImxpbmtcIiwgZmFsc2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VMaW5rKHVyaTogc3RyaW5nKToge3R5cGU6IExpbmtUeXBlLCBsaW5rOiBzdHJpbmd9IHtcblxuICAgICAgICBjb25zdCBwcmVmaXhlcyA9IHtcbiAgICAgICAgICAgIFwiaHR0cDpcIjogRGVmYXVsdExpbmtUeXBlLnd3dyxcbiAgICAgICAgICAgIFwiaHR0cHM6XCI6IERlZmF1bHRMaW5rVHlwZS53d3csXG4gICAgICAgICAgICBcInRlbDpcIjogRGVmYXVsdExpbmtUeXBlLnRlbCxcbiAgICAgICAgICAgIFwic21zOlwiOiBEZWZhdWx0TGlua1R5cGUuc21zLFxuICAgICAgICAgICAgXCJtYWlsdG86XCI6IERlZmF1bHRMaW5rVHlwZS5lbWFpbFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGxvd2VyQ2FzZWRVcmkgPSB1cmkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgZm9yIChjb25zdCBwcmVmaXggb2YgT2JqZWN0LmtleXMocHJlZml4ZXMpKSB7XG4gICAgICAgICAgICBpZiAobG93ZXJDYXNlZFVyaS5zdGFydHNXaXRoKHByZWZpeCkpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmsgPSB7dHlwZTogcHJlZml4ZXNbcHJlZml4XSwgbGluazogdXJpLnRyaW0oKX07XG5cbiAgICAgICAgICAgICAgICBpZiAocHJlZml4ZXNbcHJlZml4XSAhPT0gRGVmYXVsdExpbmtUeXBlLnd3dykge1xuICAgICAgICAgICAgICAgICAgICBsaW5rLmxpbmsgPSB1cmkuc3Vic3RyaW5nKHByZWZpeC5sZW5ndGgpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbGluaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7dHlwZTogRGVmYXVsdExpbmtUeXBlLm90aGVyLCBsaW5rOiB1cml9O1xuICAgIH1cblxuICAgIHByaXZhdGUgbGlua1ZhbGlkYXRvcihjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHtcblxuICAgICAgICBjb25zdCByZXF1aXJlZCA9IFZhbGlkYXRvcnMucmVxdWlyZWQoY29udHJvbCk7XG4gICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMuZm9ybS5jb250cm9scy50eXBlLnZhbHVlIGFzIExpbmtUeXBlO1xuICAgICAgICBjb25zdCB2YWxpZGF0b3JzID0gdHlwZS5pbnB1dFZhbGlkYXRvcnM7XG5cbiAgICAgICAgaWYgKHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdmFsaWRhdG9yIG9mIHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByID0gdmFsaWRhdG9yKGNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGlvblZpZXdEaWRFbnRlcigpIHtcbiAgICAgICAgdGhpcy5mb3JtSGVscGVyLmZvY3VzKFwibGlua1wiLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgYXN5bmMgaW9uVmlld1dpbGxMZWF2ZSgpIHtcbiAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHR5cGVDaGFuZ2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy50eXBlcyA9IFtEZWZhdWx0TGlua1R5cGUud3d3LCBEZWZhdWx0TGlua1R5cGUuZW1haWwsIERlZmF1bHRMaW5rVHlwZS50ZWwsIERlZmF1bHRMaW5rVHlwZS5zbXMsIERlZmF1bHRMaW5rVHlwZS5vdGhlcl07XG5cbiAgICAgICAgdGhpcy5mb3JtID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgICAgICAgICB0eXBlOiBuZXcgRm9ybUNvbnRyb2woRGVmYXVsdExpbmtUeXBlLnd3dyksXG4gICAgICAgICAgICBsaW5rOiBuZXcgRm9ybUNvbnRyb2woKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZvcm0uY29udHJvbHMubGluay5zZXRWYWxpZGF0b3JzKGNvbnRyb2wgPT4gdGhpcy5saW5rVmFsaWRhdG9yKGNvbnRyb2wpKTtcblxuICAgICAgICB0aGlzLnR5cGVDaGFuZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5mb3JtLmNvbnRyb2xzW1widHlwZVwiXS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMudHlwZUNoYW5nZWQoKSk7XG4gICAgICAgIHRoaXMudHlwZUNoYW5nZWQoKTtcblxuICAgICAgICB0aGlzLmV4aXN0aW5nID0gdW5kZWZpbmVkO1xuICAgICAgICBNQVJLUzogZm9yIChjb25zdCBtYXJrIG9mIGZpbmRNYXJrc0luU2VsZWN0aW9uKHRoaXMuZWRpdG9yLnN0YXRlLCBzY2hlbWEubWFya3MubGluaykpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IHRoaXMucGFyc2VMaW5rKG1hcmsuYXR0cnMuaHJlZik7XG4gICAgICAgICAgICBpZiAocGFyc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW1widHlwZVwiXS5zZXRWYWx1ZShwYXJzZWQudHlwZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW1wibGlua1wiXS5zZXRWYWx1ZShwYXJzZWQubGluayk7XG4gICAgICAgICAgICAgICAgdGhpcy5leGlzdGluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdW5zdWJzY3JpYmUodGhpcy50eXBlQ2hhbmdlc1N1YnNjcmlwdGlvbik7XG4gICAgfVxuXG59XG4iXX0=