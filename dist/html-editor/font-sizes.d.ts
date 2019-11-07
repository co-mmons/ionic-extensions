import { MessageRef } from "@co.mmons/js-intl";
export declare class FontSize {
    readonly size: string;
    private static _sizes;
    static sizes(): FontSize[];
    static readonly small: FontSize;
    static readonly large: FontSize;
    private constructor();
    readonly label: MessageRef;
}
