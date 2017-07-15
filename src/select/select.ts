import {Component, ViewEncapsulation, ElementRef, Renderer, Optional, Input} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Select as IonSelect, Popover, PopoverOptions, App, Config, Item, NavController, Form, DeepLinker} from "ionic-angular";

import {SelectOverlay} from "./select-overlay";

@Component({
    selector: "ionx-select",
    template:
    '<div *ngIf="!_text" class="select-placeholder select-text">{{placeholder}}</div>' +
    '<div *ngIf="_text" class="select-text">{{selectedText || _text}}</div>' +
    '<div class="select-icon">' +
    '<div class="select-icon-inner"></div>' +
    '</div>' +
    '<button aria-haspopup="true" ' +
    'type="button" ' +
    '[id]="id" ' +
    'ion-button="item-cover" ' +
    '[attr.aria-labelledby]="_labelId" ' +
    '[attr.aria-disabled]="_disabled" ' +
    'class="item-cover">' +
    '</button>',
    host: {
        '[class.select-disabled]': '_disabled'
    },
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: Select, multi: true}],
    encapsulation: ViewEncapsulation.None,
})
export class Select extends IonSelect {

    constructor(
        private app: App,
        form: Form,
        config: Config,
        elementRef: ElementRef,
        renderer: Renderer,
        @Optional() item: Item,
        private navController: NavController,
        private deepLinker: DeepLinker
    ) {
        super(app, form, config, elementRef, renderer, item, navController);
        this.interface = "popover";
    }

    _click(ev: UIEvent) {
        ev.preventDefault();
        ev.stopPropagation();
        this.open(ev);
    }
    open(ev?: UIEvent) {

        let options: PopoverOptions = {cssClass: "ionx-select-overlay"};

        let data: any = {};
        data.multiple = this.multiple === true || this.multiple === "true" ? true : false;

        data.options = this._options.map(input => {
            return {
                label: input.text,
                value: input.value,
                checked: input.selected,
                disabled: input.disabled,
                handler: (selectedOption: any) => {
                    // Only emit the select event if it is being checked
                    // For multi selects this won't emit when unchecking
                    if (selectedOption.checked) {
                        input.ionSelect.emit(input.value);
                    }
                }
            };
        });

        let overlay = new Popover(this.app, SelectOverlay, data, options, this.config, this.deepLinker);

        overlay.onDidDismiss(values => {
            if (values) {
                this.writeValue(values);
            }
        });

        if (ev) {
            Object.defineProperty(ev, 'target', {value: ev.currentTarget});
        }

        overlay.present({ev: ev});
    }
}