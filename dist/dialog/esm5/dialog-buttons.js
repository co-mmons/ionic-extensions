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
        var value = dialog && dialog.value && dialog.value();
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
            template: "<ion-footer *ngIf=\"buttons && buttons.length > 0\">\n    <ion-toolbar>\n        <ionx-buttons>\n\n            <ion-button fill=\"clear\" [style.flex]=\"button.flex || 1\" [color]=\"button.color || 'primary'\" [size]=\"button.size\" (click)=\"buttonClicked(button)\" *ngFor=\"let button of buttons\">\n                <span *ngIf=\"!!button.text\">{{button.text}}</span>\n                <ion-icon [icon]=\"button.icon\" [slot]=\"button.text ? 'start' : 'icon-only'\" *ngIf=\"button.icon\"></ion-icon>\n            </ion-button>\n\n        </ionx-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
            styles: [":host{display:block}:host ion-footer{--border-color:var(--dialog--border-color)}:host ion-footer ion-toolbar{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--min-height:none;--ion-safe-area-bottom:0px;--ion-safe-area-top:0px;--ion-safe-area-start:0px;--ion-safe-area-end:0px;--ion-toolbar-background:var(--dialog--background-color, #ffffff);--ion-toolbar-background-color:var(--dialog--background-color, #000000);--ion-toolbar-color:var(--dialog--foreground-color, #000000)}:host ion-footer ionx-buttons{-webkit-box-pack:var(--dialog--buttons-align,flex-end);justify-content:var(--dialog--buttons-align,flex-end)}:host ion-footer ion-button{min-height:44px}:host ion-footer ion-button:not(:last-child){font-weight:400}:host ion-footer ion-button:last-child{font-weight:500}:host-context(.md) ion-footer ion-toolbar{--padding-bottom:8px}:host-context(.md) ion-footer::before{display:none}:host-context(.md) ion-footer ion-button{-webkit-box-flex:0!important;flex:none!important}:host-context(.ios) ion-footer ion-button{-webkit-box-flex:1;flex:1}:host-context(.ios) ion-footer ion-button:not(:first-child){border-left:.55px solid var(--dialog--border-color)}"]
        })
    ], DialogButtons);
    return DialogButtons;
}());
export { DialogButtons };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWJ1dHRvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9kaWFsb2cvIiwic291cmNlcyI6WyJkaWFsb2ctYnV0dG9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBR2hDOztHQUVHO0FBTUg7SUFFSSx1QkFBb0IsUUFBa0IsRUFBVSxlQUFnQztRQUE1RCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBQ2hGLENBQUM7SUFLRCxXQUFXLENBQUMscUNBQWEsR0FBYixVQUFjLE1BQW9CO1FBRTFDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLElBQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUV2RCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVsQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxLQUFLLFNBQVMsRUFBRTtnQkFDL0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNwRDtZQUVELE9BQU87U0FFVjthQUFNO1lBQ0gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzRjtJQUNMLENBQUM7O2dCQXZCNkIsUUFBUTtnQkFBMkIsZUFBZTs7SUFJaEY7UUFEQyxLQUFLLEVBQUU7a0RBQ2dCO0lBTmYsYUFBYTtRQUx6QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUscUJBQXFCO1lBRS9CLDRsQkFBa0M7O1NBQ3JDLENBQUM7T0FDVyxhQUFhLENBMEJ6QjtJQUFELG9CQUFDO0NBQUEsQUExQkQsSUEwQkM7U0ExQlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbmplY3RvciwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge01vZGFsQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge0RpYWxvZ30gZnJvbSBcIi4vZGlhbG9nXCI7XG5pbXBvcnQge0RpYWxvZ0J1dHRvbn0gZnJvbSBcIi4vZGlhbG9nLWJ1dHRvblwiO1xuXG4vKipcbiAqIEtvbXBvbmVudCwga3TDs3J5IHN0cnVrdHVyeXp1amUgd2lkb2sgZGlhbG9ndS5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1kaWFsb2ctYnV0dG9uc1wiLFxuICAgIHN0eWxlVXJsczogW1wiZGlhbG9nLWJ1dHRvbnMuc2Nzc1wiXSxcbiAgICB0ZW1wbGF0ZVVybDogXCJkaWFsb2ctYnV0dG9ucy5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nQnV0dG9ucyB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgYnV0dG9uczogRGlhbG9nQnV0dG9uW107XG5cbiAgICAvKnByaXZhdGUqLyBidXR0b25DbGlja2VkKGJ1dHRvbjogRGlhbG9nQnV0dG9uKSB7XG5cbiAgICAgICAgY29uc3QgZGlhbG9nID0gdGhpcy5pbmplY3Rvci5nZXQoRGlhbG9nKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBkaWFsb2cgJiYgZGlhbG9nLnZhbHVlICYmIGRpYWxvZy52YWx1ZSgpO1xuXG4gICAgICAgIGlmIChidXR0b24uaGFuZGxlcikge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYnV0dG9uLmhhbmRsZXIodmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAoKHR5cGVvZiByZXMgPT09IFwiYm9vbGVhblwiICYmIHJlcykgfHwgdHlwZW9mIHJlcyAhPT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKHZhbHVlLCBidXR0b24ucm9sZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyhidXR0b24ucm9sZSAhPT0gXCJjYW5jZWxcIiA/IHZhbHVlIDogdW5kZWZpbmVkLCBidXR0b24ucm9sZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=