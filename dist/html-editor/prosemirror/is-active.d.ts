import { Mark, MarkType, NodeType } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
export declare function isActive(state: EditorState, nodeType: NodeType, attrs?: {
    [key: string]: any;
}, marks?: Array<Mark<any>>): boolean;
export declare function isMarkActive(state: EditorState, type: MarkType): boolean;
export declare function anyMarkActive(state: EditorState, types: MarkType[]): boolean;
