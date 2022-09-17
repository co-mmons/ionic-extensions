import { AfterContentChecked, AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { EventManager } from "@angular/platform-browser";
import { IonItem } from "@ionic/angular";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { HtmlEditorFeatures } from "./editor-features";
export declare class HtmlEditor implements OnInit, AfterViewInit, ControlValueAccessor, AfterContentChecked, OnDestroy, OnChanges {
    private element;
    eventManager: EventManager;
    private formControl;
    private item;
    private static idGenerator;
    constructor(element: ElementRef<HTMLElement>, eventManager: EventManager, formControl: NgControl, item: IonItem);
    private eventUnlisteners;
    readonly id: string;
    itemInputWrapper: boolean;
    features: HtmlEditorFeatures;
    disabled: boolean;
    readonly: boolean;
    /**
     * Value, that should be set when editor is fully initialized.
     */
    private uninitializedValue;
    private controlOnChange;
    private controlOnTouched;
    private focused;
    private silentChanges;
    view: EditorView;
    get state(): EditorState;
    private schema;
    private plugins;
    private scrollParent;
    readonly change: EventEmitter<void>;
    readonly selectionChange: EventEmitter<void>;
    set value(html: string);
    get value(): string;
    get nativeElement(): HTMLElement;
    private prepareOutputValue;
    private prepareInputValue;
    setDisabledState(isDisabled: boolean): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    focus(): void;
    private editorInitialized;
    private editorFocused;
    private editorBlured;
    private handleScroll;
    private editorDoc;
    private resetControlCss;
    private updateItemClasses;
    private fixItemOverflow;
    private editorTransaction;
    private readonlyChanged;
    ngAfterViewInit(): void;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
