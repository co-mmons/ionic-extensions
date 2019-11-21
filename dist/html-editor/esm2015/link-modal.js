import * as tslib_1 from "tslib";
var LinkModal_1;
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
            if (!this.form) {
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
                yield waitTill(() => !!this.formHelper);
                this.formHelper.focus("link", false);
            }
        });
    }
    ionViewWillLeave() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.editor.focus();
        });
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
        template: "<ion-header>\n\n    <ion-toolbar>\n\n        <ionx-buttons slot=\"start\">\n            <ion-back-button style=\"display: inline-block\" [icon]=\"('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back'\" (click)=\"$event.preventDefault(); close()\"></ion-back-button>\n        </ionx-buttons>\n\n        <ion-title style=\"margin: 0; padding: 0;\">{{\"@co.mmons/ionic-extensions/html-editor#link/Link\" | intlMessage}}</ion-title>\n\n        <ionx-buttons slot=\"end\">\n\n            <ion-button fill=\"clear\" color=\"dark\" (click)=\"unlink()\" *ngIf=\"existing\">\n                <ion-icon name=\"trash\" slot=\"start\"></ion-icon>\n                <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#link/Unlink\" | intlMessage}}</ion-label>\n            </ion-button>\n\n            <ion-button fill=\"clear\" color=\"primary\" (click)=\"ok()\">\n                <ion-icon name=\"checkmark\" slot=\"start\"></ion-icon>\n                <ion-label>{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-label>\n            </ion-button>\n\n        </ionx-buttons>\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content [forceOverscroll]=\"false\">\n\n    <ionx-spinner slot=\"fixed\" fill *ngIf=\"!form\"></ionx-spinner>\n\n    <form ionx-form-helper [formGroup]=\"form\" *ngIf=\"form\">\n\n        <ion-grid>\n\n            <ion-row>\n\n                <ion-col [sizeXs]=\"12\">\n\n                    <ionx-form-item>\n\n                        <ion-item>\n                            <ion-label position=\"stacked\">{{\"@co.mmons/ionic-extensions/html-editor#link/Link type\" | intlMessage}}</ion-label>\n                            <ionx-select required [compareAsString]=\"true\" formControlName=\"type\">\n                                <ionx-select-option *ngFor=\"let type of types\" [value]=\"type\">{{type.label | intlMessage}}</ionx-select-option>\n                            </ionx-select>\n                        </ion-item>\n\n                    </ionx-form-item>\n\n                </ion-col>\n\n                <ion-col [sizeXs]=\"12\">\n\n                    <ionx-form-item>\n\n                        <ion-item>\n                            <ion-label position=\"stacked\">{{(form.controls['type'].value.inputLabel || \"@co.mmons/ionic-extensions/html-editor#link/Link\") | intlMessage}}</ion-label>\n                            <ion-input formControlName=\"link\" type=\"form.controls['type'].value.inputType\"></ion-input>\n                        </ion-item>\n\n                        <ionx-form-item-error control=\"link\" markedAs=\"dirty\"></ionx-form-item-error>\n\n                        <ionx-form-item-hint *ngIf=\"form.controls['type'].value.inputHint\">\n                            <span [innerHTML]=\"form.controls['type'].value.inputHint | intlMessage\"></span>\n                        </ionx-form-item-hint>\n\n                    </ionx-form-item>\n\n                </ion-col>\n\n            </ion-row>\n\n\n        </ion-grid>\n\n    </form>\n\n</ion-content>\n",
        styles: [`:host ion-item:not(.ion-dirty) { --highlight-height: 0px; }`]
    })
], LinkModal);
export { LinkModal };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1tb2RhbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yLyIsInNvdXJjZXMiOlsibGluay1tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQWtCLFdBQVcsRUFBRSxTQUFTLEVBQW9CLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JHLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBR2hELE9BQU8sRUFBQyxlQUFlLEVBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBUXpFLElBQWEsU0FBUyxpQkFBdEIsTUFBYSxTQUFTO0lBUWxCLFlBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUNwRCxDQUFDO0lBUEQsTUFBTSxDQUFPLE9BQU8sQ0FBQyxlQUFnQyxFQUFFLE1BQWtCOztZQUVyRSxNQUFNLEtBQUssR0FBRyxNQUFNLGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFBQyxTQUFTLEVBQUUsV0FBUyxFQUFFLGNBQWMsRUFBRSxFQUFDLE1BQU0sRUFB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eEIsQ0FBQztLQUFBO0lBSUQsV0FBVztRQUNQLFdBQVcsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUM5QyxDQUFDO0NBRUosQ0FBQTs7WUE3THdDLGVBQWU7O0FBSXBEO0lBREMsS0FBSyxFQUFFO3lDQUNtQjtBQVMzQjtJQURDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUM7NkNBQ2hCO0FBckJkLFNBQVM7SUFOckIsU0FBUyxDQUFDO1FBQ1AsNjhGQUE4QjtpQkFFMUIsNkRBQTZEO0tBRXBFLENBQUM7R0FDVyxTQUFTLENBcU1yQjtTQXJNWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0aW9uRXJyb3JzLCBWYWxpZGF0b3JzfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7Rm9ybUhlbHBlcn0gZnJvbSBcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2Zvcm0taGVscGVyXCI7XG5pbXBvcnQge3NsZWVwLCB3YWl0VGlsbH0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5pbXBvcnQge3Vuc3Vic2NyaWJlfSBmcm9tIFwiQGNvLm1tb25zL3J4anMtdXRpbHNcIjtcbmltcG9ydCB7TW9kYWxDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7dG9nZ2xlTWFya30gZnJvbSBcInByb3NlbWlycm9yLWNvbW1hbmRzXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7SHRtbEVkaXRvcn0gZnJvbSBcIi4vZWRpdG9yXCI7XG5pbXBvcnQge0RlZmF1bHRMaW5rVHlwZSwgTGlua1R5cGV9IGZyb20gXCIuL2xpbmstdHlwZVwiO1xuaW1wb3J0IHtzY2hlbWF9IGZyb20gXCIuL3Byb3NlbWlycm9yL3NjaGVtYVwiO1xuaW1wb3J0IHtmaW5kTWFya3NJblNlbGVjdGlvbn0gZnJvbSBcIi4vcHJvc2VtaXJyb3IvdXRpbHMvZmluZC1tYXJrcy1pbi1zZWxlY3Rpb25cIjtcbmltcG9ydCB7ZmluZE5vZGVTdGFydEVuZH0gZnJvbSBcIi4vcHJvc2VtaXJyb3IvdXRpbHMvZmluZC1ub2RlLXN0YXJ0LWVuZFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogXCJsaW5rLW1vZGFsLmh0bWxcIixcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYDpob3N0IGlvbi1pdGVtOm5vdCguaW9uLWRpcnR5KSB7IC0taGlnaGxpZ2h0LWhlaWdodDogMHB4OyB9YFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTGlua01vZGFsIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIHN0YXRpYyBhc3luYyBwcmVzZW50KG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLCBlZGl0b3I6IEh0bWxFZGl0b3IpIHtcblxuICAgICAgICBjb25zdCBtb2RhbCA9IGF3YWl0IG1vZGFsQ29udHJvbGxlci5jcmVhdGUoe2NvbXBvbmVudDogTGlua01vZGFsLCBjb21wb25lbnRQcm9wczoge2VkaXRvcjogZWRpdG9yfX0pO1xuICAgICAgICBtb2RhbC5wcmVzZW50KCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBlZGl0b3I6IEh0bWxFZGl0b3I7XG5cbiAgICBleGlzdGluZzogYm9vbGVhbjtcblxuICAgIHR5cGVzOiBMaW5rVHlwZVtdO1xuXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgQFZpZXdDaGlsZChGb3JtSGVscGVyLCB7c3RhdGljOiBmYWxzZX0pXG4gICAgZm9ybUhlbHBlcjogRm9ybUhlbHBlcjtcblxuICAgIGFzeW5jIGNsb3NlKCkge1xuICAgICAgICBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XG4gICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgdW5saW5rKCkge1xuXG4gICAgICAgIGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcblxuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmVkaXRvci5zdGF0ZS5zZWxlY3Rpb247XG5cbiAgICAgICAgaWYgKHNlbGVjdGlvbi5lbXB0eSkge1xuXG4gICAgICAgICAgICBjb25zdCB0ciA9IHRoaXMuZWRpdG9yLnN0YXRlLnRyO1xuXG4gICAgICAgICAgICB0ci5kb2Mubm9kZXNCZXR3ZWVuKHNlbGVjdGlvbi5mcm9tLCBzZWxlY3Rpb24udG8sIChub2RlLCBwb3MpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChub2RlLmlzVGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCAkcG9zID0gdHIuZG9jLnJlc29sdmUocG9zKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBwb3MgLSAkcG9zLnRleHRPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgJHBvcy5wYXJlbnQuY2hpbGQoJHBvcy5pbmRleCgpKS5ub2RlU2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICB0ci5yZW1vdmVNYXJrKHN0YXJ0LCBlbmQsIHNjaGVtYS5tYXJrcy5saW5rKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5lZGl0b3Iudmlldy5kaXNwYXRjaCh0cik7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvZ2dsZU1hcmsoc2NoZW1hLm1hcmtzLmxpbmspKHRoaXMuZWRpdG9yLnN0YXRlLCB0ciA9PiB0aGlzLmVkaXRvci52aWV3LmRpc3BhdGNoKHRyKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBvaygpIHtcbiAgICAgICAgdGhpcy5mb3JtSGVscGVyLnZhbGlkYXRlQWxsKFwiZGlydHlcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuZm9ybS52YWxpZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xuXG4gICAgICAgICAgICBjb25zdCBsaW5rVHlwZSA9IHRoaXMuZm9ybS5jb250cm9scy50eXBlLnZhbHVlIGFzIExpbmtUeXBlO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5lZGl0b3Iuc3RhdGUuc2VsZWN0aW9uO1xuXG4gICAgICAgICAgICBjb25zdCB0ciA9IHRoaXMuZWRpdG9yLnN0YXRlLnRyO1xuXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmVtcHR5KSB7XG5cbiAgICAgICAgICAgICAgICB0ci5kb2Mubm9kZXNCZXR3ZWVuKHNlbGVjdGlvbi5mcm9tLCBzZWxlY3Rpb24udG8sIChub2RlLCBwb3MpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5pc1RleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtzdGFydCwgZW5kfSA9IGZpbmROb2RlU3RhcnRFbmQodHIuZG9jLCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHIuYWRkTWFyayhzdGFydCwgZW5kLCBzY2hlbWEubWFyayhzY2hlbWEubWFya3MubGluaywge2hyZWY6IGxpbmtUeXBlLnVyaSh0aGlzLmZvcm0uY29udHJvbHMubGluay52YWx1ZSl9KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIC8vIHVzdXdhbXkgcG9wcnplZG5pIGxpbmtcbiAgICAgICAgICAgICAgICB0ci5kb2Mubm9kZXNCZXR3ZWVuKHNlbGVjdGlvbi5mcm9tLCBzZWxlY3Rpb24udG8sIChub2RlLCBwb3MpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5pc1RleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtzdGFydCwgZW5kfSA9IGZpbmROb2RlU3RhcnRFbmQodHIuZG9jLCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHIucmVtb3ZlTWFyayhzdGFydCwgZW5kLCBzY2hlbWEubWFya3MubGluayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRyLmFkZE1hcmsoc2VsZWN0aW9uLmZyb20sIHNlbGVjdGlvbi50bywgc2NoZW1hLm1hcmsoc2NoZW1hLm1hcmtzLmxpbmssIHtocmVmOiBsaW5rVHlwZS51cmkodGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsudmFsdWUpfSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVkaXRvci52aWV3LmRpc3BhdGNoKHRyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgdHlwZUNoYW5nZWQoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZm9ybS5jb250cm9scy5saW5rLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHMubGluay5tYXJrQXNEaXJ0eSgpO1xuICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgc2xlZXAoNTApOyAvLyB3ZSBtdXN0IHdhaXQgZm9yIGNsb3NpbmcgdHlwZSBzZWxlY3RvclxuXG4gICAgICAgIHRoaXMuZm9ybUhlbHBlci5mb2N1cyhcImxpbmtcIiwgZmFsc2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VMaW5rKHVyaTogc3RyaW5nKToge3R5cGU6IExpbmtUeXBlLCBsaW5rOiBzdHJpbmd9IHtcblxuICAgICAgICBjb25zdCBwcmVmaXhlcyA9IHtcbiAgICAgICAgICAgIFwiaHR0cDpcIjogRGVmYXVsdExpbmtUeXBlLnd3dyxcbiAgICAgICAgICAgIFwiaHR0cHM6XCI6IERlZmF1bHRMaW5rVHlwZS53d3csXG4gICAgICAgICAgICBcInRlbDpcIjogRGVmYXVsdExpbmtUeXBlLnRlbCxcbiAgICAgICAgICAgIFwic21zOlwiOiBEZWZhdWx0TGlua1R5cGUuc21zLFxuICAgICAgICAgICAgXCJtYWlsdG86XCI6IERlZmF1bHRMaW5rVHlwZS5lbWFpbFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGxvd2VyQ2FzZWRVcmkgPSB1cmkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgZm9yIChjb25zdCBwcmVmaXggb2YgT2JqZWN0LmtleXMocHJlZml4ZXMpKSB7XG4gICAgICAgICAgICBpZiAobG93ZXJDYXNlZFVyaS5zdGFydHNXaXRoKHByZWZpeCkpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmsgPSB7dHlwZTogcHJlZml4ZXNbcHJlZml4XSwgbGluazogdXJpLnRyaW0oKX07XG5cbiAgICAgICAgICAgICAgICBpZiAocHJlZml4ZXNbcHJlZml4XSAhPT0gRGVmYXVsdExpbmtUeXBlLnd3dykge1xuICAgICAgICAgICAgICAgICAgICBsaW5rLmxpbmsgPSB1cmkuc3Vic3RyaW5nKHByZWZpeC5sZW5ndGgpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbGluaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7dHlwZTogRGVmYXVsdExpbmtUeXBlLm90aGVyLCBsaW5rOiB1cml9O1xuICAgIH1cblxuICAgIHByaXZhdGUgbGlua1ZhbGlkYXRvcihjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHtcblxuICAgICAgICBjb25zdCByZXF1aXJlZCA9IFZhbGlkYXRvcnMucmVxdWlyZWQoY29udHJvbCk7XG4gICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMuZm9ybS5jb250cm9scy50eXBlLnZhbHVlIGFzIExpbmtUeXBlO1xuICAgICAgICBjb25zdCB2YWxpZGF0b3JzID0gdHlwZS5pbnB1dFZhbGlkYXRvcnM7XG5cbiAgICAgICAgaWYgKHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdmFsaWRhdG9yIG9mIHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByID0gdmFsaWRhdG9yKGNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGlvblZpZXdEaWRFbnRlcigpIHtcblxuICAgICAgICBpZiAoIXRoaXMuZm9ybSkge1xuXG4gICAgICAgICAgICB0aGlzLnR5cGVzID0gW0RlZmF1bHRMaW5rVHlwZS53d3csIERlZmF1bHRMaW5rVHlwZS5lbWFpbCwgRGVmYXVsdExpbmtUeXBlLnRlbCwgRGVmYXVsdExpbmtUeXBlLnNtcywgRGVmYXVsdExpbmtUeXBlLm90aGVyXTtcblxuICAgICAgICAgICAgdGhpcy5mb3JtID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgICAgICAgICAgICAgdHlwZTogbmV3IEZvcm1Db250cm9sKERlZmF1bHRMaW5rVHlwZS53d3cpLFxuICAgICAgICAgICAgICAgIGxpbms6IG5ldyBGb3JtQ29udHJvbCgpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsuc2V0VmFsaWRhdG9ycyhjb250cm9sID0+IHRoaXMubGlua1ZhbGlkYXRvcihjb250cm9sKSk7XG5cbiAgICAgICAgICAgIHRoaXMudHlwZUNoYW5nZXNTdWJzY3JpcHRpb24gPSB0aGlzLmZvcm0uY29udHJvbHNbXCJ0eXBlXCJdLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy50eXBlQ2hhbmdlZCgpKTtcbiAgICAgICAgICAgIHRoaXMudHlwZUNoYW5nZWQoKTtcblxuICAgICAgICAgICAgdGhpcy5leGlzdGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIE1BUktTOiBmb3IgKGNvbnN0IG1hcmsgb2YgZmluZE1hcmtzSW5TZWxlY3Rpb24odGhpcy5lZGl0b3Iuc3RhdGUsIHNjaGVtYS5tYXJrcy5saW5rKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IHRoaXMucGFyc2VMaW5rKG1hcmsuYXR0cnMuaHJlZik7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHNbXCJ0eXBlXCJdLnNldFZhbHVlKHBhcnNlZC50eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW1wibGlua1wiXS5zZXRWYWx1ZShwYXJzZWQubGluayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhpc3RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXdhaXQgd2FpdFRpbGwoKCkgPT4gISF0aGlzLmZvcm1IZWxwZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmZvcm1IZWxwZXIuZm9jdXMoXCJsaW5rXCIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGlvblZpZXdXaWxsTGVhdmUoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0eXBlQ2hhbmdlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHVuc3Vic2NyaWJlKHRoaXMudHlwZUNoYW5nZXNTdWJzY3JpcHRpb24pO1xuICAgIH1cblxufVxuIl19