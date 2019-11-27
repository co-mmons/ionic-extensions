import {Directive, ElementRef, HostListener, OnDestroy, OnInit} from "@angular/core";
import {ViewObserver} from "@co.mmons/ionic-extensions/view-observer";
import {sleep} from "@co.mmons/js-utils/core";
import {Platform} from "@ionic/angular";
import {Subscription} from "rxjs";

@Directive({
    selector: "ion-virtual-scroll",
})
export class VirtualScrollHelper implements OnInit, OnDestroy {

    constructor(private readonly element: ElementRef<HTMLIonVirtualScrollElement>, private platform: Platform) {
    }

    private viewObserver: ViewObserver;

    private scheduleRerender: number = 0;

    private rendering: boolean;

    private scrollPosition: number;

    private scrollHeight: number;

    private content: HTMLIonContentElement;

    private contentScrollEndListener: (ev: Event) => void;

    private activationSubscription: Subscription;


    private async contentScrolled() {
        if (this.scheduleRerender <= 0 && this.viewObserver.isActive()) {
            const scroll = await this.content.getScrollElement();
            this.scrollPosition = scroll.scrollTop;
            this.scrollHeight = scroll.scrollHeight;
        }
    }

    @HostListener("window:resize")
    markAsDirtyWhenInactive() {
        if (!this.viewObserver.isActive()) {
            this.scheduleRerender++;
        }
    }

    private activated() {
        if (this.scheduleRerender > 0) {
            this.rerender();
        }
    }

    async rerender() {

        if (this.rendering) {
            this.scheduleRerender++;
            return;
        }

        this.rendering = true;

        const scrollPosition = this.scrollPosition;
        const scrollHeight = this.scrollHeight;
        const scrollPoint = Math.round((this.scrollPosition / this.scrollHeight) * 100);

        await this.element.nativeElement.checkRange(0);

        if (scrollPosition > 0 && scrollHeight > 0) {
            const scroll = await this.content.getScrollElement();

            for (let i = 0; i < 20; i++) {
                scroll.scrollTop = this.scrollPosition;

                await sleep(100);

                const point = Math.round((this.scrollPosition / scroll.scrollTop) * 100);
                console.log(point, scrollPoint);
                if (point === scrollPoint) {
                    break;
                }
            }
        }

        this.scheduleRerender--;

        if (this.scheduleRerender > 0) {
            this.rerender();
        } else if (this.scheduleRerender < 0) {
            this.scheduleRerender = 0;
        }
    }

    ngOnInit() {
        this.content = this.element.nativeElement.closest("ion-content");
        this.content.scrollEvents = true;
        this.content.addEventListener("ionScrollEnd", this.contentScrollEndListener = () => this.contentScrolled());

        this.viewObserver = new ViewObserver(this.content, this.platform);
        this.activationSubscription = this.viewObserver.activated.subscribe(() => this.activated());
    }

    ngOnDestroy() {
        this.content.removeEventListener("ionScrollEnd" as any, this.contentScrollEndListener);
        this.activationSubscription.unsubscribe();
        this.viewObserver.destroy();
    }
}
