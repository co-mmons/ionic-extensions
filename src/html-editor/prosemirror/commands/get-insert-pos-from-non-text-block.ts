import {EditorState, NodeSelection} from "prosemirror-state";

export function getInsertPosFromNonTextBlock(
    state: EditorState,
    append: boolean,
): number {
    const {$from, $to} = state.selection;
    const nodeAtSelection =
        state.selection instanceof NodeSelection &&
        state.doc.nodeAt(state.selection.$anchor.pos);
    const isMediaSelection =
        nodeAtSelection && nodeAtSelection.type.name === "mediaGroup";

    let pos;
    if (!append) {
        // The start position is different with text block because it starts from 0
        pos = $from.start($from.depth);
        // The depth is different with text block because it starts from 0
        pos = $from.depth > 0 && !isMediaSelection ? pos - 1 : pos;
    } else {
        pos = $to.end($to.depth);
        pos = $to.depth > 0 && !isMediaSelection ? pos + 1 : pos;
    }
    return pos;
}
