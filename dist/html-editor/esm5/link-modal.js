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
                        if (this.formHelper) {
                            this.formHelper.focus("link", false);
                        }
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
            template: "<ion-header>\n\n    <ion-toolbar>\n\n        <ionx-buttons slot=\"start\">\n            <ion-back-button style=\"display: inline-block\" [icon]=\"('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back'\" (click)=\"$event.preventDefault(); close()\"></ion-back-button>\n        </ionx-buttons>\n\n        <ion-title style=\"margin: 0; padding: 0;\">{{\"@co.mmons/ionic-extensions/html-editor#link/Link\" | intlMessage}}</ion-title>\n\n        <ionx-buttons slot=\"end\">\n\n            <ion-button fill=\"clear\" color=\"dark\" (click)=\"unlink()\" *ngIf=\"existing\">\n                <ion-icon name=\"trash\" slot=\"start\"></ion-icon>\n                <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#link/Unlink\" | intlMessage}}</ion-label>\n            </ion-button>\n\n            <ion-button fill=\"clear\" color=\"primary\" (click)=\"ok()\">\n                <ion-icon name=\"checkmark\" slot=\"start\"></ion-icon>\n                <ion-label>{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-label>\n            </ion-button>\n\n        </ionx-buttons>\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content [forceOverscroll]=\"false\">\n\n    <ionx-spinner slot=\"fixed\" fill *ngIf=\"!form\"></ionx-spinner>\n\n    <form ionx-form-helper [formGroup]=\"form\" *ngIf=\"form\">\n\n        <ion-grid>\n\n            <ion-row>\n\n                <ion-col [sizeXs]=\"12\">\n\n                    <ionx-form-item>\n\n                        <ion-item>\n                            <ion-label position=\"stacked\">{{\"@co.mmons/ionic-extensions/html-editor#link/Link type\" | intlMessage}}</ion-label>\n                            <ionx-select required [compareAsString]=\"true\" formControlName=\"type\">\n                                <ionx-select-option *ngFor=\"let type of types\" [value]=\"type\">{{type.label | intlMessage}}</ionx-select-option>\n                            </ionx-select>\n                        </ion-item>\n\n                    </ionx-form-item>\n\n                </ion-col>\n\n                <ion-col [sizeXs]=\"12\">\n\n                    <ionx-form-item>\n\n                        <ion-item>\n                            <ion-label position=\"stacked\">{{(form.controls['type'].value.inputLabel || \"@co.mmons/ionic-extensions/html-editor#link/Link\") | intlMessage}}</ion-label>\n                            <ion-input formControlName=\"link\" type=\"form.controls['type'].value.inputType\"></ion-input>\n                        </ion-item>\n\n                        <ionx-form-item-error control=\"link\" markedAs=\"dirty\"></ionx-form-item-error>\n\n                        <ionx-form-item-hint *ngIf=\"form.controls['type'].value.inputHint\">\n                            <span [innerHTML]=\"form.controls['type'].value.inputHint | intlMessage\"></span>\n                        </ionx-form-item-hint>\n\n                    </ionx-form-item>\n\n                </ion-col>\n\n            </ion-row>\n\n\n        </ion-grid>\n\n    </form>\n\n</ion-content>\n",
            styles: [":host ion-item:not(.ion-dirty) { --highlight-height: 0px; }"]
        })
    ], LinkModal);
    return LinkModal;
}());
export { LinkModal };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1tb2RhbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yLyIsInNvdXJjZXMiOlsibGluay1tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQWtCLFdBQVcsRUFBRSxTQUFTLEVBQW9CLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JHLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDOUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFHaEQsT0FBTyxFQUFDLGVBQWUsRUFBVyxNQUFNLGFBQWEsQ0FBQztBQUN0RCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFDakYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFRekU7SUFRSSxtQkFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQ3BELENBQUM7a0JBVFEsU0FBUztJQUVMLGlCQUFPLEdBQXBCLFVBQXFCLGVBQWdDLEVBQUUsTUFBa0I7Ozs7OzRCQUV2RCxxQkFBTSxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUMsU0FBUyxFQUFFLFdBQVMsRUFBRSxjQUFjLEVBQUUsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFDLEVBQUMsQ0FBQyxFQUFBOzt3QkFBOUYsS0FB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LElBQUksQ0FBQyxDQUFDO29CQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztpQkFDeEI7YUFDSjs7Ozs7Ozs7O0lBQ0wsQ0FBQztJQUlELCtCQUFXLEdBQVg7UUFDSSxXQUFXLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDOUMsQ0FBQzs7O2dCQTFMb0MsZUFBZTs7SUFJcEQ7UUFEQyxLQUFLLEVBQUU7NkNBQ21CO0lBUzNCO1FBREMsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQztpREFDaEI7SUFyQmQsU0FBUztRQU5yQixTQUFTLENBQUM7WUFDUCw2OEZBQThCO3FCQUUxQiw2REFBNkQ7U0FFcEUsQ0FBQztPQUNXLFNBQVMsQ0FvTXJCO0lBQUQsZ0JBQUM7Q0FBQSxBQXBNRCxJQW9NQztTQXBNWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRpb25FcnJvcnMsIFZhbGlkYXRvcnN9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtGb3JtSGVscGVyfSBmcm9tIFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZm9ybS1oZWxwZXJcIjtcbmltcG9ydCB7c2xlZXB9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHt1bnN1YnNjcmliZX0gZnJvbSBcIkBjby5tbW9ucy9yeGpzLXV0aWxzXCI7XG5pbXBvcnQge01vZGFsQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge3RvZ2dsZU1hcmt9IGZyb20gXCJwcm9zZW1pcnJvci1jb21tYW5kc1wiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0h0bWxFZGl0b3J9IGZyb20gXCIuL2VkaXRvclwiO1xuaW1wb3J0IHtEZWZhdWx0TGlua1R5cGUsIExpbmtUeXBlfSBmcm9tIFwiLi9saW5rLXR5cGVcIjtcbmltcG9ydCB7c2NoZW1hfSBmcm9tIFwiLi9wcm9zZW1pcnJvci9zY2hlbWFcIjtcbmltcG9ydCB7ZmluZE1hcmtzSW5TZWxlY3Rpb259IGZyb20gXCIuL3Byb3NlbWlycm9yL3V0aWxzL2ZpbmQtbWFya3MtaW4tc2VsZWN0aW9uXCI7XG5pbXBvcnQge2ZpbmROb2RlU3RhcnRFbmR9IGZyb20gXCIuL3Byb3NlbWlycm9yL3V0aWxzL2ZpbmQtbm9kZS1zdGFydC1lbmRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6IFwibGluay1tb2RhbC5odG1sXCIsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGA6aG9zdCBpb24taXRlbTpub3QoLmlvbi1kaXJ0eSkgeyAtLWhpZ2hsaWdodC1oZWlnaHQ6IDBweDsgfWBcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIExpbmtNb2RhbCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcblxuICAgIHN0YXRpYyBhc3luYyBwcmVzZW50KG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLCBlZGl0b3I6IEh0bWxFZGl0b3IpIHtcblxuICAgICAgICBjb25zdCBtb2RhbCA9IGF3YWl0IG1vZGFsQ29udHJvbGxlci5jcmVhdGUoe2NvbXBvbmVudDogTGlua01vZGFsLCBjb21wb25lbnRQcm9wczoge2VkaXRvcjogZWRpdG9yfX0pO1xuICAgICAgICBtb2RhbC5wcmVzZW50KCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBlZGl0b3I6IEh0bWxFZGl0b3I7XG5cbiAgICBleGlzdGluZzogYm9vbGVhbjtcblxuICAgIHR5cGVzOiBMaW5rVHlwZVtdO1xuXG4gICAgZm9ybTogRm9ybUdyb3VwO1xuXG4gICAgQFZpZXdDaGlsZChGb3JtSGVscGVyLCB7c3RhdGljOiBmYWxzZX0pXG4gICAgZm9ybUhlbHBlcjogRm9ybUhlbHBlcjtcblxuICAgIGFzeW5jIGNsb3NlKCkge1xuICAgICAgICBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XG4gICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgdW5saW5rKCkge1xuXG4gICAgICAgIGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcblxuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmVkaXRvci5zdGF0ZS5zZWxlY3Rpb247XG5cbiAgICAgICAgaWYgKHNlbGVjdGlvbi5lbXB0eSkge1xuXG4gICAgICAgICAgICBjb25zdCB0ciA9IHRoaXMuZWRpdG9yLnN0YXRlLnRyO1xuXG4gICAgICAgICAgICB0ci5kb2Mubm9kZXNCZXR3ZWVuKHNlbGVjdGlvbi5mcm9tLCBzZWxlY3Rpb24udG8sIChub2RlLCBwb3MpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChub2RlLmlzVGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCAkcG9zID0gdHIuZG9jLnJlc29sdmUocG9zKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBwb3MgLSAkcG9zLnRleHRPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgJHBvcy5wYXJlbnQuY2hpbGQoJHBvcy5pbmRleCgpKS5ub2RlU2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICB0ci5yZW1vdmVNYXJrKHN0YXJ0LCBlbmQsIHNjaGVtYS5tYXJrcy5saW5rKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5lZGl0b3Iudmlldy5kaXNwYXRjaCh0cik7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvZ2dsZU1hcmsoc2NoZW1hLm1hcmtzLmxpbmspKHRoaXMuZWRpdG9yLnN0YXRlLCB0ciA9PiB0aGlzLmVkaXRvci52aWV3LmRpc3BhdGNoKHRyKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBvaygpIHtcbiAgICAgICAgdGhpcy5mb3JtSGVscGVyLnZhbGlkYXRlQWxsKFwiZGlydHlcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuZm9ybS52YWxpZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xuXG4gICAgICAgICAgICBjb25zdCBsaW5rVHlwZSA9IHRoaXMuZm9ybS5jb250cm9scy50eXBlLnZhbHVlIGFzIExpbmtUeXBlO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5lZGl0b3Iuc3RhdGUuc2VsZWN0aW9uO1xuXG4gICAgICAgICAgICBjb25zdCB0ciA9IHRoaXMuZWRpdG9yLnN0YXRlLnRyO1xuXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmVtcHR5KSB7XG5cbiAgICAgICAgICAgICAgICB0ci5kb2Mubm9kZXNCZXR3ZWVuKHNlbGVjdGlvbi5mcm9tLCBzZWxlY3Rpb24udG8sIChub2RlLCBwb3MpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5pc1RleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtzdGFydCwgZW5kfSA9IGZpbmROb2RlU3RhcnRFbmQodHIuZG9jLCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHIuYWRkTWFyayhzdGFydCwgZW5kLCBzY2hlbWEubWFyayhzY2hlbWEubWFya3MubGluaywge2hyZWY6IGxpbmtUeXBlLnVyaSh0aGlzLmZvcm0uY29udHJvbHMubGluay52YWx1ZSl9KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIC8vIHVzdXdhbXkgcG9wcnplZG5pIGxpbmtcbiAgICAgICAgICAgICAgICB0ci5kb2Mubm9kZXNCZXR3ZWVuKHNlbGVjdGlvbi5mcm9tLCBzZWxlY3Rpb24udG8sIChub2RlLCBwb3MpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5pc1RleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtzdGFydCwgZW5kfSA9IGZpbmROb2RlU3RhcnRFbmQodHIuZG9jLCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHIucmVtb3ZlTWFyayhzdGFydCwgZW5kLCBzY2hlbWEubWFya3MubGluayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRyLmFkZE1hcmsoc2VsZWN0aW9uLmZyb20sIHNlbGVjdGlvbi50bywgc2NoZW1hLm1hcmsoc2NoZW1hLm1hcmtzLmxpbmssIHtocmVmOiBsaW5rVHlwZS51cmkodGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsudmFsdWUpfSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVkaXRvci52aWV3LmRpc3BhdGNoKHRyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgdHlwZUNoYW5nZWQoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZm9ybS5jb250cm9scy5saW5rLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm0uY29udHJvbHMubGluay5tYXJrQXNEaXJ0eSgpO1xuICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgc2xlZXAoNTApOyAvLyB3ZSBtdXN0IHdhaXQgZm9yIGNsb3NpbmcgdHlwZSBzZWxlY3RvclxuXG4gICAgICAgIGlmICh0aGlzLmZvcm1IZWxwZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUhlbHBlci5mb2N1cyhcImxpbmtcIiwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZUxpbmsodXJpOiBzdHJpbmcpOiB7dHlwZTogTGlua1R5cGUsIGxpbms6IHN0cmluZ30ge1xuXG4gICAgICAgIGNvbnN0IHByZWZpeGVzID0ge1xuICAgICAgICAgICAgXCJodHRwOlwiOiBEZWZhdWx0TGlua1R5cGUud3d3LFxuICAgICAgICAgICAgXCJodHRwczpcIjogRGVmYXVsdExpbmtUeXBlLnd3dyxcbiAgICAgICAgICAgIFwidGVsOlwiOiBEZWZhdWx0TGlua1R5cGUudGVsLFxuICAgICAgICAgICAgXCJzbXM6XCI6IERlZmF1bHRMaW5rVHlwZS5zbXMsXG4gICAgICAgICAgICBcIm1haWx0bzpcIjogRGVmYXVsdExpbmtUeXBlLmVtYWlsXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgbG93ZXJDYXNlZFVyaSA9IHVyaS50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByZWZpeCBvZiBPYmplY3Qua2V5cyhwcmVmaXhlcykpIHtcbiAgICAgICAgICAgIGlmIChsb3dlckNhc2VkVXJpLnN0YXJ0c1dpdGgocHJlZml4KSkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbGluayA9IHt0eXBlOiBwcmVmaXhlc1twcmVmaXhdLCBsaW5rOiB1cmkudHJpbSgpfTtcblxuICAgICAgICAgICAgICAgIGlmIChwcmVmaXhlc1twcmVmaXhdICE9PSBEZWZhdWx0TGlua1R5cGUud3d3KSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmsubGluayA9IHVyaS5zdWJzdHJpbmcocHJlZml4Lmxlbmd0aCkudHJpbSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBsaW5rO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHt0eXBlOiBEZWZhdWx0TGlua1R5cGUub3RoZXIsIGxpbms6IHVyaX07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsaW5rVmFsaWRhdG9yKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMge1xuXG4gICAgICAgIGNvbnN0IHJlcXVpcmVkID0gVmFsaWRhdG9ycy5yZXF1aXJlZChjb250cm9sKTtcbiAgICAgICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0eXBlID0gdGhpcy5mb3JtLmNvbnRyb2xzLnR5cGUudmFsdWUgYXMgTGlua1R5cGU7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRvcnMgPSB0eXBlLmlucHV0VmFsaWRhdG9ycztcblxuICAgICAgICBpZiAodmFsaWRhdG9ycykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB2YWxpZGF0b3Igb2YgdmFsaWRhdG9ycykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHIgPSB2YWxpZGF0b3IoY29udHJvbCk7XG4gICAgICAgICAgICAgICAgaWYgKHIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgaW9uVmlld0RpZEVudGVyKCkge1xuICAgICAgICB0aGlzLmZvcm1IZWxwZXIuZm9jdXMoXCJsaW5rXCIsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBhc3luYyBpb25WaWV3V2lsbExlYXZlKCkge1xuICAgICAgICB0aGlzLmVkaXRvci5mb2N1cygpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIHRoaXMudHlwZXMgPSBbRGVmYXVsdExpbmtUeXBlLnd3dywgRGVmYXVsdExpbmtUeXBlLmVtYWlsLCBEZWZhdWx0TGlua1R5cGUudGVsLCBEZWZhdWx0TGlua1R5cGUuc21zLCBEZWZhdWx0TGlua1R5cGUub3RoZXJdO1xuXG4gICAgICAgIHRoaXMuZm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xuICAgICAgICAgICAgdHlwZTogbmV3IEZvcm1Db250cm9sKERlZmF1bHRMaW5rVHlwZS53d3cpLFxuICAgICAgICAgICAgbGluazogbmV3IEZvcm1Db250cm9sKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsuc2V0VmFsaWRhdG9ycyhjb250cm9sID0+IHRoaXMubGlua1ZhbGlkYXRvcihjb250cm9sKSk7XG5cbiAgICAgICAgdGhpcy50eXBlQ2hhbmdlc1N1YnNjcmlwdGlvbiA9IHRoaXMuZm9ybS5jb250cm9sc1tcInR5cGVcIl0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnR5cGVDaGFuZ2VkKCkpO1xuICAgICAgICB0aGlzLnR5cGVDaGFuZ2VkKCk7XG5cbiAgICAgICAgdGhpcy5leGlzdGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgTUFSS1M6IGZvciAoY29uc3QgbWFyayBvZiBmaW5kTWFya3NJblNlbGVjdGlvbih0aGlzLmVkaXRvci5zdGF0ZSwgc2NoZW1hLm1hcmtzLmxpbmspKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJzZWQgPSB0aGlzLnBhcnNlTGluayhtYXJrLmF0dHJzLmhyZWYpO1xuICAgICAgICAgICAgaWYgKHBhcnNlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tcInR5cGVcIl0uc2V0VmFsdWUocGFyc2VkLnR5cGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9sc1tcImxpbmtcIl0uc2V0VmFsdWUocGFyc2VkLmxpbmspO1xuICAgICAgICAgICAgICAgIHRoaXMuZXhpc3RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0eXBlQ2hhbmdlc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHVuc3Vic2NyaWJlKHRoaXMudHlwZUNoYW5nZXNTdWJzY3JpcHRpb24pO1xuICAgIH1cblxufVxuIl19