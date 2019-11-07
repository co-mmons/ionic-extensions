import * as tslib_1 from "tslib";
import { Component, Input } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { Alignment } from "./alignment";
import { changeAlignment } from "./prosemirror/alignment/commands";
import { schema } from "./prosemirror/schema";
import { findBlockMarks } from "./prosemirror/utils/selection/find-block-marks";
var AlignmentMenu = /** @class */ (function () {
    function AlignmentMenu(popoverController) {
        this.popoverController = popoverController;
        this.Alignment = Alignment;
    }
    AlignmentMenu.prototype.toggleAligment = function (alignment) {
        var _this = this;
        var command = changeAlignment(alignment.alignment);
        if (command(this.editor.state)) {
            command(this.editor.state, function (tr) { return _this.editor.view.dispatch(tr); });
        }
        this.popoverController.dismiss();
    };
    AlignmentMenu.prototype.ngOnInit = function () {
        var e_1, _a;
        this.active = undefined;
        try {
            for (var _b = tslib_1.__values(findBlockMarks(this.editor.state, schema.marks.alignment)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var mark = _c.value;
                // zaznaczonych wiele blocków z różnym wyrównaniem
                if (this.active && this.active !== mark.attrs.align) {
                    this.active = undefined;
                    break;
                }
                this.active = mark.attrs.align;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    AlignmentMenu.prototype.ionViewWillLeave = function () {
        this.editor.focus();
    };
    AlignmentMenu.ctorParameters = function () { return [
        { type: PopoverController }
    ]; };
    tslib_1.__decorate([
        Input()
    ], AlignmentMenu.prototype, "editor", void 0);
    AlignmentMenu = tslib_1.__decorate([
        Component({
            template: "\n        <ion-list lines=\"full\">\n\n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggleAligment(alignment)\" *ngFor=\"let alignment of Alignment.alignments()\">\n                <ion-label>{{alignment.label | intlMessage}}</ion-label>\n                <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"active === alignment.alignment\"></ion-icon>\n                <ion-icon src=\"assets/html-editor/align-{{alignment.alignment}}.svg\" slot=\"start\"></ion-icon>\n            </ion-item>\n\n        </ion-list>\n    ",
            styles: ["\n        :host ion-list { margin: 0px; padding: 0px; }\n        :host ion-item:last-child { --border-width: 0px; }\n    "]
        })
    ], AlignmentMenu);
    return AlignmentMenu;
}());
export { AlignmentMenu };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpZ25tZW50LW1lbnUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvci8iLCJzb3VyY2VzIjpbImFsaWdubWVudC1tZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXRDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBbUI5RTtJQUlJLHVCQUFvQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUZ4RCxjQUFTLEdBQUcsU0FBUyxDQUFDO0lBR3RCLENBQUM7SUFPRCxzQ0FBYyxHQUFkLFVBQWUsU0FBb0I7UUFBbkMsaUJBU0M7UUFQRyxJQUFNLE9BQU8sR0FBRyxlQUFlLENBQU0sU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTFELElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFVBQUMsRUFBRSxJQUFLLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUE3QixDQUE2QixDQUFDLENBQUM7U0FDckU7UUFFRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELGdDQUFRLEdBQVI7O1FBRUksSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7O1lBRXhCLEtBQW1CLElBQUEsS0FBQSxpQkFBQSxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBekUsSUFBTSxJQUFJLFdBQUE7Z0JBRVgsa0RBQWtEO2dCQUNsRCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtvQkFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7b0JBQ3hCLE1BQU07aUJBQ1Q7Z0JBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzthQUNsQzs7Ozs7Ozs7O0lBQ0wsQ0FBQztJQUVELHdDQUFnQixHQUFoQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Z0JBckNzQyxpQkFBaUI7O0lBSXhEO1FBREMsS0FBSyxFQUFFO2lEQUNtQjtJQVJsQixhQUFhO1FBakJ6QixTQUFTLENBQUM7WUFLUCxRQUFRLEVBQUUsNGhCQVVUO3FCQWRRLDJIQUdSO1NBWUosQ0FBQztPQUNXLGFBQWEsQ0EwQ3pCO0lBQUQsb0JBQUM7Q0FBQSxBQTFDRCxJQTBDQztTQTFDWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1BvcG92ZXJDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7QWxpZ25tZW50fSBmcm9tIFwiLi9hbGlnbm1lbnRcIjtcbmltcG9ydCB7SHRtbEVkaXRvcn0gZnJvbSBcIi4vZWRpdG9yXCI7XG5pbXBvcnQge2NoYW5nZUFsaWdubWVudH0gZnJvbSBcIi4vcHJvc2VtaXJyb3IvYWxpZ25tZW50L2NvbW1hbmRzXCI7XG5pbXBvcnQge3NjaGVtYX0gZnJvbSBcIi4vcHJvc2VtaXJyb3Ivc2NoZW1hXCI7XG5pbXBvcnQge2ZpbmRCbG9ja01hcmtzfSBmcm9tIFwiLi9wcm9zZW1pcnJvci91dGlscy9zZWxlY3Rpb24vZmluZC1ibG9jay1tYXJrc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIDpob3N0IGlvbi1saXN0IHsgbWFyZ2luOiAwcHg7IHBhZGRpbmc6IDBweDsgfVxuICAgICAgICA6aG9zdCBpb24taXRlbTpsYXN0LWNoaWxkIHsgLS1ib3JkZXItd2lkdGg6IDBweDsgfVxuICAgIGBdLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cblxuICAgICAgICAgICAgPGlvbi1pdGVtIGJ1dHRvbj1cInRydWVcIiBkZXRhaWw9XCJmYWxzZVwiIChjbGljayk9XCJ0b2dnbGVBbGlnbWVudChhbGlnbm1lbnQpXCIgKm5nRm9yPVwibGV0IGFsaWdubWVudCBvZiBBbGlnbm1lbnQuYWxpZ25tZW50cygpXCI+XG4gICAgICAgICAgICAgICAgPGlvbi1sYWJlbD57e2FsaWdubWVudC5sYWJlbCB8IGludGxNZXNzYWdlfX08L2lvbi1sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW9uLWljb24gbmFtZT1cImNoZWNrbWFya1wiIHNsb3Q9XCJlbmRcIiAqbmdJZj1cImFjdGl2ZSA9PT0gYWxpZ25tZW50LmFsaWdubWVudFwiPjwvaW9uLWljb24+XG4gICAgICAgICAgICAgICAgPGlvbi1pY29uIHNyYz1cImFzc2V0cy9odG1sLWVkaXRvci9hbGlnbi17e2FsaWdubWVudC5hbGlnbm1lbnR9fS5zdmdcIiBzbG90PVwic3RhcnRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPC9pb24taXRlbT5cblxuICAgICAgICA8L2lvbi1saXN0PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgQWxpZ25tZW50TWVudSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBBbGlnbm1lbnQgPSBBbGlnbm1lbnQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBvcG92ZXJDb250cm9sbGVyOiBQb3BvdmVyQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBlZGl0b3I6IEh0bWxFZGl0b3I7XG5cbiAgICBhY3RpdmU6IHN0cmluZztcblxuICAgIHRvZ2dsZUFsaWdtZW50KGFsaWdubWVudDogQWxpZ25tZW50KSB7XG5cbiAgICAgICAgY29uc3QgY29tbWFuZCA9IGNoYW5nZUFsaWdubWVudCg8YW55PmFsaWdubWVudC5hbGlnbm1lbnQpO1xuXG4gICAgICAgIGlmIChjb21tYW5kKHRoaXMuZWRpdG9yLnN0YXRlKSkge1xuICAgICAgICAgICAgY29tbWFuZCh0aGlzLmVkaXRvci5zdGF0ZSwgKHRyKSA9PiB0aGlzLmVkaXRvci52aWV3LmRpc3BhdGNoKHRyKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBvcG92ZXJDb250cm9sbGVyLmRpc21pc3MoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICB0aGlzLmFjdGl2ZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICBmb3IgKGNvbnN0IG1hcmsgb2YgZmluZEJsb2NrTWFya3ModGhpcy5lZGl0b3Iuc3RhdGUsIHNjaGVtYS5tYXJrcy5hbGlnbm1lbnQpKSB7XG5cbiAgICAgICAgICAgIC8vIHphem5hY3pvbnljaCB3aWVsZSBibG9ja8OzdyB6IHLDs8W8bnltIHd5csOzd25hbmllbVxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlICYmIHRoaXMuYWN0aXZlICE9PSBtYXJrLmF0dHJzLmFsaWduKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gbWFyay5hdHRycy5hbGlnbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlvblZpZXdXaWxsTGVhdmUoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgfVxufVxuIl19