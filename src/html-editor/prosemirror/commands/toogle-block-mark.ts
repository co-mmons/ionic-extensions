import {MarkType, Node as PMNode, NodeType, Schema} from "prosemirror-model";
import {Transaction} from "prosemirror-state";
import {Command} from "../command";

/**
 * Toggles block mark based on the return type of `getAttrs`.
 * This is similar to ProseMirror"s `getAttrs` from `AttributeSpec`
 * return `false` to remove the mark.
 * return `undefined for no-op.
 * return an `object` to update the mark.
 */
export const toggleBlockMark = <T = object>(
    markType: MarkType,
    getAttrs: ((prevAttrs?: T, node?: PMNode) => T | undefined | false),
    allowedBlocks?:
        | Array<NodeType>
        | ((schema: Schema, node: PMNode, parent: PMNode) => boolean),
): Command => (state, dispatch) => {
    let markApplied = false;
    const tr = state.tr;

    const toggleBlockMarkOnRange = (from: number, to: number, tr: Transaction) => {

        state.doc.nodesBetween(from, to, (node, pos, parent) => {

            if (!node.type.isBlock) {
                return false;
            }

            if (
                (!allowedBlocks || (Array.isArray(allowedBlocks) ? allowedBlocks.indexOf(node.type) > -1 : allowedBlocks(state.schema, node, parent))) &&
                parent.type.allowsMarkType(markType)
            ) {

                const oldMarks = node.marks.filter(mark => mark.type === markType);

                const prevAttrs = oldMarks.length ? (oldMarks[0].attrs as T) : undefined;
                const newAttrs = getAttrs(prevAttrs, node);

                if (newAttrs !== undefined) {

                    tr.setNodeMarkup(
                        pos,
                        node.type,
                        node.attrs,
                        node.marks
                            .filter(mark => !markType.excludes(mark.type))
                            .concat(newAttrs === false ? [] : markType.create(newAttrs)),
                    );

                    markApplied = true;
                }
            }

            return;

        });
    };

    const {from, to} = state.selection;
    toggleBlockMarkOnRange(from, to, tr);

    if (markApplied && tr.docChanged) {
        if (dispatch) {
            dispatch(tr.scrollIntoView());
        }
        return true;
    }

    return false;
};
