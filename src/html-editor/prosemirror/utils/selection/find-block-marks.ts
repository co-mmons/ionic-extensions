import {Mark, MarkType} from "prosemirror-model";
import {EditorState} from "prosemirror-state";

export function findBlockMarks(state: EditorState, markType: MarkType) {

    const marks: Mark[] = [];

    const {from, to} = state.selection;

    state.doc.nodesBetween(from, to, (node, pos, parent) => {

        if (!node.type.isBlock) {
            return false;
        }

        for (const mark of node.marks) {
            if (mark.type === markType) {
                marks.push(mark);
            }
        }

    });


    return marks;
}
