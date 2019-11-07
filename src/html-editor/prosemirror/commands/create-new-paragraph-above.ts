import {createParagraphNear} from "./create-paragraph-near";
import {Command} from "../command";
import {canMoveUp} from "../utils";
import {canCreateParagraphNear} from "./can-create-paragraph-near";

export const createNewParagraphAbove: Command = (state, dispatch) => {
    const append = false;
    if (!canMoveUp(state) && canCreateParagraphNear(state)) {
        createParagraphNear(append)(state, dispatch);
        return true;
    }

    return false;
};
