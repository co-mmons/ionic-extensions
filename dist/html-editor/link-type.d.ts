import { ValidatorFn } from "@angular/forms";
import { MessageRef } from "@co.mmons/js-intl";
export declare abstract class LinkType {
    readonly type: string;
    protected constructor(type: string);
    abstract get label(): MessageRef;
    abstract get inputType(): string;
    abstract get inputComponent(): any;
    abstract get inputValidators(): ValidatorFn[];
    abstract get inputHint(): MessageRef;
    abstract get inputLabel(): MessageRef;
    abstract uri(fromLink: string): string;
    toString(): string;
}
export declare class DefaultLinkType extends LinkType {
    static readonly www: DefaultLinkType;
    static readonly email: DefaultLinkType;
    static readonly tel: DefaultLinkType;
    static readonly sms: DefaultLinkType;
    static readonly other: DefaultLinkType;
    constructor(type: string);
    readonly label: MessageRef;
    readonly inputType: string;
    readonly inputValidators: ValidatorFn[];
    readonly inputComponent: any;
    readonly inputLabel: MessageRef;
    readonly inputHint: MessageRef;
    uri(fromLink: string): string;
}
