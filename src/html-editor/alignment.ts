import {MessageRef} from "@co.mmons/js-intl";

export class Alignment {

    private static _alignments: Alignment[] = [];

    static alignments() {
        return Alignment._alignments.slice();
    }

    static readonly left = new Alignment("left");
    static readonly right = new Alignment("right");
    static readonly center = new Alignment("center");
    static readonly justify = new Alignment("justify");

    private constructor(public readonly alignment: string) {

        Alignment._alignments.push(this);

        this.label = new MessageRef("@co.mmons/ionic-extensions/html-editor", "alignmentMenu/" + alignment);
    }

    readonly label: MessageRef;
}
