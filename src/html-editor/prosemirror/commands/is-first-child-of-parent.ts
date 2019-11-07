import {GapCursor} from "prosemirror-gapcursor";
import {EditorState} from "prosemirror-state";

export const isFirstChildOfParent = (state: EditorState): boolean => {
    const {$from} = state.selection;
    return $from.depth > 1
        ? (state.selection instanceof GapCursor &&
        $from.parentOffset === 0) ||
        $from.index($from.depth - 1) === 0
        : true;
};
