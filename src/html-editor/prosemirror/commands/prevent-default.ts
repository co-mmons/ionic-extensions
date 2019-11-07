import {Command} from "../command";

export function preventDefault(): Command {
    return function () {
        return true;
    };
}
