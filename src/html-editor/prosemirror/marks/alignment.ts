import {MarkSpec} from "prosemirror-model";

export const alignment: MarkSpec = {
    excludes: "alignment",
    group: "alignment",
    attrs: {
        align: {},
    },
    parseDOM: [
        {
            tag: "div[data-align]",
            getAttrs: dom => {
                const align = (dom as Element).getAttribute("data-align");
                return align ? {align} : false;
            },
        },
    ],
    toDOM(mark) {
        return [
            "div",
            {
                style: `text-align: ${mark.attrs.align}`,
                "data-align": mark.attrs.align,
            },
            0
        ];
    },
};
