import {Directive, ElementRef, HostListener, OnDestroy, OnInit} from "@angular/core";
import {ViewObserver} from "@co.mmons/ionic-extensions/view-observer";
import {sleep} from "@co.mmons/js-utils/core";
import {Platform} from "@ionic/angular";

@Directive({
    selector: "ion-virtual-scroll",
})
export class VirtualScrollHelper implements OnInit, OnDestroy {

    constructor(private readonly element: ElementRef<HTMLIonVirtualScrollElement>, private platform: Platform) {
    }

    private viewObserver: ViewObserver;

    private scheduleRerender: boolean;

    private scrollPosition: number;

    private content: HTMLIonContentElement;

    private contentScrollEndListener: (ev: Event) => void;

    private async contentScrolled() {
        if (!this.scheduleRerender && this.viewObserver.isActive()) {
            this.scrollPosition = (await this.content.getScrollElement()).scrollTop;
        }
    }

    @HostListener("window:resize")
    markAsDirtyWhenInactive() {
        if (!this.viewObserver.isActive()) {
            this.scheduleRerender = true;
        }
    }

    async rerender() {

        await this.element.nativeElement.checkRange(0);

        const scroll = await this.content.getScrollElement();

        for (let i = 0; i < 20; i++) {
            scroll.scrollTop = this.scrollPosition;

            if (scroll.scrollTop === this.scrollPosition || scroll.scrollHeight < this.scrollPosition) {
                break;
            }

            await sleep(100);
        }
    }

    ngOnInit() {
        this.content = this.element.nativeElement.closest("ion-content");
        this.content.scrollEvents = true;
        this.content.addEventListener("ionScrollEnd", this.contentScrollEndListener = () => this.contentScrolled());

        this.viewObserver = new ViewObserver(this.content, this.platform);
    }

    ngOnDestroy() {
        this.content.removeEventListener("ionScrollEnd" as any, this.contentScrollEndListener);
        this.viewObserver.destroy();
    }
}
