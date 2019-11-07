import {MarkSpec, NodeSpec, Schema} from "prosemirror-model";
import {marks as basicMarks, nodes as basicNodes} from "prosemirror-schema-basic";
import {bulletList, listItem, orderedList} from "prosemirror-schema-list";
import {fontSize} from "./marks/font-size";
import {alignment} from "./marks/alignment";
import {youtube} from "./nodes/youtube";

export const nodes = {
    doc: {
        content: "block+",
        marks: "alignment",
    },

    paragraph: {
        content: "inline*",
        marks: "alignment strong underline em fontSize link",
        group: "block",
        parseDOM: [{tag: "p"}],
        toDOM() { return ["p", 0]; }
    } as NodeSpec,

    blockquote: basicNodes.blockquote,
    horizontalRule: basicNodes.horizontal_rule,
    heading: basicNodes.heading,
    text: basicNodes.text,
    hardBreak: basicNodes.hard_break,

    bulletList: Object.assign({}, bulletList, {
        content: "listItem+",
        group: "block"
    }) as NodeSpec,

    orderedList: Object.assign({}, orderedList, {
        content: "listItem+",
        group: "block"
    }) as NodeSpec,

    listItem: Object.assign({}, listItem, {
        content: "paragraph block*",
        marks: "alignment"
    }) as NodeSpec,

    youtube
};

export const marks = {
    link: basicMarks.link,
    em: basicMarks.em,
    strong: basicMarks.strong,
    alignment,
    fontSize: fontSize,

    underline: {
        parseDOM: [{tag: "u"}, {style: "text-decoration=underline"}],
        toDOM() {
            return ["u", 0];
        }
    } as MarkSpec
};

export const schema = new Schema<keyof typeof nodes, keyof typeof marks>({nodes: nodes, marks: marks});

