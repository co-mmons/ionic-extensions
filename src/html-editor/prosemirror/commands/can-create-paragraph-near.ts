import {EditorState, NodeSelection} from "prosemirror-state";

export function canCreateParagraphNear(state: EditorState): boolean {
    const {
        selection: {$from},
    } = state;
    const node = $from.node($from.depth);
    const insideCodeBlock = !!node && node.type === state.schema.nodes.codeBlock;
    const isNodeSelection = state.selection instanceof NodeSelection;
    return $from.depth > 1 || isNodeSelection || insideCodeBlock;
}
