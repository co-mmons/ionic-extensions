import { Directive, ElementRef, HostListener, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { __awaiter } from 'tslib';
import { waitTill } from '@co.mmons/js-utils/core';

class TextareaAutosize {
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
}
TextareaAutosize.decorators = [
    { type: Directive, args: [{
                selector: "ion-textarea[ionx-autosize]"
            },] }
];
TextareaAutosize.ctorParameters = () => [
    { type: ElementRef }
];
TextareaAutosize.propDecorators = {
    onChange: [{ type: HostListener, args: ["ionChange",] }]
};

class TextareaAutosizeModule {
}
TextareaAutosizeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TextareaAutosize],
                exports: [TextareaAutosize],
                imports: [IonicModule]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { TextareaAutosizeModule, TextareaAutosize as ɵa };
//# sourceMappingURL=textarea-autosize-module.js.map
