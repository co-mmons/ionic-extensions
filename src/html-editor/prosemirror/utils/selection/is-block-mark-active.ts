import {MarkType} from "prosemirror-model";
import {EditorState} from "prosemirror-state";

export function isBlockMarkActive(state: EditorState, type: MarkType) {
    const {from, $from, to, empty} = state.selection;

    if (empty) {

        for (const mark of $from.parent.marks) {
            if (mark.type === type) {
                return true;
            }
        }
    } else {
        return state.doc.rangeHasMark(from, to, type);
    }
}
