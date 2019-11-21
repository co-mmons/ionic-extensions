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
        template: "<ion-header>\n\n    <ion-toolbar>\n\n        <ionx-buttons slot=\"start\">\n            <ion-back-button style=\"display: inline-block\" [icon]=\"('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back'\" (click)=\"$event.preventDefault(); close()\"></ion-back-button>\n        </ionx-buttons>\n\n        <ion-title style=\"margin: 0; padding: 0;\">{{\"@co.mmons/ionic-extensions/html-editor#link/Link\" | intlMessage}}</ion-title>\n\n        <ionx-buttons slot=\"end\">\n\n            <ion-button fill=\"clear\" color=\"dark\" (click)=\"unlink()\" *ngIf=\"existing\">\n                <ion-icon name=\"trash\" slot=\"start\"></ion-icon>\n                <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#link/Unlink\" | intlMessage}}</ion-label>\n            </ion-button>\n\n            <ion-button fill=\"clear\" color=\"primary\" (click)=\"ok()\">\n                <ion-icon name=\"checkmark\" slot=\"start\"></ion-icon>\n                <ion-label>{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-label>\n            </ion-button>\n\n        </ionx-buttons>\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content [forceOverscroll]=\"false\">\n\n    <ionx-spinner slot=\"fixed\" fill *ngIf=\"!form\"></ionx-spinner>\n\n    <form ionx-form-helper [formGroup]=\"form\" *ngIf=\"form\">\n\n        <ion-grid>\n\n            <ion-row>\n\n                <ion-col [sizeXs]=\"12\">\n\n                    <ionx-form-item>\n\n                        <ion-item>\n                            <ion-label position=\"stacked\">{{\"@co.mmons/ionic-extensions/html-editor#link/Link type\" | intlMessage}}</ion-label>\n                            <ionx-select required [compareAsString]=\"true\" formControlName=\"type\">\n                                <ionx-select-option *ngFor=\"let type of types\" [value]=\"type\">{{type.label | intlMessage}}</ionx-select-option>\n                            </ionx-select>\n                        </ion-item>\n\n                    </ionx-form-item>\n\n                </ion-col>\n\n                <ion-col [sizeXs]=\"12\">\n\n                    <ionx-form-item>\n\n                        <ion-item>\n                            <ion-label position=\"stacked\">{{(form.controls['type'].value.inputLabel || \"@co.mmons/ionic-extensions/html-editor#link/Link\") | intlMessage}}</ion-label>\n                            <ion-input formControlName=\"link\" type=\"form.controls['type'].value.inputType\"></ion-input>\n                        </ion-item>\n\n                        <ionx-form-item-error control=\"link\" markedAs=\"dirty\"></ionx-form-item-error>\n\n                        <ionx-form-item-hint *ngIf=\"form.controls['type'].value.inputHint\">\n                            <span [innerHTML]=\"form.controls['type'].value.inputHint | intlMessage\"></span>\n                        </ionx-form-item-hint>\n\n                    </ionx-form-item>\n\n                </ion-col>\n\n            </ion-row>\n\n\n        </ion-grid>\n\n    </form>\n\n</ion-content>\n",
        styles: [`:host ion-item:not(.ion-dirty) { --highlight-height: 0px; }`]
    })
], LinkModal);
export { LinkModal };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1tb2RhbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yLyIsInNvdXJjZXMiOlsibGluay1tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFrQixXQUFXLEVBQUUsU0FBUyxFQUFvQixVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDbEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBR2hELE9BQU8sRUFBQyxlQUFlLEVBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBUXpFLElBQWEsU0FBUyxpQkFBdEIsTUFBYSxTQUFTO0lBUWxCLFlBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUNwRCxDQUFDO0lBUEQsTUFBTSxDQUFPLE9BQU8sQ0FBQyxlQUFnQyxFQUFFLE1BQWtCOztZQUVyRSxNQUFNLEtBQUssR0FBRyxNQUFNLGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFBQyxTQUFTLEVBQUUsV0FBUyxFQUFFLGNBQWMsRUFBRSxFQUFDLE1BQU0sRUFBRSxNQUFNLEVB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SixDQUFBOztZQTVMd0MsZUFBZTs7QUFJcEQ7SUFEQyxLQUFLLEVBQUU7eUNBQ21CO0FBUzNCO0lBREMsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQzs2Q0FDaEI7QUFyQmQsU0FBUztJQU5yQixTQUFTLENBQUM7UUFDUCw2OEZBQThCO2lCQUUxQiw2REFBNkQ7S0FFcEUsQ0FBQztHQUNXLFNBQVMsQ0FvTXJCO1NBcE1ZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q2hpbGR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yc30gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge0Zvcm1IZWxwZXJ9IGZyb20gXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9mb3JtLWhlbHBlclwiO1xuaW1wb3J0IHtzbGVlcH0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5pbXBvcnQge3Vuc3Vic2NyaWJlfSBmcm9tIFwiQGNvLm1tb25zL3J4anMtdXRpbHNcIjtcbmltcG9ydCB7TW9kYWxDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7dG9nZ2xlTWFya30gZnJvbSBcInByb3NlbWlycm9yLWNvbW1hbmRzXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7SHRtbEVkaXRvcn0gZnJvbSBcIi4vZWRpdG9yXCI7XG5pbXBvcnQge0RlZmF1bHRMaW5rVHlwZSwgTGlua1R5cGV9IGZyb20gXCIuL2xpbmstdHlwZVwiO1xuaW1wb3J0IHtzY2hlbWF9IGZyb20gXCIuL3Byb3NlbWlycm9yL3NjaGVtYVwiO1xuaW1wb3J0IHtmaW5kTWFya3NJblNlbGVjdGlvbn0gZnJvbSBcIi4vcHJvc2VtaXJyb3IvdXRpbHMvZmluZC1tYXJrcy1pbi1zZWxlY3Rpb25cIjtcbmltcG9ydCB7ZmluZE5vZGVTdGFydEVuZH0gZnJvbSBcIi4vcHJvc2VtaXJyb3IvdXRpbHMvZmluZC1ub2RlLXN0YXJ0LWVuZFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogXCJsaW5rLW1vZGFsLmh0bWxcIixcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYDpob3N0IGlvbi1pdGVtOm5vdCguaW9uLWRpcnR5KSB7IC0taGlnaGxpZ2h0LWhlaWdodDogMHB4OyB9YFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTGlua01vZGFsIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuXG4gICAgc3RhdGljIGFzeW5jIHByZXNlbnQobW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsIGVkaXRvcjogSHRtbEVkaXRvcikge1xuXG4gICAgICAgIGNvbnN0IG1vZGFsID0gYXdhaXQgbW9kYWxDb250cm9sbGVyLmNyZWF0ZSh7Y29tcG9uZW50OiBMaW5rTW9kYWwsIGNvbXBvbmVudFByb3BzOiB7ZWRpdG9yOiBlZGl0b3J9fSk7XG4gICAgICAgIG1vZGFsLnByZXNlbnQoKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIGVkaXRvcjogSHRtbEVkaXRvcjtcblxuICAgIGV4aXN0aW5nOiBib29sZWFuO1xuXG4gICAgdHlwZXM6IExpbmtUeXBlW107XG5cbiAgICBmb3JtOiBGb3JtR3JvdXA7XG5cbiAgICBAVmlld0NoaWxkKEZvcm1IZWxwZXIsIHtzdGF0aWM6IGZhbHNlfSlcbiAgICBmb3JtSGVscGVyOiBGb3JtSGVscGVyO1xuXG4gICAgYXN5bmMgY2xvc2UoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcbiAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBhc3luYyB1bmxpbmsoKSB7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZWRpdG9yLnN0YXRlLnNlbGVjdGlvbjtcblxuICAgICAgICBpZiAoc2VsZWN0aW9uLmVtcHR5KSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHRyID0gdGhpcy5lZGl0b3Iuc3RhdGUudHI7XG5cbiAgICAgICAgICAgIHRyLmRvYy5ub2Rlc0JldHdlZW4oc2VsZWN0aW9uLmZyb20sIHNlbGVjdGlvbi50bywgKG5vZGUsIHBvcykgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuaXNUZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRwb3MgPSB0ci5kb2MucmVzb2x2ZShwb3MpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IHBvcyAtICRwb3MudGV4dE9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW5kID0gc3RhcnQgKyAkcG9zLnBhcmVudC5jaGlsZCgkcG9zLmluZGV4KCkpLm5vZGVTaXplO1xuXG4gICAgICAgICAgICAgICAgICAgIHRyLnJlbW92ZU1hcmsoc3RhcnQsIGVuZCwgc2NoZW1hLm1hcmtzLmxpbmspO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmVkaXRvci52aWV3LmRpc3BhdGNoKHRyKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9nZ2xlTWFyayhzY2hlbWEubWFya3MubGluaykodGhpcy5lZGl0b3Iuc3RhdGUsIHRyID0+IHRoaXMuZWRpdG9yLnZpZXcuZGlzcGF0Y2godHIpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIG9rKCkge1xuICAgICAgICB0aGlzLmZvcm1IZWxwZXIudmFsaWRhdGVBbGwoXCJkaXJ0eVwiKTtcblxuICAgICAgICBpZiAodGhpcy5mb3JtLnZhbGlkKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxpbmtUeXBlID0gdGhpcy5mb3JtLmNvbnRyb2xzLnR5cGUudmFsdWUgYXMgTGlua1R5cGU7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmVkaXRvci5zdGF0ZS5zZWxlY3Rpb247XG5cbiAgICAgICAgICAgIGNvbnN0IHRyID0gdGhpcy5lZGl0b3Iuc3RhdGUudHI7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb24uZW1wdHkpIHtcblxuICAgICAgICAgICAgICAgIHRyLmRvYy5ub2Rlc0JldHdlZW4oc2VsZWN0aW9uLmZyb20sIHNlbGVjdGlvbi50bywgKG5vZGUsIHBvcykgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmlzVGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge3N0YXJ0LCBlbmR9ID0gZmluZE5vZGVTdGFydEVuZCh0ci5kb2MsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ci5hZGRNYXJrKHN0YXJ0LCBlbmQsIHNjaGVtYS5tYXJrKHNjaGVtYS5tYXJrcy5saW5rLCB7aHJlZjogbGlua1R5cGUudXJpKHRoaXMuZm9ybS5jb250cm9scy5saW5rLnZhbHVlKX0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgLy8gdXN1d2FteSBwb3ByemVkbmkgbGlua1xuICAgICAgICAgICAgICAgIHRyLmRvYy5ub2Rlc0JldHdlZW4oc2VsZWN0aW9uLmZyb20sIHNlbGVjdGlvbi50bywgKG5vZGUsIHBvcykgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmlzVGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge3N0YXJ0LCBlbmR9ID0gZmluZE5vZGVTdGFydEVuZCh0ci5kb2MsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ci5yZW1vdmVNYXJrKHN0YXJ0LCBlbmQsIHNjaGVtYS5tYXJrcy5saW5rKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdHIuYWRkTWFyayhzZWxlY3Rpb24uZnJvbSwgc2VsZWN0aW9uLnRvLCBzY2hlbWEubWFyayhzY2hlbWEubWFya3MubGluaywge2hyZWY6IGxpbmtUeXBlLnVyaSh0aGlzLmZvcm0uY29udHJvbHMubGluay52YWx1ZSl9KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnZpZXcuZGlzcGF0Y2godHIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyB0eXBlQ2hhbmdlZCgpIHtcblxuICAgICAgICBpZiAodGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9scy5saW5rLm1hcmtBc0RpcnR5KCk7XG4gICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHMubGluay51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBzbGVlcCg1MCk7IC8vIHdlIG11c3Qgd2FpdCBmb3IgY2xvc2luZyB0eXBlIHNlbGVjdG9yXG5cbiAgICAgICAgaWYgKHRoaXMuZm9ybUhlbHBlcikge1xuICAgICAgICAgICAgdGhpcy5mb3JtSGVscGVyLmZvY3VzKFwibGlua1wiLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlTGluayh1cmk6IHN0cmluZyk6IHt0eXBlOiBMaW5rVHlwZSwgbGluazogc3RyaW5nfSB7XG5cbiAgICAgICAgY29uc3QgcHJlZml4ZXMgPSB7XG4gICAgICAgICAgICBcImh0dHA6XCI6IERlZmF1bHRMaW5rVHlwZS53d3csXG4gICAgICAgICAgICBcImh0dHBzOlwiOiBEZWZhdWx0TGlua1R5cGUud3d3LFxuICAgICAgICAgICAgXCJ0ZWw6XCI6IERlZmF1bHRMaW5rVHlwZS50ZWwsXG4gICAgICAgICAgICBcInNtczpcIjogRGVmYXVsdExpbmtUeXBlLnNtcyxcbiAgICAgICAgICAgIFwibWFpbHRvOlwiOiBEZWZhdWx0TGlua1R5cGUuZW1haWxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBsb3dlckNhc2VkVXJpID0gdXJpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJlZml4IG9mIE9iamVjdC5rZXlzKHByZWZpeGVzKSkge1xuICAgICAgICAgICAgaWYgKGxvd2VyQ2FzZWRVcmkuc3RhcnRzV2l0aChwcmVmaXgpKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rID0ge3R5cGU6IHByZWZpeGVzW3ByZWZpeF0sIGxpbms6IHVyaS50cmltKCl9O1xuXG4gICAgICAgICAgICAgICAgaWYgKHByZWZpeGVzW3ByZWZpeF0gIT09IERlZmF1bHRMaW5rVHlwZS53d3cpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluay5saW5rID0gdXJpLnN1YnN0cmluZyhwcmVmaXgubGVuZ3RoKS50cmltKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpbms7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge3R5cGU6IERlZmF1bHRMaW5rVHlwZS5vdGhlciwgbGluazogdXJpfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxpbmtWYWxpZGF0b3IoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB7XG5cbiAgICAgICAgY29uc3QgcmVxdWlyZWQgPSBWYWxpZGF0b3JzLnJlcXVpcmVkKGNvbnRyb2wpO1xuICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLmZvcm0uY29udHJvbHMudHlwZS52YWx1ZSBhcyBMaW5rVHlwZTtcbiAgICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IHR5cGUuaW5wdXRWYWxpZGF0b3JzO1xuXG4gICAgICAgIGlmICh2YWxpZGF0b3JzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZhbGlkYXRvciBvZiB2YWxpZGF0b3JzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgciA9IHZhbGlkYXRvcihjb250cm9sKTtcbiAgICAgICAgICAgICAgICBpZiAocikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBpb25WaWV3RGlkRW50ZXIoKSB7XG4gICAgICAgIHRoaXMuZm9ybUhlbHBlci5mb2N1cyhcImxpbmtcIiwgZmFsc2UpO1xuICAgIH1cblxuICAgIGFzeW5jIGlvblZpZXdXaWxsTGVhdmUoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgdGhpcy50eXBlcyA9IFtEZWZhdWx0TGlua1R5cGUud3d3LCBEZWZhdWx0TGlua1R5cGUuZW1haWwsIERlZmF1bHRMaW5rVHlwZS50ZWwsIERlZmF1bHRMaW5rVHlwZS5zbXMsIERlZmF1bHRMaW5rVHlwZS5vdGhlcl07XG5cbiAgICAgICAgdGhpcy5mb3JtID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgICAgICAgICB0eXBlOiBuZXcgRm9ybUNvbnRyb2woRGVmYXVsdExpbmtUeXBlLnd3dyksXG4gICAgICAgICAgICBsaW5rOiBuZXcgRm9ybUNvbnRyb2woKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZvcm0uY29udHJvbHMubGluay5zZXRWYWxpZGF0b3JzKGNvbnRyb2wgPT4gdGhpcy5saW5rVmFsaWRhdG9yKGNvbnRyb2wpKTtcblxuICAgICAgICB0aGlzLnR5cGVDaGFuZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5mb3JtLmNvbnRyb2xzW1widHlwZVwiXS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMudHlwZUNoYW5nZWQoKSk7XG4gICAgICAgIHRoaXMudHlwZUNoYW5nZWQoKTtcblxuICAgICAgICB0aGlzLmV4aXN0aW5nID0gdW5kZWZpbmVkO1xuICAgICAgICBNQVJLUzogZm9yIChjb25zdCBtYXJrIG9mIGZpbmRNYXJrc0luU2VsZWN0aW9uKHRoaXMuZWRpdG9yLnN0YXRlLCBzY2hlbWEubWFya3MubGluaykpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IHRoaXMucGFyc2VMaW5rKG1hcmsuYXR0cnMuaHJlZik7XG4gICAgICAgICAgICBpZiAocGFyc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW1widHlwZVwiXS5zZXRWYWx1ZShwYXJzZWQudHlwZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW1wibGlua1wiXS5zZXRWYWx1ZShwYXJzZWQubGluayk7XG4gICAgICAgICAgICAgICAgdGhpcy5leGlzdGluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHR5cGVDaGFuZ2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdW5zdWJzY3JpYmUodGhpcy50eXBlQ2hhbmdlc1N1YnNjcmlwdGlvbik7XG4gICAgfVxuXG59XG4iXX0=