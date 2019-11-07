import {AlignmentState} from "./alignment-state";
import {Command} from "../command";

export const changeImageAlignment = (align?: AlignmentState): Command => (
    state,
    dispatch,
) => {
    const { from, to } = state.selection;

    const tr = state.tr;

    state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type === state.schema.nodes.mediaSingle) {
            tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                layout: align === "center" ? "center" : `align-${align}`,
            });
        }
    });

    if (tr.docChanged && dispatch) {
        dispatch(tr.scrollIntoView());
        return true;
    }

    return false;
};
