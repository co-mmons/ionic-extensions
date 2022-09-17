import { __awaiter } from "tslib";
import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { createAnimation } from "@ionic/core/";
import { Dialog } from "./dialog";
/**
 * Md Modal Leave Animation
 */
function leaveAnimation(baseEl) {
    const baseAnimation = createAnimation();
    const backdropAnimation = createAnimation();
    const wrapperAnimation = createAnimation();
    const wrapperEl = baseEl.querySelector('.modal-wrapper');
    backdropAnimation
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', 'var(--backdrop-opacity)', 0.0);
    wrapperAnimation
        .addElement(wrapperEl)
        .keyframes([
        { offset: 0, opacity: 0.99, transform: 'translateY(0px)' },
        { offset: 1, opacity: 0, transform: 'translateY(40px)' }
    ]);
    return baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.47,0,0.745,0.715)')
        .duration(200)
        .addAnimation([backdropAnimation, wrapperAnimation]);
}
;
export class DialogController {
    constructor(modalController) {
        this.modalController = modalController;
    }
    create(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.modalController.create(Object.assign({}, options, {
                component: Dialog,
                componentProps: {
                    component: options.component,
                    header: options.header,
                    message: options.message,
                    buttons: options.buttons,
                    width: options.width
                },
                leaveAnimation
            }));
        });
    }
    /**
     * When `id` is not provided, it dismisses the top overlay.
     */
    dismiss(data, role, id) {
        return this.modalController.dismiss(data, role, id);
    }
}
DialogController.decorators = [
    { type: Injectable }
];
DialogController.ctorParameters = () => [
    { type: ModalController }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGlhbG9nL2RpYWxvZy1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFHaEM7O0dBRUc7QUFDSCxTQUFTLGNBQWMsQ0FBRSxNQUFtQjtJQUN4QyxNQUFNLGFBQWEsR0FBRyxlQUFlLEVBQUUsQ0FBQztJQUN4QyxNQUFNLGlCQUFpQixHQUFHLGVBQWUsRUFBRSxDQUFDO0lBQzVDLE1BQU0sZ0JBQWdCLEdBQUcsZUFBZSxFQUFFLENBQUM7SUFDM0MsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBRSxDQUFDO0lBRTFELGlCQUFpQjtTQUNaLFVBQVUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBRSxDQUFDO1NBQ2pELE1BQU0sQ0FBQyxTQUFTLEVBQUUseUJBQXlCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFdkQsZ0JBQWdCO1NBQ1gsVUFBVSxDQUFDLFNBQVMsQ0FBQztTQUNyQixTQUFTLENBQUM7UUFDUCxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUU7UUFDMUQsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFO0tBQzNELENBQUMsQ0FBQztJQUVQLE9BQU8sYUFBYTtTQUNmLFVBQVUsQ0FBQyxNQUFNLENBQUM7U0FDbEIsTUFBTSxDQUFDLGtDQUFrQyxDQUFDO1NBQzFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7U0FDYixZQUFZLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7QUFDN0QsQ0FBQztBQUFBLENBQUM7QUFHRixNQUFNLE9BQU8sZ0JBQWdCO0lBRXpCLFlBQXNCLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUN0RCxDQUFDO0lBRUssTUFBTSxDQUFDLE9BQXNCOztZQUUvQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRTtnQkFDMUQsU0FBUyxFQUFFLE1BQU07Z0JBQ2pCLGNBQWMsRUFBRTtvQkFDWixTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7b0JBQzVCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtvQkFDdEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO29CQUN4QixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87b0JBQ3hCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztpQkFDdkI7Z0JBQ0QsY0FBYzthQUNqQixDQUFDLENBQUMsQ0FBQztRQUNSLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0gsT0FBTyxDQUFDLElBQVUsRUFBRSxJQUFhLEVBQUUsRUFBVztRQUMxQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7O1lBMUJKLFVBQVU7OztZQWhDSCxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtjcmVhdGVBbmltYXRpb259IGZyb20gXCJAaW9uaWMvY29yZS9cIjtcbmltcG9ydCB7RGlhbG9nfSBmcm9tIFwiLi9kaWFsb2dcIjtcbmltcG9ydCB7RGlhbG9nT3B0aW9uc30gZnJvbSBcIi4vZGlhbG9nLW9wdGlvbnNcIjtcblxuLyoqXG4gKiBNZCBNb2RhbCBMZWF2ZSBBbmltYXRpb25cbiAqL1xuZnVuY3Rpb24gbGVhdmVBbmltYXRpb24gKGJhc2VFbDogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBiYXNlQW5pbWF0aW9uID0gY3JlYXRlQW5pbWF0aW9uKCk7XG4gICAgY29uc3QgYmFja2Ryb3BBbmltYXRpb24gPSBjcmVhdGVBbmltYXRpb24oKTtcbiAgICBjb25zdCB3cmFwcGVyQW5pbWF0aW9uID0gY3JlYXRlQW5pbWF0aW9uKCk7XG4gICAgY29uc3Qgd3JhcHBlckVsID0gYmFzZUVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC13cmFwcGVyJykhO1xuXG4gICAgYmFja2Ryb3BBbmltYXRpb25cbiAgICAgICAgLmFkZEVsZW1lbnQoYmFzZUVsLnF1ZXJ5U2VsZWN0b3IoJ2lvbi1iYWNrZHJvcCcpISlcbiAgICAgICAgLmZyb21Ubygnb3BhY2l0eScsICd2YXIoLS1iYWNrZHJvcC1vcGFjaXR5KScsIDAuMCk7XG5cbiAgICB3cmFwcGVyQW5pbWF0aW9uXG4gICAgICAgIC5hZGRFbGVtZW50KHdyYXBwZXJFbClcbiAgICAgICAgLmtleWZyYW1lcyhbXG4gICAgICAgICAgICB7IG9mZnNldDogMCwgb3BhY2l0eTogMC45OSwgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwcHgpJyB9LFxuICAgICAgICAgICAgeyBvZmZzZXQ6IDEsIG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoNDBweCknIH1cbiAgICAgICAgXSk7XG5cbiAgICByZXR1cm4gYmFzZUFuaW1hdGlvblxuICAgICAgICAuYWRkRWxlbWVudChiYXNlRWwpXG4gICAgICAgIC5lYXNpbmcoJ2N1YmljLWJlemllcigwLjQ3LDAsMC43NDUsMC43MTUpJylcbiAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgLmFkZEFuaW1hdGlvbihbYmFja2Ryb3BBbmltYXRpb24sIHdyYXBwZXJBbmltYXRpb25dKTtcbn07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEaWFsb2dDb250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIGFzeW5jIGNyZWF0ZShvcHRpb25zOiBEaWFsb2dPcHRpb25zKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZShPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7XG4gICAgICAgICAgICBjb21wb25lbnQ6IERpYWxvZyxcbiAgICAgICAgICAgIGNvbXBvbmVudFByb3BzOiB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBvcHRpb25zLmNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICBoZWFkZXI6IG9wdGlvbnMuaGVhZGVyLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG9wdGlvbnMubWVzc2FnZSxcbiAgICAgICAgICAgICAgICBidXR0b25zOiBvcHRpb25zLmJ1dHRvbnMsXG4gICAgICAgICAgICAgICAgd2lkdGg6IG9wdGlvbnMud2lkdGhcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWF2ZUFuaW1hdGlvblxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiBgaWRgIGlzIG5vdCBwcm92aWRlZCwgaXQgZGlzbWlzc2VzIHRoZSB0b3Agb3ZlcmxheS5cbiAgICAgKi9cbiAgICBkaXNtaXNzKGRhdGE/OiBhbnksIHJvbGU/OiBzdHJpbmcsIGlkPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKGRhdGEsIHJvbGUsIGlkKTtcbiAgICB9XG5cbn1cblxuXG4iXX0=