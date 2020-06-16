import {Injectable} from "@angular/core";
import {ModalController} from "@ionic/angular";
import {createAnimation} from "@ionic/core/";
import {Dialog} from "./dialog";
import {DialogOptions} from "./dialog-options";

/**
 * Md Modal Leave Animation
 */
function leaveAnimation (baseEl: HTMLElement) {
    const baseAnimation = createAnimation();
    const backdropAnimation = createAnimation();
    const wrapperAnimation = createAnimation();
    const wrapperEl = baseEl.querySelector('.modal-wrapper')!;

    backdropAnimation
        .addElement(baseEl.querySelector('ion-backdrop')!)
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
};

@Injectable()
export class DialogController {

    constructor(protected modalController: ModalController) {
    }

    async create(options: DialogOptions) {

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
    }

    /**
     * When `id` is not provided, it dismisses the top overlay.
     */
    dismiss(data?: any, role?: string, id?: string) {
        return this.modalController.dismiss(data, role, id);
    }

}


