import {ComponentRef, Type} from "@angular/core";
import {ModalOptions} from "@ionic/core";
import {DialogButton} from "./dialog-button";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface DialogOptions extends Omit<ModalOptions, "componentProps" | "component"> {
    message?: string | ComponentRef<any> | Type<any> | [Type<any>, {[param: string]: any}];
    header?: string;
    buttons?: DialogButton[];
}
