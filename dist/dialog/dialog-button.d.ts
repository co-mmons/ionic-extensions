export interface DialogButton {
    text: string;
    role?: string;
    color?: string;
    cssClass?: string | string[];
    size?: string;
    handler?: (value: any) => boolean | void;
}
