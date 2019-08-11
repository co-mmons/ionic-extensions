export interface SelectOptionOrDivider<V = any> {
    value?: V;
    label?: string;
    disabled?: boolean;
    divider?: boolean;
}
export declare class SelectOptions<V = any> extends Array<SelectOptionOrDivider<V>> {
    constructor();
    pushOption(value: V, label?: string, disabled?: boolean): void;
    pushDivider(label: string): void;
}
