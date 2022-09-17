import { Mark, MarkType, Node } from "prosemirror-model";
export declare function findMarks(doc: Node, from: number, to: number, markType: MarkType, attrs?: {
    [key: string]: any;
}): Mark[];
