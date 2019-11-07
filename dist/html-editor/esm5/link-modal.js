import * as tslib_1 from "tslib";
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
var LinkModal = /** @class */ (function () {
    function LinkModal(modalController) {
        this.modalController = modalController;
    }
    LinkModal_1 = LinkModal;
    LinkModal.present = function (modalController, editor) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, modalController.create({ component: LinkModal_1, componentProps: { editor: editor } })];
                    case 1:
                        modal = _a.sent();
                        modal.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    LinkModal.prototype.close = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.dismiss()];
                    case 1:
                        _a.sent();
                        this.editor.focus();
                        return [2 /*return*/];
                }
            });
        });
    };
    LinkModal.prototype.unlink = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var selection, tr_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.dismiss()];
                    case 1:
                        _a.sent();
                        selection = this.editor.state.selection;
                        if (selection.empty) {
                            tr_1 = this.editor.state.tr;
                            tr_1.doc.nodesBetween(selection.from, selection.to, function (node, pos) {
                                if (node.isText) {
                                    var $pos = tr_1.doc.resolve(pos);
                                    var start = pos - $pos.textOffset;
                                    var end = start + $pos.parent.child($pos.index()).nodeSize;
                                    tr_1.removeMark(start, end, schema.marks.link);
                                }
                            });
                            this.editor.view.dispatch(tr_1);
                        }
                        else {
                            toggleMark(schema.marks.link)(this.editor.state, function (tr) { return _this.editor.view.dispatch(tr); });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LinkModal.prototype.ok = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var linkType_1, selection, tr_2;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.formHelper.validateAll("dirty");
                        if (!this.form.valid) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.modalController.dismiss()];
                    case 1:
                        _a.sent();
                        linkType_1 = this.form.controls.type.value;
                        selection = this.editor.state.selection;
                        tr_2 = this.editor.state.tr;
                        if (selection.empty) {
                            tr_2.doc.nodesBetween(selection.from, selection.to, function (node, pos) {
                                if (node.isText) {
                                    var _a = findNodeStartEnd(tr_2.doc, pos), start = _a.start, end = _a.end;
                                    tr_2.addMark(start, end, schema.mark(schema.marks.link, { href: linkType_1.uri(_this.form.controls.link.value) }));
                                }
                            });
                        }
                        else {
                            // usuwamy poprzedni link
                            tr_2.doc.nodesBetween(selection.from, selection.to, function (node, pos) {
                                if (node.isText) {
                                    var _a = findNodeStartEnd(tr_2.doc, pos), start = _a.start, end = _a.end;
                                    tr_2.removeMark(start, end, schema.marks.link);
                                }
                            });
                            tr_2.addMark(selection.from, selection.to, schema.mark(schema.marks.link, { href: linkType_1.uri(this.form.controls.link.value) }));
                        }
                        this.editor.view.dispatch(tr_2);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    LinkModal.prototype.typeChanged = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.form.controls.link.value) {
                            this.form.controls.link.markAsDirty();
                            this.form.controls.link.updateValueAndValidity();
                        }
                        return [4 /*yield*/, sleep(50)];
                    case 1:
                        _a.sent(); // we must wait for closing type selector
                        this.formHelper.focus("link", false);
                        return [2 /*return*/];
                }
            });
        });
    };
    LinkModal.prototype.parseLink = function (uri) {
        var e_1, _a;
        var prefixes = {
            "http:": DefaultLinkType.www,
            "https:": DefaultLinkType.www,
            "tel:": DefaultLinkType.tel,
            "sms:": DefaultLinkType.sms,
            "mailto:": DefaultLinkType.email
        };
        var lowerCasedUri = uri.trim().toLowerCase();
        try {
            for (var _b = tslib_1.__values(Object.keys(prefixes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var prefix = _c.value;
                if (lowerCasedUri.startsWith(prefix)) {
                    var link = { type: prefixes[prefix], link: uri.trim() };
                    if (prefixes[prefix] !== DefaultLinkType.www) {
                        link.link = uri.substring(prefix.length).trim();
                    }
                    return link;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return { type: DefaultLinkType.other, link: uri };
    };
    LinkModal.prototype.linkValidator = function (control) {
        var e_2, _a;
        var required = Validators.required(control);
        if (required) {
            return required;
        }
        var type = this.form.controls.type.value;
        var validators = type.inputValidators;
        if (validators) {
            try {
                for (var validators_1 = tslib_1.__values(validators), validators_1_1 = validators_1.next(); !validators_1_1.done; validators_1_1 = validators_1.next()) {
                    var validator = validators_1_1.value;
                    var r = validator(control);
                    if (r) {
                        return r;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (validators_1_1 && !validators_1_1.done && (_a = validators_1.return)) _a.call(validators_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    };
    LinkModal.prototype.ionViewDidEnter = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.formHelper.focus("link", false);
                return [2 /*return*/];
            });
        });
    };
    LinkModal.prototype.ionViewWillLeave = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.editor.focus();
                return [2 /*return*/];
            });
        });
    };
    LinkModal.prototype.ngOnInit = function () {
        var _this = this;
        var e_3, _a;
        this.types = [DefaultLinkType.www, DefaultLinkType.email, DefaultLinkType.tel, DefaultLinkType.sms, DefaultLinkType.other];
        this.form = new FormGroup({
            type: new FormControl(DefaultLinkType.www),
            link: new FormControl()
        });
        this.form.controls.link.setValidators(function (control) { return _this.linkValidator(control); });
        this.typeChangesSubscription = this.form.controls["type"].valueChanges.subscribe(function () { return _this.typeChanged(); });
        this.typeChanged();
        this.existing = undefined;
        try {
            MARKS: for (var _b = tslib_1.__values(findMarksInSelection(this.editor.state, schema.marks.link)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var mark = _c.value;
                var parsed = this.parseLink(mark.attrs.href);
                if (parsed) {
                    this.form.controls["type"].setValue(parsed.type);
                    this.form.controls["link"].setValue(parsed.link);
                    this.existing = true;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    LinkModal.prototype.ngOnDestroy = function () {
        unsubscribe(this.typeChangesSubscription);
    };
    var LinkModal_1;
    LinkModal.ctorParameters = function () { return [
        { type: ModalController }
    ]; };
    tslib_1.__decorate([
        Input()
    ], LinkModal.prototype, "editor", void 0);
    tslib_1.__decorate([
        ViewChild(FormHelper, { static: false })
    ], LinkModal.prototype, "formHelper", void 0);
    LinkModal = LinkModal_1 = tslib_1.__decorate([
        Component({
            template: "\n        <ion-header>\n            \n            <ion-toolbar>\n\n                <ionx-buttons slot=\"start\">\n                    <ion-back-button style=\"display: inline-block\" [icon]=\"('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back'\" (click)=\"$event.preventDefault(); close()\"></ion-back-button>\n                </ionx-buttons>\n                \n                <ion-title style=\"margin: 0; padding: 0;\">{{\"@co.mmons/ionic-extensions/html-editor#link/Link\" | intlMessage}}</ion-title>\n\n                <ionx-buttons slot=\"end\">\n\n                    <ion-button fill=\"clear\" color=\"dark\" (click)=\"unlink()\" *ngIf=\"existing\">\n                        <ion-icon name=\"trash\" slot=\"start\"></ion-icon>\n                        <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#link/Unlink\" | intlMessage}}</ion-label>\n                    </ion-button>\n\n                    <ion-button fill=\"clear\" color=\"primary\" (click)=\"ok()\">\n                        <ion-icon name=\"checkmark\" slot=\"start\"></ion-icon>\n                        <ion-label>{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-label>\n                    </ion-button>\n                    \n                </ionx-buttons>\n                \n            </ion-toolbar>\n            \n        </ion-header>\n        <ion-content>\n            \n            <form ionx-form-helper [formGroup]=\"form\">\n                \n                <ion-grid>\n                    \n                    <ion-row>\n                        \n                        <ion-col [sizeXs]=\"12\">\n                            \n                            <ionx-form-item>\n\n                                <ion-item>\n                                    <ion-label position=\"stacked\">{{\"@co.mmons/ionic-extensions/html-editor#link/Link type\" | intlMessage}}</ion-label>\n                                    <ionx-select required [compareAsString]=\"true\" formControlName=\"type\">\n                                        <ionx-select-option *ngFor=\"let type of types\" [value]=\"type\">{{type.label | intlMessage}}</ionx-select-option>\n                                    </ionx-select>\n                                </ion-item>\n    \n                            </ionx-form-item>\n                            \n                        </ion-col>\n\n                        <ion-col [sizeXs]=\"12\">\n                            \n                            <ionx-form-item>\n    \n                                <ion-item>\n                                    <ion-label position=\"stacked\">{{(form.controls['type'].value.inputLabel || \"@co.mmons/ionic-extensions/html-editor#link/Link\") | intlMessage}}</ion-label>\n                                    <ion-input formControlName=\"link\" type=\"form.controls['type'].value.inputType\"></ion-input>\n                                </ion-item>\n                                \n                                <ionx-form-item-error control=\"link\" markedAs=\"dirty\"></ionx-form-item-error>\n                                \n                                <ionx-form-item-hint *ngIf=\"form.controls['type'].value.inputHint\">\n                                    <span [innerHTML]=\"form.controls['type'].value.inputHint | intlMessage\"></span>\n                                </ionx-form-item-hint>\n\n                            </ionx-form-item>\n\n                        </ion-col>\n                        \n                    </ion-row>\n                    \n                    \n                </ion-grid>\n                \n            </form>\n            \n        </ion-content>\n    ",
            styles: [":host ion-item:not(.ion-dirty) { --highlight-height: 0px; }"]
        })
    ], LinkModal);
    return LinkModal;
}());
export { LinkModal };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1tb2RhbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yLyIsInNvdXJjZXMiOlsibGluay1tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQWtCLFdBQVcsRUFBRSxTQUFTLEVBQW9CLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JHLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDOUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFHaEQsT0FBTyxFQUFDLGVBQWUsRUFBVyxNQUFNLGFBQWEsQ0FBQztBQUN0RCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFDakYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFzRnpFO0lBUUksbUJBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUNwRCxDQUFDO2tCQVRRLFNBQVM7SUFFTCxpQkFBTyxHQUFwQixVQUFxQixlQUFnQyxFQUFFLE1BQWtCOzs7Ozs0QkFFdkQscUJBQU0sZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFDLFNBQVMsRUFBRSxXQUFTLEVBQUUsY0FBYyxFQUFFLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBQyxFQUFDLENBQUMsRUFBQTs7d0JBQTlGLEtB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LEdBQUcsSUFBSSxDQUFDO2lCQUN4QjthQUNKOzs7Ozs7Ozs7SUFDTCxDQUFDO0lBRUQsK0JBQVcsR0FBWDtRQUNJLFdBQVcsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7Z0JBdkxvQyxlQUFlOztJQUlwRDtRQURDLEtBQUssRUFBRTs2Q0FDbUI7SUFTM0I7UUFEQyxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDO2lEQUNoQjtJQXJCZCxTQUFTO1FBcEZyQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsK2xIQThFVDtxQkFFRyw2REFBNkQ7U0FFcEUsQ0FBQztPQUNXLFNBQVMsQ0FpTXJCO0lBQUQsZ0JBQUM7Q0FBQSxBQWpNRCxJQWlNQztTQWpNWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRpb25FcnJvcnMsIFZhbGlkYXRvcnN9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtGb3JtSGVscGVyfSBmcm9tIFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZm9ybS1oZWxwZXJcIjtcbmltcG9ydCB7c2xlZXB9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHt1bnN1YnNjcmliZX0gZnJvbSBcIkBjby5tbW9ucy9yeGpzLXV0aWxzXCI7XG5pbXBvcnQge01vZGFsQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge3RvZ2dsZU1hcmt9IGZyb20gXCJwcm9zZW1pcnJvci1jb21tYW5kc1wiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0h0bWxFZGl0b3J9IGZyb20gXCIuL2VkaXRvclwiO1xuaW1wb3J0IHtEZWZhdWx0TGlua1R5cGUsIExpbmtUeXBlfSBmcm9tIFwiLi9saW5rLXR5cGVcIjtcbmltcG9ydCB7c2NoZW1hfSBmcm9tIFwiLi9wcm9zZW1pcnJvci9zY2hlbWFcIjtcbmltcG9ydCB7ZmluZE1hcmtzSW5TZWxlY3Rpb259IGZyb20gXCIuL3Byb3NlbWlycm9yL3V0aWxzL2ZpbmQtbWFya3MtaW4tc2VsZWN0aW9uXCI7XG5pbXBvcnQge2ZpbmROb2RlU3RhcnRFbmR9IGZyb20gXCIuL3Byb3NlbWlycm9yL3V0aWxzL2ZpbmQtbm9kZS1zdGFydC1lbmRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGlvbi1oZWFkZXI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxpb24tdG9vbGJhcj5cblxuICAgICAgICAgICAgICAgIDxpb254LWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxpb24tYmFjay1idXR0b24gc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2tcIiBbaWNvbl09XCIoJ3RhYmxldCcgfCBtYXRjaEdyZWF0ZXJXaWR0aCkgPyAnY2xvc2UnIDogJ2Fycm93LWJhY2snXCIgKGNsaWNrKT1cIiRldmVudC5wcmV2ZW50RGVmYXVsdCgpOyBjbG9zZSgpXCI+PC9pb24tYmFjay1idXR0b24+XG4gICAgICAgICAgICAgICAgPC9pb254LWJ1dHRvbnM+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGlvbi10aXRsZSBzdHlsZT1cIm1hcmdpbjogMDsgcGFkZGluZzogMDtcIj57e1wiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IjbGluay9MaW5rXCIgfCBpbnRsTWVzc2FnZX19PC9pb24tdGl0bGU+XG5cbiAgICAgICAgICAgICAgICA8aW9ueC1idXR0b25zIHNsb3Q9XCJlbmRcIj5cblxuICAgICAgICAgICAgICAgICAgICA8aW9uLWJ1dHRvbiBmaWxsPVwiY2xlYXJcIiBjb2xvcj1cImRhcmtcIiAoY2xpY2spPVwidW5saW5rKClcIiAqbmdJZj1cImV4aXN0aW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW9uLWljb24gbmFtZT1cInRyYXNoXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpb24tbGFiZWw+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI2xpbmsvVW5saW5rXCIgfCBpbnRsTWVzc2FnZX19PC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICA8aW9uLWJ1dHRvbiBmaWxsPVwiY2xlYXJcIiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwib2soKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJjaGVja21hcmtcIiBzbG90PVwic3RhcnRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1sYWJlbD57e1wiQGNvLm1tb25zL2pzLWludGwjRG9uZVwiIHwgaW50bE1lc3NhZ2V9fTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L2lvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDwvaW9ueC1idXR0b25zPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9pb24tdG9vbGJhcj5cbiAgICAgICAgICAgIFxuICAgICAgICA8L2lvbi1oZWFkZXI+XG4gICAgICAgIDxpb24tY29udGVudD5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGZvcm0gaW9ueC1mb3JtLWhlbHBlciBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8aW9uLWdyaWQ+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8aW9uLXJvdz5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1jb2wgW3NpemVYc109XCIxMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpb254LWZvcm0taXRlbT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW9uLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW9uLWxhYmVsIHBvc2l0aW9uPVwic3RhY2tlZFwiPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNsaW5rL0xpbmsgdHlwZVwiIHwgaW50bE1lc3NhZ2V9fTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlvbngtc2VsZWN0IHJlcXVpcmVkIFtjb21wYXJlQXNTdHJpbmddPVwidHJ1ZVwiIGZvcm1Db250cm9sTmFtZT1cInR5cGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW9ueC1zZWxlY3Qtb3B0aW9uICpuZ0Zvcj1cImxldCB0eXBlIG9mIHR5cGVzXCIgW3ZhbHVlXT1cInR5cGVcIj57e3R5cGUubGFiZWwgfCBpbnRsTWVzc2FnZX19PC9pb254LXNlbGVjdC1vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2lvbngtc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2lvbi1pdGVtPlxuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaW9ueC1mb3JtLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2lvbi1jb2w+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpb24tY29sIFtzaXplWHNdPVwiMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW9ueC1mb3JtLWl0ZW0+XG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpb24taXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpb24tbGFiZWwgcG9zaXRpb249XCJzdGFja2VkXCI+e3soZm9ybS5jb250cm9sc1sndHlwZSddLnZhbHVlLmlucHV0TGFiZWwgfHwgXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNsaW5rL0xpbmtcIikgfCBpbnRsTWVzc2FnZX19PC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW9uLWlucHV0IGZvcm1Db250cm9sTmFtZT1cImxpbmtcIiB0eXBlPVwiZm9ybS5jb250cm9sc1sndHlwZSddLnZhbHVlLmlucHV0VHlwZVwiPjwvaW9uLWlucHV0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2lvbi1pdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlvbngtZm9ybS1pdGVtLWVycm9yIGNvbnRyb2w9XCJsaW5rXCIgbWFya2VkQXM9XCJkaXJ0eVwiPjwvaW9ueC1mb3JtLWl0ZW0tZXJyb3I+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW9ueC1mb3JtLWl0ZW0taGludCAqbmdJZj1cImZvcm0uY29udHJvbHNbJ3R5cGUnXS52YWx1ZS5pbnB1dEhpbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwiZm9ybS5jb250cm9sc1sndHlwZSddLnZhbHVlLmlucHV0SGludCB8IGludGxNZXNzYWdlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2lvbngtZm9ybS1pdGVtLWhpbnQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2lvbngtZm9ybS1pdGVtPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2lvbi1jb2w+XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPC9pb24tcm93PlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPC9pb24tZ3JpZD5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIFxuICAgICAgICA8L2lvbi1jb250ZW50PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGA6aG9zdCBpb24taXRlbTpub3QoLmlvbi1kaXJ0eSkgeyAtLWhpZ2hsaWdodC1oZWlnaHQ6IDBweDsgfWBcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIExpbmtNb2RhbCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIHN0YXRpYyBhc3luYyBwcmVzZW50KG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLCBlZGl0b3I6IEh0bWxFZGl0b3IpIHtcblxuICAgICAgICBjb25zdCBtb2RhbCA9IGF3YWl0IG1vZGFsQ29udHJvbGxlci5jcmVhdGUoe2NvbXBvbmVudDogTGlua01vZGFsLCBjb21wb25lbnRQcm9wczoge2VkaXRvcjogZWRpdG9yfX0pO1xuICAgICAgICBtb2RhbC5wcmVzZW50KCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBlZGl0b3I6IEh0bWxFZGl0b3I7XG5cbiAgICBleGlzdGluZzogYm9vbGVhbjtcblxuICAgIHR5cGVzOiBMaW5rVHlwZVtdO1xuXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgQFZpZXdDaGlsZChGb3JtSGVscGVyLCB7c3RhdGljOiBmYWxzZX0pXG4gICAgZm9ybUhlbHBlcjogRm9ybUhlbHBlcjtcblxuICAgIGFzeW5jIGNsb3NlKCkge1xuICAgICAgICBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XG4gICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgdW5saW5rKCkge1xuXG4gICAgICAgIGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcblxuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmVkaXRvci5zdGF0ZS5zZWxlY3Rpb247XG5cbiAgICAgICAgaWYgKHNlbGVjdGlvbi5lbXB0eSkge1xuXG4gICAgICAgICAgICBjb25zdCB0ciA9IHRoaXMuZWRpdG9yLnN0YXRlLnRyO1xuXG4gICAgICAgICAgICB0ci5kb2Mubm9kZXNCZXR3ZWVuKHNlbGVjdGlvbi5mcm9tLCBzZWxlY3Rpb24udG8sIChub2RlLCBwb3MpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChub2RlLmlzVGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCAkcG9zID0gdHIuZG9jLnJlc29sdmUocG9zKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBwb3MgLSAkcG9zLnRleHRPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgJHBvcy5wYXJlbnQuY2hpbGQoJHBvcy5pbmRleCgpKS5ub2RlU2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICB0ci5yZW1vdmVNYXJrKHN0YXJ0LCBlbmQsIHNjaGVtYS5tYXJrcy5saW5rKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5lZGl0b3Iudmlldy5kaXNwYXRjaCh0cik7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvZ2dsZU1hcmsoc2NoZW1hLm1hcmtzLmxpbmspKHRoaXMuZWRpdG9yLnN0YXRlLCB0ciA9PiB0aGlzLmVkaXRvci52aWV3LmRpc3BhdGNoKHRyKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBvaygpIHtcbiAgICAgICAgdGhpcy5mb3JtSGVscGVyLnZhbGlkYXRlQWxsKFwiZGlydHlcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuZm9ybS52YWxpZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xuXG4gICAgICAgICAgICBjb25zdCBsaW5rVHlwZSA9IHRoaXMuZm9ybS5jb250cm9scy50eXBlLnZhbHVlIGFzIExpbmtUeXBlO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5lZGl0b3Iuc3RhdGUuc2VsZWN0aW9uO1xuXG4gICAgICAgICAgICBjb25zdCB0ciA9IHRoaXMuZWRpdG9yLnN0YXRlLnRyO1xuXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmVtcHR5KSB7XG5cbiAgICAgICAgICAgICAgICB0ci5kb2Mubm9kZXNCZXR3ZWVuKHNlbGVjdGlvbi5mcm9tLCBzZWxlY3Rpb24udG8sIChub2RlLCBwb3MpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5pc1RleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtzdGFydCwgZW5kfSA9IGZpbmROb2RlU3RhcnRFbmQodHIuZG9jLCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHIuYWRkTWFyayhzdGFydCwgZW5kLCBzY2hlbWEubWFyayhzY2hlbWEubWFya3MubGluaywge2hyZWY6IGxpbmtUeXBlLnVyaSh0aGlzLmZvcm0uY29udHJvbHMubGluay52YWx1ZSl9KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIC8vIHVzdXdhbXkgcG9wcnplZG5pIGxpbmtcbiAgICAgICAgICAgICAgICB0ci5kb2Mubm9kZXNCZXR3ZWVuKHNlbGVjdGlvbi5mcm9tLCBzZWxlY3Rpb24udG8sIChub2RlLCBwb3MpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5pc1RleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtzdGFydCwgZW5kfSA9IGZpbmROb2RlU3RhcnRFbmQodHIuZG9jLCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHIucmVtb3ZlTWFyayhzdGFydCwgZW5kLCBzY2hlbWEubWFya3MubGluayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRyLmFkZE1hcmsoc2VsZWN0aW9uLmZyb20sIHNlbGVjdGlvbi50bywgc2NoZW1hLm1hcmsoc2NoZW1hLm1hcmtzLmxpbmssIHtocmVmOiBsaW5rVHlwZS51cmkodGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsudmFsdWUpfSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVkaXRvci52aWV3LmRpc3BhdGNoKHRyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgdHlwZUNoYW5nZWQoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZm9ybS5jb250cm9scy5saW5rLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHMubGluay5tYXJrQXNEaXJ0eSgpO1xuICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgc2xlZXAoNTApOyAvLyB3ZSBtdXN0IHdhaXQgZm9yIGNsb3NpbmcgdHlwZSBzZWxlY3RvclxuXG4gICAgICAgIHRoaXMuZm9ybUhlbHBlci5mb2N1cyhcImxpbmtcIiwgZmFsc2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VMaW5rKHVyaTogc3RyaW5nKToge3R5cGU6IExpbmtUeXBlLCBsaW5rOiBzdHJpbmd9IHtcblxuICAgICAgICBjb25zdCBwcmVmaXhlcyA9IHtcbiAgICAgICAgICAgIFwiaHR0cDpcIjogRGVmYXVsdExpbmtUeXBlLnd3dyxcbiAgICAgICAgICAgIFwiaHR0cHM6XCI6IERlZmF1bHRMaW5rVHlwZS53d3csXG4gICAgICAgICAgICBcInRlbDpcIjogRGVmYXVsdExpbmtUeXBlLnRlbCxcbiAgICAgICAgICAgIFwic21zOlwiOiBEZWZhdWx0TGlua1R5cGUuc21zLFxuICAgICAgICAgICAgXCJtYWlsdG86XCI6IERlZmF1bHRMaW5rVHlwZS5lbWFpbFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGxvd2VyQ2FzZWRVcmkgPSB1cmkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgZm9yIChjb25zdCBwcmVmaXggb2YgT2JqZWN0LmtleXMocHJlZml4ZXMpKSB7XG4gICAgICAgICAgICBpZiAobG93ZXJDYXNlZFVyaS5zdGFydHNXaXRoKHByZWZpeCkpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmsgPSB7dHlwZTogcHJlZml4ZXNbcHJlZml4XSwgbGluazogdXJpLnRyaW0oKX07XG5cbiAgICAgICAgICAgICAgICBpZiAocHJlZml4ZXNbcHJlZml4XSAhPT0gRGVmYXVsdExpbmtUeXBlLnd3dykge1xuICAgICAgICAgICAgICAgICAgICBsaW5rLmxpbmsgPSB1cmkuc3Vic3RyaW5nKHByZWZpeC5sZW5ndGgpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbGluaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7dHlwZTogRGVmYXVsdExpbmtUeXBlLm90aGVyLCBsaW5rOiB1cml9O1xuICAgIH1cblxuICAgIHByaXZhdGUgbGlua1ZhbGlkYXRvcihjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHtcblxuICAgICAgICBjb25zdCByZXF1aXJlZCA9IFZhbGlkYXRvcnMucmVxdWlyZWQoY29udHJvbCk7XG4gICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMuZm9ybS5jb250cm9scy50eXBlLnZhbHVlIGFzIExpbmtUeXBlO1xuICAgICAgICBjb25zdCB2YWxpZGF0b3JzID0gdHlwZS5pbnB1dFZhbGlkYXRvcnM7XG5cbiAgICAgICAgaWYgKHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdmFsaWRhdG9yIG9mIHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByID0gdmFsaWRhdG9yKGNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGlvblZpZXdEaWRFbnRlcigpIHtcbiAgICAgICAgdGhpcy5mb3JtSGVscGVyLmZvY3VzKFwibGlua1wiLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgYXN5bmMgaW9uVmlld1dpbGxMZWF2ZSgpIHtcbiAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHR5cGVDaGFuZ2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy50eXBlcyA9IFtEZWZhdWx0TGlua1R5cGUud3d3LCBEZWZhdWx0TGlua1R5cGUuZW1haWwsIERlZmF1bHRMaW5rVHlwZS50ZWwsIERlZmF1bHRMaW5rVHlwZS5zbXMsIERlZmF1bHRMaW5rVHlwZS5vdGhlcl07XG5cbiAgICAgICAgdGhpcy5mb3JtID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgICAgICAgICB0eXBlOiBuZXcgRm9ybUNvbnRyb2woRGVmYXVsdExpbmtUeXBlLnd3dyksXG4gICAgICAgICAgICBsaW5rOiBuZXcgRm9ybUNvbnRyb2woKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZvcm0uY29udHJvbHMubGluay5zZXRWYWxpZGF0b3JzKGNvbnRyb2wgPT4gdGhpcy5saW5rVmFsaWRhdG9yKGNvbnRyb2wpKTtcblxuICAgICAgICB0aGlzLnR5cGVDaGFuZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5mb3JtLmNvbnRyb2xzW1widHlwZVwiXS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMudHlwZUNoYW5nZWQoKSk7XG4gICAgICAgIHRoaXMudHlwZUNoYW5nZWQoKTtcblxuICAgICAgICB0aGlzLmV4aXN0aW5nID0gdW5kZWZpbmVkO1xuICAgICAgICBNQVJLUzogZm9yIChjb25zdCBtYXJrIG9mIGZpbmRNYXJrc0luU2VsZWN0aW9uKHRoaXMuZWRpdG9yLnN0YXRlLCBzY2hlbWEubWFya3MubGluaykpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IHRoaXMucGFyc2VMaW5rKG1hcmsuYXR0cnMuaHJlZik7XG4gICAgICAgICAgICBpZiAocGFyc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW1widHlwZVwiXS5zZXRWYWx1ZShwYXJzZWQudHlwZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzW1wibGlua1wiXS5zZXRWYWx1ZShwYXJzZWQubGluayk7XG4gICAgICAgICAgICAgICAgdGhpcy5leGlzdGluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdW5zdWJzY3JpYmUodGhpcy50eXBlQ2hhbmdlc1N1YnNjcmlwdGlvbik7XG4gICAgfVxuXG59XG4iXX0=