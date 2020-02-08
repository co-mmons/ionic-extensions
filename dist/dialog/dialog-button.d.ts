export interface DialogButton {
    text: string;
    role?: string;
    color?: string;
    cssClass?: string | string[];
    size?: string;
    icon?: string;
    flex?: string | number;
    handler?: (value: any) => boolean | void;
}
