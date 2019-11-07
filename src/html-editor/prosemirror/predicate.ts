import {EditorState} from "prosemirror-state";
import {EditorView} from "prosemirror-view";

export type Predicate = (state: EditorState, view?: EditorView) => boolean;
