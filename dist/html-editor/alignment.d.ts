import { MessageRef } from "@co.mmons/js-intl";
export declare class Alignment {
    readonly alignment: string;
    private static _alignments;
    static alignments(): Alignment[];
    static readonly left: Alignment;
    static readonly right: Alignment;
    static readonly center: Alignment;
    static readonly justify: Alignment;
    private constructor();
    readonly label: MessageRef;
}
