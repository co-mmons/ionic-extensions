import { AfterViewInit, ElementRef, OnChanges, SimpleChanges, Renderer2 } from "@angular/core";
import { NgControl, AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from "@angular/forms";
import { IonicFormInput, Item } from "ionic-angular";
import "trix";
export declare class TrixEditor implements AfterViewInit, ControlValueAccessor, OnChanges, Validator, IonicFormInput {
    private element;
    private renderer;
    private formControl;
    private item;
    private static idGenerator;
    constructor(element: ElementRef, renderer: Renderer2, formControl: NgControl, item: Item);
    private id;
    private editor;
    private toolbar;
    /**
     * Value, that should be set when editor is fully initialized.
     */
    private uninitializedValue;
    value: string;
    registerOnValidatorChange(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    ngOnChanges(changes: SimpleChanges): void;
    writeValue(currentValue: any): void;
    private controlOnChange;
    registerOnChange(fn: Function): void;
    private controlOnTouched;
    registerOnTouched(fn: Function): void;
    validate(c: AbstractControl): ValidationErrors;
    private editorChanged(event);
    initFocus(): void;
    focus(): void;
    readonly nativeElement: HTMLElement;
    private editorInitialized(event);
    private editorFocused(event);
    private editorBlured(event);
    private resetControlCss();
    private eventListeners;
    ngAfterViewInit(): void;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
}
