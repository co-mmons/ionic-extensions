import {EventEmitter} from "@angular/core";
import {Platform} from "@ionic/angular";
import {Subscription} from "rxjs";

export class ViewObserver {

    constructor(private content: HTMLIonContentElement, private readonly platform: Platform) {

        this.content.parentElement.addEventListener("ionViewDidEnter", this.didEnterListener = () => this.viewDidEnter());
        this.content.parentElement.addEventListener("ionViewDidLeave", this.didLeaveListener = () => this.viewDidLeave());

        this.resumeSubscription = this.platform.resume.subscribe(() => this.whenResumed());
        this.pauseSubscription = this.platform.pause.subscribe(() => this.whenPaused());

        this.visible = !this.content.parentElement.classList.contains("ion-page-hidden");
    }

    private visible: boolean;

    private didEnterListener: (ev: Event) => void;

    private didLeaveListener: (ev: Event) => void;

    private paused: boolean;

    private pauseSubscription: Subscription;

    private resumeSubscription: Subscription;

    readonly activated: EventEmitter<void> = new EventEmitter();

    private async viewDidEnter() {
        this.visible = true;

        if (!this.paused) {
            this.activated.next();
        }
    }

    private viewDidLeave() {
        this.visible = false;
    }

    private whenPaused() {
        this.paused = true;
    }

    private async whenResumed() {
        this.paused = false;

        if (this.visible) {
            this.activated.next();
        }
    }

    isActive() {
        return this.visible && !this.paused;
    }

    destroy() {
        this.content.removeEventListener("ionViewDidEnter" as any, this.didEnterListener);
        this.content.removeEventListener("ionViewDidLeave" as any, this.didLeaveListener);

        this.resumeSubscription.unsubscribe();
        this.pauseSubscription.unsubscribe();

        this.activated.unsubscribe();

        this.content = undefined;
    }

}
