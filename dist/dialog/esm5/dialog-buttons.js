import { __decorate } from "tslib";
import { Component, Injector, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Dialog } from "./dialog";
/**
 * Komponent, który strukturyzuje widok dialogu.
 */
var DialogButtons = /** @class */ (function () {
    function DialogButtons(injector, modalController) {
        this.injector = injector;
        this.modalController = modalController;
    }
    /*private*/ DialogButtons.prototype.buttonClicked = function (button) {
        var dialog = this.injector.get(Dialog);
        var value = dialog && dialog.value;
        if (button.handler) {
            var res = button.handler(value);
            if ((typeof res === "boolean" && res) || typeof res !== "boolean") {
                this.modalController.dismiss(value, button.role);
            }
            return;
        }
        else {
            this.modalController.dismiss(button.role !== "cancel" ? value : undefined, button.role);
        }
    };
    DialogButtons.ctorParameters = function () { return [
        { type: Injector },
        { type: ModalController }
    ]; };
    __decorate([
        Input()
    ], DialogButtons.prototype, "buttons", void 0);
    DialogButtons = __decorate([
        Component({
            selector: "ionx-dialog-buttons",
            template: "<ion-footer *ngIf=\"buttons && buttons.length > 0\">\n    <ion-toolbar>\n        <ionx-buttons>\n\n            <ion-button fill=\"clear\" [color]=\"button.color || 'primary'\" [size]=\"button.size\" (click)=\"buttonClicked(button)\" *ngFor=\"let button of buttons\">\n                <span>{{button.text}}</span>\n            </ion-button>\n\n        </ionx-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
            styles: [":host{display:block}:host ion-footer{--border-color:var(--dialog--border-color)}:host ion-footer ion-toolbar{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--min-height:none;--ion-safe-area-bottom:0px;--ion-safe-area-top:0px;--ion-safe-area-start:0px;--ion-safe-area-end:0px;--ion-toolbar-background:var(--dialog--background-color, #ffffff);--ion-toolbar-background-color:var(--dialog--background-color, #000000);--ion-toolbar-color:var(--dialog--foreground-color, #000000)}:host ion-footer ionx-buttons{-webkit-box-pack:var(--dialog--buttons-align,flex-end);justify-content:var(--dialog--buttons-align,flex-end)}:host ion-footer ion-button{min-height:44px}:host ion-footer ion-button:not(:last-child){font-weight:400}:host ion-footer ion-button:last-child{font-weight:500}:host-context(.md) ion-footer ion-toolbar{--padding-bottom:8px}:host-context(.md) ion-footer::before{display:none}:host-context(.ios) ion-footer ion-button{-webkit-box-flex:1;flex:1}:host-context(.ios) ion-footer ion-button:not(:first-child){border-left:.55px solid var(--dialog--border-color)}"]
        })
    ], DialogButtons);
    return DialogButtons;
}());
export { DialogButtons };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWJ1dHRvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9kaWFsb2cvIiwic291cmNlcyI6WyJkaWFsb2ctYnV0dG9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBR2hDOztHQUVHO0FBTUg7SUFFSSx1QkFBb0IsUUFBa0IsRUFBVSxlQUFnQztRQUE1RCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQ2hGLENBQUM7SUFLRCxXQUFXLENBQUMscUNBQWEsR0FBYixVQUFjLE1BQW9CO1FBRTFDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLElBQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRXJDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWxDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLEtBQUssU0FBUyxFQUFFO2dCQUMvRCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3BEO1lBRUQsT0FBTztTQUVWO2FBQU07WUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNGO0lBQ0wsQ0FBQzs7Z0JBdkI2QixRQUFRO2dCQUEyQixlQUFlOztJQUloRjtRQURDLEtBQUssRUFBRTtrREFDZ0I7SUFOZixhQUFhO1FBTHpCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxxQkFBcUI7WUFFL0IsK1pBQWtDOztTQUNyQyxDQUFDO09BQ1csYUFBYSxDQTBCekI7SUFBRCxvQkFBQztDQUFBLEFBMUJELElBMEJDO1NBMUJZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5qZWN0b3IsIElucHV0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtEaWFsb2d9IGZyb20gXCIuL2RpYWxvZ1wiO1xuaW1wb3J0IHtEaWFsb2dCdXR0b259IGZyb20gXCIuL2RpYWxvZy1idXR0b25cIjtcblxuLyoqXG4gKiBLb21wb25lbnQsIGt0w7NyeSBzdHJ1a3R1cnl6dWplIHdpZG9rIGRpYWxvZ3UuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtZGlhbG9nLWJ1dHRvbnNcIixcbiAgICBzdHlsZVVybHM6IFtcImRpYWxvZy1idXR0b25zLnNjc3NcIl0sXG4gICAgdGVtcGxhdGVVcmw6IFwiZGlhbG9nLWJ1dHRvbnMuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ0J1dHRvbnMge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIpIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGJ1dHRvbnM6IERpYWxvZ0J1dHRvbltdO1xuXG4gICAgLypwcml2YXRlKi8gYnV0dG9uQ2xpY2tlZChidXR0b246IERpYWxvZ0J1dHRvbikge1xuXG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IHRoaXMuaW5qZWN0b3IuZ2V0KERpYWxvZyk7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZGlhbG9nICYmIGRpYWxvZy52YWx1ZTtcblxuICAgICAgICBpZiAoYnV0dG9uLmhhbmRsZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGJ1dHRvbi5oYW5kbGVyKHZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKCh0eXBlb2YgcmVzID09PSBcImJvb2xlYW5cIiAmJiByZXMpIHx8IHR5cGVvZiByZXMgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyh2YWx1ZSwgYnV0dG9uLnJvbGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoYnV0dG9uLnJvbGUgIT09IFwiY2FuY2VsXCIgPyB2YWx1ZSA6IHVuZGVmaW5lZCwgYnV0dG9uLnJvbGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19