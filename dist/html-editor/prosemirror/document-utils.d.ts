import { Node } from "prosemirror-model";
import { EditorState, Selection, Transaction } from "prosemirror-state";
import { ContentNodeWithPos } from "prosemirror-utils";
/**
 * Checks if node is an empty paragraph.
 */
export declare function isEmptyParagraph(node?: Node | null): boolean;
/**
 * Returns false if node contains only empty inline nodes and hardBreaks.
 */
export declare function hasVisibleContent(node: Node): boolean;
/**
 * Checks if a node has any content. Ignores node that only contain empty block nodes.
 */
export declare function isNodeEmpty(node?: Node): boolean;
/**
 * Checks if a node looks like an empty document
 */
export declare function isEmptyDocument(node: Node): boolean;
export declare const getStepRange: (transaction: Transaction) => {
    from: number;
    to: number;
};
/**
 * Find the farthest node given a condition
 * @param predicate Function to check the node
 */
export declare const findFarthestParentNode: (predicate: (node: Node) => boolean) => (selection: Selection) => ContentNodeWithPos | null;
export declare const isSelectionEndOfParagraph: (state: EditorState) => boolean;
export declare function nodesBetweenChanged(tr: Transaction, f: (node: Node, pos: number, parent: Node, index: number) => boolean | null | undefined | void, startPos?: number): void;
export declare function getNodesCount(node: Node): Record<string, number>;
