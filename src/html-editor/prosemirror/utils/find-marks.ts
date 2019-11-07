import {deepEqual} from "fast-equals";
import {Mark, MarkType, Node} from "prosemirror-model";

export function findMarks(doc: Node, from: number, to: number, markType: MarkType, attrs?: {[key: string]: any}) {

    const marks: Mark[] = [];

    doc.nodesBetween(from, to, node => {

        for (let i = 0; i < node.marks.length; i++) {
            if (node.marks[i].type === markType && (!attrs || deepEqual(node.marks[i].attrs, attrs))) {
                marks.push(node.marks[i]);
            }
        }

    });

    return marks;
}
