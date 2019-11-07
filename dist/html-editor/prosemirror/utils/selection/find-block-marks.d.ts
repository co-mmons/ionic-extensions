import { Mark, MarkType } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
export declare function findBlockMarks(state: EditorState, markType: MarkType): Mark<any>[];
