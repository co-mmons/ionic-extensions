import {MessageRef} from "@co.mmons/js-intl";

export class FontSize {

    private static _sizes: FontSize[] = [];

    static sizes() {
        return FontSize._sizes.slice();
    }

    static readonly small = new FontSize("small");
    static readonly large = new FontSize("large");

    private constructor(public readonly size: string) {

        FontSize._sizes.push(this);

        this.label = new MessageRef("@co.mmons/ionic-extensions/html-editor", "textMenu/fontSize/" + size.toUpperCase()[0] + size.substring(1));
    }

    readonly label: MessageRef;
}
