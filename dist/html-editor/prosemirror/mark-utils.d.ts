import { Node, Mark, MarkType } from "prosemirror-model";
import { SelectionRange, EditorState, Transaction } from "prosemirror-state";
export declare const isMarkAllowedInRange: (doc: Node, ranges: Array<SelectionRange>, type: MarkType) => boolean;
export declare const isMarkExcluded: (type: MarkType, marks?: Array<Mark> | null) => boolean;
export declare const removeBlockMarks: (state: EditorState, marks: Array<MarkType | undefined>) => Transaction | undefined;
/**
 * Removes marks from nodes in the current selection that are not supported
 */
export declare const sanitizeSelectionMarks: (state: EditorState) => Transaction | undefined;
