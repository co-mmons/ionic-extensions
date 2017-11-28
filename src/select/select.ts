import {Component, ViewEncapsulation, ElementRef, Renderer, Optional, Input} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Select as IonSelect, ModalController, ModalOptions, App, Config, Item, Form, DeepLinker} from "ionic-angular";

import {SelectModal} from "./select-modal";

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
        '[class.select-disabled]': '_disabled || readonly',
        '[class.select-readonly]': 'readonly',
        '[attr.multiple]': 'multiple ? true : null'
    },
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: Select, multi: true}],
    encapsulation: ViewEncapsulation.None,
})
export class Select extends IonSelect {

    constructor(
        app: App,
        form: Form,
        config: Config,
        elementRef: ElementRef,
        renderer: Renderer,
        @Optional() item: Item,
        deepLinker: DeepLinker,
        private modalController: ModalController
    ) {
        super(app, form, config, elementRef, renderer, item, deepLinker);
    }

    open(ev?: UIEvent) {

        if (this.interface == "modal") {

            let options: ModalOptions = {cssClass: "ionx-select-modal"};

            let values = this.getValues();

            let data: any = {};
            data.multiple = this.multiple === true || this.multiple === "true" ? true : false;
            data.title = (this.selectOptions ? this.selectOptions.title : undefined) || this._item.getLabelText();
            data.ordered = this.ordered;

            data.options = this._options.map(input => {

                let selectionIndex = -1;
                for (let i = 0; i < values.length; i++) {
                    if (this._compareWith(values[i], input.value)) {
                        selectionIndex = i;
                        break;
                    }
                }

                return {
                    label: input.text,
                    value: input.value,
                    checked: input.selected,
                    checkedTimestamp: selectionIndex,
                    disabled: input.disabled
                };
            });

            let overlay = this.modalController.create(SelectModal, data, options);

            overlay.onDidDismiss(values => {
                if (values) {
                    this.value = values;
                }
            });

            if (ev) {
                Object.defineProperty(ev, 'target', {value: ev.currentTarget});
            }

            overlay.present({updateUrl: false});
        } else {
            super.open(ev);
        }

    }

    @Input()
    readonly: boolean;

    @Input()
    ordered: boolean;

    _updateText() {
        this._texts.length = 0;

        if (this._options) {

            let values = this.getValues();
            let options = this._options.toArray();

            OPTIONS: for (let option of options) {

                for (let value of values) {
                    if (this._compareWith(value, option.value)) {
                        option.selected = true;
                        continue OPTIONS;
                    }
                }

                option.selected = false;
            }

            VALUES: for (let value of values) {
                for (let option of options) {
                    if (this._compareWith(value, option.value)) {
                        this._texts.push(option.text);
                        continue VALUES;
                    }
                }
            }
        }

        this._text = this._texts.join(', ');
    }

}