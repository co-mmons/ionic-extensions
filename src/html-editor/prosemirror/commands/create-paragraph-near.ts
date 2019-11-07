import {Node as PMNode} from "prosemirror-model";
import {TextSelection} from "prosemirror-state";
import {Command} from "../command";
import {getInsertPosFromNonTextBlock} from "./get-insert-pos-from-non-text-block";
import {getInsertPosFromTextBlock} from "./get-insert-pos-from-text-block";
import {topLevelNodeIsEmptyTextBlock} from "./top-level-node-is-empty-text-block";

export function createParagraphNear(append: boolean = true): Command {
    return function (state, dispatch) {
        const paragraph = state.schema.nodes.paragraph;

        if (!paragraph) {
            return false;
        }

        let insertPos;

        if (state.selection instanceof TextSelection) {
            if (topLevelNodeIsEmptyTextBlock(state)) {
                return false;
            }
            insertPos = getInsertPosFromTextBlock(state, append);
        } else {
            insertPos = getInsertPosFromNonTextBlock(state, append);
        }

        const tr = state.tr.insert(insertPos, paragraph.createAndFill() as PMNode);
        tr.setSelection(TextSelection.create(tr.doc, insertPos + 1));

        if (dispatch) {
            dispatch(tr);
        }

        return true;
    };
}
