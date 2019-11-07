import { Node, Mark, MarkType } from "prosemirror-model";
import { SelectionRange, EditorState, Transaction } from "prosemirror-state";
export declare const isMarkAllowedInRange: (doc: Node<any>, ranges: SelectionRange<any>[], type: MarkType<any>) => boolean;
export declare const isMarkExcluded: (type: MarkType<any>, marks?: Mark<any>[]) => boolean;
export declare const removeBlockMarks: (state: EditorState<any>, marks: MarkType<any>[]) => Transaction<any>;
/**
 * Removes marks from nodes in the current selection that are not supported
 */
export declare const sanitizeSelectionMarks: (state: EditorState<any>) => Transaction<any>;
