import {Mark, MarkType, NodeType} from "prosemirror-model";
import {EditorState, NodeSelection} from "prosemirror-state";

export function isActive(state: EditorState, nodeType: NodeType, attrs?: {[key: string]: any}, marks?: Array<Mark<any>>) {

    const selection = state.selection;

    if (selection instanceof NodeSelection && selection.node) {
        return selection.node.hasMarkup(nodeType, attrs, marks);
    }

    return selection.to <= selection.$from.end() && selection.$from.parent.hasMarkup(nodeType, attrs, marks);
}

export function isMarkActive(state: EditorState, type: MarkType) {
    const {from, $from, to, empty} = state.selection;

    if (empty) {
        return !!(type.isInSet(state.storedMarks || $from.marks()));
    } else {
        return state.doc.rangeHasMark(from, to, type);
    }
}

export function anyMarkActive(state: EditorState, types: MarkType[]) {

    const {from, $from, to, empty} = state.selection;

    if (empty) {

        for (const type of types) {
            if (type.isInSet(state.storedMarks || $from.marks())) {
                return true;
            }
        }

    } else {

        for (const type of types) {
            if (state.doc.rangeHasMark(from, to, type)) {
                return true;
            }
        }

    }

    return false;
}
