import { __decorate, __values } from "tslib";
import { Component, Input } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { toggleMark } from "prosemirror-commands";
import { FontSize } from "./font-sizes";
import { toggleInlineMark } from "./prosemirror/commands/toogle-inline-mark";
import { isMarkActive } from "./prosemirror/is-active";
import { schema } from "./prosemirror/schema";
import { findMarksInSelection } from "./prosemirror/utils/find-marks-in-selection";
var TextFormatMenu = /** @class */ (function () {
    function TextFormatMenu(popoverController) {
        this.popoverController = popoverController;
        this.FontSize = FontSize;
    }
    TextFormatMenu.prototype.toggle = function (name) {
        var _this = this;
        var command;
        if (name === "bold") {
            command = toggleMark(schema.marks.strong);
        }
        else if (name === "italic") {
            command = toggleMark(schema.marks.em);
        }
        else if (name === "underline") {
            command = toggleMark(schema.marks.underline);
        }
        if (command(this.editor.state)) {
            command(this.editor.state, function (tr) { return _this.editor.view.dispatch(tr); });
        }
        this.popoverController.dismiss();
    };
    TextFormatMenu.prototype.resetFontSize = function () {
        var _this = this;
        toggleMark(schema.marks.fontSize)(this.editor.state, function (tr) { return _this.editor.view.dispatch(tr); });
        this.popoverController.dismiss();
    };
    TextFormatMenu.prototype.toggleFontSize = function (size) {
        var _this = this;
        var command = toggleInlineMark(schema.marks.fontSize, { fontSize: size.size });
        if (command(this.editor.state)) {
            command(this.editor.state, function (tr) { return _this.editor.view.dispatch(tr); });
        }
        this.popoverController.dismiss();
    };
    TextFormatMenu.prototype.ngOnInit = function () {
        var e_1, _a, e_2, _b;
        this.boldActivated = isMarkActive(this.editor.state, schema.marks.strong);
        this.italicActivated = isMarkActive(this.editor.state, schema.marks.em);
        this.underlineActivated = isMarkActive(this.editor.state, schema.marks.underline);
        this.activeFontSize = undefined;
        try {
            MARKS: for (var _c = __values(findMarksInSelection(this.editor.state, schema.marks.fontSize)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var mark = _d.value;
                try {
                    for (var _e = (e_2 = void 0, __values(FontSize.sizes())), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var size = _f.value;
                        if (size.size === mark.attrs.fontSize) {
                            // ups, mamy różne rozmiary w zaznaczeniu
                            if (this.activeFontSize && size !== this.activeFontSize) {
                                this.activeFontSize = undefined;
                                break MARKS;
                            }
                            this.activeFontSize = size;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    TextFormatMenu.prototype.ionViewWillLeave = function () {
        this.editor.focus();
    };
    TextFormatMenu.ctorParameters = function () { return [
        { type: PopoverController }
    ]; };
    __decorate([
        Input()
    ], TextFormatMenu.prototype, "editor", void 0);
    TextFormatMenu = __decorate([
        Component({
            template: "\n        <ion-list lines=\"full\">\n            \n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggle('bold')\">\n                <ion-label style=\"font-weight: bold\">{{\"@co.mmons/ionic-extensions/html-editor#textMenu/Bold\" | intlMessage}}</ion-label>\n                <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"boldActivated\"></ion-icon>\n            </ion-item>\n\n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggle('italic')\">\n                <ion-label style=\"font-style: italic\">{{\"@co.mmons/ionic-extensions/html-editor#textMenu/Italic\" | intlMessage}}</ion-label>\n                <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"italicActivated\"></ion-icon>\n            </ion-item>\n\n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggle('underline')\">\n                <ion-label style=\"text-decoration: underline\">{{\"@co.mmons/ionic-extensions/html-editor#textMenu/Underline\" | intlMessage}}</ion-label>\n                <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"underlineActivated\"></ion-icon>\n            </ion-item>\n            \n            <ion-item-divider>\n                <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#textMenu/fontSize/Text size\" | intlMessage}}</ion-label>\n            </ion-item-divider>\n\n            <ion-item button=\"true\" detail=\"false\" (click)=\"resetFontSize()\" *ngIf=\"activeFontSize\">\n                <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#textMenu/fontSize/Default\" | intlMessage}}</ion-label>\n            </ion-item>\n\n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggleFontSize(fontSize)\" *ngFor=\"let fontSize of FontSize.sizes()\">\n                <ion-label [style.fontSize]=\"fontSize.size\">{{fontSize.label | intlMessage}}</ion-label>\n                <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"activeFontSize === fontSize\"></ion-icon>\n            </ion-item>\n\n        </ion-list>\n    ",
            styles: ["\n        :host { user-select: none; }\n        :host ion-list { margin: 0px; padding: 0px; }\n        :host ion-item:last-child { --border-width: 0px; }\n        :host ion-item-divider { --background: transparent; font-size: small }\n        :host ion-item-divider ion-label { margin-top: 20px; opacity: 0.8; }\n    "]
        })
    ], TextFormatMenu);
    return TextFormatMenu;
}());
export { TextFormatMenu };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1mb3JtYXQtbWVudS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yLyIsInNvdXJjZXMiOlsidGV4dC1mb3JtYXQtbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRWhELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFdEMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDM0UsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQTRDakY7SUFJSSx3QkFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFGL0MsYUFBUSxHQUFHLFFBQVEsQ0FBQztJQUc3QixDQUFDO0lBY0QsK0JBQU0sR0FBTixVQUFPLElBQVk7UUFBbkIsaUJBaUJDO1FBZkcsSUFBSSxPQUFnQixDQUFDO1FBRXJCLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUNqQixPQUFPLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0M7YUFBTSxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDMUIsT0FBTyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3pDO2FBQU0sSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQzdC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QUM7eUJBQzlCO3FCQUNKOzs7Ozs7Ozs7YUFDSjs7Ozs7Ozs7O0lBQ0wsQ0FBQztJQUVELHlDQUFnQixHQUFoQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Z0JBMUVzQyxpQkFBaUI7O0lBSXhEO1FBREMsS0FBSyxFQUFFO2tEQUNXO0lBUlYsY0FBYztRQTFDMUIsU0FBUyxDQUFDO1lBUVAsUUFBUSxFQUFFLDA5REFnQ1Q7cUJBdkNRLCtUQU1SO1NBa0NKLENBQUM7T0FDVyxjQUFjLENBK0UxQjtJQUFELHFCQUFDO0NBQUEsQUEvRUQsSUErRUM7U0EvRVksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtQb3BvdmVyQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge3RvZ2dsZU1hcmt9IGZyb20gXCJwcm9zZW1pcnJvci1jb21tYW5kc1wiO1xuaW1wb3J0IHtIdG1sRWRpdG9yfSBmcm9tIFwiLi9lZGl0b3JcIjtcbmltcG9ydCB7Rm9udFNpemV9IGZyb20gXCIuL2ZvbnQtc2l6ZXNcIjtcbmltcG9ydCB7Q29tbWFuZH0gZnJvbSBcIi4vcHJvc2VtaXJyb3IvY29tbWFuZFwiO1xuaW1wb3J0IHt0b2dnbGVJbmxpbmVNYXJrfSBmcm9tIFwiLi9wcm9zZW1pcnJvci9jb21tYW5kcy90b29nbGUtaW5saW5lLW1hcmtcIjtcbmltcG9ydCB7aXNNYXJrQWN0aXZlfSBmcm9tIFwiLi9wcm9zZW1pcnJvci9pcy1hY3RpdmVcIjtcbmltcG9ydCB7c2NoZW1hfSBmcm9tIFwiLi9wcm9zZW1pcnJvci9zY2hlbWFcIjtcbmltcG9ydCB7ZmluZE1hcmtzSW5TZWxlY3Rpb259IGZyb20gXCIuL3Byb3NlbWlycm9yL3V0aWxzL2ZpbmQtbWFya3MtaW4tc2VsZWN0aW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHN0eWxlczogW2BcbiAgICAgICAgOmhvc3QgeyB1c2VyLXNlbGVjdDogbm9uZTsgfVxuICAgICAgICA6aG9zdCBpb24tbGlzdCB7IG1hcmdpbjogMHB4OyBwYWRkaW5nOiAwcHg7IH1cbiAgICAgICAgOmhvc3QgaW9uLWl0ZW06bGFzdC1jaGlsZCB7IC0tYm9yZGVyLXdpZHRoOiAwcHg7IH1cbiAgICAgICAgOmhvc3QgaW9uLWl0ZW0tZGl2aWRlciB7IC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGZvbnQtc2l6ZTogc21hbGwgfVxuICAgICAgICA6aG9zdCBpb24taXRlbS1kaXZpZGVyIGlvbi1sYWJlbCB7IG1hcmdpbi10b3A6IDIwcHg7IG9wYWNpdHk6IDAuODsgfVxuICAgIGBdLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGlvbi1pdGVtIGJ1dHRvbj1cInRydWVcIiBkZXRhaWw9XCJmYWxzZVwiIChjbGljayk9XCJ0b2dnbGUoJ2JvbGQnKVwiPlxuICAgICAgICAgICAgICAgIDxpb24tbGFiZWwgc3R5bGU9XCJmb250LXdlaWdodDogYm9sZFwiPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciN0ZXh0TWVudS9Cb2xkXCIgfCBpbnRsTWVzc2FnZX19PC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJjaGVja21hcmtcIiBzbG90PVwiZW5kXCIgKm5nSWY9XCJib2xkQWN0aXZhdGVkXCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgIDwvaW9uLWl0ZW0+XG5cbiAgICAgICAgICAgIDxpb24taXRlbSBidXR0b249XCJ0cnVlXCIgZGV0YWlsPVwiZmFsc2VcIiAoY2xpY2spPVwidG9nZ2xlKCdpdGFsaWMnKVwiPlxuICAgICAgICAgICAgICAgIDxpb24tbGFiZWwgc3R5bGU9XCJmb250LXN0eWxlOiBpdGFsaWNcIj57e1wiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IjdGV4dE1lbnUvSXRhbGljXCIgfCBpbnRsTWVzc2FnZX19PC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJjaGVja21hcmtcIiBzbG90PVwiZW5kXCIgKm5nSWY9XCJpdGFsaWNBY3RpdmF0ZWRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPC9pb24taXRlbT5cblxuICAgICAgICAgICAgPGlvbi1pdGVtIGJ1dHRvbj1cInRydWVcIiBkZXRhaWw9XCJmYWxzZVwiIChjbGljayk9XCJ0b2dnbGUoJ3VuZGVybGluZScpXCI+XG4gICAgICAgICAgICAgICAgPGlvbi1sYWJlbCBzdHlsZT1cInRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lXCI+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI3RleHRNZW51L1VuZGVybGluZVwiIHwgaW50bE1lc3NhZ2V9fTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwiY2hlY2ttYXJrXCIgc2xvdD1cImVuZFwiICpuZ0lmPVwidW5kZXJsaW5lQWN0aXZhdGVkXCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgIDwvaW9uLWl0ZW0+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxpb24taXRlbS1kaXZpZGVyPlxuICAgICAgICAgICAgICAgIDxpb24tbGFiZWw+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI3RleHRNZW51L2ZvbnRTaXplL1RleHQgc2l6ZVwiIHwgaW50bE1lc3NhZ2V9fTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgPC9pb24taXRlbS1kaXZpZGVyPlxuXG4gICAgICAgICAgICA8aW9uLWl0ZW0gYnV0dG9uPVwidHJ1ZVwiIGRldGFpbD1cImZhbHNlXCIgKGNsaWNrKT1cInJlc2V0Rm9udFNpemUoKVwiICpuZ0lmPVwiYWN0aXZlRm9udFNpemVcIj5cbiAgICAgICAgICAgICAgICA8aW9uLWxhYmVsPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciN0ZXh0TWVudS9mb250U2l6ZS9EZWZhdWx0XCIgfCBpbnRsTWVzc2FnZX19PC9pb24tbGFiZWw+XG4gICAgICAgICAgICA8L2lvbi1pdGVtPlxuXG4gICAgICAgICAgICA8aW9uLWl0ZW0gYnV0dG9uPVwidHJ1ZVwiIGRldGFpbD1cImZhbHNlXCIgKGNsaWNrKT1cInRvZ2dsZUZvbnRTaXplKGZvbnRTaXplKVwiICpuZ0Zvcj1cImxldCBmb250U2l6ZSBvZiBGb250U2l6ZS5zaXplcygpXCI+XG4gICAgICAgICAgICAgICAgPGlvbi1sYWJlbCBbc3R5bGUuZm9udFNpemVdPVwiZm9udFNpemUuc2l6ZVwiPnt7Zm9udFNpemUubGFiZWwgfCBpbnRsTWVzc2FnZX19PC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJjaGVja21hcmtcIiBzbG90PVwiZW5kXCIgKm5nSWY9XCJhY3RpdmVGb250U2l6ZSA9PT0gZm9udFNpemVcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPC9pb24taXRlbT5cblxuICAgICAgICA8L2lvbi1saXN0PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgVGV4dEZvcm1hdE1lbnUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcmVhZG9ubHkgRm9udFNpemUgPSBGb250U2l6ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcG9wb3ZlckNvbnRyb2xsZXI6IFBvcG92ZXJDb250cm9sbGVyKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBlZGl0b3I6IEh0bWxFZGl0b3I7XG5cbiAgICBib2xkQWN0aXZhdGVkOiBib29sZWFuO1xuXG4gICAgaXRhbGljQWN0aXZhdGVkOiBib29sZWFuO1xuXG4gICAgdW5kZXJsaW5lQWN0aXZhdGVkOiBib29sZWFuO1xuXG4gICAgYWN0aXZlRm9udFNpemU6IEZvbnRTaXplO1xuXG5cbiAgICB0b2dnbGUobmFtZTogc3RyaW5nKSB7XG5cbiAgICAgICAgbGV0IGNvbW1hbmQ6IENvbW1hbmQ7XG5cbiAgICAgICAgaWYgKG5hbWUgPT09IFwiYm9sZFwiKSB7XG4gICAgICAgICAgICBjb21tYW5kID0gdG9nZ2xlTWFyayhzY2hlbWEubWFya3Muc3Ryb25nKTtcbiAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSBcIml0YWxpY1wiKSB7XG4gICAgICAgICAgICBjb21tYW5kID0gdG9nZ2xlTWFyayhzY2hlbWEubWFya3MuZW0pO1xuICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT09IFwidW5kZXJsaW5lXCIpIHtcbiAgICAgICAgICAgIGNvbW1hbmQgPSB0b2dnbGVNYXJrKHNjaGVtYS5tYXJrcy51bmRlcmxpbmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbW1hbmQodGhpcy5lZGl0b3Iuc3RhdGUpKSB7XG4gICAgICAgICAgICBjb21tYW5kKHRoaXMuZWRpdG9yLnN0YXRlLCAodHIpID0+IHRoaXMuZWRpdG9yLnZpZXcuZGlzcGF0Y2godHIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgIH1cblxuICAgIHJlc2V0Rm9udFNpemUoKSB7XG4gICAgICAgIHRvZ2dsZU1hcmsoc2NoZW1hLm1hcmtzLmZvbnRTaXplKSh0aGlzLmVkaXRvci5zdGF0ZSwgKHRyKSA9PiB0aGlzLmVkaXRvci52aWV3LmRpc3BhdGNoKHRyKSk7XG4gICAgICAgIHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgIH1cblxuICAgIHRvZ2dsZUZvbnRTaXplKHNpemU6IEZvbnRTaXplKSB7XG5cbiAgICAgICAgY29uc3QgY29tbWFuZCA9IHRvZ2dsZUlubGluZU1hcmsoc2NoZW1hLm1hcmtzLmZvbnRTaXplLCB7Zm9udFNpemU6IHNpemUuc2l6ZX0pO1xuICAgICAgICBpZiAoY29tbWFuZCh0aGlzLmVkaXRvci5zdGF0ZSkpIHtcbiAgICAgICAgICAgIGNvbW1hbmQodGhpcy5lZGl0b3Iuc3RhdGUsICh0cikgPT4gdGhpcy5lZGl0b3Iudmlldy5kaXNwYXRjaCh0cikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wb3BvdmVyQ29udHJvbGxlci5kaXNtaXNzKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuYm9sZEFjdGl2YXRlZCA9IGlzTWFya0FjdGl2ZSh0aGlzLmVkaXRvci5zdGF0ZSwgc2NoZW1hLm1hcmtzLnN0cm9uZyk7XG4gICAgICAgIHRoaXMuaXRhbGljQWN0aXZhdGVkID0gaXNNYXJrQWN0aXZlKHRoaXMuZWRpdG9yLnN0YXRlLCBzY2hlbWEubWFya3MuZW0pO1xuICAgICAgICB0aGlzLnVuZGVybGluZUFjdGl2YXRlZCA9IGlzTWFya0FjdGl2ZSh0aGlzLmVkaXRvci5zdGF0ZSwgc2NoZW1hLm1hcmtzLnVuZGVybGluZSk7XG5cbiAgICAgICAgdGhpcy5hY3RpdmVGb250U2l6ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgTUFSS1M6IGZvciAoY29uc3QgbWFyayBvZiBmaW5kTWFya3NJblNlbGVjdGlvbih0aGlzLmVkaXRvci5zdGF0ZSwgc2NoZW1hLm1hcmtzLmZvbnRTaXplKSkge1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNpemUgb2YgRm9udFNpemUuc2l6ZXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChzaXplLnNpemUgPT09IG1hcmsuYXR0cnMuZm9udFNpemUpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyB1cHMsIG1hbXkgcsOzxbxuZSByb3ptaWFyeSB3IHphem5hY3plbml1XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUZvbnRTaXplICYmIHNpemUgIT09IHRoaXMuYWN0aXZlRm9udFNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRm9udFNpemUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhayBNQVJLUztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRm9udFNpemUgPSBzaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlvblZpZXdXaWxsTGVhdmUoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgfVxufVxuIl19