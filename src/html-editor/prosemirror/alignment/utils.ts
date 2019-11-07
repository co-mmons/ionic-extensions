import {AlignmentState} from "./alignment-state";
import {EditorState} from "prosemirror-state";
import {findParentNodeOfType} from "prosemirror-utils";

export function getActiveAlignment(state: EditorState): AlignmentState | undefined {

    const node = findParentNodeOfType([
        state.schema.nodes.paragraph,
        state.schema.nodes.heading,
    ])(state.selection);

    const getMark = node && node.node.marks.filter(mark => mark.type === state.schema.marks.alignment)[0];
    return (getMark && getMark.attrs.align) || "left";

}

