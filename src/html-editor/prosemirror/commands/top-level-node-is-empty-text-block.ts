import {EditorState} from "prosemirror-state";

export function topLevelNodeIsEmptyTextBlock(state: EditorState): boolean {
    const topLevelNode = state.selection.$from.node(1);
    return (
        topLevelNode.isTextblock &&
        topLevelNode.type !== state.schema.nodes.codeBlock &&
        topLevelNode.nodeSize === 2
    );
}
