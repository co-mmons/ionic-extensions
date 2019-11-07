import {findMarks} from "./find-marks";
import {MarkType} from "prosemirror-model";
import {EditorState} from "prosemirror-state";

export function findMarksInSelection(state: EditorState, markType: MarkType, attrs?: {[key: string]: any}) {
    const doc = state.doc;
    const {from, to} = state.selection;
    return findMarks(doc, from, to, markType, attrs);
}
