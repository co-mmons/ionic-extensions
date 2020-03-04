import { __awaiter, __decorate, __generator, __values } from "tslib";
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
var LinkModal = /** @class */ (function () {
    function LinkModal(modalController) {
        this.modalController = modalController;
    }
    LinkModal_1 = LinkModal;
    LinkModal.present = function (modalController, editor) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var selection, tr_1;
            var _this = this;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var linkType_1, selection, tr_2;
            var _this = this;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
            for (var _b = __values(Object.keys(prefixes)), _c = _b.next(); !_c.done; _c = _b.next()) {
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
                for (var validators_1 = __values(validators), validators_1_1 = validators_1.next(); !validators_1_1.done; validators_1_1 = validators_1.next()) {
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
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.types = [DefaultLinkType.www, DefaultLinkType.email, DefaultLinkType.tel, DefaultLinkType.sms, DefaultLinkType.other];
                        this.form = new FormGroup({
                            type: new FormControl(this.existingType || DefaultLinkType.www),
                            link: new FormControl(this.existingLink)
                        });
                        this.form.controls.link.setValidators(function (control) { return _this.linkValidator(control); });
                        this.typeChangesSubscription = this.form.controls["type"].valueChanges.subscribe(function () { return _this.typeChanged(); });
                        this.typeChanged();
                        return [4 /*yield*/, waitTill(function () { return !!_this.formHelper; })];
                    case 1:
                        _a.sent();
                        this.formHelper.focus("link", false);
                        return [2 /*return*/];
                }
            });
        });
    };
    LinkModal.prototype.ionViewWillLeave = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.editor.focus();
                return [2 /*return*/];
            });
        });
    };
    LinkModal.prototype.ngOnInit = function () {
        var e_3, _a;
        try {
            MARKS: for (var _b = __values(findMarksInSelection(this.editor.state, schema.marks.link)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var mark = _c.value;
                var parsed = this.parseLink(mark.attrs.href);
                if (parsed) {
                    this.existingType = parsed.type;
                    this.existingLink = parsed.link;
                    this.existing = true;
                    break MARKS;
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
    __decorate([
        Input()
    ], LinkModal.prototype, "editor", void 0);
    __decorate([
        ViewChild(FormHelper, { static: false })
    ], LinkModal.prototype, "formHelper", void 0);
    LinkModal = LinkModal_1 = __decorate([
        Component({
            template: "<ion-header>\n\n    <ion-toolbar>\n\n        <ionx-buttons slot=\"start\">\n            <ion-back-button style=\"display: inline-block\" [icon]=\"('tablet' | matchGreaterWidth) ? 'close' : null\" (click)=\"$event.preventDefault(); close()\"></ion-back-button>\n        </ionx-buttons>\n\n        <ion-title style=\"margin: 0; padding: 0;\">{{\"@co.mmons/ionic-extensions/html-editor#link/Link\" | intlMessage}}</ion-title>\n\n        <ionx-buttons slot=\"end\">\n\n            <ion-button fill=\"clear\" color=\"dark\" (click)=\"unlink()\" *ngIf=\"existing\">\n                <ion-icon name=\"trash\" slot=\"start\"></ion-icon>\n                <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#link/Unlink\" | intlMessage}}</ion-label>\n            </ion-button>\n\n            <ion-button fill=\"clear\" color=\"primary\" (click)=\"ok()\">\n                <ion-icon name=\"checkmark\" slot=\"start\"></ion-icon>\n                <ion-label>{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-label>\n            </ion-button>\n\n        </ionx-buttons>\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content [forceOverscroll]=\"false\">\n\n    <ionx-spinner slot=\"fixed\" fill *ngIf=\"!form\"></ionx-spinner>\n\n    <form ionx-form-helper [formGroup]=\"form\" *ngIf=\"form\">\n\n        <ion-grid>\n\n            <ion-row>\n\n                <ion-col [sizeXs]=\"12\">\n\n                    <ionx-form-item>\n\n                        <ion-item>\n                            <ion-label position=\"stacked\">{{\"@co.mmons/ionic-extensions/html-editor#link/Link type\" | intlMessage}}</ion-label>\n                            <ionx-select required [compareAsString]=\"true\" formControlName=\"type\">\n                                <ionx-select-option *ngFor=\"let type of types\" [value]=\"type\">{{type.label | intlMessage}}</ionx-select-option>\n                            </ionx-select>\n                        </ion-item>\n\n                    </ionx-form-item>\n\n                </ion-col>\n\n                <ion-col [sizeXs]=\"12\">\n\n                    <ionx-form-item>\n\n                        <ion-item>\n                            <ion-label position=\"stacked\">{{(form.controls['type'].value.inputLabel || \"@co.mmons/ionic-extensions/html-editor#link/Link\") | intlMessage}}</ion-label>\n                            <ion-input formControlName=\"link\" type=\"form.controls['type'].value.inputType\"></ion-input>\n                        </ion-item>\n\n                        <ionx-form-item-error control=\"link\" markedAs=\"dirty\"></ionx-form-item-error>\n\n                        <ionx-form-item-hint *ngIf=\"form.controls['type'].value.inputHint\">\n                            <span [innerHTML]=\"form.controls['type'].value.inputHint | intlMessage\"></span>\n                        </ionx-form-item-hint>\n\n                    </ionx-form-item>\n\n                </ion-col>\n\n            </ion-row>\n\n\n        </ion-grid>\n\n    </form>\n\n</ion-content>\n",
            styles: [":host ion-item:not(.ion-dirty) { --highlight-height: 0px; }"]
        })
    ], LinkModal);
    return LinkModal;
}());
export { LinkModal };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1tb2RhbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yLyIsInNvdXJjZXMiOlsibGluay1tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQWtCLFdBQVcsRUFBRSxTQUFTLEVBQW9CLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JHLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBR2hELE9BQU8sRUFBQyxlQUFlLEVBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBUXpFO0lBUUksbUJBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUNwRCxDQUFDO2tCQVRRLFNBQVM7SUFFTCxpQkFBTyxHQUFwQixVQUFxQixlQUFnQyxFQUFFLE1BQWtCOzs7Ozs0QkFFdkQscUJBQU0sZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFDLFNBQVMsRUFBRSxXQUFTLEVBQUUsY0FBYyxFQUFFLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBQyxFQUFDLENBQUMsRUFBQTs7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QUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNyQixNQUFNLEtBQUssQ0FBQztpQkFDZjthQUNKOzs7Ozs7Ozs7SUFDTCxDQUFDO0lBSUQsK0JBQVcsR0FBWDtRQUNJLFdBQVcsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7Z0JBak1vQyxlQUFlOztJQUlwRDtRQURDLEtBQUssRUFBRTs2Q0FDbUI7SUFhM0I7UUFEQyxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDO2lEQUNoQjtJQXpCZCxTQUFTO1FBTnJCLFNBQVMsQ0FBQztZQUNQLHE4RkFBOEI7cUJBRTFCLDZEQUE2RDtTQUVwRSxDQUFDO09BQ1csU0FBUyxDQTJNckI7SUFBRCxnQkFBQztDQUFBLEFBM01ELElBMk1DO1NBM01ZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q2hpbGR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yc30gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge0Zvcm1IZWxwZXJ9IGZyb20gXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9mb3JtLWhlbHBlclwiO1xuaW1wb3J0IHtzbGVlcCwgd2FpdFRpbGx9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHt1bnN1YnNjcmliZX0gZnJvbSBcIkBjby5tbW9ucy9yeGpzLXV0aWxzXCI7XG5pbXBvcnQge01vZGFsQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge3RvZ2dsZU1hcmt9IGZyb20gXCJwcm9zZW1pcnJvci1jb21tYW5kc1wiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0h0bWxFZGl0b3J9IGZyb20gXCIuL2VkaXRvclwiO1xuaW1wb3J0IHtEZWZhdWx0TGlua1R5cGUsIExpbmtUeXBlfSBmcm9tIFwiLi9saW5rLXR5cGVcIjtcbmltcG9ydCB7c2NoZW1hfSBmcm9tIFwiLi9wcm9zZW1pcnJvci9zY2hlbWFcIjtcbmltcG9ydCB7ZmluZE1hcmtzSW5TZWxlY3Rpb259IGZyb20gXCIuL3Byb3NlbWlycm9yL3V0aWxzL2ZpbmQtbWFya3MtaW4tc2VsZWN0aW9uXCI7XG5pbXBvcnQge2ZpbmROb2RlU3RhcnRFbmR9IGZyb20gXCIuL3Byb3NlbWlycm9yL3V0aWxzL2ZpbmQtbm9kZS1zdGFydC1lbmRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGVVcmw6IFwibGluay1tb2RhbC5odG1sXCIsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGA6aG9zdCBpb24taXRlbTpub3QoLmlvbi1kaXJ0eSkgeyAtLWhpZ2hsaWdodC1oZWlnaHQ6IDBweDsgfWBcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIExpbmtNb2RhbCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcblxuICAgIHN0YXRpYyBhc3luYyBwcmVzZW50KG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLCBlZGl0b3I6IEh0bWxFZGl0b3IpIHtcblxuICAgICAgICBjb25zdCBtb2RhbCA9IGF3YWl0IG1vZGFsQ29udHJvbGxlci5jcmVhdGUoe2NvbXBvbmVudDogTGlua01vZGFsLCBjb21wb25lbnRQcm9wczoge2VkaXRvcjogZWRpdG9yfX0pO1xuICAgICAgICBtb2RhbC5wcmVzZW50KCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBlZGl0b3I6IEh0bWxFZGl0b3I7XG5cbiAgICBleGlzdGluZzogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgZXhpc3RpbmdUeXBlOiBMaW5rVHlwZTtcblxuICAgIHByaXZhdGUgZXhpc3RpbmdMaW5rOiBzdHJpbmc7XG5cbiAgICB0eXBlczogTGlua1R5cGVbXTtcblxuICAgIGZvcm06IEZvcm1Hcm91cDtcblxuICAgIEBWaWV3Q2hpbGQoRm9ybUhlbHBlciwge3N0YXRpYzogZmFsc2V9KVxuICAgIGZvcm1IZWxwZXI6IEZvcm1IZWxwZXI7XG5cbiAgICBhc3luYyBjbG9zZSgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgICAgICB0aGlzLmVkaXRvci5mb2N1cygpO1xuICAgIH1cblxuICAgIGFzeW5jIHVubGluaygpIHtcblxuICAgICAgICBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5lZGl0b3Iuc3RhdGUuc2VsZWN0aW9uO1xuXG4gICAgICAgIGlmIChzZWxlY3Rpb24uZW1wdHkpIHtcblxuICAgICAgICAgICAgY29uc3QgdHIgPSB0aGlzLmVkaXRvci5zdGF0ZS50cjtcblxuICAgICAgICAgICAgdHIuZG9jLm5vZGVzQmV0d2VlbihzZWxlY3Rpb24uZnJvbSwgc2VsZWN0aW9uLnRvLCAobm9kZSwgcG9zKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAobm9kZS5pc1RleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJHBvcyA9IHRyLmRvYy5yZXNvbHZlKHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gcG9zIC0gJHBvcy50ZXh0T2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSBzdGFydCArICRwb3MucGFyZW50LmNoaWxkKCRwb3MuaW5kZXgoKSkubm9kZVNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgdHIucmVtb3ZlTWFyayhzdGFydCwgZW5kLCBzY2hlbWEubWFya3MubGluayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnZpZXcuZGlzcGF0Y2godHIpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b2dnbGVNYXJrKHNjaGVtYS5tYXJrcy5saW5rKSh0aGlzLmVkaXRvci5zdGF0ZSwgdHIgPT4gdGhpcy5lZGl0b3Iudmlldy5kaXNwYXRjaCh0cikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgb2soKSB7XG4gICAgICAgIHRoaXMuZm9ybUhlbHBlci52YWxpZGF0ZUFsbChcImRpcnR5XCIpO1xuXG4gICAgICAgIGlmICh0aGlzLmZvcm0udmFsaWQpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcblxuICAgICAgICAgICAgY29uc3QgbGlua1R5cGUgPSB0aGlzLmZvcm0uY29udHJvbHMudHlwZS52YWx1ZSBhcyBMaW5rVHlwZTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuZWRpdG9yLnN0YXRlLnNlbGVjdGlvbjtcblxuICAgICAgICAgICAgY29uc3QgdHIgPSB0aGlzLmVkaXRvci5zdGF0ZS50cjtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5lbXB0eSkge1xuXG4gICAgICAgICAgICAgICAgdHIuZG9jLm5vZGVzQmV0d2VlbihzZWxlY3Rpb24uZnJvbSwgc2VsZWN0aW9uLnRvLCAobm9kZSwgcG9zKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuaXNUZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7c3RhcnQsIGVuZH0gPSBmaW5kTm9kZVN0YXJ0RW5kKHRyLmRvYywgcG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyLmFkZE1hcmsoc3RhcnQsIGVuZCwgc2NoZW1hLm1hcmsoc2NoZW1hLm1hcmtzLmxpbmssIHtocmVmOiBsaW5rVHlwZS51cmkodGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsudmFsdWUpfSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLyB1c3V3YW15IHBvcHJ6ZWRuaSBsaW5rXG4gICAgICAgICAgICAgICAgdHIuZG9jLm5vZGVzQmV0d2VlbihzZWxlY3Rpb24uZnJvbSwgc2VsZWN0aW9uLnRvLCAobm9kZSwgcG9zKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuaXNUZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7c3RhcnQsIGVuZH0gPSBmaW5kTm9kZVN0YXJ0RW5kKHRyLmRvYywgcG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyLnJlbW92ZU1hcmsoc3RhcnQsIGVuZCwgc2NoZW1hLm1hcmtzLmxpbmspO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0ci5hZGRNYXJrKHNlbGVjdGlvbi5mcm9tLCBzZWxlY3Rpb24udG8sIHNjaGVtYS5tYXJrKHNjaGVtYS5tYXJrcy5saW5rLCB7aHJlZjogbGlua1R5cGUudXJpKHRoaXMuZm9ybS5jb250cm9scy5saW5rLnZhbHVlKX0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lZGl0b3Iudmlldy5kaXNwYXRjaCh0cik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHR5cGVDaGFuZ2VkKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmZvcm0uY29udHJvbHMubGluay52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsubWFya0FzRGlydHkoKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5jb250cm9scy5saW5rLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHNsZWVwKDUwKTsgLy8gd2UgbXVzdCB3YWl0IGZvciBjbG9zaW5nIHR5cGUgc2VsZWN0b3JcblxuICAgICAgICBpZiAodGhpcy5mb3JtSGVscGVyKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1IZWxwZXIuZm9jdXMoXCJsaW5rXCIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VMaW5rKHVyaTogc3RyaW5nKToge3R5cGU6IExpbmtUeXBlLCBsaW5rOiBzdHJpbmd9IHtcblxuICAgICAgICBjb25zdCBwcmVmaXhlcyA9IHtcbiAgICAgICAgICAgIFwiaHR0cDpcIjogRGVmYXVsdExpbmtUeXBlLnd3dyxcbiAgICAgICAgICAgIFwiaHR0cHM6XCI6IERlZmF1bHRMaW5rVHlwZS53d3csXG4gICAgICAgICAgICBcInRlbDpcIjogRGVmYXVsdExpbmtUeXBlLnRlbCxcbiAgICAgICAgICAgIFwic21zOlwiOiBEZWZhdWx0TGlua1R5cGUuc21zLFxuICAgICAgICAgICAgXCJtYWlsdG86XCI6IERlZmF1bHRMaW5rVHlwZS5lbWFpbFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGxvd2VyQ2FzZWRVcmkgPSB1cmkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgZm9yIChjb25zdCBwcmVmaXggb2YgT2JqZWN0LmtleXMocHJlZml4ZXMpKSB7XG4gICAgICAgICAgICBpZiAobG93ZXJDYXNlZFVyaS5zdGFydHNXaXRoKHByZWZpeCkpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmsgPSB7dHlwZTogcHJlZml4ZXNbcHJlZml4XSwgbGluazogdXJpLnRyaW0oKX07XG5cbiAgICAgICAgICAgICAgICBpZiAocHJlZml4ZXNbcHJlZml4XSAhPT0gRGVmYXVsdExpbmtUeXBlLnd3dykge1xuICAgICAgICAgICAgICAgICAgICBsaW5rLmxpbmsgPSB1cmkuc3Vic3RyaW5nKHByZWZpeC5sZW5ndGgpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbGluaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7dHlwZTogRGVmYXVsdExpbmtUeXBlLm90aGVyLCBsaW5rOiB1cml9O1xuICAgIH1cblxuICAgIHByaXZhdGUgbGlua1ZhbGlkYXRvcihjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHtcblxuICAgICAgICBjb25zdCByZXF1aXJlZCA9IFZhbGlkYXRvcnMucmVxdWlyZWQoY29udHJvbCk7XG4gICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMuZm9ybS5jb250cm9scy50eXBlLnZhbHVlIGFzIExpbmtUeXBlO1xuICAgICAgICBjb25zdCB2YWxpZGF0b3JzID0gdHlwZS5pbnB1dFZhbGlkYXRvcnM7XG5cbiAgICAgICAgaWYgKHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdmFsaWRhdG9yIG9mIHZhbGlkYXRvcnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByID0gdmFsaWRhdG9yKGNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGlvblZpZXdEaWRFbnRlcigpIHtcblxuICAgICAgICB0aGlzLnR5cGVzID0gW0RlZmF1bHRMaW5rVHlwZS53d3csIERlZmF1bHRMaW5rVHlwZS5lbWFpbCwgRGVmYXVsdExpbmtUeXBlLnRlbCwgRGVmYXVsdExpbmtUeXBlLnNtcywgRGVmYXVsdExpbmtUeXBlLm90aGVyXTtcblxuICAgICAgICB0aGlzLmZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcbiAgICAgICAgICAgIHR5cGU6IG5ldyBGb3JtQ29udHJvbCh0aGlzLmV4aXN0aW5nVHlwZSB8fCBEZWZhdWx0TGlua1R5cGUud3d3KSxcbiAgICAgICAgICAgIGxpbms6IG5ldyBGb3JtQ29udHJvbCh0aGlzLmV4aXN0aW5nTGluaylcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mb3JtLmNvbnRyb2xzLmxpbmsuc2V0VmFsaWRhdG9ycyhjb250cm9sID0+IHRoaXMubGlua1ZhbGlkYXRvcihjb250cm9sKSk7XG5cbiAgICAgICAgdGhpcy50eXBlQ2hhbmdlc1N1YnNjcmlwdGlvbiA9IHRoaXMuZm9ybS5jb250cm9sc1tcInR5cGVcIl0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnR5cGVDaGFuZ2VkKCkpO1xuICAgICAgICB0aGlzLnR5cGVDaGFuZ2VkKCk7XG5cbiAgICAgICAgYXdhaXQgd2FpdFRpbGwoKCkgPT4gISF0aGlzLmZvcm1IZWxwZXIpO1xuXG4gICAgICAgIHRoaXMuZm9ybUhlbHBlci5mb2N1cyhcImxpbmtcIiwgZmFsc2UpO1xuICAgIH1cblxuICAgIGFzeW5jIGlvblZpZXdXaWxsTGVhdmUoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgTUFSS1M6IGZvciAoY29uc3QgbWFyayBvZiBmaW5kTWFya3NJblNlbGVjdGlvbih0aGlzLmVkaXRvci5zdGF0ZSwgc2NoZW1hLm1hcmtzLmxpbmspKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJzZWQgPSB0aGlzLnBhcnNlTGluayhtYXJrLmF0dHJzLmhyZWYpO1xuICAgICAgICAgICAgaWYgKHBhcnNlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhpc3RpbmdUeXBlID0gcGFyc2VkLnR5cGU7XG4gICAgICAgICAgICAgICAgdGhpcy5leGlzdGluZ0xpbmsgPSBwYXJzZWQubGluaztcbiAgICAgICAgICAgICAgICB0aGlzLmV4aXN0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhayBNQVJLUztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdHlwZUNoYW5nZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB1bnN1YnNjcmliZSh0aGlzLnR5cGVDaGFuZ2VzU3Vic2NyaXB0aW9uKTtcbiAgICB9XG5cbn1cbiJdfQ==