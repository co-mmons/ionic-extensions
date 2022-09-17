import { EditorState } from "prosemirror-state";
import { Command, CommandDispatch } from "../command";
import { AlignmentState } from "./alignment-state";
/**
 * Iterates over the commands one after the other,
 * passes the tr through and dispatches the cumulated transaction
 */
export declare const cascadeCommands: (cmds: Array<Command>) => (state: EditorState, dispatch?: CommandDispatch) => boolean;
export declare const isAlignable: (align?: AlignmentState) => Command;
export declare const changeAlignment: (align?: AlignmentState) => Command;
