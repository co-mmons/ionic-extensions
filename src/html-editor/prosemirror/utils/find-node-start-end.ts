import {Node} from "prosemirror-model";

export function findNodeStartEnd(doc: Node, pos: number) {

    const $pos = doc.resolve(pos);
    const start = pos - $pos.textOffset;
    const end = start + $pos.parent.child($pos.index()).nodeSize;

    return {start, end};
}
