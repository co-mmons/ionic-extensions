import { Component, Injector, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Dialog } from "./dialog";
/**
 * Komponent, który strukturyzuje widok dialogu.
 */
export class DialogButtons {
    constructor(injector, modalController) {
        this.injector = injector;
        this.modalController = modalController;
    }
    /*private*/ buttonClicked(button) {
        const dialog = this.injector.get(Dialog);
        const value = dialog && dialog.value && dialog.value();
        if (button.handler) {
            const res = button.handler(value);
            if ((typeof res === "boolean" && res) || typeof res !== "boolean") {
                this.modalController.dismiss(value, button.role);
            }
            return;
        }
        else {
            this.modalController.dismiss(button.role !== "cancel" ? value : undefined, button.role);
        }
    }
}
DialogButtons.decorators = [
    { type: Component, args: [{
                selector: "ionx-dialog-buttons",
                template: "<ion-footer *ngIf=\"buttons && buttons.length > 0\">\n    <ion-toolbar>\n        <ionx-buttons>\n\n            <ion-button fill=\"clear\" [style.flex]=\"button.flex || 1\" [color]=\"button.color || 'primary'\" [size]=\"button.size\" (click)=\"buttonClicked(button)\" *ngFor=\"let button of buttons\">\n                <span *ngIf=\"!!button.text\">{{button.text}}</span>\n                <ion-icon [icon]=\"button.icon\" [slot]=\"button.text ? 'start' : 'icon-only'\" *ngIf=\"button.icon\"></ion-icon>\n            </ion-button>\n\n        </ionx-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
                styles: [":host{display:block}:host ion-footer{--border-color: var(--dialog--border-color)}:host ion-footer ion-toolbar{--padding-start: 0px;--padding-end: 0px;--padding-top: 0px;--padding-bottom: 0px;--min-height: none;--ion-safe-area-bottom: 0px;--ion-safe-area-top: 0px;--ion-safe-area-start: 0px;--ion-safe-area-end: 0px;--ion-toolbar-background: var(--dialog--background-color, #ffffff);--ion-toolbar-background-color: var(--dialog--background-color, #000000);--ion-toolbar-color: var(--dialog--foreground-color, #000000)}:host ion-footer ionx-buttons{justify-content:var(--dialog--buttons-align, flex-end)}:host ion-footer ion-button{min-height:44px}:host ion-footer ion-button:not(:last-child){font-weight:400}:host ion-footer ion-button:last-child{font-weight:500}:host-context(.md) ion-footer ion-toolbar{--padding-bottom: 8px}:host-context(.md) ion-footer:before{display:none}:host-context(.md) ion-footer ion-button{flex:none!important}:host-context(.ios) ion-footer ion-button{flex:1}:host-context(.ios) ion-footer ion-button:not(:first-child){border-left:.55px solid var(--dialog--border-color)}\n"]
            },] }
];
DialogButtons.ctorParameters = () => [
    { type: Injector },
    { type: ModalController }
];
DialogButtons.propDecorators = {
    buttons: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWJ1dHRvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGlhbG9nL2RpYWxvZy1idXR0b25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUdoQzs7R0FFRztBQU1ILE1BQU0sT0FBTyxhQUFhO0lBRXRCLFlBQW9CLFFBQWtCLEVBQVUsZUFBZ0M7UUFBNUQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUNoRixDQUFDO0lBS0QsV0FBVyxDQUFDLGFBQWEsQ0FBQyxNQUFvQjtRQUUxQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFdkQsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2hCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLFNBQVMsSUFBSSxHQUFHLENBQUMsSUFBSSxPQUFPLEdBQUcsS0FBSyxTQUFTLEVBQUU7Z0JBQy9ELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDcEQ7WUFFRCxPQUFPO1NBRVY7YUFBTTtZQUNILElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0Y7SUFDTCxDQUFDOzs7WUE5QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBRS9CLDRsQkFBa0M7O2FBQ3JDOzs7WUFaa0IsUUFBUTtZQUNuQixlQUFlOzs7c0JBaUJsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEluamVjdG9yLCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7TW9kYWxDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7RGlhbG9nfSBmcm9tIFwiLi9kaWFsb2dcIjtcbmltcG9ydCB7RGlhbG9nQnV0dG9ufSBmcm9tIFwiLi9kaWFsb2ctYnV0dG9uXCI7XG5cbi8qKlxuICogS29tcG9uZW50LCBrdMOzcnkgc3RydWt0dXJ5enVqZSB3aWRvayBkaWFsb2d1LlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWRpYWxvZy1idXR0b25zXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJkaWFsb2ctYnV0dG9ucy5zY3NzXCJdLFxuICAgIHRlbXBsYXRlVXJsOiBcImRpYWxvZy1idXR0b25zLmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dCdXR0b25zIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBidXR0b25zOiBEaWFsb2dCdXR0b25bXTtcblxuICAgIC8qcHJpdmF0ZSovIGJ1dHRvbkNsaWNrZWQoYnV0dG9uOiBEaWFsb2dCdXR0b24pIHtcblxuICAgICAgICBjb25zdCBkaWFsb2cgPSB0aGlzLmluamVjdG9yLmdldChEaWFsb2cpO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGRpYWxvZyAmJiBkaWFsb2cudmFsdWUgJiYgZGlhbG9nLnZhbHVlKCk7XG5cbiAgICAgICAgaWYgKGJ1dHRvbi5oYW5kbGVyKSB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBidXR0b24uaGFuZGxlcih2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICgodHlwZW9mIHJlcyA9PT0gXCJib29sZWFuXCIgJiYgcmVzKSB8fCB0eXBlb2YgcmVzICE9PSBcImJvb2xlYW5cIikge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3ModmFsdWUsIGJ1dHRvbi5yb2xlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKGJ1dHRvbi5yb2xlICE9PSBcImNhbmNlbFwiID8gdmFsdWUgOiB1bmRlZmluZWQsIGJ1dHRvbi5yb2xlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==