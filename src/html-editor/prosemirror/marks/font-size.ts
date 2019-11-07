import {MarkSpec} from "prosemirror-model";

export const fontSize: MarkSpec = {
    excludes: "fontSize",
    group: "fontSize",
    attrs: {
        fontSize: {},
    },
    parseDOM: [
        {
            tag: "span[data-font-size]",
            getAttrs: dom => {
                const size = (dom as Element).getAttribute("data-font-size");
                return size ? {fontSize: size} : false;
            },
        },
    ],
    toDOM(mark) {
        return [
            "span",
            {style: `font-size: ${mark.attrs.fontSize}`, "data-font-size": mark.attrs.fontSize},
            0
        ];
    },
};
