import { MarkType } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
export declare function findMarksInSelection(state: EditorState, markType: MarkType, attrs?: {
    [key: string]: any;
}): import("prosemirror-model").Mark[];
