import { MarkSpec, NodeSpec, Schema } from "prosemirror-model";
export declare const nodes: {
    doc: {
        content: string;
        marks: string;
    };
    paragraph: NodeSpec;
    blockquote: NodeSpec;
    horizontalRule: NodeSpec;
    heading: NodeSpec;
    text: NodeSpec;
    hardBreak: NodeSpec;
    bulletList: NodeSpec;
    orderedList: NodeSpec;
    listItem: NodeSpec;
    youtube: NodeSpec;
};
export declare const marks: {
    link: MarkSpec;
    em: MarkSpec;
    strong: MarkSpec;
    alignment: MarkSpec;
    fontSize: MarkSpec;
    underline: MarkSpec;
};
export declare const schema: Schema<"youtube" | "doc" | "paragraph" | "blockquote" | "horizontalRule" | "heading" | "text" | "hardBreak" | "bulletList" | "orderedList" | "listItem", "fontSize" | "alignment" | "link" | "em" | "strong" | "underline">;
