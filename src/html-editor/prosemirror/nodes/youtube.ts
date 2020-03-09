import {NodeSpec} from "prosemirror-model";

export const youtube: NodeSpec = {
    attrs: {id: {default: ""}, start: {default: 0}},
    inline: false,
    group: "block",
    draggable: false,

    toDOM: (node) => {

        return [
            "div",
            {"data-youtube": node.attrs.id + (node.attrs.start ? "," + node.attrs.start : "")}
        ];
    },

    parseDOM: [
        {
            tag: "div[data-youtube]",
            getAttrs: (dom) => {

                // @ts-ignore
                const info = dom.getAttribute("data-youtube").split(",");

                return {
                    id: info[0],
                    start: info.length > 1 ? info[1] : 0
                };
            },
        }
    ]
};
