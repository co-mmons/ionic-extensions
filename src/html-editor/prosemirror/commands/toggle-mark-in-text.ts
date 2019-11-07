import {Command} from "../command";
import {Mark, MarkType} from "prosemirror-model";
import {TextSelection, Transaction} from "prosemirror-state";

const applyMarkOnRange = (
    from: number,
    to: number,
    removeMark: boolean,
    mark: Mark,
    tr: Transaction,
) => {

    tr.doc.nodesBetween(tr.mapping.map(from), tr.mapping.map(to), (node, pos) => {
        if (!node.isText) {
            return true;
        }

        // This is an issue when the user selects some text.
        // We need to check if the current node position is less than the range selection from.
        // If it’s true, that means we should apply the mark using the range selection,
        // not the current node position.
        const nodeBetweenFrom = Math.max(pos, tr.mapping.map(from));
        const nodeBetweenTo = Math.min(pos + node.nodeSize, tr.mapping.map(to));

        if (removeMark) {
            tr.removeMark(nodeBetweenFrom, nodeBetweenTo, mark);
        } else {
            tr.addMark(nodeBetweenFrom, nodeBetweenTo, mark);
        }

        return true;
    });

    return tr;
};

const toggleMarkInRange = (mark: Mark): Command => (state, dispatch) => {
    const tr = state.tr;
    const { $from, $to } = state.selection;
    // @ts-ignore The type for `rangeHasMark` only accepts a `MarkType` as a third param,
    // Yet the internals use a method that exists on both MarkType and Mark (one checks attributes the other doesnt)
    // For example, with our subsup mark: We use the same mark with different attributes to convery
    // different formatting but when using `MarkType.isInSet(marks)` it returns true for both.
    // Calling `Mark.isInSet(marks)` compares attributes as well.
    const markInRange = state.doc.rangeHasMark($from.pos, $to.pos, mark);

    applyMarkOnRange($from.pos, $to.pos, markInRange, mark, tr);

    if (tr.docChanged) {
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    }

    return false;
};

/**
 * A wrapper over the default toggleMark, except when we have a selection
 * we only toggle marks on text nodes rather than inline nodes.
 */
export const toggleMark = (
    markType: MarkType,
    attrs?: { [key: string]: any },
): Command => (state, dispatch) => {
    const mark = markType.create(attrs);

    // For cursor selections we can use the default behaviour.
    if (state.selection instanceof TextSelection && state.selection.$cursor) {
        const tr = state.tr;
        if (mark.isInSet(state.storedMarks || state.selection.$cursor.marks())) {
            tr.removeStoredMark(mark);
        } else {
            tr.addStoredMark(mark);
        }

        if (dispatch) {
            dispatch(tr);
            return true;
        }

        return false;
    }

    return toggleMarkInRange(mark)(state, dispatch);
};
