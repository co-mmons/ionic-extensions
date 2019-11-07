import * as tslib_1 from "tslib";
import { Component, Input, ViewChild } from "@angular/core";
import { sleep, waitTill } from "@co.mmons/js-utils/core";
import { IonInput, ModalController, PopoverController } from "@ionic/angular";
import { LinkModal } from "./link-modal";
var InsertMenu = /** @class */ (function () {
    // @ts-ignore
    function InsertMenu(popoverController, modalController) {
        this.popoverController = popoverController;
        this.modalController = modalController;
    }
    InsertMenu.prototype.insertLink = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.popoverController.dismiss(undefined, "link");
                LinkModal.present(this.modalController, this.editor);
                return [2 /*return*/];
            });
        });
    };
    InsertMenu.prototype.insertYoutube = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.inputView = "youtube";
                        return [4 /*yield*/, waitTill(function () { return !!_this.youtubeInput; }, undefined, 2000)];
                    case 1:
                        _a.sent();
                        this.youtubeInput.setFocus();
                        return [2 /*return*/];
                }
            });
        });
    };
    // @ts-ignore
    InsertMenu.prototype.parseYoutube = function (value) {
        // https://www.youtube.com/watch?v=NqMgaHUNSQc
        // https://youtu.be/NqMgaHUNSQc
        // https://www.youtube.com/embed/NqMgaHUNSQc
        // https://www.youtube-nocookie.com/embed/NqMgaHUNSQc
        // https://youtu.be/NqMgaHUNSQc?t=17
        var e_1, _a;
        value = value.replace("-nocookie.com/", ".com/");
        value = value.replace("/embed/", "/");
        value = value.replace("youtu.be/", "youtube.com/");
        value = value.replace("watch?v=", "");
        value = value.replace("?", "&");
        var info = { id: undefined, start: undefined };
        if (value.indexOf("youtube.com/") > -1) {
            value = value.split("youtube.com/").splice(1, 1)[0];
            try {
                for (var _b = tslib_1.__values(value.split("&")), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var param = _c.value;
                    if (param.indexOf("=") < 0) {
                        info.id = param;
                    }
                    else if (param.startsWith("t=")) {
                        info.start = param.substring(2);
                    }
                    else if (param.startsWith("start=")) {
                        info.start = param.substring(6);
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
        }
        else {
        }
        if (info.id) {
            return info;
        }
    };
    InsertMenu.prototype.applyYoutube = function () {
        var info = this.parseYoutube(this.youtubeInput.value);
        if (info) {
            var tr = this.editor.state.tr.replaceSelectionWith(this.editor.state.schema.nodes.youtube.create({ id: info.id, start: info.start || 0 }));
            this.editor.view.dispatch(tr);
        }
        this.popoverController.dismiss(undefined, "youtube");
    };
    InsertMenu.prototype.cancel = function () {
        this.popoverController.dismiss();
    };
    InsertMenu.prototype.ngOnInit = function () {
    };
    InsertMenu.prototype.ionViewWillLeave = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (!this.inputView && !event.role) {
                    this.editor.focus();
                }
                return [2 /*return*/];
            });
        });
    };
    InsertMenu.prototype.ionViewDidLeave = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.inputView) return [3 /*break*/, 2];
                        return [4 /*yield*/, sleep(50)];
                    case 1:
                        _a.sent();
                        this.editor.focus();
                        return [3 /*break*/, 3];
                    case 2:
                        if (!event.role) {
                            this.editor.focus();
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InsertMenu.ctorParameters = function () { return [
        { type: PopoverController },
        { type: ModalController }
    ]; };
    tslib_1.__decorate([
        Input()
    ], InsertMenu.prototype, "editor", void 0);
    tslib_1.__decorate([
        ViewChild("youtubeInput", { static: false })
    ], InsertMenu.prototype, "youtubeInput", void 0);
    InsertMenu = tslib_1.__decorate([
        Component({
            template: "\n        <ion-list lines=\"full\">\n            \n            <ng-template [ngIf]=\"!inputView\">\n                \n                <ion-item button=\"true\" detail=\"false\" (click)=\"insertLink()\">\n                    <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#link/Link\" | intlMessage}}</ion-label>\n                    <ion-icon name=\"link\" slot=\"start\"></ion-icon>\n                </ion-item>\n    \n                <ion-item button=\"true\" detail=\"false\" (click)=\"insertYoutube()\">\n                    <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#youtube/YouTube video\" | intlMessage}}</ion-label>\n                    <ion-icon name=\"logo-youtube\" slot=\"start\"></ion-icon>\n                </ion-item>\n                \n            </ng-template>\n            \n            <ng-template [ngIf]=\"inputView == 'youtube'\">\n\n                <ion-item>\n                    <ion-icon name=\"logo-youtube\" slot=\"start\"></ion-icon>\n                    <ion-input #youtubeInput [placeholder]=\"'@co.mmons/ionic-extensions/html-editor#youtube/Paste YouTube video url' | intlMessage\" (keydown.enter)=\"applyYoutube()\"></ion-input>\n                </ion-item>\n                \n                <ion-item>\n                    <ionx-buttons slot=\"end\">\n                        <ion-button fill=\"clear\" color=\"dark\" (click)=\"cancel()\">\n                            <ion-label>{{\"@co.mmons/js-intl#Cancel\" | intlMessage}}</ion-label>\n                        </ion-button>\n                        \n                        <ion-button fill=\"clear\" color=\"primary\" (click)=\"applyYoutube()\">\n                            <ion-label>{{\"@co.mmons/js-intl#Ok\" | intlMessage}}</ion-label>\n                        </ion-button>\n                    </ionx-buttons>\n                </ion-item>\n    \n            </ng-template>\n            \n        </ion-list>\n    ",
            styles: [":host ion-list { margin: 0px; padding: 0px }",
                ":host ion-item:last-child { --border-width: 0px; }",
                ":host ion-item { --highlight-height: 0px; }"]
        })
    ], InsertMenu);
    return InsertMenu;
}());
export { InsertMenu };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0LW1lbnUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvci8iLCJzb3VyY2VzIjpbImluc2VydC1tZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRzVFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFpRHZDO0lBRUksYUFBYTtJQUNiLG9CQUFvQixpQkFBb0MsRUFBVSxlQUFnQztRQUE5RSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQ2xHLENBQUM7SUFXSywrQkFBVSxHQUFoQjs7O2dCQUVJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUVsRCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7O0tBQ3hEO0lBS0ssa0NBQWEsR0FBbkI7Ozs7Ozt3QkFFSSxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzt3QkFFM0IscUJBQU0sUUFBUSxDQUFDLGNBQU0sT0FBQSxDQUFDLENBQUMsS0FBSSxDQUFDLFlBQVksRUFBbkIsQ0FBbUIsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUE7O3dCQUExRCxTQUEwRCxDQUFDO3dCQUMzRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs7OztLQUNoQztJQUVELGFBQWE7SUFDTCxpQ0FBWSxH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QUssQ0FBQyxJQUFJLEVBQUU7b0JBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ3ZCOzs7O0tBQ0o7SUFFSyxvQ0FBZSxHQUFyQixVQUFzQixLQUE4Qjs7Ozs7NkJBRTVDLElBQUksQ0FBQyxTQUFTLEVBQWQsd0JBQWM7d0JBQ2QscUJBQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFBOzt3QkFBZixTQUFlLENBQUM7d0JBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7Ozt3QkFFakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7NEJBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7eUJBQ3ZCOzs7Ozs7S0FDSjs7Z0JBdkdzQyxpQkFBaUI7Z0JBQTJCLGVBQWU7O0lBSWxHO1FBREMsS0FBSyxFQUFFOzhDQUNtQjtJQWdCM0I7UUFEQyxTQUFTLENBQUMsY0FBYyxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDO29EQUNaO0lBdkJ0QixVQUFVO1FBL0N0QixTQUFTLENBQUM7WUFNUCxRQUFRLEVBQUUsMjREQXVDVDtxQkEzQ0csOENBQThDO2dCQUM5QyxvREFBb0Q7Z0JBQ3BELDZDQUE2QztTQTBDcEQsQ0FBQztPQUNXLFVBQVUsQ0EyR3RCO0lBQUQsaUJBQUM7Q0FBQSxBQTNHRCxJQTJHQztTQTNHWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7c2xlZXAsIHdhaXRUaWxsfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7SW9uSW5wdXQsIE1vZGFsQ29udHJvbGxlciwgUG9wb3ZlckNvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtPdmVybGF5RXZlbnREZXRhaWx9IGZyb20gXCJAaW9uaWMvY29yZVwiO1xuaW1wb3J0IHtIdG1sRWRpdG9yfSBmcm9tIFwiLi9lZGl0b3JcIjtcbmltcG9ydCB7TGlua01vZGFsfSBmcm9tIFwiLi9saW5rLW1vZGFsXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHN0eWxlczogW1xuICAgICAgICBgOmhvc3QgaW9uLWxpc3QgeyBtYXJnaW46IDBweDsgcGFkZGluZzogMHB4IH1gLFxuICAgICAgICBgOmhvc3QgaW9uLWl0ZW06bGFzdC1jaGlsZCB7IC0tYm9yZGVyLXdpZHRoOiAwcHg7IH1gLFxuICAgICAgICBgOmhvc3QgaW9uLWl0ZW0geyAtLWhpZ2hsaWdodC1oZWlnaHQ6IDBweDsgfWBcbiAgICBdLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFpbnB1dFZpZXdcIj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8aW9uLWl0ZW0gYnV0dG9uPVwidHJ1ZVwiIGRldGFpbD1cImZhbHNlXCIgKGNsaWNrKT1cImluc2VydExpbmsoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW9uLWxhYmVsPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNsaW5rL0xpbmtcIiB8IGludGxNZXNzYWdlfX08L2lvbi1sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJsaW5rXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgICAgICA8L2lvbi1pdGVtPlxuICAgIFxuICAgICAgICAgICAgICAgIDxpb24taXRlbSBidXR0b249XCJ0cnVlXCIgZGV0YWlsPVwiZmFsc2VcIiAoY2xpY2spPVwiaW5zZXJ0WW91dHViZSgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpb24tbGFiZWw+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI3lvdXR1YmUvWW91VHViZSB2aWRlb1wiIHwgaW50bE1lc3NhZ2V9fTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW9uLWljb24gbmFtZT1cImxvZ28teW91dHViZVwiIHNsb3Q9XCJzdGFydFwiPjwvaW9uLWljb24+XG4gICAgICAgICAgICAgICAgPC9pb24taXRlbT5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJpbnB1dFZpZXcgPT0gJ3lvdXR1YmUnXCI+XG5cbiAgICAgICAgICAgICAgICA8aW9uLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwibG9nby15b3V0dWJlXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPGlvbi1pbnB1dCAjeW91dHViZUlucHV0IFtwbGFjZWhvbGRlcl09XCInQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IjeW91dHViZS9QYXN0ZSBZb3VUdWJlIHZpZGVvIHVybCcgfCBpbnRsTWVzc2FnZVwiIChrZXlkb3duLmVudGVyKT1cImFwcGx5WW91dHViZSgpXCI+PC9pb24taW5wdXQ+XG4gICAgICAgICAgICAgICAgPC9pb24taXRlbT5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8aW9uLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxpb254LWJ1dHRvbnMgc2xvdD1cImVuZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1idXR0b24gZmlsbD1cImNsZWFyXCIgY29sb3I9XCJkYXJrXCIgKGNsaWNrKT1cImNhbmNlbCgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1sYWJlbD57e1wiQGNvLm1tb25zL2pzLWludGwjQ2FuY2VsXCIgfCBpbnRsTWVzc2FnZX19PC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2lvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpb24tYnV0dG9uIGZpbGw9XCJjbGVhclwiIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJhcHBseVlvdXR1YmUoKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpb24tbGFiZWw+e3tcIkBjby5tbW9ucy9qcy1pbnRsI09rXCIgfCBpbnRsTWVzc2FnZX19PC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2lvbi1idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvaW9ueC1idXR0b25zPlxuICAgICAgICAgICAgICAgIDwvaW9uLWl0ZW0+XG4gICAgXG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgXG4gICAgICAgIDwvaW9uLWxpc3Q+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBJbnNlcnRNZW51IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBvcG92ZXJDb250cm9sbGVyOiBQb3BvdmVyQ29udHJvbGxlciwgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBlZGl0b3I6IEh0bWxFZGl0b3I7XG5cbiAgICBpbnB1dFZpZXc6IFwieW91dHViZVwiO1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHByaXZhdGUgZWRpdG9yTGFzdFNlbGVjdGlvbjogW251bWJlciwgbnVtYmVyXTtcblxuXG4gICAgYXN5bmMgaW5zZXJ0TGluaygpIHtcblxuICAgICAgICB0aGlzLnBvcG92ZXJDb250cm9sbGVyLmRpc21pc3ModW5kZWZpbmVkLCBcImxpbmtcIik7XG5cbiAgICAgICAgTGlua01vZGFsLnByZXNlbnQodGhpcy5tb2RhbENvbnRyb2xsZXIsIHRoaXMuZWRpdG9yKTtcbiAgICB9XG5cbiAgICBAVmlld0NoaWxkKFwieW91dHViZUlucHV0XCIsIHtzdGF0aWM6IGZhbHNlfSlcbiAgICBwcml2YXRlIHlvdXR1YmVJbnB1dDogSW9uSW5wdXQ7XG5cbiAgICBhc3luYyBpbnNlcnRZb3V0dWJlKCkge1xuXG4gICAgICAgIHRoaXMuaW5wdXRWaWV3ID0gXCJ5b3V0dWJlXCI7XG5cbiAgICAgICAgYXdhaXQgd2FpdFRpbGwoKCkgPT4gISF0aGlzLnlvdXR1YmVJbnB1dCwgdW5kZWZpbmVkLCAyMDAwKTtcbiAgICAgICAgdGhpcy55b3V0dWJlSW5wdXQuc2V0Rm9jdXMoKTtcbiAgICB9XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcHJpdmF0ZSBwYXJzZVlvdXR1YmUodmFsdWU6IHN0cmluZyk6IHtpZDogc3RyaW5nLCBzdGFydD86IHN0cmluZ30ge1xuICAgICAgICAvLyBodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PU5xTWdhSFVOU1FjXG4gICAgICAgIC8vIGh0dHBzOi8veW91dHUuYmUvTnFNZ2FIVU5TUWNcbiAgICAgICAgLy8gaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvTnFNZ2FIVU5TUWNcbiAgICAgICAgLy8gaHR0cHM6Ly93d3cueW91dHViZS1ub2Nvb2tpZS5jb20vZW1iZWQvTnFNZ2FIVU5TUWNcbiAgICAgICAgLy8gaHR0cHM6Ly95b3V0dS5iZS9OcU1nYUhVTlNRYz90PTE3XG5cbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFwiLW5vY29va2llLmNvbS9cIiwgXCIuY29tL1wiKTtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFwiL2VtYmVkL1wiLCBcIi9cIik7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShcInlvdXR1LmJlL1wiLCBcInlvdXR1YmUuY29tL1wiKTtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKFwid2F0Y2g/dj1cIiwgXCJcIik7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShcIj9cIiwgXCImXCIpO1xuXG4gICAgICAgIGNvbnN0IGluZm8gPSB7aWQ6IHVuZGVmaW5lZCwgc3RhcnQ6IHVuZGVmaW5lZH07XG5cbiAgICAgICAgaWYgKHZhbHVlLmluZGV4T2YoXCJ5b3V0dWJlLmNvbS9cIikgPiAtMSkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zcGxpdChcInlvdXR1YmUuY29tL1wiKS5zcGxpY2UoMSwgMSlbMF07XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgcGFyYW0gb2YgdmFsdWUuc3BsaXQoXCImXCIpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtLmluZGV4T2YoXCI9XCIpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBpbmZvLmlkID0gcGFyYW07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbS5zdGFydHNXaXRoKFwidD1cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5mby5zdGFydCA9IHBhcmFtLnN1YnN0cmluZygyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtLnN0YXJ0c1dpdGgoXCJzdGFydD1cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5mby5zdGFydCA9IHBhcmFtLnN1YnN0cmluZyg2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlICB7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5mby5pZCkge1xuICAgICAgICAgICAgcmV0dXJuIGluZm87XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGFwcGx5WW91dHViZSgpIHtcblxuXG4gICAgICAgIGNvbnN0IGluZm8gPSB0aGlzLnBhcnNlWW91dHViZSh0aGlzLnlvdXR1YmVJbnB1dC52YWx1ZSk7XG4gICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICBjb25zdCB0ciA9IHRoaXMuZWRpdG9yLnN0YXRlLnRyLnJlcGxhY2VTZWxlY3Rpb25XaXRoKHRoaXMuZWRpdG9yLnN0YXRlLnNjaGVtYS5ub2Rlcy55b3V0dWJlLmNyZWF0ZSh7aWQ6IGluZm8uaWQsIHN0YXJ0OiBpbmZvLnN0YXJ0IHx8IDB9KSk7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci52aWV3LmRpc3BhdGNoKHRyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuZGlzbWlzcyh1bmRlZmluZWQsIFwieW91dHViZVwiKTtcbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgIH1cblxuICAgIGFzeW5jIGlvblZpZXdXaWxsTGVhdmUoZXZlbnQ6IE92ZXJsYXlFdmVudERldGFpbDxhbnk+KSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlucHV0VmlldyAmJiAhZXZlbnQucm9sZSkge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGlvblZpZXdEaWRMZWF2ZShldmVudDogT3ZlcmxheUV2ZW50RGV0YWlsPGFueT4pIHtcblxuICAgICAgICBpZiAodGhpcy5pbnB1dFZpZXcpIHtcbiAgICAgICAgICAgIGF3YWl0IHNsZWVwKDUwKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICghZXZlbnQucm9sZSkge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==