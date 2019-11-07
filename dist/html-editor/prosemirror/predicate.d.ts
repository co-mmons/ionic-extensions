import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
export declare type Predicate = (state: EditorState, view?: EditorView) => boolean;
