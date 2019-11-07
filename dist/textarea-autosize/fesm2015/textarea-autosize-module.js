import { __awaiter, __decorate } from 'tslib';
import { ElementRef, HostListener, Directive, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { waitTill } from '@co.mmons/js-utils/core';

let TextareaAutosize = class TextareaAutosize {
    constructor(element) {
        this.element = element;
    }
    onChange() {
        this.adjust();
    }
    get textarea() {
        return this.element.nativeElement.querySelector("textarea");
    }
    adjust() {
        let input = this.textarea;
        if (input) {
            input.style.overflow = "hidden";
            input.style.height = "auto";
            input.style.height = input.scrollHeight + "px";
        }
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitTill(() => !!this.textarea);
            this.adjust();
        });
    }
};
TextareaAutosize.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    HostListener("ionChange")
], TextareaAutosize.prototype, "onChange", null);
TextareaAutosize = __decorate([
    Directive({
        selector: "ion-textarea[ionx-autosize]"
    })
], TextareaAutosize);

let TextareaAutosizeModule = class TextareaAutosizeModule {
};
TextareaAutosizeModule = __decorate([
    NgModule({
        declarations: [TextareaAutosize],
        exports: [TextareaAutosize],
        imports: [IonicModule]
    })
], TextareaAutosizeModule);

/**
 * Generated bundle index. Do not edit.
 */

export { TextareaAutosizeModule, TextareaAutosize as ɵa };
//# sourceMappingURL=textarea-autosize-module.js.map
