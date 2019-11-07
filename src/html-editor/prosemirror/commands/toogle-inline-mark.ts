import {shallowEqual} from "fast-equals";
import {MarkType, Node} from "prosemirror-model";
import {Command} from "../command";

function markApplies(doc: Node, from: number, to: number, type: MarkType) {

    let applies = false;

    doc.nodesBetween(from, to, (node, pos, parent) => {

        if (applies) {
            return false;
        }

        applies = node.isInline && parent.type.allowsMarkType(type);
    });

    return applies;
}

// return true iff all nodes in range have the mark with the same attrs
function rangeHasMark(doc, from, to, type, attrs) {

    let hasMark = null;

    doc.nodesBetween(from, to, node => {

        for (let i = 0; i < node.marks.length; i++) {
            const markMatch = node.marks[i].type === type && (!attrs || shallowEqual(node.marks[i].attrs, attrs));
            hasMark = (markMatch && (hasMark === null || hasMark === true));
        }

        return hasMark;
    });

    return !!hasMark;
}

export function toggleInlineMark(markType: MarkType, attrs?: {[key: string]: any}): Command {

    return function(state, dispatch) {

        const { empty, from, to, $from } = state.selection;

        if (!markApplies(state.doc, from, to, markType)) {
            console.log("not applies");
            return false;
        }

        if (dispatch) {

            if (empty) {

                const markInSet = markType.isInSet(state.storedMarks || $from.marks());

                if (markInSet && (!attrs || shallowEqual(markInSet.attrs, attrs))) {
                    dispatch(state.tr.removeStoredMark(markType));
                } else {
                    dispatch(state.tr.addStoredMark(markType.create(attrs)));
                }

            } else {

                if (rangeHasMark(state.doc, from, to, markType, attrs)) {
                    dispatch(state.tr.removeMark(from, to, markType).scrollIntoView());
                } else {
                    dispatch(state.tr.addMark(from, to, markType.create(attrs)).scrollIntoView());
                }
            }
        }

        return true;
    };
}

