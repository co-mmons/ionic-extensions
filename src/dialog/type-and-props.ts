import {Type} from "@angular/core";

export type TypeAndProps<T> = [Type<T>, {[K in keyof T]: T[K]} & {[key: string]: any}];
