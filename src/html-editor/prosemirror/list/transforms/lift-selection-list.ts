import {EditorState, Transaction} from "prosemirror-state";
import {getListLiftTarget} from "../utils/get-list-lift-target";

// The function will list paragraphs in selection out to level 1 below root list.
export function liftSelectionList(
    state: EditorState,
    tr: Transaction,
): Transaction {
    const {from, to} = state.selection;
    const {paragraph} = state.schema.nodes;
    const listCol: any[] = [];
    tr.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type === paragraph) {
            listCol.push({node, pos});
        }
    });
    for (let i = listCol.length - 1; i >= 0; i--) {
        const paragraph = listCol[i];
        const start = tr.doc.resolve(tr.mapping.map(paragraph.pos));
        if (start.depth > 0) {
            let end;
            if (paragraph.node.textContent && paragraph.node.textContent.length > 0) {
                end = tr.doc.resolve(
                    tr.mapping.map(paragraph.pos + paragraph.node.textContent.length),
                );
            } else {
                end = tr.doc.resolve(tr.mapping.map(paragraph.pos + 1));
            }
            const range = start.blockRange(end);
            if (range) {
                tr.lift(range, getListLiftTarget(state.schema, start));
            }
        }
    }
    return tr;
}
