import {Selection} from "prosemirror-state";
import {Command} from "../command";

export const clearEditorContent: Command = (state, dispatch) => {
    const tr = state.tr;
    tr.replace(0, state.doc.nodeSize - 2);
    tr.setSelection(Selection.atStart(tr.doc));

    if (dispatch) {
        dispatch(tr);
        return true;
    }

    return false;
};
