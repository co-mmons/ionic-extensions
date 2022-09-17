import { Node, NodeType, ResolvedPos } from "prosemirror-model";
import { EditorState, TextSelection, Transaction } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Command } from "./command";
export declare const enterKeyCommand: Command;
export declare const backspaceKeyCommand: import("prosemirror-state").Command;
export declare function outdentList(): Command;
export declare function indentList(): Command;
export declare function liftListItems(): Command;
/**
 * Sometimes a selection in the editor can be slightly offset, for example:
 * it"s possible for a selection to start or end at an empty node at the very end of
 * a line. This isn"t obvious by looking at the editor and it"s likely not what the
 * user intended - so we need to adjust the selection a bit in scenarios like that.
 */
export declare function adjustSelectionInList(doc: Node, selection: TextSelection): TextSelection;
export declare const rootListDepth: (pos: ResolvedPos, nodes: Record<string, NodeType>) => any;
export declare const numberNestedLists: (resolvedPos: ResolvedPos, nodes: Record<string, NodeType>) => number;
export declare const toggleList: (state: EditorState, dispatch: (tr: Transaction) => void, view: EditorView, listType: "bulletList" | "orderedList") => boolean;
/**
 * Check of is selection is inside a list of the specified type
 */
export declare function isInsideList(state: EditorState, listType: "bulletList" | "orderedList"): boolean;
export declare function toggleListCommand(listType: "bulletList" | "orderedList"): Command;
export declare function toggleBulletList(view: EditorView): boolean;
export declare function toggleOrderedList(view: EditorView): boolean;
export declare function wrapInList(nodeType: NodeType): Command;
