import { __awaiter } from 'tslib';
import { EventEmitter } from '@angular/core';

class ViewObserver {
    constructor(content, platform) {
        this.content = content;
        this.platform = platform;
        this.activated = new EventEmitter();
        this.content.parentElement.addEventListener("ionViewDidEnter", this.didEnterListener = () => this.viewDidEnter());
        this.content.parentElement.addEventListener("ionViewDidLeave", this.didLeaveListener = () => this.viewDidLeave());
        this.resumeSubscription = this.platform.resume.subscribe(() => this.whenResumed());
        this.pauseSubscription = this.platform.pause.subscribe(() => this.whenPaused());
        this.visible = !this.content.parentElement.classList.contains("ion-page-hidden");
    }
    viewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.visible = true;
            if (!this.paused) {
                this.activated.next();
            }
        });
    }
    viewDidLeave() {
        this.visible = false;
    }
    whenPaused() {
        this.paused = true;
    }
    whenResumed() {
        return __awaiter(this, void 0, void 0, function* () {
            this.paused = false;
            if (this.visible) {
                this.activated.next();
            }
        });
    }
    isActive() {
        return this.visible && !this.paused;
    }
    destroy() {
        this.content.removeEventListener("ionViewDidEnter", this.didEnterListener);
        this.content.removeEventListener("ionViewDidLeave", this.didLeaveListener);
        this.resumeSubscription.unsubscribe();
        this.pauseSubscription.unsubscribe();
        this.activated.unsubscribe();
        this.content = undefined;
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { ViewObserver };
//# sourceMappingURL=view-observer-module.js.map
