import {Command} from "../command";
import {Node as PMNode} from "prosemirror-model";
import {TextSelection} from "prosemirror-state";

export function createParagraphAtEnd(): Command {
    return function (state, dispatch) {
        const {
            doc,
            tr,
            schema: {nodes},
        } = state;
        if (
            doc.lastChild &&
            !(
                doc.lastChild.type === nodes.paragraph &&
                doc.lastChild.content.size === 0
            )
        ) {
            tr.insert(doc.content.size, nodes.paragraph.createAndFill() as PMNode);
        }
        tr.setSelection(TextSelection.create(tr.doc, tr.doc.content.size - 1));
        tr.scrollIntoView();
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    };
}
