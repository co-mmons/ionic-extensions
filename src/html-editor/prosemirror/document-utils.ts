import {Node} from "prosemirror-model";
import {EditorState, Selection, Transaction} from "prosemirror-state";
import {ContentNodeWithPos} from "prosemirror-utils";

/**
 * Checks if node is an empty paragraph.
 */
export function isEmptyParagraph(node?: Node | null): boolean {
    return (
        !node ||
        (node.type.name === "paragraph" && !node.textContent && !node.childCount)
    );
}

/**
 * Returns false if node contains only empty inline nodes and hardBreaks.
 */
export function hasVisibleContent(node: Node): boolean {
    const isInlineNodeHasVisibleContent = (inlineNode: Node) => {
        return inlineNode.isText
            ? !!inlineNode.textContent.trim()
            : inlineNode.type.name !== "hardBreak";
    };

    if (node.isInline) {
        return isInlineNodeHasVisibleContent(node);
    } else if (node.isBlock && (node.isLeaf || node.isAtom)) {
        return true;
    } else if (!node.childCount) {
        return false;
    }

    for (let index = 0; index < node.childCount; index++) {
        const child = node.child(index);

        if (hasVisibleContent(child)) {
            return true;
        }
    }

    return false;
}

/**
 * Checks if a node has any content. Ignores node that only contain empty block nodes.
 */
export function isNodeEmpty(node?: Node): boolean {
    if (node && node.textContent) {
        return false;
    }

    if (
        !node ||
        !node.childCount ||
        (node.childCount === 1 && isEmptyParagraph(node.firstChild))
    ) {
        return true;
    }

    const block: Node[] = [];
    const nonBlock: Node[] = [];

    node.forEach(child => {
        child.isInline ? nonBlock.push(child) : block.push(child);
    });

    return (
        !nonBlock.length &&
        !block.filter(
            childNode =>
                (!!childNode.childCount &&
                    !(
                        childNode.childCount === 1 && isEmptyParagraph(childNode.firstChild)
                    )) ||
                childNode.isAtom,
        ).length
    );
}

/**
 * Checks if a node looks like an empty document
 */
export function isEmptyDocument(node: Node): boolean {
    const nodeChild = node.content.firstChild;

    if (node.childCount !== 1 || !nodeChild) {
        return false;
    }
    return (
        nodeChild.type.name === "paragraph" &&
        !nodeChild.childCount &&
        nodeChild.nodeSize === 2 &&
        (!nodeChild.marks || nodeChild.marks.length === 0)
    );
}

export const getStepRange = (
    transaction: Transaction,
): { from: number; to: number } | null => {
    let from = -1;
    let to = -1;

    transaction.steps.forEach(step => {
        step.getMap().forEach((_oldStart, _oldEnd, newStart, newEnd) => {
            from = newStart < from || from === -1 ? newStart : from;
            to = newEnd < to || to === -1 ? newEnd : to;
        });
    });

    if (from !== -1) {
        return { from, to };
    }

    return null;
};

/**
 * Find the farthest node given a condition
 * @param predicate Function to check the node
 */
export const findFarthestParentNode = (predicate: (node: Node) => boolean) => (
    selection: Selection,
): ContentNodeWithPos | null => {
    const { $from } = selection;

    let candidate: ContentNodeWithPos | null = null;

    for (let i = $from.depth; i > 0; i--) {
        const node = $from.node(i);
        if (predicate(node)) {
            candidate = {
                pos: i > 0 ? $from.before(i) : 0,
                start: $from.start(i),
                depth: i,
                node,
            };
        }
    }
    return candidate;
};

export const isSelectionEndOfParagraph = (state: EditorState): boolean =>
    state.selection.$to.parent.type === state.schema.nodes.paragraph &&
    state.selection.$to.pos === state.doc.resolve(state.selection.$to.pos).end();

export function nodesBetweenChanged(
    tr: Transaction,
    f: (
        node: Node<any>,
        pos: number,
        parent: Node<any>,
        index: number,
    ) => boolean | null | undefined | void,
    startPos?: number,
) {
    const stepRange = getStepRange(tr);
    if (!stepRange) {
        return;
    }

    tr.doc.nodesBetween(stepRange.from, stepRange.to, f, startPos);
}

export function getNodesCount(node: Node): Record<string, number> {
    const count: Record<string, number> = {};

    node.nodesBetween(0, node.nodeSize - 2, node => {
        count[node.type.name] = (count[node.type.name] || 0) + 1;
    });

    return count;
}
