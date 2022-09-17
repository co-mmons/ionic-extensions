import { __awaiter } from "tslib";
import { Component, Input, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormHelper } from "@co.mmons/ionic-extensions/form-helper";
import { sleep, waitTill } from "@co.mmons/js-utils/core";
import { unsubscribe } from "@co.mmons/rxjs-utils";
import { ModalController } from "@ionic/angular";
import { toggleMark } from "prosemirror-commands";
import { DefaultLinkType } from "./link-type";
import { schema } from "./prosemirror/schema";
import { findMarksInSelection } from "./prosemirror/utils/find-marks-in-selection";
import { findNodeStartEnd } from "./prosemirror/utils/find-node-start-end";
export class LinkModal {
    constructor(modalController) {
        this.modalController = modalController;
    }
    static present(modalController, editor) {
        return __awaiter(this, void 0, void 0, function* () {
            const modal = yield modalController.create({ component: LinkModal, componentProps: { editor: editor } });
            modal.present();
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.modalController.dismiss();
            this.editor.focus();
        });
    }
    unlink() {
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
            if (this.form.controls.link.value) {
                this.form.controls.link.markAsDirty();
                this.form.controls.link.updateValueAndValidity();
            }
            yield sleep(50); // we must wait for closing type selector
            if (this.formHelper) {
                this.formHelper.focus("link", false);
            }
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
        return __awaiter(this, void 0, void 0, function* () {
            this.types = [DefaultLinkType.www, DefaultLinkType.email, DefaultLinkType.tel, DefaultLinkType.sms, DefaultLinkType.other];
            this.form = new FormGroup({
                type: new FormControl(this.existingType || DefaultLinkType.www),
                link: new FormControl(this.existingLink)
            });
            this.form.controls.link.setValidators(control => this.linkValidator(control));
            this.typeChangesSubscription = this.form.controls["type"].valueChanges.subscribe(() => this.typeChanged());
            this.typeChanged();
            yield waitTill(() => !!this.formHelper);
            this.formHelper.focus("link", false);
        });
    }
    ionViewWillLeave() {
        return __awaiter(this, void 0, void 0, function* () {
            this.editor.focus();
        });
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
    ngOnDestroy() {
        unsubscribe(this.typeChangesSubscription);
    }
}
LinkModal.decorators = [
    { type: Component, args: [{
                template: "<ion-header>\n\n    <ion-toolbar>\n\n        <ionx-buttons slot=\"start\">\n            <ion-back-button style=\"display: inline-block\" [icon]=\"('tablet' | matchGreaterWidth) ? 'close' : null\" (click)=\"$event.preventDefault(); close()\"></ion-back-button>\n        </ionx-buttons>\n\n        <ion-title style=\"margin: 0; padding: 0;\">{{\"@co.mmons/ionic-extensions/html-editor#link/Link\" | intlMessage}}</ion-title>\n\n        <ionx-buttons slot=\"end\">\n\n            <ion-button fill=\"clear\" color=\"dark\" (click)=\"unlink()\" *ngIf=\"existing\">\n                <ion-icon name=\"trash\" slot=\"start\"></ion-icon>\n                <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#link/Unlink\" | intlMessage}}</ion-label>\n            </ion-button>\n\n            <ion-button fill=\"clear\" color=\"primary\" (click)=\"ok()\">\n                <ion-icon name=\"checkmark\" slot=\"start\"></ion-icon>\n                <ion-label>{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-label>\n            </ion-button>\n\n        </ionx-buttons>\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content [forceOverscroll]=\"false\">\n\n    <ionx-spinner slot=\"fixed\" fill *ngIf=\"!form\"></ionx-spinner>\n\n    <form ionx-form-helper [formGroup]=\"form\" *ngIf=\"form\">\n\n        <ion-grid>\n\n            <ion-row>\n\n                <ion-col [sizeXs]=\"12\">\n\n                    <ionx-form-item>\n\n                        <ion-item>\n                            <ion-label position=\"stacked\">{{\"@co.mmons/ionic-extensions/html-editor#link/Link type\" | intlMessage}}</ion-label>\n                            <ionx-select required [compareAsString]=\"true\" formControlName=\"type\">\n                                <ionx-select-option *ngFor=\"let type of types\" [value]=\"type\">{{type.label | intlMessage}}</ionx-select-option>\n                            </ionx-select>\n                        </ion-item>\n\n                    </ionx-form-item>\n\n                </ion-col>\n\n                <ion-col [sizeXs]=\"12\">\n\n                    <ionx-form-item>\n\n                        <ion-item>\n                            <ion-label position=\"stacked\">{{(form.controls['type'].value.inputLabel || \"@co.mmons/ionic-extensions/html-editor#link/Link\") | intlMessage}}</ion-label>\n                            <ion-input formControlName=\"link\" type=\"form.controls['type'].value.inputType\"></ion-input>\n                        </ion-item>\n\n                        <ionx-form-item-error control=\"link\" markedAs=\"dirty\"></ionx-form-item-error>\n\n                        <ionx-form-item-hint *ngIf=\"form.controls['type'].value.inputHint\">\n                            <span [innerHTML]=\"form.controls['type'].value.inputHint | intlMessage\"></span>\n                        </ionx-form-item-hint>\n\n                    </ionx-form-item>\n\n                </ion-col>\n\n            </ion-row>\n\n\n        </ion-grid>\n\n    </form>\n\n</ion-content>\n",
                styles: [`:host ion-item:not(.ion-dirty) { --highlight-height: 0px; }`]
            },] }
];
LinkModal.ctorParameters = () => [
    { type: ModalController }
];
LinkModal.propDecorators = {
    editor: [{ type: Input }],
    formHelper: [{ type: ViewChild, args: [FormHelper, { static: false },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1tb2RhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9odG1sLWVkaXRvci9saW5rLW1vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBcUIsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBa0IsV0FBVyxFQUFFLFNBQVMsRUFBb0IsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDckcsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFHaEQsT0FBTyxFQUFDLGVBQWUsRUFBVyxNQUFNLGFBQWEsQ0FBQztBQUN0RCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFDakYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFRekUsTUFBTSxPQUFPLFNBQVM7SUFRbEIsWUFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQ3BELENBQUM7SUFQRCxNQUFNLENBQU8sT0FBTyxDQUFDLGVBQWdDLEVBQUUsTUFBa0I7O1lBRXJFLE1BQU0sS0FBSyxHQUFHLE1BQU0sZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBQyxFQUFDLENBQUMsQ0FBQztZQUNy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LFNBQVMsU0FBQztnQkFDUCxxOEZBQThCO3lCQUUxQiw2REFBNkQ7YUFFcEU7OztZQWRPLGVBQWU7OztxQkEwQmxCLEtBQUs7eUJBYUwsU0FBUyxTQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q2hpbGR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yc30gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge0Zvcm1IZWxwZXJ9IGZyb20gXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9mb3JtLWhlbHBlclwiO1xuaW1wb3J0IHtzbGVlcCwgd2FpdFRpbGx9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHt1bnN1YnNjcmliZX0gZnJvbSBcIkBjby5tbW9ucy9yeGpzLXV0aWxzXCI7XG5pbXBvcnQge01vZGFsQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge3RvZ2dsZU1hcmt9IGZyb20gXCJwcm9zZW1pcnJvci1jb21tYW5kc1wiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0h0bWxFZGl0b3J9IGZyb20gXCIuL2VkaXRvclwiO1xuaW1wb3J0IHtEZWZhdWx0TGlua1R5cGUsIExpbmtUeXBlfSBmcm9tIFwiLi9saW5rLXR5cGVcIjtcbmltcG9ydCB7c2NoZW1hfSBmcm9tIFwiLi9wcm9zZW1pcnJvci9zY2hlbWFcIjtcbmltcG9ydCB7ZmluZE1hcmtzSW5TZWxlY3Rpb259IGZyb20gXCIuL3Byb3NlbWlycm9yL3V0aWxzL2ZpbmQtbWFya3MtaW4tc2VsZWN0aW9uXCI7XG5pbXBvcnQge2ZpbmROb2RlU3RhcnRFbmR9IGZyb20gXCIuL3Byb3NlbWlycm9yL3V0aWxzL2ZpbmQtbm9kZS1zdGFydC1lbmRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6IFwibGluay1tb2RhbC5odG1sXCIsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGA6aG9zdCBpb24taXRlbTpub3QoLmlvbi1kaXJ0eSkgeyAtLWhpZ2hsaWdodC1oZWlnaHQ6IDBweDsgfWBcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIExpbmtNb2RhbCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcblxuICAgIHN0YXRpYyBhc3luYyBwcmVzZW50KG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLCBlZGl0b3I6IEh0bWxFZGl0b3IpIHtcblxuICAgICAgICBjb25zdCBtb2RhbCA9IGF3YWl0IG1vZGFsQ29udHJvbGxlci5jcmVhdGUoe2NvbXBvbmVudDogTGlua01vZGFsLCBjb21wb25lbnRQcm9wczoge2VkaXRvcjogZWRpdG9yfX0pO1xuICAgICAgICBtb2RhbC5wcmVzZW50KCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBlZGl0b3I6IEh0bWxFZGl0b3I7XG5cbiAgICBleGlzdGluZzogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgZXhpc3RpbmdUeXBlOiBMaW5rVHlwZTtcblxuICAgIHByaXZhdGUgZXhpc3RpbmdMaW5rOiBzdHJpbmc7XG5cbiAgICB0eXBlczogTGlua1R5cGVbXTtcblxuICAgIGZvcm06IEZvcm1Hcm91cDtcblxuICAgIEBWaWV3Q2hpbGQoRm9ybUhlbHBlciwge3N0YXRpYzogZmFsc2V9KVxuICAgIGZvcm1IZWxwZXI6IEZvcm1IZWxwZXI7XG5cbiAgICBhc3luYyBjbG9zZSgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgICAgICB0aGlzLmVkaXRvci5mb2N1cygpO1xuICAgIH1cblxuICAgIGFzeW5jIHVubGluaygpIHtcblxuICAgICAgICBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5lZGl0b3Iuc3RhdGUuc2VsZWN0aW9uO1xuXG4gICAgICAgIGlmIChzZWxlY3Rpb24uZW1wdHkpIHtcblxuICAgICAgICAgICAgY29uc3QgdHIgPSB0aGlzLmVkaXRvci5zdGF0ZS50cjtcblxuICAgICAgICAgICAgdHIuZG9jLm5vZGVzQmV0d2VlbihzZWxlY3Rpb24uZnJvbSwgc2VsZWN0aW9uLnRvLCAobm9kZSwgcG9zKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAobm9kZS5pc1RleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJHBvcyA9IHRyLmRvYy5yZXNvbHZlKHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gcG9zIC0gJHBvcy50ZXh0T2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSBzdGFydCArICRwb3MucGFyZW50LmNoaWxkKCRwb3MuaW5kZXgoKSkubm9kZVNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgdHIucmVtb3ZlTWFyayhzdGFydCwgZW5kLCBzY2hlbWEubWFya3MubGluayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnZpZXcuZGlzcGF0Y2godHIpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b2dnbGVNYXJrKHNjaGVtYS5tYXJrcy5saW5rKSh0aGlzLmVkaXRvci5zdGF0ZSwgdHIgPT4gdGhpcy5lZGl0b3Iudmlldy5kaXNwYXRjaCh0cikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgb2soKSB7XG4gICAgICAgIHRoaXMuZm9ybUhlbHBlci52YWxpZGF0ZUFsbChcImRpcnR5XCIpO1xuXG4gICAgICAgIGlmICh0aGlzLmZvcm0udmFsaWQpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcblxuICAgICAgICAgICAgY29uc3QgbGlua1R5cGUgPSB0aGlzLmZvcm0uY29udHJvbHMudHlwZS52YWx1ZSBhcyBMaW5rVHlwZTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZWRpdG9yLnN0YXRlLnNlbGVjdGlvbjtcblxuICAgICAgICAgICAgY29uc3QgdHIgPSB0aGlzLmVkaXRvci5zdGF0ZS50cjtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5lbXB0eSkge1xuXG4gICAgICAgICAgICAgICAgdHIuZG9jLm5vZGVzQmV0d2VlbihzZWxlY3Rpb24uZnJvbSwgc2VsZWN0aW9uLnRvLCAobm9kZSwgcG9zKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuaXNUZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7c3RhcnQsIGVuZH0gPSBmaW5kTm9kZVN0YXJ0RW5kKHRyLmRvYywgcG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyLmFkZE1hcmsoc3RhcnQsIGVuZCwgc2NoZW1hLm1hcmsoc2NoZW1hLm1hcmtzLmxpbmssIHtocmVmOiBsaW5rVHlwZS51cmkodGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsudmFsdWUpfSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLyB1c3V3YW15IHBvcHJ6ZWRuaSBsaW5rXG4gICAgICAgICAgICAgICAgdHIuZG9jLm5vZGVzQmV0d2VlbihzZWxlY3Rpb24uZnJvbSwgc2VsZWN0aW9uLnRvLCAobm9kZSwgcG9zKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuaXNUZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7c3RhcnQsIGVuZH0gPSBmaW5kTm9kZVN0YXJ0RW5kKHRyLmRvYywgcG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyLnJlbW92ZU1hcmsoc3RhcnQsIGVuZCwgc2NoZW1hLm1hcmtzLmxpbmspO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0ci5hZGRNYXJrKHNlbGVjdGlvbi5mcm9tLCBzZWxlY3Rpb24udG8sIHNjaGVtYS5tYXJrKHNjaGVtYS5tYXJrcy5saW5rLCB7aHJlZjogbGlua1R5cGUudXJpKHRoaXMuZm9ybS5jb250cm9scy5saW5rLnZhbHVlKX0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lZGl0b3Iudmlldy5kaXNwYXRjaCh0cik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHR5cGVDaGFuZ2VkKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmZvcm0uY29udHJvbHMubGluay52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsubWFya0FzRGlydHkoKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9scy5saW5rLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHNsZWVwKDUwKTsgLy8gd2UgbXVzdCB3YWl0IGZvciBjbG9zaW5nIHR5cGUgc2VsZWN0b3JcblxuICAgICAgICBpZiAodGhpcy5mb3JtSGVscGVyKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1IZWxwZXIuZm9jdXMoXCJsaW5rXCIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VMaW5rKHVyaTogc3RyaW5nKToge3R5cGU6IExpbmtUeXBlLCBsaW5rOiBzdHJpbmd9IHtcblxuICAgICAgICBjb25zdCBwcmVmaXhlcyA9IHtcbiAgICAgICAgICAgIFwiaHR0cDpcIjogRGVmYXVsdExpbmtUeXBlLnd3dyxcbiAgICAgICAgICAgIFwiaHR0cHM6XCI6IERlZmF1bHRMaW5rVHlwZS53d3csXG4gICAgICAgICAgICBcInRlbDpcIjogRGVmYXVsdExpbmtUeXBlLnRlbCxcbiAgICAgICAgICAgIFwic21zOlwiOiBEZWZhdWx0TGlua1R5cGUuc21zLFxuICAgICAgICAgICAgXCJtYWlsdG86XCI6IERlZmF1bHRMaW5rVHlwZS5lbWFpbFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGxvd2VyQ2FzZWRVcmkgPSB1cmkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgZm9yIChjb25zdCBwcmVmaXggb2YgT2JqZWN0LmtleXMocHJlZml4ZXMpKSB7XG4gICAgICAgICAgICBpZiAobG93ZXJDYXNlZFVyaS5zdGFydHNXaXRoKHByZWZpeCkpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmsgPSB7dHlwZTogcHJlZml4ZXNbcHJlZml4XSwgbGluazogdXJpLnRyaW0oKX07XG5cbiAgICAgICAgICAgICAgICBpZiAocHJlZml4ZXNbcHJlZml4XSAhPT0gRGVmYXVsdExpbmtUeXBlLnd3dykge1xuICAgICAgICAgICAgICAgICAgICBsaW5rLmxpbmsgPSB1cmkuc3Vic3RyaW5nKHByZWZpeC5sZW5ndGgpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbGluaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7dHlwZTogRGVmYXVsdExpbmtUeXBlLm90aGVyLCBsaW5rOiB1cml9O1xuICAgIH1cblxuICAgIHByaXZhdGUgbGlua1ZhbGlkYXRvcihjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHtcblxuICAgICAgICBjb25zdCByZXF1aXJlZCA9IFZhbGlkYXRvcnMucmVxdWlyZWQoY29udHJvbCk7XG4gICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMuZm9ybS5jb250cm9scy50eXBlLnZhbHVlIGFzIExpbmtUeXBlO1xuICAgICAgICBjb25zdCB2YWxpZGF0b3JzID0gdHlwZS5pbnB1dFZhbGlkYXRvcnM7XG5cbiAgICAgICAgaWYgKHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdmFsaWRhdG9yIG9mIHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByID0gdmFsaWRhdG9yKGNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGlvblZpZXdEaWRFbnRlcigpIHtcblxuICAgICAgICB0aGlzLnR5cGVzID0gW0RlZmF1bHRMaW5rVHlwZS53d3csIERlZmF1bHRMaW5rVHlwZS5lbWFpbCwgRGVmYXVsdExpbmtUeXBlLnRlbCwgRGVmYXVsdExpbmtUeXBlLnNtcywgRGVmYXVsdExpbmtUeXBlLm90aGVyXTtcblxuICAgICAgICB0aGlzLmZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcbiAgICAgICAgICAgIHR5cGU6IG5ldyBGb3JtQ29udHJvbCh0aGlzLmV4aXN0aW5nVHlwZSB8fCBEZWZhdWx0TGlua1R5cGUud3d3KSxcbiAgICAgICAgICAgIGxpbms6IG5ldyBGb3JtQ29udHJvbCh0aGlzLmV4aXN0aW5nTGluaylcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsuc2V0VmFsaWRhdG9ycyhjb250cm9sID0+IHRoaXMubGlua1ZhbGlkYXRvcihjb250cm9sKSk7XG5cbiAgICAgICAgdGhpcy50eXBlQ2hhbmdlc1N1YnNjcmlwdGlvbiA9IHRoaXMuZm9ybS5jb250cm9sc1tcInR5cGVcIl0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnR5cGVDaGFuZ2VkKCkpO1xuICAgICAgICB0aGlzLnR5cGVDaGFuZ2VkKCk7XG5cbiAgICAgICAgYXdhaXQgd2FpdFRpbGwoKCkgPT4gISF0aGlzLmZvcm1IZWxwZXIpO1xuXG4gICAgICAgIHRoaXMuZm9ybUhlbHBlci5mb2N1cyhcImxpbmtcIiwgZmFsc2UpO1xuICAgIH1cblxuICAgIGFzeW5jIGlvblZpZXdXaWxsTGVhdmUoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgTUFSS1M6IGZvciAoY29uc3QgbWFyayBvZiBmaW5kTWFya3NJblNlbGVjdGlvbih0aGlzLmVkaXRvci5zdGF0ZSwgc2NoZW1hLm1hcmtzLmxpbmspKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJzZWQgPSB0aGlzLnBhcnNlTGluayhtYXJrLmF0dHJzLmhyZWYpO1xuICAgICAgICAgICAgaWYgKHBhcnNlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhpc3RpbmdUeXBlID0gcGFyc2VkLnR5cGU7XG4gICAgICAgICAgICAgICAgdGhpcy5leGlzdGluZ0xpbmsgPSBwYXJzZWQubGluaztcbiAgICAgICAgICAgICAgICB0aGlzLmV4aXN0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhayBNQVJLUztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdHlwZUNoYW5nZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB1bnN1YnNjcmliZSh0aGlzLnR5cGVDaGFuZ2VzU3Vic2NyaXB0aW9uKTtcbiAgICB9XG5cbn1cbiJdfQ==