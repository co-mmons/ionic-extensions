import {EditorState, Transaction} from "prosemirror-state";
import {Command, CommandDispatch} from "../command";
import {toggleBlockMark} from "../commands/toogle-block-mark";
import {AlignmentState} from "./alignment-state";

/**
 * Iterates over the commands one after the other,
 * passes the tr through and dispatches the cumulated transaction
 */
export const cascadeCommands = (cmds: Array<Command>) => (
    state: EditorState,
    dispatch?: CommandDispatch,
) => {
    const {tr: baseTr} = state;
    let shouldDispatch = false;

    const onDispatchAction = (tr: Transaction) => {
        tr.steps.forEach(st => {
            baseTr.step(st);
        });
        shouldDispatch = true;
    };

    cmds.forEach(cmd => {
        cmd(state, onDispatchAction);
    });

    if (dispatch && shouldDispatch) {
        dispatch(baseTr);
        return true;
    }
    return false;
};

export const isAlignable = (align?: AlignmentState): Command => (state, dispatch) => {

    const {
        nodes: {paragraph, heading},
        marks: {alignment},
    } = state.schema;

    return toggleBlockMark(
        alignment,
        () => (!align ? undefined : align === "left" ? false : {align}),
        [paragraph, heading],
    )(state, dispatch);
};

export const changeAlignment = (align?: AlignmentState): Command => (state, dispatch) => {

    const {
        nodes: {paragraph, heading},
        marks: {alignment}
    } = state.schema;

    return toggleBlockMark(alignment,
        () => (!align ? undefined : align === "left" ? false : {align}),
        [paragraph, heading],
    )(state, dispatch);
};
