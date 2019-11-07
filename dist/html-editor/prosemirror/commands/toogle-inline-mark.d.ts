import { MarkType } from "prosemirror-model";
import { Command } from "../command";
export declare function toggleInlineMark(markType: MarkType, attrs?: {
    [key: string]: any;
}): Command;
