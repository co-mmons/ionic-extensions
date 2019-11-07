import {EditorState} from "prosemirror-state";

export function getInsertPosFromTextBlock(
    state: EditorState,
    append: boolean,
): number {
    const {$from, $to} = state.selection;
    let pos;
    if (!append) {
        pos = $from.start(0);
    } else {
        pos = $to.end(0);
    }
    return pos;
}
