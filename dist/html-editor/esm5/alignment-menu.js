import { __decorate, __values } from "tslib";
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
            for (var _b = __values(findBlockMarks(this.editor.state, schema.marks.alignment)), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    __decorate([
        Input()
    ], AlignmentMenu.prototype, "editor", void 0);
    AlignmentMenu = __decorate([
        Component({
            template: "\n        <ion-list lines=\"full\">\n\n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggleAligment(alignment)\" *ngFor=\"let alignment of Alignment.alignments()\">\n                <ion-label>{{alignment.label | intlMessage}}</ion-label>\n                <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"active === alignment.alignment\"></ion-icon>\n                <ion-icon src=\"assets/html-editor/align-{{alignment.alignment}}.svg\" slot=\"start\"></ion-icon>\n            </ion-item>\n\n        </ion-list>\n    ",
            styles: ["\n        :host ion-list { margin: 0px; padding: 0px; }\n        :host ion-item:last-child { --border-width: 0px; }\n    "]
        })
    ], AlignmentMenu);
    return AlignmentMenu;
}());
export { AlignmentMenu };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpZ25tZW50LW1lbnUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvci8iLCJzb3VyY2VzIjpbImFsaWdubWVudC1tZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXRDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBbUI5RTtJQUlJLHVCQUFvQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUZ4RCxjQUFTLEdBQUcsU0FBUyxDQUFDO0lBR3RCLENBQUM7SUFPRCxzQ0FBYyxHQUFkLFVBQWUsU0FBb0I7UUFBbkMsaUJBU0M7UUFQRyxJQUFNLE9BQU8sR0FBRyxlQUFlLENBQU0sU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTFELElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFVBQUMsRUFBRSxJQUFLLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUE3QixDQUE2QixDQUFDLENBQUM7U0FDckU7UUFFRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELGdDQUFRLEdBQVI7O1FBRUksSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7O1lBRXhCLEtBQW1CLElBQUEsS0FBQSxTQUFBLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBLGdCQUFBLDRCQUFFO2dCQUF6RSxJQUFNLElBQUksV0FBQTtnQkFFWCxrREFBa0Q7Z0JBQ2xELElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO29CQUNqRCxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztvQkFDeEIsTUFBTTtpQkFDVDtnQkFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2FBQ2xDOzs7Ozs7Ozs7SUFDTCxDQUFDO0lBRUQsd0NBQWdCLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QixDQUFDOztnQkFyQ3NDLGlCQUFpQjs7SUFJeEQ7UUFEQyxLQUFLLEVBQUU7aURBQ21CO0lBUmxCLGFBQWE7UUFqQnpCLFNBQVMsQ0FBQztZQUtQLFFBQVEsRUFBRSw0aEJBVVQ7cUJBZFEsMkhBR1I7U0FZSixDQUFDO09BQ1csYUFBYSxDQTBDekI7SUFBRCxvQkFBQztDQUFBLEFBMUNELElBMENDO1NBMUNZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7UG9wb3ZlckNvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtBbGlnbm1lbnR9IGZyb20gXCIuL2FsaWdubWVudFwiO1xuaW1wb3J0IHtIdG1sRWRpdG9yfSBmcm9tIFwiLi9lZGl0b3JcIjtcbmltcG9ydCB7Y2hhbmdlQWxpZ25tZW50fSBmcm9tIFwiLi9wcm9zZW1pcnJvci9hbGlnbm1lbnQvY29tbWFuZHNcIjtcbmltcG9ydCB7c2NoZW1hfSBmcm9tIFwiLi9wcm9zZW1pcnJvci9zY2hlbWFcIjtcbmltcG9ydCB7ZmluZEJsb2NrTWFya3N9IGZyb20gXCIuL3Byb3NlbWlycm9yL3V0aWxzL3NlbGVjdGlvbi9maW5kLWJsb2NrLW1hcmtzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHN0eWxlczogW2BcbiAgICAgICAgOmhvc3QgaW9uLWxpc3QgeyBtYXJnaW46IDBweDsgcGFkZGluZzogMHB4OyB9XG4gICAgICAgIDpob3N0IGlvbi1pdGVtOmxhc3QtY2hpbGQgeyAtLWJvcmRlci13aWR0aDogMHB4OyB9XG4gICAgYF0sXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxuXG4gICAgICAgICAgICA8aW9uLWl0ZW0gYnV0dG9uPVwidHJ1ZVwiIGRldGFpbD1cImZhbHNlXCIgKGNsaWNrKT1cInRvZ2dsZUFsaWdtZW50KGFsaWdubWVudClcIiAqbmdGb3I9XCJsZXQgYWxpZ25tZW50IG9mIEFsaWdubWVudC5hbGlnbm1lbnRzKClcIj5cbiAgICAgICAgICAgICAgICA8aW9uLWxhYmVsPnt7YWxpZ25tZW50LmxhYmVsIHwgaW50bE1lc3NhZ2V9fTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwiY2hlY2ttYXJrXCIgc2xvdD1cImVuZFwiICpuZ0lmPVwiYWN0aXZlID09PSBhbGlnbm1lbnQuYWxpZ25tZW50XCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgICAgICA8aW9uLWljb24gc3JjPVwiYXNzZXRzL2h0bWwtZWRpdG9yL2FsaWduLXt7YWxpZ25tZW50LmFsaWdubWVudH19LnN2Z1wiIHNsb3Q9XCJzdGFydFwiPjwvaW9uLWljb24+XG4gICAgICAgICAgICA8L2lvbi1pdGVtPlxuXG4gICAgICAgIDwvaW9uLWxpc3Q+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBBbGlnbm1lbnRNZW51IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEFsaWdubWVudCA9IEFsaWdubWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcG9wb3ZlckNvbnRyb2xsZXI6IFBvcG92ZXJDb250cm9sbGVyKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIGVkaXRvcjogSHRtbEVkaXRvcjtcblxuICAgIGFjdGl2ZTogc3RyaW5nO1xuXG4gICAgdG9nZ2xlQWxpZ21lbnQoYWxpZ25tZW50OiBBbGlnbm1lbnQpIHtcblxuICAgICAgICBjb25zdCBjb21tYW5kID0gY2hhbmdlQWxpZ25tZW50KDxhbnk+YWxpZ25tZW50LmFsaWdubWVudCk7XG5cbiAgICAgICAgaWYgKGNvbW1hbmQodGhpcy5lZGl0b3Iuc3RhdGUpKSB7XG4gICAgICAgICAgICBjb21tYW5kKHRoaXMuZWRpdG9yLnN0YXRlLCAodHIpID0+IHRoaXMuZWRpdG9yLnZpZXcuZGlzcGF0Y2godHIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGZvciAoY29uc3QgbWFyayBvZiBmaW5kQmxvY2tNYXJrcyh0aGlzLmVkaXRvci5zdGF0ZSwgc2NoZW1hLm1hcmtzLmFsaWdubWVudCkpIHtcblxuICAgICAgICAgICAgLy8gemF6bmFjem9ueWNoIHdpZWxlIGJsb2Nrw7N3IHogcsOzxbxueW0gd3lyw7N3bmFuaWVtXG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmUgJiYgdGhpcy5hY3RpdmUgIT09IG1hcmsuYXR0cnMuYWxpZ24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBtYXJrLmF0dHJzLmFsaWduO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW9uVmlld1dpbGxMZWF2ZSgpIHtcbiAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICB9XG59XG4iXX0=