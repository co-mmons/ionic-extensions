import {Command} from "../command";
import {canMoveDown} from "../utils";
import {canCreateParagraphNear} from "./can-create-paragraph-near";
import {createParagraphNear} from "./create-paragraph-near";

export const createNewParagraphBelow: Command = (state, dispatch) => {
    const append = true;
    if (!canMoveDown(state) && canCreateParagraphNear(state)) {
        createParagraphNear(append)(state, dispatch);
        return true;
    }

    return false;
};
