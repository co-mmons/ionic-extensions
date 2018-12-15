var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ElementRef, ChangeDetectionStrategy } from "@angular/core";
var SelectOption = /** @class */ (function () {
    function SelectOption(element) {
        this.element = element;
    }
    Object.defineProperty(SelectOption.prototype, "label", {
        get: function () {
            return this.element.nativeElement.innerText;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectOption.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectOption.prototype, "divider", void 0);
    SelectOption = __decorate([
        Component({
            selector: "ionx-select-option",
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: "<ng-content></ng-content>"
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], SelectOption);
    return SelectOption;
}());
export { SelectOption };
//# sourceMappingURL=select-option.js.map