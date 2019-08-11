export interface SelectOptionOrDivider<V = any> {
    value?: V;
    label?: string;
    disabled?: boolean;
    divider?: boolean;
}

export class SelectOptions<V = any> extends Array<SelectOptionOrDivider<V>> {

    constructor() {
        super();
        Object.setPrototypeOf(this, SelectOptions.prototype);
    }

    pushOption(value: V, label?: string, disabled?: boolean) {
        this.push({value: value, label: label, disabled: disabled});
    }

    pushDivider(label: string) {
        this.push({divider: true, label: label});
    }
}