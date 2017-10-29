import {
    AfterViewInit,
    Component,
    ElementRef,
    forwardRef,
    OnChanges,
    SimpleChanges,
    ViewEncapsulation,
    ViewChild,
    Renderer2,
    Input,
    Optional
} from "@angular/core";

import {
    NgControl,
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator
} from "@angular/forms";

import {IonicFormInput, Item} from "ionic-angular";

import "trix";
import {EventListenersHelper} from "../helpers/event-listeners-helper";

@Component({
    selector: "ionx-trix-editor",
    template: ``,
    encapsulation: ViewEncapsulation.None
})
export class TrixEditor implements AfterViewInit, ControlValueAccessor, OnChanges, Validator, IonicFormInput {

    private static idGenerator: number = 0;

    constructor(private element: ElementRef, private renderer: Renderer2, @Optional() private formControl: NgControl, @Optional() private item: Item) {

        if (formControl) {
            this.formControl.valueAccessor = this;
        }

        this.id = "ionx-trix-editor" + (TrixEditor.idGenerator++);

        this.toolbar = this.nativeElement.appendChild(document.createElement("trix-toolbar"));
        this.toolbar.id = this.id + "-toolbar";
        this.toolbar.style.position = "sticky";
        this.toolbar.style.top = "0px";

        this.editor = this.nativeElement.appendChild(document.createElement("trix-editor"));
        this.editor.setAttribute("toolbar", this.toolbar.id);
    }

    private id: string;

    private editor: HTMLElement & {value?: string};

    private toolbar: HTMLElement;

    @Input()
    public set value(html: string) {
        this.editor.value = html;
    }

    public get value(): string {
        return this.editor.value;
    }

    registerOnValidatorChange(fn: () => void): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    writeValue(currentValue: any) {
        this.value = currentValue;
    }

    private controlOnChange: Function;

    registerOnChange(fn: Function): void {
        this.controlOnChange = fn;
    }

    private controlOnTouched: Function;

    registerOnTouched(fn: Function): void {
        this.controlOnTouched = fn;
    }

    validate(c: AbstractControl): ValidationErrors {
        return null;
    }

    private editorChanged(event: Event) {

        if (this.controlOnChange) {
            this.controlOnChange(this.value);
        }
    }

    initFocus(): void {
    }

    focus() {
        this.element.nativeElement.focus();
    }

    get nativeElement(): HTMLElement {
        return this.element.nativeElement;
    }


    private editorFocused(event: Event) {

        if (this.controlOnTouched) {
            this.controlOnTouched(true);
        }

        if (this.item) {
            this.renderer.addClass(this.item.getNativeElement(), "input-has-focus");
        }
    }

    private editorBlured(event: Event) {
        if (this.item) {
            this.renderer.removeClass(this.item.getNativeElement(), "input-has-focus");
        }
    }

    private resetControlCss() {

        let classes = {
            "ng-untouched": this.formControl.untouched,
            "ng-touched": this.formControl.touched,
            "ng-pristine": this.formControl.pristine,
            "ng-dirty": this.formControl.dirty,
            "ng-valid": this.formControl.valid,
            "ng-invalid": !this.formControl.valid
        };

        let elements = [];
        elements.push(this.element.nativeElement);

        if (this.item) {
            elements.push(this.item.getNativeElement());
        }

        for (let e of elements) {
            for (let c in classes) {
                if (classes[c]) {
                    this.renderer.addClass(e, c);
                } else {
                    this.renderer.removeClass(e, c);
                }
            }
        }
    }

    private eventListeners: EventListenersHelper = new EventListenersHelper();

    ngAfterViewInit(): void {
        this.eventListeners.add(this.editor, "trix-change", event => this.editorChanged(event));
        this.eventListeners.add(this.editor, "trix-focus", event => this.editorFocused(event));
        this.eventListeners.add(this.editor, "trix-blur", event => this.editorBlured(event));

        if (this.item) {

            let parent = this.toolbar.parentElement;
            while (true) {

                if (!parent) {
                    break;
                }

                parent.style.overflow = "visible";

                if (parent === this.item.getNativeElement()) {
                    break;
                }

                parent = parent.parentElement;
            }
        }
    }

    ngAfterContentChecked() {
        this.resetControlCss();
    }

    ngOnDestroy() {
        this.eventListeners.removeAll();
    }
}