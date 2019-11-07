import {EditorState} from "prosemirror-state";
import {Command} from "../../command";

/**
 * Creates a filter that checks if the node at a given number of parents above the current
 * selection is of the correct node type.
 * @param nodeType The node type to compare the nth parent against
 * @param depthAway How many levels above the current node to check against. 0 refers to
 * the current selection"s parent, which will be the containing node when the selection
 * is usually inside the text content.
 */
export function isNthParentOfType(nodeType: string, depthAway: number): Command {

    return (state: EditorState): boolean => {
        const {$from} = state.selection;
        const parent = $from.node($from.depth - depthAway);
        return !!parent && parent.type === state.schema.nodes[nodeType];
    };

}
