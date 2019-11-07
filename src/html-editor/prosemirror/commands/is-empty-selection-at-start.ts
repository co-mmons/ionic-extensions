import {GapCursor} from "prosemirror-gapcursor";
import {EditorState} from "prosemirror-state";

export const isEmptySelectionAtStart = (state: EditorState): boolean => {
    const {empty, $from} = state.selection;
    return (
        empty &&
        ($from.parentOffset === 0 || state.selection instanceof GapCursor)
    );
};

