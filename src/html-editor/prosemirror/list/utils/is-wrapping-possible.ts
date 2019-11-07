import {NodeType} from "prosemirror-model";
import {EditorState} from "prosemirror-state";
import {findWrapping} from "prosemirror-transform";

export const isWrappingPossible = (nodeType: NodeType, state: EditorState) => {
    const { $from, $to } = state.selection;
    const range = $from.blockRange($to);
    if (!range) {
        return false;
    }

    const wrap = findWrapping(range, nodeType);
    if (!wrap) {
        return false;
    }

    return true;
};
