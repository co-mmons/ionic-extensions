var LinkModal_1;
import { __awaiter, __decorate } from "tslib";
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
        return __awaiter(this, void 0, void 0, function* () {
            const modal = yield modalController.create({ component: LinkModal_1, componentProps: { editor: editor } });
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
};
LinkModal.ctorParameters = () => [
    { type: ModalController }
];
__decorate([
    Input()
], LinkModal.prototype, "editor", void 0);
__decorate([
    ViewChild(FormHelper, { static: false })
], LinkModal.prototype, "formHelper", void 0);
LinkModal = LinkModal_1 = __decorate([
    Component({
        template: "<ion-header>\n\n    <ion-toolbar>\n\n        <ionx-buttons slot=\"start\">\n            <ion-back-button style=\"display: inline-block\" [icon]=\"('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back'\" (click)=\"$event.preventDefault(); close()\"></ion-back-button>\n        </ionx-buttons>\n\n        <ion-title style=\"margin: 0; padding: 0;\">{{\"@co.mmons/ionic-extensions/html-editor#link/Link\" | intlMessage}}</ion-title>\n\n        <ionx-buttons slot=\"end\">\n\n            <ion-button fill=\"clear\" color=\"dark\" (click)=\"unlink()\" *ngIf=\"existing\">\n                <ion-icon name=\"trash\" slot=\"start\"></ion-icon>\n                <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#link/Unlink\" | intlMessage}}</ion-label>\n            </ion-button>\n\n            <ion-button fill=\"clear\" color=\"primary\" (click)=\"ok()\">\n                <ion-icon name=\"checkmark\" slot=\"start\"></ion-icon>\n                <ion-label>{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-label>\n            </ion-button>\n\n        </ionx-buttons>\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content [forceOverscroll]=\"false\">\n\n    <ionx-spinner slot=\"fixed\" fill *ngIf=\"!form\"></ionx-spinner>\n\n    <form ionx-form-helper [formGroup]=\"form\" *ngIf=\"form\">\n\n        <ion-grid>\n\n            <ion-row>\n\n                <ion-col [sizeXs]=\"12\">\n\n                    <ionx-form-item>\n\n                        <ion-item>\n                            <ion-label position=\"stacked\">{{\"@co.mmons/ionic-extensions/html-editor#link/Link type\" | intlMessage}}</ion-label>\n                            <ionx-select required [compareAsString]=\"true\" formControlName=\"type\">\n                                <ionx-select-option *ngFor=\"let type of types\" [value]=\"type\">{{type.label | intlMessage}}</ionx-select-option>\n                            </ionx-select>\n                        </ion-item>\n\n                    </ionx-form-item>\n\n                </ion-col>\n\n                <ion-col [sizeXs]=\"12\">\n\n                    <ionx-form-item>\n\n                        <ion-item>\n                            <ion-label position=\"stacked\">{{(form.controls['type'].value.inputLabel || \"@co.mmons/ionic-extensions/html-editor#link/Link\") | intlMessage}}</ion-label>\n                            <ion-input formControlName=\"link\" type=\"form.controls['type'].value.inputType\"></ion-input>\n                        </ion-item>\n\n                        <ionx-form-item-error control=\"link\" markedAs=\"dirty\"></ionx-form-item-error>\n\n                        <ionx-form-item-hint *ngIf=\"form.controls['type'].value.inputHint\">\n                            <span [innerHTML]=\"form.controls['type'].value.inputHint | intlMessage\"></span>\n                        </ionx-form-item-hint>\n\n                    </ionx-form-item>\n\n                </ion-col>\n\n            </ion-row>\n\n\n        </ion-grid>\n\n    </form>\n\n</ion-content>\n",
        styles: [`:host ion-item:not(.ion-dirty) { --highlight-height: 0px; }`]
    })
], LinkModal);
export { LinkModal };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1tb2RhbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yLyIsInNvdXJjZXMiOlsibGluay1tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFrQixXQUFXLEVBQUUsU0FBUyxFQUFvQixVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDbEUsT0FBTyxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUdoRCxPQUFPLEVBQUMsZUFBZSxFQUFXLE1BQU0sYUFBYSxDQUFDO0FBQ3RELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUNqRixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQVF6RSxJQUFhLFNBQVMsaUJBQXRCLE1BQWEsU0FBUztJQVFsQixZQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFDcEQsQ0FBQztJQVBELE1BQU0sQ0FBTyxPQUFPLENBQUMsZUFBZ0MsRUFBRSxNQUFrQjs7WUFFckUsTUFBTSxLQUFLLEdBQUcsTUFBTSxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUMsU0FBUyxFQUFFLFdBQVMsRUFBRSxjQUFjLEVBQUUsRUFBQyxNQUFNLEVB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QXVCLENBQUMsQ0FBQztJQUM5QyxDQUFDO0NBRUosQ0FBQTs7WUFuTXdDLGVBQWU7O0FBSXBEO0lBREMsS0FBSyxFQUFFO3lDQUNtQjtBQWEzQjtJQURDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUM7NkNBQ2hCO0FBekJkLFNBQVM7SUFOckIsU0FBUyxDQUFDO1FBQ1AsNjhGQUE4QjtpQkFFMUIsNkRBQTZEO0tBRXBFLENBQUM7R0FDVyxTQUFTLENBMk1yQjtTQTNNWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRpb25FcnJvcnMsIFZhbGlkYXRvcnN9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtGb3JtSGVscGVyfSBmcm9tIFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZm9ybS1oZWxwZXJcIjtcbmltcG9ydCB7c2xlZXAsIHdhaXRUaWxsfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7dW5zdWJzY3JpYmV9IGZyb20gXCJAY28ubW1vbnMvcnhqcy11dGlsc1wiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHt0b2dnbGVNYXJrfSBmcm9tIFwicHJvc2VtaXJyb3ItY29tbWFuZHNcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtIdG1sRWRpdG9yfSBmcm9tIFwiLi9lZGl0b3JcIjtcbmltcG9ydCB7RGVmYXVsdExpbmtUeXBlLCBMaW5rVHlwZX0gZnJvbSBcIi4vbGluay10eXBlXCI7XG5pbXBvcnQge3NjaGVtYX0gZnJvbSBcIi4vcHJvc2VtaXJyb3Ivc2NoZW1hXCI7XG5pbXBvcnQge2ZpbmRNYXJrc0luU2VsZWN0aW9ufSBmcm9tIFwiLi9wcm9zZW1pcnJvci91dGlscy9maW5kLW1hcmtzLWluLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtmaW5kTm9kZVN0YXJ0RW5kfSBmcm9tIFwiLi9wcm9zZW1pcnJvci91dGlscy9maW5kLW5vZGUtc3RhcnQtZW5kXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiBcImxpbmstbW9kYWwuaHRtbFwiLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgOmhvc3QgaW9uLWl0ZW06bm90KC5pb24tZGlydHkpIHsgLS1oaWdobGlnaHQtaGVpZ2h0OiAwcHg7IH1gXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5rTW9kYWwgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG5cbiAgICBzdGF0aWMgYXN5bmMgcHJlc2VudChtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlciwgZWRpdG9yOiBIdG1sRWRpdG9yKSB7XG5cbiAgICAgICAgY29uc3QgbW9kYWwgPSBhd2FpdCBtb2RhbENvbnRyb2xsZXIuY3JlYXRlKHtjb21wb25lbnQ6IExpbmtNb2RhbCwgY29tcG9uZW50UHJvcHM6IHtlZGl0b3I6IGVkaXRvcn19KTtcbiAgICAgICAgbW9kYWwucHJlc2VudCgpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIpIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgZWRpdG9yOiBIdG1sRWRpdG9yO1xuXG4gICAgZXhpc3Rpbmc6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIGV4aXN0aW5nVHlwZTogTGlua1R5cGU7XG5cbiAgICBwcml2YXRlIGV4aXN0aW5nTGluazogc3RyaW5nO1xuXG4gICAgdHlwZXM6IExpbmtUeXBlW107XG5cbiAgICBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgICBAVmlld0NoaWxkKEZvcm1IZWxwZXIsIHtzdGF0aWM6IGZhbHNlfSlcbiAgICBmb3JtSGVscGVyOiBGb3JtSGVscGVyO1xuXG4gICAgYXN5bmMgY2xvc2UoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcbiAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBhc3luYyB1bmxpbmsoKSB7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZWRpdG9yLnN0YXRlLnNlbGVjdGlvbjtcblxuICAgICAgICBpZiAoc2VsZWN0aW9uLmVtcHR5KSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHRyID0gdGhpcy5lZGl0b3Iuc3RhdGUudHI7XG5cbiAgICAgICAgICAgIHRyLmRvYy5ub2Rlc0JldHdlZW4oc2VsZWN0aW9uLmZyb20sIHNlbGVjdGlvbi50bywgKG5vZGUsIHBvcykgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuaXNUZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRwb3MgPSB0ci5kb2MucmVzb2x2ZShwb3MpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IHBvcyAtICRwb3MudGV4dE9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW5kID0gc3RhcnQgKyAkcG9zLnBhcmVudC5jaGlsZCgkcG9zLmluZGV4KCkpLm5vZGVTaXplO1xuXG4gICAgICAgICAgICAgICAgICAgIHRyLnJlbW92ZU1hcmsoc3RhcnQsIGVuZCwgc2NoZW1hLm1hcmtzLmxpbmspO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmVkaXRvci52aWV3LmRpc3BhdGNoKHRyKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9nZ2xlTWFyayhzY2hlbWEubWFya3MubGluaykodGhpcy5lZGl0b3Iuc3RhdGUsIHRyID0+IHRoaXMuZWRpdG9yLnZpZXcuZGlzcGF0Y2godHIpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIG9rKCkge1xuICAgICAgICB0aGlzLmZvcm1IZWxwZXIudmFsaWRhdGVBbGwoXCJkaXJ0eVwiKTtcblxuICAgICAgICBpZiAodGhpcy5mb3JtLnZhbGlkKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxpbmtUeXBlID0gdGhpcy5mb3JtLmNvbnRyb2xzLnR5cGUudmFsdWUgYXMgTGlua1R5cGU7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmVkaXRvci5zdGF0ZS5zZWxlY3Rpb247XG5cbiAgICAgICAgICAgIGNvbnN0IHRyID0gdGhpcy5lZGl0b3Iuc3RhdGUudHI7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb24uZW1wdHkpIHtcblxuICAgICAgICAgICAgICAgIHRyLmRvYy5ub2Rlc0JldHdlZW4oc2VsZWN0aW9uLmZyb20sIHNlbGVjdGlvbi50bywgKG5vZGUsIHBvcykgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmlzVGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge3N0YXJ0LCBlbmR9ID0gZmluZE5vZGVTdGFydEVuZCh0ci5kb2MsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ci5hZGRNYXJrKHN0YXJ0LCBlbmQsIHNjaGVtYS5tYXJrKHNjaGVtYS5tYXJrcy5saW5rLCB7aHJlZjogbGlua1R5cGUudXJpKHRoaXMuZm9ybS5jb250cm9scy5saW5rLnZhbHVlKX0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgLy8gdXN1d2FteSBwb3ByemVkbmkgbGlua1xuICAgICAgICAgICAgICAgIHRyLmRvYy5ub2Rlc0JldHdlZW4oc2VsZWN0aW9uLmZyb20sIHNlbGVjdGlvbi50bywgKG5vZGUsIHBvcykgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmlzVGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge3N0YXJ0LCBlbmR9ID0gZmluZE5vZGVTdGFydEVuZCh0ci5kb2MsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ci5yZW1vdmVNYXJrKHN0YXJ0LCBlbmQsIHNjaGVtYS5tYXJrcy5saW5rKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdHIuYWRkTWFyayhzZWxlY3Rpb24uZnJvbSwgc2VsZWN0aW9uLnRvLCBzY2hlbWEubWFyayhzY2hlbWEubWFya3MubGluaywge2hyZWY6IGxpbmtUeXBlLnVyaSh0aGlzLmZvcm0uY29udHJvbHMubGluay52YWx1ZSl9KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnZpZXcuZGlzcGF0Y2godHIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyB0eXBlQ2hhbmdlZCgpIHtcblxuICAgICAgICBpZiAodGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9scy5saW5rLm1hcmtBc0RpcnR5KCk7XG4gICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHMubGluay51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBzbGVlcCg1MCk7IC8vIHdlIG11c3Qgd2FpdCBmb3IgY2xvc2luZyB0eXBlIHNlbGVjdG9yXG5cbiAgICAgICAgaWYgKHRoaXMuZm9ybUhlbHBlcikge1xuICAgICAgICAgICAgdGhpcy5mb3JtSGVscGVyLmZvY3VzKFwibGlua1wiLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlTGluayh1cmk6IHN0cmluZyk6IHt0eXBlOiBMaW5rVHlwZSwgbGluazogc3RyaW5nfSB7XG5cbiAgICAgICAgY29uc3QgcHJlZml4ZXMgPSB7XG4gICAgICAgICAgICBcImh0dHA6XCI6IERlZmF1bHRMaW5rVHlwZS53d3csXG4gICAgICAgICAgICBcImh0dHBzOlwiOiBEZWZhdWx0TGlua1R5cGUud3d3LFxuICAgICAgICAgICAgXCJ0ZWw6XCI6IERlZmF1bHRMaW5rVHlwZS50ZWwsXG4gICAgICAgICAgICBcInNtczpcIjogRGVmYXVsdExpbmtUeXBlLnNtcyxcbiAgICAgICAgICAgIFwibWFpbHRvOlwiOiBEZWZhdWx0TGlua1R5cGUuZW1haWxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBsb3dlckNhc2VkVXJpID0gdXJpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJlZml4IG9mIE9iamVjdC5rZXlzKHByZWZpeGVzKSkge1xuICAgICAgICAgICAgaWYgKGxvd2VyQ2FzZWRVcmkuc3RhcnRzV2l0aChwcmVmaXgpKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rID0ge3R5cGU6IHByZWZpeGVzW3ByZWZpeF0sIGxpbms6IHVyaS50cmltKCl9O1xuXG4gICAgICAgICAgICAgICAgaWYgKHByZWZpeGVzW3ByZWZpeF0gIT09IERlZmF1bHRMaW5rVHlwZS53d3cpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluay5saW5rID0gdXJpLnN1YnN0cmluZyhwcmVmaXgubGVuZ3RoKS50cmltKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpbms7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge3R5cGU6IERlZmF1bHRMaW5rVHlwZS5vdGhlciwgbGluazogdXJpfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxpbmtWYWxpZGF0b3IoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB7XG5cbiAgICAgICAgY29uc3QgcmVxdWlyZWQgPSBWYWxpZGF0b3JzLnJlcXVpcmVkKGNvbnRyb2wpO1xuICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLmZvcm0uY29udHJvbHMudHlwZS52YWx1ZSBhcyBMaW5rVHlwZTtcbiAgICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IHR5cGUuaW5wdXRWYWxpZGF0b3JzO1xuXG4gICAgICAgIGlmICh2YWxpZGF0b3JzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZhbGlkYXRvciBvZiB2YWxpZGF0b3JzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgciA9IHZhbGlkYXRvcihjb250cm9sKTtcbiAgICAgICAgICAgICAgICBpZiAocikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBpb25WaWV3RGlkRW50ZXIoKSB7XG5cbiAgICAgICAgdGhpcy50eXBlcyA9IFtEZWZhdWx0TGlua1R5cGUud3d3LCBEZWZhdWx0TGlua1R5cGUuZW1haWwsIERlZmF1bHRMaW5rVHlwZS50ZWwsIERlZmF1bHRMaW5rVHlwZS5zbXMsIERlZmF1bHRMaW5rVHlwZS5vdGhlcl07XG5cbiAgICAgICAgdGhpcy5mb3JtID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgICAgICAgICB0eXBlOiBuZXcgRm9ybUNvbnRyb2wodGhpcy5leGlzdGluZ1R5cGUgfHwgRGVmYXVsdExpbmtUeXBlLnd3dyksXG4gICAgICAgICAgICBsaW5rOiBuZXcgRm9ybUNvbnRyb2wodGhpcy5leGlzdGluZ0xpbmspXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZm9ybS5jb250cm9scy5saW5rLnNldFZhbGlkYXRvcnMoY29udHJvbCA9PiB0aGlzLmxpbmtWYWxpZGF0b3IoY29udHJvbCkpO1xuXG4gICAgICAgIHRoaXMudHlwZUNoYW5nZXNTdWJzY3JpcHRpb24gPSB0aGlzLmZvcm0uY29udHJvbHNbXCJ0eXBlXCJdLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy50eXBlQ2hhbmdlZCgpKTtcbiAgICAgICAgdGhpcy50eXBlQ2hhbmdlZCgpO1xuXG4gICAgICAgIGF3YWl0IHdhaXRUaWxsKCgpID0+ICEhdGhpcy5mb3JtSGVscGVyKTtcblxuICAgICAgICB0aGlzLmZvcm1IZWxwZXIuZm9jdXMoXCJsaW5rXCIsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBhc3luYyBpb25WaWV3V2lsbExlYXZlKCkge1xuICAgICAgICB0aGlzLmVkaXRvci5mb2N1cygpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIE1BUktTOiBmb3IgKGNvbnN0IG1hcmsgb2YgZmluZE1hcmtzSW5TZWxlY3Rpb24odGhpcy5lZGl0b3Iuc3RhdGUsIHNjaGVtYS5tYXJrcy5saW5rKSkge1xuICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gdGhpcy5wYXJzZUxpbmsobWFyay5hdHRycy5ocmVmKTtcbiAgICAgICAgICAgIGlmIChwYXJzZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4aXN0aW5nVHlwZSA9IHBhcnNlZC50eXBlO1xuICAgICAgICAgICAgICAgIHRoaXMuZXhpc3RpbmdMaW5rID0gcGFyc2VkLmxpbms7XG4gICAgICAgICAgICAgICAgdGhpcy5leGlzdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWsgTUFSS1M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHR5cGVDaGFuZ2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdW5zdWJzY3JpYmUodGhpcy50eXBlQ2hhbmdlc1N1YnNjcmlwdGlvbik7XG4gICAgfVxuXG59XG4iXX0=