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
        styles: [`:host ion-item:not(.ion-dirty) { --highlight-height: 0px; }`]
    })
], LinkModal);
export { LinkModal };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1tb2RhbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yLyIsInNvdXJjZXMiOlsibGluay1tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFrQixXQUFXLEVBQUUsU0FBUyxFQUFvQixVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDbEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBR2hELE9BQU8sRUFBQyxlQUFlLEVBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBMEZ6RSxJQUFhLFNBQVMsaUJBQXRCLE1BQWEsU0FBUztJQVFsQixZQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFDcEQsQ0FBQztJQVBELE1BQU0sQ0FBTyxPQUFPLENBQUMsZUFBZ0MsRUFBRSxNQUFrQjs7WUFFckUsTUFBTSxLQUFLLEdBQUcsTUFBTSxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUMsU0FBUyxFQUFFLFdBQVMsRUFBRSxjQUFjLEVBQUUsRUFBQyxNQUFNLEVBQUUsTUFBTSxF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LEVBQUU7eUNBQ21CO0FBUzNCO0lBREMsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQzs2Q0FDaEI7QUFyQmQsU0FBUztJQXhGckIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBa0ZUO2lCQUVHLDZEQUE2RDtLQUVwRSxDQUFDO0dBQ1csU0FBUyxDQWlNckI7U0FqTVksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0aW9uRXJyb3JzLCBWYWxpZGF0b3JzfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7Rm9ybUhlbHBlcn0gZnJvbSBcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2Zvcm0taGVscGVyXCI7XG5pbXBvcnQge3NsZWVwfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7dW5zdWJzY3JpYmV9IGZyb20gXCJAY28ubW1vbnMvcnhqcy11dGlsc1wiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHt0b2dnbGVNYXJrfSBmcm9tIFwicHJvc2VtaXJyb3ItY29tbWFuZHNcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtIdG1sRWRpdG9yfSBmcm9tIFwiLi9lZGl0b3JcIjtcbmltcG9ydCB7RGVmYXVsdExpbmtUeXBlLCBMaW5rVHlwZX0gZnJvbSBcIi4vbGluay10eXBlXCI7XG5pbXBvcnQge3NjaGVtYX0gZnJvbSBcIi4vcHJvc2VtaXJyb3Ivc2NoZW1hXCI7XG5pbXBvcnQge2ZpbmRNYXJrc0luU2VsZWN0aW9ufSBmcm9tIFwiLi9wcm9zZW1pcnJvci91dGlscy9maW5kLW1hcmtzLWluLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtmaW5kTm9kZVN0YXJ0RW5kfSBmcm9tIFwiLi9wcm9zZW1pcnJvci91dGlscy9maW5kLW5vZGUtc3RhcnQtZW5kXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpb24taGVhZGVyPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8aW9uLXRvb2xiYXI+XG5cbiAgICAgICAgICAgICAgICA8aW9ueC1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxuXG4gICAgICAgICAgICAgICAgICAgIDxpb24tYnV0dG9uIGZpbGw9XCJjbGVhclwiIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJjbG9zZSgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW9uLWljb24gbmFtZT1cImNsb3NlXCIgc2xvdD1cImljb24tb25seVwiPjwvaW9uLWljb24+XG4gICAgICAgICAgICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cblxuICAgICAgICAgICAgICAgIDwvaW9ueC1idXR0b25zPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxpb24tdGl0bGUgc3R5bGU9XCJtYXJnaW46IDA7IHBhZGRpbmc6IDA7XCI+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI2xpbmsvTGlua1wiIHwgaW50bE1lc3NhZ2V9fTwvaW9uLXRpdGxlPlxuXG4gICAgICAgICAgICAgICAgPGlvbngtYnV0dG9ucyBzbG90PVwiZW5kXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgPGlvbi1idXR0b24gZmlsbD1cImNsZWFyXCIgY29sb3I9XCJkYXJrXCIgKGNsaWNrKT1cInVubGluaygpXCIgKm5nSWY9XCJleGlzdGluZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJ0cmFzaFwiIHNsb3Q9XCJzdGFydFwiPjwvaW9uLWljb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW9uLWxhYmVsPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNsaW5rL1VubGlua1wiIHwgaW50bE1lc3NhZ2V9fTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L2lvbi1idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgPGlvbi1idXR0b24gZmlsbD1cImNsZWFyXCIgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cIm9rKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwiY2hlY2ttYXJrXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpb24tbGFiZWw+e3tcIkBjby5tbW9ucy9qcy1pbnRsI0RvbmVcIiB8IGludGxNZXNzYWdlfX08L2lvbi1sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9pb24tYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8L2lvbngtYnV0dG9ucz5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIDwvaW9uLXRvb2xiYXI+XG4gICAgICAgICAgICBcbiAgICAgICAgPC9pb24taGVhZGVyPlxuICAgICAgICA8aW9uLWNvbnRlbnQ+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxmb3JtIGlvbngtZm9ybS1oZWxwZXIgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGlvbi1ncmlkPlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPGlvbi1yb3c+XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpb24tY29sIFtzaXplWHNdPVwiMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW9ueC1mb3JtLWl0ZW0+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1pdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1sYWJlbCBwb3NpdGlvbj1cInN0YWNrZWRcIj57e1wiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IjbGluay9MaW5rIHR5cGVcIiB8IGludGxNZXNzYWdlfX08L2lvbi1sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpb254LXNlbGVjdCByZXF1aXJlZCBbY29tcGFyZUFzU3RyaW5nXT1cInRydWVcIiBmb3JtQ29udHJvbE5hbWU9XCJ0eXBlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlvbngtc2VsZWN0LW9wdGlvbiAqbmdGb3I9XCJsZXQgdHlwZSBvZiB0eXBlc1wiIFt2YWx1ZV09XCJ0eXBlXCI+e3t0eXBlLmxhYmVsIHwgaW50bE1lc3NhZ2V9fTwvaW9ueC1zZWxlY3Qtb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9pb254LXNlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9pb24taXRlbT5cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2lvbngtZm9ybS1pdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9pb24tY29sPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW9uLWNvbCBbc2l6ZVhzXT1cIjEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlvbngtZm9ybS1pdGVtPlxuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW9uLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW9uLWxhYmVsIHBvc2l0aW9uPVwic3RhY2tlZFwiPnt7KGZvcm0uY29udHJvbHNbJ3R5cGUnXS52YWx1ZS5pbnB1dExhYmVsIHx8IFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IjbGluay9MaW5rXCIpIHwgaW50bE1lc3NhZ2V9fTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1pbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJsaW5rXCIgdHlwZT1cImZvcm0uY29udHJvbHNbJ3R5cGUnXS52YWx1ZS5pbnB1dFR5cGVcIj48L2lvbi1pbnB1dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9pb24taXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpb254LWZvcm0taXRlbS1lcnJvciBjb250cm9sPVwibGlua1wiIG1hcmtlZEFzPVwiZGlydHlcIj48L2lvbngtZm9ybS1pdGVtLWVycm9yPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlvbngtZm9ybS1pdGVtLWhpbnQgKm5nSWY9XCJmb3JtLmNvbnRyb2xzWyd0eXBlJ10udmFsdWUuaW5wdXRIaW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cImZvcm0uY29udHJvbHNbJ3R5cGUnXS52YWx1ZS5pbnB1dEhpbnQgfCBpbnRsTWVzc2FnZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9pb254LWZvcm0taXRlbS1oaW50PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9pb254LWZvcm0taXRlbT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9pb24tY29sPlxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDwvaW9uLXJvdz5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDwvaW9uLWdyaWQ+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICBcbiAgICAgICAgPC9pb24tY29udGVudD5cbiAgICBgLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgOmhvc3QgaW9uLWl0ZW06bm90KC5pb24tZGlydHkpIHsgLS1oaWdobGlnaHQtaGVpZ2h0OiAwcHg7IH1gXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5rTW9kYWwgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBzdGF0aWMgYXN5bmMgcHJlc2VudChtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlciwgZWRpdG9yOiBIdG1sRWRpdG9yKSB7XG5cbiAgICAgICAgY29uc3QgbW9kYWwgPSBhd2FpdCBtb2RhbENvbnRyb2xsZXIuY3JlYXRlKHtjb21wb25lbnQ6IExpbmtNb2RhbCwgY29tcG9uZW50UHJvcHM6IHtlZGl0b3I6IGVkaXRvcn19KTtcbiAgICAgICAgbW9kYWwucHJlc2VudCgpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIpIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgZWRpdG9yOiBIdG1sRWRpdG9yO1xuXG4gICAgZXhpc3Rpbmc6IGJvb2xlYW47XG5cbiAgICB0eXBlczogTGlua1R5cGVbXTtcblxuICAgIGZvcm06IEZvcm1Hcm91cDtcblxuICAgIEBWaWV3Q2hpbGQoRm9ybUhlbHBlciwge3N0YXRpYzogZmFsc2V9KVxuICAgIGZvcm1IZWxwZXI6IEZvcm1IZWxwZXI7XG5cbiAgICBhc3luYyBjbG9zZSgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgICAgICB0aGlzLmVkaXRvci5mb2N1cygpO1xuICAgIH1cblxuICAgIGFzeW5jIHVubGluaygpIHtcblxuICAgICAgICBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5lZGl0b3Iuc3RhdGUuc2VsZWN0aW9uO1xuXG4gICAgICAgIGlmIChzZWxlY3Rpb24uZW1wdHkpIHtcblxuICAgICAgICAgICAgY29uc3QgdHIgPSB0aGlzLmVkaXRvci5zdGF0ZS50cjtcblxuICAgICAgICAgICAgdHIuZG9jLm5vZGVzQmV0d2VlbihzZWxlY3Rpb24uZnJvbSwgc2VsZWN0aW9uLnRvLCAobm9kZSwgcG9zKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAobm9kZS5pc1RleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJHBvcyA9IHRyLmRvYy5yZXNvbHZlKHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gcG9zIC0gJHBvcy50ZXh0T2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSBzdGFydCArICRwb3MucGFyZW50LmNoaWxkKCRwb3MuaW5kZXgoKSkubm9kZVNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgdHIucmVtb3ZlTWFyayhzdGFydCwgZW5kLCBzY2hlbWEubWFya3MubGluayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnZpZXcuZGlzcGF0Y2godHIpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b2dnbGVNYXJrKHNjaGVtYS5tYXJrcy5saW5rKSh0aGlzLmVkaXRvci5zdGF0ZSwgdHIgPT4gdGhpcy5lZGl0b3Iudmlldy5kaXNwYXRjaCh0cikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgb2soKSB7XG4gICAgICAgIHRoaXMuZm9ybUhlbHBlci52YWxpZGF0ZUFsbChcImRpcnR5XCIpO1xuXG4gICAgICAgIGlmICh0aGlzLmZvcm0udmFsaWQpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcblxuICAgICAgICAgICAgY29uc3QgbGlua1R5cGUgPSB0aGlzLmZvcm0uY29udHJvbHMudHlwZS52YWx1ZSBhcyBMaW5rVHlwZTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZWRpdG9yLnN0YXRlLnNlbGVjdGlvbjtcblxuICAgICAgICAgICAgY29uc3QgdHIgPSB0aGlzLmVkaXRvci5zdGF0ZS50cjtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5lbXB0eSkge1xuXG4gICAgICAgICAgICAgICAgdHIuZG9jLm5vZGVzQmV0d2VlbihzZWxlY3Rpb24uZnJvbSwgc2VsZWN0aW9uLnRvLCAobm9kZSwgcG9zKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuaXNUZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7c3RhcnQsIGVuZH0gPSBmaW5kTm9kZVN0YXJ0RW5kKHRyLmRvYywgcG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyLmFkZE1hcmsoc3RhcnQsIGVuZCwgc2NoZW1hLm1hcmsoc2NoZW1hLm1hcmtzLmxpbmssIHtocmVmOiBsaW5rVHlwZS51cmkodGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsudmFsdWUpfSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLyB1c3V3YW15IHBvcHJ6ZWRuaSBsaW5rXG4gICAgICAgICAgICAgICAgdHIuZG9jLm5vZGVzQmV0d2VlbihzZWxlY3Rpb24uZnJvbSwgc2VsZWN0aW9uLnRvLCAobm9kZSwgcG9zKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuaXNUZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7c3RhcnQsIGVuZH0gPSBmaW5kTm9kZVN0YXJ0RW5kKHRyLmRvYywgcG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyLnJlbW92ZU1hcmsoc3RhcnQsIGVuZCwgc2NoZW1hLm1hcmtzLmxpbmspO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0ci5hZGRNYXJrKHNlbGVjdGlvbi5mcm9tLCBzZWxlY3Rpb24udG8sIHNjaGVtYS5tYXJrKHNjaGVtYS5tYXJrcy5saW5rLCB7aHJlZjogbGlua1R5cGUudXJpKHRoaXMuZm9ybS5jb250cm9scy5saW5rLnZhbHVlKX0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lZGl0b3Iudmlldy5kaXNwYXRjaCh0cik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHR5cGVDaGFuZ2VkKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmZvcm0uY29udHJvbHMubGluay52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsubWFya0FzRGlydHkoKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9scy5saW5rLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHNsZWVwKDUwKTsgLy8gd2UgbXVzdCB3YWl0IGZvciBjbG9zaW5nIHR5cGUgc2VsZWN0b3JcblxuICAgICAgICB0aGlzLmZvcm1IZWxwZXIuZm9jdXMoXCJsaW5rXCIsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlTGluayh1cmk6IHN0cmluZyk6IHt0eXBlOiBMaW5rVHlwZSwgbGluazogc3RyaW5nfSB7XG5cbiAgICAgICAgY29uc3QgcHJlZml4ZXMgPSB7XG4gICAgICAgICAgICBcImh0dHA6XCI6IERlZmF1bHRMaW5rVHlwZS53d3csXG4gICAgICAgICAgICBcImh0dHBzOlwiOiBEZWZhdWx0TGlua1R5cGUud3d3LFxuICAgICAgICAgICAgXCJ0ZWw6XCI6IERlZmF1bHRMaW5rVHlwZS50ZWwsXG4gICAgICAgICAgICBcInNtczpcIjogRGVmYXVsdExpbmtUeXBlLnNtcyxcbiAgICAgICAgICAgIFwibWFpbHRvOlwiOiBEZWZhdWx0TGlua1R5cGUuZW1haWxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBsb3dlckNhc2VkVXJpID0gdXJpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJlZml4IG9mIE9iamVjdC5rZXlzKHByZWZpeGVzKSkge1xuICAgICAgICAgICAgaWYgKGxvd2VyQ2FzZWRVcmkuc3RhcnRzV2l0aChwcmVmaXgpKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rID0ge3R5cGU6IHByZWZpeGVzW3ByZWZpeF0sIGxpbms6IHVyaS50cmltKCl9O1xuXG4gICAgICAgICAgICAgICAgaWYgKHByZWZpeGVzW3ByZWZpeF0gIT09IERlZmF1bHRMaW5rVHlwZS53d3cpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluay5saW5rID0gdXJpLnN1YnN0cmluZyhwcmVmaXgubGVuZ3RoKS50cmltKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpbms7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge3R5cGU6IERlZmF1bHRMaW5rVHlwZS5vdGhlciwgbGluazogdXJpfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxpbmtWYWxpZGF0b3IoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB7XG5cbiAgICAgICAgY29uc3QgcmVxdWlyZWQgPSBWYWxpZGF0b3JzLnJlcXVpcmVkKGNvbnRyb2wpO1xuICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLmZvcm0uY29udHJvbHMudHlwZS52YWx1ZSBhcyBMaW5rVHlwZTtcbiAgICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IHR5cGUuaW5wdXRWYWxpZGF0b3JzO1xuXG4gICAgICAgIGlmICh2YWxpZGF0b3JzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZhbGlkYXRvciBvZiB2YWxpZGF0b3JzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgciA9IHZhbGlkYXRvcihjb250cm9sKTtcbiAgICAgICAgICAgICAgICBpZiAocikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBpb25WaWV3RGlkRW50ZXIoKSB7XG4gICAgICAgIHRoaXMuZm9ybUhlbHBlci5mb2N1cyhcImxpbmtcIiwgZmFsc2UpO1xuICAgIH1cblxuICAgIGFzeW5jIGlvblZpZXdXaWxsTGVhdmUoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0eXBlQ2hhbmdlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudHlwZXMgPSBbRGVmYXVsdExpbmtUeXBlLnd3dywgRGVmYXVsdExpbmtUeXBlLmVtYWlsLCBEZWZhdWx0TGlua1R5cGUudGVsLCBEZWZhdWx0TGlua1R5cGUuc21zLCBEZWZhdWx0TGlua1R5cGUub3RoZXJdO1xuXG4gICAgICAgIHRoaXMuZm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xuICAgICAgICAgICAgdHlwZTogbmV3IEZvcm1Db250cm9sKERlZmF1bHRMaW5rVHlwZS53d3cpLFxuICAgICAgICAgICAgbGluazogbmV3IEZvcm1Db250cm9sKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsuc2V0VmFsaWRhdG9ycyhjb250cm9sID0+IHRoaXMubGlua1ZhbGlkYXRvcihjb250cm9sKSk7XG5cbiAgICAgICAgdGhpcy50eXBlQ2hhbmdlc1N1YnNjcmlwdGlvbiA9IHRoaXMuZm9ybS5jb250cm9sc1tcInR5cGVcIl0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnR5cGVDaGFuZ2VkKCkpO1xuICAgICAgICB0aGlzLnR5cGVDaGFuZ2VkKCk7XG5cbiAgICAgICAgdGhpcy5leGlzdGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgTUFSS1M6IGZvciAoY29uc3QgbWFyayBvZiBmaW5kTWFya3NJblNlbGVjdGlvbih0aGlzLmVkaXRvci5zdGF0ZSwgc2NoZW1hLm1hcmtzLmxpbmspKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJzZWQgPSB0aGlzLnBhcnNlTGluayhtYXJrLmF0dHJzLmhyZWYpO1xuICAgICAgICAgICAgaWYgKHBhcnNlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tcInR5cGVcIl0uc2V0VmFsdWUocGFyc2VkLnR5cGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tcImxpbmtcIl0uc2V0VmFsdWUocGFyc2VkLmxpbmspO1xuICAgICAgICAgICAgICAgIHRoaXMuZXhpc3RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHVuc3Vic2NyaWJlKHRoaXMudHlwZUNoYW5nZXNTdWJzY3JpcHRpb24pO1xuICAgIH1cblxufVxuIl19